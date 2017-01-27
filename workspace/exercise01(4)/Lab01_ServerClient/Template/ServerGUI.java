//package lab3;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.ScrollPaneConstants;
import javax.swing.border.EmptyBorder;

public class ServerGUI extends JFrame
{
	private JPanel contentPane;
	private JTextField textField,textField2;
	private JTextArea chatArea;
	private String username = "Admin";
	
	private volatile boolean newMessage = false; 
	private String message;

	/**
	 * Create the frame.
	 */
	public ServerGUI()
	{
		setTitle("Server");
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
		
		JLabel lblMessage2 = new JLabel("Delete Message");
		lblMessage2.setBounds(14, 199, 164, 14);
		contentPane.add(lblMessage2);
		
		textField2 = new JTextField();
		textField2.setBounds(107, 199, 114, 17);
		contentPane.add(textField2);
		textField2.setColumns(10);
		
		JButton btnSend2 = new JButton("Delete");
		btnSend2.setBounds(228, 199, 89, 23);
		contentPane.add(btnSend2);
		//when btnsend pressed, send the message
		btnSend.addActionListener(new ActionListener()
		{
			
			@Override
			public void actionPerformed(ActionEvent e)
			{
				
			}
		});
		btnSend2.addActionListener(new ActionListener()
		{
			
			@Override
			public void actionPerformed(ActionEvent e)
			{
				
				
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
					
				}
					
			}
		});
		textField2.addKeyListener(new KeyListener() 
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
		//poll for a new message
		while(!newMessage)
		{
			try
			{
				Thread.sleep(1);
			} catch (InterruptedException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		//new message 
		newMessage = false;
		return message;
	}
	
	public void recieveMessage(String message)
	{
		//new message received 
		EventQueue.invokeLater(new Runnable()
		{
			
			@Override
			public void run()
			{
				//update the text area
				chatArea.append(message);
				revalidate();				
			}
		});
	}
}
