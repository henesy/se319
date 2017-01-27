//package lab3;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JLabel;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JTextField;
import javax.swing.JButton;

public class Login extends JFrame {

	private JPanel contentPane;
	private JTextField nameField;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Login frame = new Login();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public Login() {
		setTitle("Login Page");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 279, 271);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JLabel lblNewLabel = new JLabel("Client");
		lblNewLabel.setFont(new Font("Tahoma", Font.BOLD, 26));
		lblNewLabel.setBounds(10, 42, 97, 40);
		contentPane.add(lblNewLabel);
		
		JLabel lblEnterYourName = new JLabel("Enter Your Name");
		lblEnterYourName.setFont(new Font("Tahoma", Font.PLAIN, 14));
		lblEnterYourName.setBounds(10, 108, 117, 17);
		contentPane.add(lblEnterYourName);
		
		nameField = new JTextField();
		nameField.setBounds(10, 136, 117, 17);
		contentPane.add(nameField);
		nameField.setColumns(10);
		
		JButton loginButton = new JButton("Login");
		loginButton.setBounds(10, 164, 89, 23);
		contentPane.add(loginButton);
		
		//when the button is pressed, send the name to the client application and connect to the server
		loginButton.addActionListener(new ActionListener()
		{
			
			@Override
			public void actionPerformed(ActionEvent e)
			{
				String name = nameField.getText();
				
				EventQueue.invokeLater(new Runnable() 
				{
					public void run() 
					{
						try
						{
							Client client = new Client("localhost", name, 1222);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				});
				
				//dispose of this login page
				dispose();
				
			}
		});
	}
}
