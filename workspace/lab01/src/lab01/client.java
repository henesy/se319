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
import java.nio.file.Files;
import java.util.Base64;
import java.util.Scanner;

public class client {
	private String name;
	private boolean textMode;
	Base64.Encoder enc;
	Base64.Decoder dec;
	
	public client() {
		name = "nil";
		textMode = true;
	}
	
	public void start() throws UnknownHostException,
	IOException {
	enc = Base64.getEncoder();;
	dec = Base64.getDecoder();
		
	Scanner in = new Scanner(System.in);
	System.out.print("Desired name?: ");
	name = in.nextLine();
	System.out.println("Using username " + name);
		
	// 1. CONNECT TO THE SERVER AT PORT 4444 
	Socket socket = new Socket("localhost", 4444);
	printSocketInfo(socket);
	
	
	//!!! need thread to read and print (Even if typing)
	
	Thread t = new Thread(new ServerHandler(socket, name));
	t.start();
	
	String input = null;
	PrintWriter out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()));
	
	//file send stuff
	ObjectOutputStream fout = new ObjectOutputStream(new BufferedOutputStream(socket.getOutputStream()));
	File file = null;
	//fin.writeObject(file);
	
	out.println(new String(enc.encode(name.getBytes())));
	
	while(true) {
		//System.out.print("[" + name +  "]" + "> ");
		boolean admin = name.equals("admin");
		if(!admin)
			System.out.println("Enter one of the following (int)...\n1. send text\n2. send image file");
		else
			System.out.println("Enter one of the following (int)...\n1. send text to all clients\n2. List messages so far (chat.txt)\n3. Delete a given (int) line from chat.txt\n");
			
		input = in.nextLine();
		int sel = 1;
		Scanner tmp = new Scanner(input);
		if(tmp.hasNextInt())
			sel = tmp.nextInt();
		//int sel = in.nextInt();
		if(sel < 2)
			input = in.nextLine();
		else if(!admin) {
			System.out.print("path?: ");
			input = in.nextLine();
		}
		
		if(admin && sel != 1) {
			if(sel == 2) {
				input = "!list";
			} else {
				int num = 0;
				System.out.print("Message number?: ");
				num = in.nextInt();
				input = "!del " + num;
			}
		} else {
			if(sel == 2)
				textMode = false;
			else
				textMode = true;	
		}
		
		
		
		if(input.compareTo("!quit") == 0)
			break;
		
		if((input.contains("!file") || sel == 2) && !admin) {
			//enter file mode
			System.out.println("Entered FILE mode!");
			out.println(new String(enc.encode("!file".getBytes())));
			textMode = false;
		} else if(input.contains("!text")) {
			//enter text mode 
			System.out.println("Entered TEXT mode!");
			out.println(new String(enc.encode("!text".getBytes())));
			textMode = true;
		} 
		out.flush();
		
		//write text or file, depending
		if(textMode)
			out.println(new String(enc.encode(input.getBytes())));
		else {
			//attempt to open file from path
			file = new File(input);
			String fileName = file.getName();
			System.out.println("Sending " + file.getName());
			byte[] ofile = Files.readAllBytes(file.toPath());
			fout.writeObject(new String(enc.encode(fileName.getBytes())));
			fout.writeObject(enc.encode(ofile));
			fout.flush();
			textMode = true;
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
	private String name;
	Base64.Encoder enc;
	Base64.Decoder dec;
	
	public ServerHandler(Socket s, String n) {
		socket = s;
		name = n;
		
		//set up dec and enc
		enc = Base64.getEncoder();;
		dec = Base64.getDecoder();
	}
	
	public synchronized void run() {
		boolean textMode = true;
		boolean first = true;
		System.out.println("Entered the read loop!");
		while(true) {
			Scanner in = null;
				if(textMode) {
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
						b = new String(dec.decode(b));
						System.out.println(b);
						if(b.contains("FILE") && !b.contains(name))
							textMode = false;
					}
					try {
						Thread.sleep(100);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				} else {
					System.out.println("Waiting to read a file...");
					ObjectInputStream fin = null;
					try {
						fin = new ObjectInputStream(new BufferedInputStream(socket.getInputStream()));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					byte[] ifile = null;
					String ifileName = null;
					try {
						ifileName = new String(dec.decode((String) fin.readObject()));
						ifile = dec.decode((byte[]) fin.readObject());
					} catch (ClassNotFoundException | IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					File file = new File(ifileName);
					try {
						Files.write(file.toPath(), ifile);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					 
					System.out.println("Got file: " + ifileName + " at: " + file.getAbsolutePath());
					
					textMode = true;
				}
		}
	}
}
