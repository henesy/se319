#!/usr/bin/env python3

import cgi, cgitb, os, time, json, shutil
cgitb.enable()
mminDir = '/srv/www/port3/'
mainDir = '/srv/www/port3/files/'

#this need to be here:
print ("Content-type: text/html\n\n")

function = os.environ["REQUEST_URI"].split("/")

#load the json playlists file
with open(mainDir+'data.txt', 'r') as outfile:
    playlists = json.load(outfile)

#load the songs html file
with open(mminDir+'index.html', 'r') as index:
    hsong=index.read()

#load the playlist html file
with open(mminDir+'view.html', 'r') as index:
    hplay=index.read()


if len(function)>=4:
    hsong = hsong.replace("$ID", function[3])

    songs = ""
    songo = ""
    i = 0
    for song in playlists[function[3]]:
        songo += "'/files/"+function[3]+"/"+song+"',"
        songs += "<br><a class='song' id='"+str(i)+"'>"+song+"</a>"
        songs += " <input type='button' class='delete' id='"+str(i)+"' value='delete' /> "
        songs += " <input type='button' class='up' id='"+str(i)+"' value='+' /> "
        songs += " <input type='button' class='down' id='"+str(i)+"' value='-' /> "
        i = i+1;
    hsong = hsong.replace("$BODY", songs)
    songo = songo[:-1]
    hsong = hsong.replace("$SONGS", songo)
    print(hsong)
else:
    lists = "Playlists: "
    for key in playlists.keys():
        lists += "<p class='playlist' id='"+key+"'>"+key+"</p>"
    hplay = hplay.replace("$BODY", lists)
    print(hplay)
