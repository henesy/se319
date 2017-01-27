//package lab3;

import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JTextArea;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.ScrollPaneConstants;
import javax.swing.JButton;
import javax.swing.JScrollBar;
import javax.swing.JScrollPane;
import java.awt.Font;
import java.awt.Color;

public class ChatGUI extends JFrame
{

	private JPanel contentPane;
	private JTextField textField;
	private JTextArea chatArea;
	
	private volatile boolean newMessage = false; 
	private String message;

	/**
	 * Create the frame.
	 */
	public ChatGUI(String username)
	{
		setTitle("Client");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 450, 300);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		chatArea = new JTextArea();
		chatArea.setForeground(Color.BLACK);
		chatArea.setFont(new Font("Tahoma", Font.PLAIN, 13));
		chatArea.setEnabled(false);
		chatArea.setBounds(19, 33, 167, 108);
		chatArea.setLineWrap(true);
		contentPane.add(chatArea);
		
		JLabel lblMessage = new JLabel("Message");
		lblMessage.setBounds(24, 172, 64, 14);
		contentPane.add(lblMessage);
		
		textField = new JTextField();
		textField.setBounds(77, 169, 114, 17);
		contentPane.add(textField);
		textField.setColumns(10);
		
		JButton btnSend = new JButton("Send");
		btnSend.setBounds(218, 168, 89, 23);
		contentPane.add(btnSend);
		
		//when btnsend pressed, send the message
		btnSend.addActionListener(new ActionListener()
		{
			
			@Override
			public void actionPerformed(ActionEvent e)
			{
				// TODO Set format of message and do some action to send it.
				
				
			}
		});
		
		//allow for hitting enter to send a chat message
		textField.addKeyListener(new KeyListener() 
		{
			
			@Override
			public void keyTyped(KeyEvent e) 
			{
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void keyReleased(KeyEvent e) 
			{
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void keyPressed(KeyEvent e) 
			{
				if(e.getKeyCode() == KeyEvent.VK_ENTER)
				{
					// TODO when user press Enter the message should be submit.
					
					
				}
					
			}
		});
		
		JScrollPane scrollBar = new JScrollPane(chatArea);
		scrollBar.setLocation(24, 32);
		scrollBar.setSize(186,102);
		scrollBar.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);
		contentPane.add(scrollBar);
	}
	
	public String getMessage()
	{
		// TODO poll for a new message
		
		return message;
	}
	
	public void recieveMessage(String message)
	{
		// TODO new message received append message to chatArea
	
	}
}
