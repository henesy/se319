package lab01;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

public class client {
	private String name;
	private boolean textMode;
	
	public client() {
		name = "nil";
		textMode = true;
	}
	
	public void start() throws UnknownHostException,
	IOException {
	
	Scanner in = new Scanner(System.in);
	System.out.print("Desired name?: ");
	name = in.nextLine();
	System.out.println("Using username " + name);
		
	// 1. CONNECT TO THE SERVER AT PORT 4444 
	Socket socket = new Socket("localhost", 4444);
	printSocketInfo(socket);
	
	
	//!!! need thread to read and print (Even if typing)
	
	Thread t = new Thread(new ServerHandler(socket));
	t.start();
	
	String input = null;
	PrintWriter out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()));
	
	//file send stuff
	ObjectOutputStream fout = new ObjectOutputStream(new BufferedOutputStream(socket.getOutputStream()));
	File file = null;
	//fin.writeObject(file);
	
	out.println(name);
	
	while(true) {
		//System.out.print("[" + name +  "]" + "> ");
		input = in.nextLine();
		if(input.compareTo("!quit") == 0)
			break;
		
		if(input.contains("!file")) {
			//enter file mode
			System.out.println("Entered FILE mode!");
			textMode = false;
		} else if(input.contains("!text")) {
			//enter text mode 
			System.out.println("Entered TEXT mode!");
			textMode = true;
		} else {
			//write text or file, depending
			if(textMode)
				out.println(input);
			else {
				//attempt to open file from path
				file = new File(input);
				fout.writeObject(file);
			}
		}
		out.flush();
	}
	
	System.out.println("Goodbye!");
	/*
	// 2. WRITE A MESSAGE TO THE SOCKET TO SEND TO THE SERVER
	PrintWriter out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()));
	out.print("Client socket Local Address: " + socket.getLocalAddress() + ":" + socket.getLocalPort());
	out.println("  Client socket Remote Address: " + socket.getRemoteSocketAddress());
	out.flush(); // forces data from buffer to be sent to server
	*/
	
	// client dies here
	
	}
	
	static void printSocketInfo(Socket s) {
	System.out.print("Socket on Client Side: ");
	System.out.print("Local Address: " + s.getLocalAddress() + ":"
			+ s.getLocalPort());
	System.out.println("  Remote Address: " + s.getRemoteSocketAddress());
	}
}

class ServerHandler implements Runnable {
	private Socket socket;
	
	public ServerHandler(Socket s) {
		socket = s;
	}
	
	public synchronized void run() {
		boolean first = true;
		System.out.println("Entered the read loop!");
		while(true) {
			Scanner in = null;
			try {
				in = new Scanner(new BufferedInputStream(socket.getInputStream()));
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} 
			if(first) {
				in.nextLine();
				first = false;
			}
			if(in.hasNextLine()) {
				String b = in.nextLine();
				System.out.println(b);
			}
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
