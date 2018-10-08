Portfolio 3 for Group 20 (Sean Hinchee and Sam Westerlund)

Runs in:
* Dedicated Raspberry Pi
* Apache
* Python 3
* JavaScript

Tested on:
* Chrome

Run:
The pi should already be on. Might have to ssh in and perform operations:
  * sudo service apache2 restart

Perform this operation to clear the playlists:
  * sudo python /srv/www/port3/cgi/server.py

View and Edit:
* http://raspi.student.iastate.edu visit link
  * Click on playlist or song
  * Try and not use back button in browser as of now
* FTP
  * user: upload
  * passwd: raspberry
  * use Remote-FTP mod in atom to edit files
  * all edits should take effect immediately, no need to restart anything
* SSH
  * user: pi
  * passwd: raspberry
