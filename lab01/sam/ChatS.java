import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Calendar;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

public class ChatS {
static ArrayList<Socket> t;
	public static void main(String[] args) throws IOException {
		t= new ArrayList<Socket>();
		ServerSocket serverSocket = null;
		int clientNum = 0; // keeps track of how many clients were created

		// 1. CREATE A NEW SERVERSOCKET
		try {
			serverSocket = new ServerSocket(4444); // provide MYSERVICE at port
													// 4444
			System.out.println(serverSocket);
		} catch (IOException e) {
			System.out.println("Could not listen on port: 4444");
			System.exit(-1);
		}

		// 2. LOOP FOREVER - SERVER IS ALWAYS WAITING TO PROVIDE SERVICE!
		while (true) {
			Socket clientSocket = null;
			try {

				// 2.1 WAIT FOR CLIENT TO TRY TO CONNECT TO SERVER
				System.out.println("Waiting for client " + (clientNum + 1) + " to connect!");
				clientSocket = serverSocket.accept();

				// 2.2 SPAWN A THREAD TO HANDLE CLIENT REQUEST
				System.out.println("Server got connected to a client" + ++clientNum);
				t.add(clientSocket);
				Thread t = new Thread(new ClientHandlers(clientSocket, clientNum));
				t.start();

			} catch (IOException e) {
				System.out.println("Accept failed: 4444");
				System.exit(-1);
			}

			// 2.3 GO BACK TO WAITING FOR OTHER CLIENTS
			// (While the thread that was created handles the connected client's
			// request)

		} // end while loop

	} // end of main method

} // end of class MyServer

class ClientHandlers implements Runnable {
	Socket s; // this is socket on the server side that connects to the CLIENT
	int num; // keeps track of its number just for identifying purposes

	ClientHandlers(Socket s, int n) {
		this.s = s;
		num = n;
	}

	// This is the client handling code
	public void run() {
		printSocketInfo(s); // just print some information at the server side
							// about the connection
		while (true) {
			try {
				// 1. USE THE SOCKET TO READ WHAT THE CLIENT IS SENDING
				// Base64.getDecoder().decode(in.nextLine().getBytes());
				ObjectInputStream ois = new ObjectInputStream(s.getInputStream());
				String clientMessage = "";
				boolean all = false;
				ImageIcon image = null;
				String name = "";
				String filesname = "";
				String filex = "";
				Object obj = ois.readObject();

				String newMes = "";

				if (obj instanceof String) {
					name = (String) obj;
					clientMessage = (String) ois.readObject();
					all = (boolean) ois.readObject();
					newMes = name + ": " + clientMessage;
					if(all){
						for(int i = 0; i<ChatS.t.size();i++){
							sendMessage(name, newMes, ChatS.t.get(i));
						}
					}
				}
				if (obj instanceof ImageIcon) {
					clientMessage = "Image!!!!";
					image = (ImageIcon) obj;
					name = (String) ois.readObject();
					filesname = ((String) ois.readObject());
					filex = filesname.substring(filesname.lastIndexOf(".") + 1);

					Calendar now = Calendar.getInstance();
					String fileName = name + " " + now.get(Calendar.HOUR) + "-" + now.get(Calendar.MINUTE) + "-"
							+ now.get(Calendar.SECOND);
					File file = new File("src/" + fileName + "." + filex);
					Image img = image.getImage();
					BufferedImage bi = new BufferedImage(img.getWidth(null), img.getHeight(null),
							BufferedImage.TYPE_INT_RGB);
					Graphics2D g2 = bi.createGraphics();
					g2.drawImage(img, 0, 0, null);
					g2.dispose();
					ImageIO.write(bi, filex, file);
					newMes = "Got file from " + name + ": " + filesname;
				}
				System.out.println(newMes);
				add(newMes);
				// Files.write(Paths.get("/"+dtf.format(localDate)), new
				// ImageIcon(bi));
				// 2. PRINT WHAT THE CLIENT SENT

			} catch (IOException | ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		// This handling code dies after doing all the printing
	} // end of method run()

	void add(String Message) throws IOException {
		FileWriter fw = new FileWriter("chat.txt", true);
		fw.write(Message + System.lineSeparator());
		fw.close();
	}
	
	static void sendMessage(String name, String message, Socket socket) throws IOException {
		ObjectOutputStream out1 = new ObjectOutputStream(socket.getOutputStream());
		out1.writeObject(name);
		out1.flush();
		out1.writeObject(message);
		out1.flush();
	}

	Socket getSocket(){
		return s;
	}
	void printSocketInfo(Socket s) {
		System.out.print("Socket on Server " + Thread.currentThread() + " ");
		System.out.print("Server socket Local Address: " + s.getLocalAddress() + ":" + s.getLocalPort());
		System.out.println("  Server socket Remote Address: " + s.getRemoteSocketAddress());
	} // end of printSocketInfo

}
