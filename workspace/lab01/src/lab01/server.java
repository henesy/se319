package lab01;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.Base64;

public class server {
	private ArrayList<Socket> clients;
	
	public void start() throws IOException {
		File f = new File("chat.txt");
		if(!f.exists()) {
			Path file = Paths.get("chat.txt");
			Files.write(file, "".getBytes(), StandardOpenOption.CREATE);
		}
		File d = new File("images");
		if(!d.exists()) {
			d.mkdir();
		}

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
		
		//track connected clients
		clients = new ArrayList<Socket>();

		// 2. LOOP FOREVER - SERVER IS ALWAYS WAITING TO PROVIDE SERVICE!
		while (true) {
			Socket clientSocket = null;
			try {

				// 2.1 WAIT FOR CLIENT TO TRY TO CONNECT TO SERVER
				System.out.println("Waiting for client " + (clientNum + 1)
						+ " to connect!");
				clientSocket = serverSocket.accept();

				// 2.2 SPAWN A THREAD TO HANDLE CLIENT REQUEST
				System.out.println("Server got connected to a client"
						+ ++clientNum);
				Thread t = new Thread(new ClientHandler(clientSocket, clientNum, clients));
				t.start();
				clients.add(clientSocket);

			} catch (IOException e) {
				System.out.println("Accept failed: 4444");
				System.exit(-1);
			}

			// 2.3 GO BACK TO WAITING FOR OTHER CLIENTS
			// (While the thread that was created handles the connected client's
			// request)

		} // end while loop

	} // end of main method
}

class ClientHandler implements Runnable {
	Socket s; // this is socket on the server side that connects to the CLIENT
	int num; // keeps track of its number just for identifying purposes
	/* this should just be a socket list with some synchronized love */
	private ArrayList<Socket> clients;
	Base64.Encoder enc;
	Base64.Decoder dec;
	int messageCount;

	ClientHandler(Socket s, int n, ArrayList<Socket> cl) {
		this.s = s;
		num = n;
		
		//import pointer for list of clients
		clients = cl;
		
		//set up dec and enc
		enc = Base64.getEncoder();;
		dec = Base64.getDecoder();
	}

	// This is the client handling code ;; synchronized added, can be removed
	public synchronized void run() {
		printSocketInfo(s); // just print some information at the server side about the connection
		Scanner in;
		boolean textMode = true;
		
		//get from file
		try {
			messageCount = getLastMNumber()+1;
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
		/*
		try {
		    Files.write(Paths.get("myfile.txt"), "the text".getBytes(), StandardOpenOption.APPEND);
		}catch (IOException e) {
		    //exception handling left as an exercise for the reader
		}
		*/
		
		System.out.println(clients.toString());
		
		try {
			
			// 1. USE THE SOCKET TO READ WHAT THE CLIENT IS SENDING
			in = new Scanner(new BufferedInputStream(s.getInputStream())); 
			String name = new String(dec.decode(in.nextLine().getBytes()));
			
			sendAll(name + " has connected");
			
			while(true) {				
				//file receive logic here 
				
					if(textMode) {
						String str = new String(dec.decode(in.nextLine()));
						
						if(str.contains("!list")) {
							send(getMessages());
						} else if(str.contains("!del")) {
							Scanner stmp = new Scanner(str);
							stmp.next();
							int linen = stmp.nextInt();
							delMessage(linen);
							stmp.close();
						}
						
						if(str.contains("!file")) {
							 textMode = false;
							 sendAll(name + " entered FILE mode!");
						} else {
							System.out.println(name + ": " + str);
							sendAll(name + ": " + str);
						}
					} else {
						ObjectInputStream fin = new ObjectInputStream(new BufferedInputStream(s.getInputStream()));
						String ifileName = new String(dec.decode(((String) fin.readObject()).getBytes()));
						byte[] ifile = dec.decode(((byte[]) fin.readObject()));
						File file = new File("images/" + (name + "+" + java.time.Instant.now().toString().replaceAll(":", "") + ifileName.substring(ifileName.length()-4)));
						Files.write(file.toPath(), ifile);
						 
						System.out.println("Got file: " + file.getName() + " at: " + file.getAbsolutePath());
						sendAllFile(ifile, file.getName(), ifileName);
						sendAll(name + ": Sending " + file.getName());
						
						try {
						    Files.write(Paths.get("chat.txt"), (messageCount + " " + ifileName + "\n").getBytes(), StandardOpenOption.APPEND);
						    messageCount++;
						} catch (IOException e) {
						    System.out.println(e.getStackTrace());
						}
						
						textMode = true;
					}
			}
			
		} catch (IOException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		// This handling code dies after doing all the printing
	} // end of method run()
	
	private String getMessages() throws FileNotFoundException {
		// TODO Auto-generated method stub
		
		Scanner chat = new Scanner(new File("chat.txt"));
		String str = "";
		while(chat.hasNextLine()) {
			str += chat.nextLine() + "\n";
		}
		chat.close();
		
		return str;
	}
	
	private void delMessage(int x) throws IOException {
		// TODO Auto-generated method stub
		//messageCount--;
		
		File chat = new File("chat.txt");
		File tmp = new File("chatTmp.txt");
		
		
		BufferedReader r = new BufferedReader(new FileReader(chat));
		BufferedWriter w = new BufferedWriter(new FileWriter(tmp));
		
		String str;
		
		int i;
		for(i = 1; (str = r.readLine()) != null; i++) {
			if(Character.getNumericValue(str.charAt(0)) == x) {
				i-=2;
				continue;
			}
						
			w.write(i + str.substring(1) + "\n");
		}
		w.close();
		r.close();
		chat.delete();
		tmp.renameTo(chat);
	}
	
	int getLastMNumber() throws FileNotFoundException {
		File chat = new File("chat.txt");
		Scanner sc = new Scanner(chat);
		
		String str = null;
		while(true) {
			if(!sc.hasNextLine()) {
				sc.close();
				if(str == null)
					return 0;
				
				return Character.getNumericValue(str.charAt(0));
			} else {
				str = sc.nextLine();
			}
		}
	}

	void sendAll(String str) throws IOException {
		int i;
		for(i = 0; i < clients.size(); i++) {
			/* write to all clients */
			//Scanner in = new Scanner(new BufferedInputStream(clients.get(i).getInputStream())); 
			PrintWriter out = new PrintWriter(new BufferedOutputStream(clients.get(i).getOutputStream()));
			out.println(new String(enc.encode(str.getBytes())));
			out.flush();
		}
		
		try {
		    Files.write(Paths.get("chat.txt"), ((messageCount + " " + str + "\n")).getBytes(), StandardOpenOption.APPEND);
		    messageCount++;
		} catch (IOException e) {
		    System.out.println(e.getStackTrace());
		}
	}
	
	void sendAllFile(byte[] file, String name, String ifileName) throws IOException {
		int i;
		for(i = 0; i < clients.size(); i++) {
			/* write to all clients */
			//Scanner in = new Scanner(new BufferedInputStream(clients.get(i).getInputStream())); 
			if(!s.equals(clients.get(i))) {
				ObjectOutputStream fout = new ObjectOutputStream(new BufferedOutputStream(clients.get(i).getOutputStream()));
				fout.writeObject(new String(enc.encode(ifileName.getBytes())));
				fout.writeObject(enc.encode(file));
				fout.flush();
			}
		}
	}
	
	void send(String str) throws IOException {
		PrintWriter out = new PrintWriter(new BufferedOutputStream(s.getOutputStream()));
		out.println(new String(enc.encode(str.getBytes())));
		out.flush();
	}

	void printSocketInfo(Socket s) {
		System.out.print("Socket on Server " + Thread.currentThread() + " ");
		System.out.print("Server socket Local Address: " + s.getLocalAddress()
				+ ":" + s.getLocalPort());
		System.out.println("  Server socket Remote Address: "
				+ s.getRemoteSocketAddress());
	} // end of printSocketInfo
	
} // end of class ClientHandler