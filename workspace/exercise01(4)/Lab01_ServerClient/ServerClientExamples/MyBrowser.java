import java.awt.BorderLayout;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

import javax.swing.JButton;
import javax.swing.JEditorPane;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.SwingUtilities;


public class MyBrowser {

		public static void main(String args[]) throws UnknownHostException, IOException {

			// HERE WE PUT THE WHOLE JFRAME CREATION ITSELF ONTO THE
			// EVENT QUEUE BY USING INVOKE LATER

			Runnable runner = new Runnable() {
				public void run() {
					createJFrame();
				}	
			};
			
			
			SwingUtilities.invokeLater(runner);
			
			// ENTER URL
			textArea.setLineWrap(true);
			while (true) {
				Scanner in = new Scanner(System.in);

				System.out.print("Please enter site without http: "); 
				String s = in.nextLine();
				System.out.print("Please enter port no:"); 
				int portNum = in.nextInt();

				
				// connect to the site
				Socket socket = new Socket(s, portNum);
				
				// SEND GET MESSAGE
				PrintWriter out = new PrintWriter(socket.getOutputStream());
				out.println("GET / HTTP/1.1\n\n");
				out.flush(); // makes sure data is sent over.

				in = new Scanner(socket.getInputStream());
				while (in.hasNextLine()) {
					String msg = in.nextLine();
					textArea.append(msg+"\n");
					System.out.println(msg);
				}
				in.close();
				
			}

		}
		
		static JTextArea textArea = new JTextArea();
		
		static void createJFrame() {
			// CREATE A NEW JFRAME
					JFrame frame = new JFrame("Title");
					frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
					frame.add(new JScrollPane(textArea), BorderLayout.CENTER);
					frame.setSize(600, 600);
					frame.setVisible(true);
		}

}
