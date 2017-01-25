package lab01;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.Scanner;

public class primary {
	public static void main(String[] args) throws UnknownHostException, IOException {
		Scanner in = new Scanner(System.in);
		
		System.out.println("Team 20 server client chat server.\n!quit will exit the program.\n!file will enter file mode\n!text will enter text mode (default)\nFile mode takes a file path as a \"message\"");
		System.out.printf("Client or Server? [c/s]: ");
		String mode = in.nextLine();
		if(mode.contains("c")) {
			client c = new client();
			c.start();
		} else {
			server s = new server();
			s.start();
		}
		
		in.close();
	}
}
