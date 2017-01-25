// GOALS
//
// 1. to show sample Server code
// Note that the server is running on LOCALHOST (which is THIS computer) and the 
// port number associated with this server program is 4444.
// The accept() method just WAITS until some client program tries to access this server
//
// 2. to show how a thread is created to handle client request
//

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class ListServer {

	public static void main(String[] args) throws IOException {

		ServerSocket serverSocket = null;  // 1. serversocket
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
		while (true) { // 3.
			Socket clientSocket = null;
			try {

				// 2.1 WAIT FOR CLIENT TO TRY TO CONNECT TO SERVER
				System.out.println("Waiting for client " + (clientNum + 1)
						+ " to connect!");
				clientSocket = serverSocket.accept(); // // 4.

				// 2.2 SPAWN A THREAD TO HANDLE CLIENT REQUEST
				System.out.println("Server got connected to a client"
						+ ++clientNum);
				Thread t = new Thread(new ListClientHandler(clientSocket, clientNum));
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

class ListClientHandler implements Runnable {
	Socket s; // this is socket on the server side that connects to the CLIENT
	int num; // keeps track of its number just for identifying purposes

	ListClientHandler(Socket s, int n) {
		this.s = s;
		num = n;
	}

	// This is the client handling code
	// This keeps running handling client requests 
	// after initially sending some stuff to the client
	public void run() { 
		Scanner in;
		PrintWriter out;
		
		try {
			// 1. GET SOCKET IN/OUT STREAMS
			in = new Scanner(new BufferedInputStream(s.getInputStream())); 
			out = new PrintWriter(new BufferedOutputStream(s.getOutputStream()));
	
			// 2. PRINT SOME STUFF TO THE CLIENT
			out.println("print Hello There");
			out.println("print You get three wishes!");
			out.flush(); // force the output
			
			// 3. KEEP LISTENING AND RESPONDING TO CLIENT REQUESTS
			int count = 1;
			while (count <= 3) {
				System.out.println("Server - waiting to read");
				String s = in.nextLine();
				handleRequest(s);
				count++;
			}
			out.println("exit done with wishes");
			out.flush();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		// This handling code dies after doing all the printing
	} // end of method run()
	
	void handleRequest(String s) {
		System.out.println("server side: " + s);
	}

} // end of class ClientHandler
