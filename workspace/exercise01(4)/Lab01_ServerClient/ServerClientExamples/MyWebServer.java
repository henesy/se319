import java.io.IOException;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class MyWebServer {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub

		ServerSocket serverSocket = null;
		int clientNum = 0;

		try {
			serverSocket = new ServerSocket(4444); // provide MYWEBSERVICE at port 4444
			System.out.println(serverSocket);
		} catch (IOException e) {
			System.out.println("Could not listen on port: 4444");
			System.exit(-1);
		}

		// LOOP FOREVER - SERVER IS ALWAYS WAITING TO PROVIDE SERVICE!
		while (true) {
			Socket clientSocket = null;
			try {
				//System.out.println("Waiting for client " + (clientNum+1) +" to connect!");
				clientSocket = serverSocket.accept();
				//System.out.println("Server got connected to a client" + ++clientNum);
				Thread t = new Thread(new WebClient(clientSocket, clientNum));
				t.start();
			} catch (IOException e) {
				System.out.println("Accept failed: 4444");
				System.exit(-1);
			}
			
			
			

		}

	}
	
} // end of class

class WebClient implements Runnable  {
	Socket s; int num;
	WebClient (Socket s, int n) { this.s = s; num = n; }
	
	public void run() {
		printSocket(s);
		Scanner in;
		try {
			in = new Scanner(s.getInputStream());
			System.out.println("Server - handling client!");
			String readLine = in.nextLine(); // skip header line
			if (readLine.startsWith("GET")) {
				// return a simple text message
				PrintWriter out = new PrintWriter(s.getOutputStream());

				// return a header
				out.println("\nHTTP/1.1 200 OK");
				out.println("Content-Length: 100");
				out.println("Content-Type: text/html; charset=utf-8\n");
			
				// return the message
				out.println("<HTML>Hi there! \n\n</HTML>" );
				out.flush(); // makes sure data is sent over.

			}
			
			
			
			//System.out.println("Message from Client" +num + ":" + in.nextLine());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	void printSocket(Socket s ) {
		//System.out.print("Socket on Server " + Thread.currentThread() + " " );
		//System.out.print("Local Address: " + s.getLocalAddress() + ":" + s.getLocalPort());
		//System.out.println("  Remote Address: " + s.getRemoteSocketAddress());
	}
} // end of class
