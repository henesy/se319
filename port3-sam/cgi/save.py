#!/usr/bin/env python3

import cgi, cgitb, os, json

cgitb.enable()

mainDir = '/srv/www/port3/files/'
function = os.environ["REQUEST_URI"].split("/")

if len(function)>=3:

    form = cgi.FieldStorage()
    with open(mainDir+'data.txt', 'r') as outfile:
        playlists = json.load(outfile)
    if len(function)>5:
        redirectURL = "http://raspi.student.iastate.edu/cgi/playlists.py/"+ function[3]
        if function[4]== "u":
            index = int(function[5])
            if int(function[5])==0:
                playlists[function[3]] = playlists[function[3]][1:] + playlists[function[3]][:1]
            else:
                temp = (playlists[function[3]])[index]
                (playlists[function[3]])[index] = (playlists[function[3]])[index-1]
                (playlists[function[3]])[index-1] = temp
        elif function[4]== "d":
            index = int(function[5])
            if int(function[5])==len(playlists[function[3]])-1:
                playlists[function[3]] = playlists[function[3]][-1:] + playlists[function[3]][:-1]
            else:
                temp = (playlists[function[3]])[index]
                (playlists[function[3]])[index] = (playlists[function[3]])[index+1]
                (playlists[function[3]])[index+1] = temp
        else:
            i = 0
            for s in playlists[function[3]]:
                if i==int(function[5]):
                    del (playlists[function[3]])[i]
                i=i+1;
    elif len(function)>=5:
        redirectURL = "http://raspi.student.iastate.edu/cgi/playlists.py/"+ function[3]
        fileitem = form['filename']
        fn = os.path.basename(fileitem.filename)
        directory = mainDir + function[3] + '/'
        if not os.path.exists(directory):
            os.makedirs(directory)
        open(directory + fn, 'wb').write(fileitem.file.read())
        playlists.setdefault(function[3], []).append(fn)
    else:
        playlists.setdefault(form.getvalue('pid'), [])
        redirectURL = "http://raspi.student.iastate.edu/cgi/playlists.py/"+ form.getvalue('pid')

    with open(mainDir+'data.txt', 'w') as outfile:
        json.dump(playlists, outfile)

    print ("Location: " + redirectURL)
    print ("Content-type:text/html\r\n\r\n")
else:
    print ("Content-type:text/html\r\n\r\n")
    print("no playlist specified")
