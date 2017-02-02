import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFileChooser;

public class ChatClient {
	static Socket socket;

	public static void main(String[] args) throws UnknownHostException, IOException {
		JButton files = new JButton();
		System.out.println("Enter Name: ");
		Scanner sc = new Scanner(System.in);
		String name = sc.nextLine();
		
		// 1. CONNECT TO THE SERVER AT PORT 4444
		socket = new Socket("localhost", 4444);
		Thread t = new Thread(new ClientHandlers(socket, 0));
		t.start();
		printSocketInfo(socket);
		while (true) {

			if (!name.contains("admin")) {
				System.out.println("1. Send a text message to the server");
				System.out.println("2. Send an image file to the server");
				int choice = sc.nextInt();
				if (choice == 1) {
					sc.nextLine();
					String message = sc.nextLine();
					sendMessage(name, message, false);

				} else if (choice == 2) {
					// choose the file
					final JFileChooser fc = new JFileChooser();
					File selectedFile = null;
					fc.setCurrentDirectory(new File(System.getProperty("user.home")));
					fc.setDialogTitle("Select a file to upload");
					fc.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
					int result = fc.showOpenDialog(files);
					if (result == JFileChooser.APPROVE_OPTION) {
						selectedFile = fc.getSelectedFile();
					}

					// send the file
					ImageIcon img = new ImageIcon(ImageIO.read(selectedFile));
					ObjectOutputStream out1 = new ObjectOutputStream(socket.getOutputStream());
					out1.writeObject(img);
					out1.flush();
					out1.writeObject(name);
					out1.flush();
					out1.writeObject(selectedFile.getName());
					// out.println(Base64.getEncoder().encode(Files.readAllBytes(Paths.get(fc.getSelectedFile().getAbsolutePath()))));
					// out.println(Base64.getEncoder().encode(fc.getSelectedFile().toPath().toString().getBytes()));
					out1.flush();
				} else {
					break;
				}
			} else {
				System.out.println("1. Broadcast message to all clients");
				System.out.println("2. List messages so far");
				System.out.println("3. Delete a message");
				int choice = sc.nextInt();
				sc.nextLine();
				if (choice == 1) {

					String message = sc.nextLine();
					sendMessage(name, message, true);
				} else if (choice == 2) {
					printChat();
				} else if (choice == 3) {
					int line = sc.nextInt();
					delMes(line);
				} else {
					break;
				}
			}

		}
		// client dies here
		sc.close();
	}

	static void printChat() throws IOException {
		BufferedReader br = new BufferedReader(new FileReader("chat.txt"));
		try {
			StringBuilder sb = new StringBuilder();
			String line = br.readLine();
			int i = 0;
			while (line != null) {
				sb.append(i + " " + line);
				sb.append(System.lineSeparator());
				line = br.readLine();
				i++;
			}
			String everything = sb.toString();
			System.out.println(everything);
		} finally {
			br.close();
		}
	}

	static void delMes(int delLine) throws IOException {
		BufferedWriter writer = null;
		BufferedReader br = new BufferedReader(new FileReader("chat.txt"));
		StringBuilder sb = new StringBuilder();
		int i = 0;
		String line = br.readLine();
		try {
			while (line != null) {
				if (i != delLine) {
					sb.append(line + System.lineSeparator());
				}
				line = br.readLine();
				i++;
			}
			br.close();
			writer = new BufferedWriter(new FileWriter("chat.txt"));
			writer.write(sb.toString());
		} finally {
			writer.close();
		}
	}

	static void sendMessage(String name, String message, boolean all) throws IOException {
		ObjectOutputStream out1 = new ObjectOutputStream(socket.getOutputStream());
		out1.writeObject(name);
		out1.flush();
		out1.writeObject(message);
		out1.flush();
		out1.writeObject(all);
	}

	static void printSocketInfo(Socket s) {
		System.out.print("Socket on Client Side: ");
		System.out.print("Local Address: " + s.getLocalAddress() + ":" + s.getLocalPort());
		System.out.println("  Remote Address: " + s.getRemoteSocketAddress());
	}
}
