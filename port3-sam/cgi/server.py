#!/usr/bin/env python3

import os, time, json, shutil

mainDir = '/srv/www/port3/files/'

#delete existing files:
filelist = [ f for f in os.listdir(mainDir) if not f.endswith(".txt") ]
for f in filelist:
    shutil.rmtree(mainDir+f)

#create the json playlists file
with open(mainDir+'data.txt', 'w') as outfile:
    json.dump({}, outfile)
