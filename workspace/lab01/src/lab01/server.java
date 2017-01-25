package lab01;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Scanner;

public class server {
	private ArrayList<Socket> clients;
	
	public void start() throws IOException {

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

	ClientHandler(Socket s, int n, ArrayList<Socket> cl) {
		this.s = s;
		num = n;
		
		//import pointer for list of clients
		clients = cl;
	}

	// This is the client handling code ;; synchronized added, can be removed
	public synchronized void run() {
		printSocketInfo(s); // just print some information at the server side about the connection
		Scanner in;
		
		System.out.println(clients.toString());
		
		try {
			// 1. USE THE SOCKET TO READ WHAT THE CLIENT IS SENDING
			in = new Scanner(new BufferedInputStream(s.getInputStream())); 
			String name = in.nextLine();
			
			sendAll(name + " has connected");
			
			while(true) {
				String str = in.nextLine();
				
				//file receive logic here 
				if(str.contains("!file")) {
					 ObjectInputStream fin = new ObjectInputStream(new BufferedInputStream(s.getInputStream()));
					 File file = (File) fin.readObject();
					 
					 //write file here
				}
				
				System.out.println(name + ": " + str);
				sendAll(name + ": " + str);
			}
			
		} catch (IOException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		// This handling code dies after doing all the printing
	} // end of method run()
	
	void sendAll(String str) throws IOException {
		int i;
		for(i = 0; i < clients.size(); i++) {
			/* write to all clients */
			//Scanner in = new Scanner(new BufferedInputStream(clients.get(i).getInputStream())); 
			PrintWriter out = new PrintWriter(new BufferedOutputStream(clients.get(i).getOutputStream()));
			out.println(str);
			out.flush();
		}
	}

	void printSocketInfo(Socket s) {
		System.out.print("Socket on Server " + Thread.currentThread() + " ");
		System.out.print("Server socket Local Address: " + s.getLocalAddress()
				+ ":" + s.getLocalPort());
		System.out.println("  Server socket Remote Address: "
				+ s.getRemoteSocketAddress());
	} // end of printSocketInfo
	
} // end of class ClientHandler