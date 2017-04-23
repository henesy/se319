import socket
import sys
from _thread import *

host = ''
port = 8080

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print("Socket initiated")

try:
	s.bind((host, port))
except socket.error as msg:
	print('Bind failed. Error Code :' + str(msg[0]) + ' Message ' + msg[1])
	sys.exit()

print("Socket bound")

s.listen(10)
print("Socket listening")


#Function for handling connections. This will be used to create threads
def clientthread(conn):
	req = conn.recv(1024).decode('utf8')
	req_method = req.split(' ')[0]
	print("Method: ", req_method)

	if "GET" in req_method:
		conn.send(bytes("HTTP/1.1 200 OK\r\n", "UTF-8"))
		conn.send(bytes("Content-Type: text/html\r\n", "UTF-8"))
		conn.send(bytes("Connection: close\r\n\r\n", "UTF-8"))
		conn.send(bytes("<html><h1>Test!</h1></html>", "UTF-8"))
		conn.close()


#now keep talking with the client
while 1:
    #wait to accept a connection - blocking call
    conn, addr = s.accept()
    print('Connected with ' + addr[0] + ':' + str(addr[1]))

    #start new thread takes 1st argument as a function name to be run, second is the tuple of arguments to the function.
    start_new_thread(clientthread ,(conn,))

s.close()

while 1:
	(conn, addr) = s.accept()
	print("Connected with " + addr[0] + ":" + str(addr[1]))

	#start new thread takes 1st argument as a function name to be run, second is the tuple of arguments to the function.
	start_new_thread(clientthread ,(conn,))

	conn.close()

s.close()
