var io = require('socket.io').listen(5000);

var users = new Array();
var posts = new Array();
var found = false;

io.sockets.on('connection', function(socket) {
  socket.on('login', function(nuser, npass) {
    console.log(nuser + npass); 
	for(var i=0; i<users.length; i++){
		if(users[i].username == nuser && users[i].pass == npass){
			found = true;
			break;
		}
	}
	if(found){
		socket.emit('log', nuser);
	} else{
		socket.emit('log', "Fail!");
	}
	found = false;
  });
  
  socket.on('reg', function(nuser, npass) {
	users.push({username:nuser, pass:npass, online:new Date().getTime()});
    console.log("Registered: "+nuser +" "+ npass); 
	socket.emit('regr', "Sucess!");
  });
  
  socket.on('posts', function(nuser) {
    var interval = setInterval( function() {
        socket.emit('rposts', posts, users);
    }, 1000);
  });
  
  socket.on('addpost', function(nuser, ntitle, ndesc) {
    posts.push({username:nuser, title:ntitle, desc:ndesc, t:new Date().getTime(), id:Math.random()});
	console.log("added post: "+ ntitle);
  });
  
  socket.on('dpost', function(nid) {
	  console.log("deleting: "+ nid);
	 for(var i=0; i<posts.length; i++){
		if(posts[i].id == nid){
			posts.splice(i,1);
			break;
		}
	}
  });
  
  socket.on('epost', function(nid, ntitle, ndesc) {
	 for(var i=0; i<posts.length; i++){
		if(posts[i].id == nid){
			posts[i].time = new Date().getTime();
			posts[i].title = ntitle;
			posts[i].desc = ndesc;
			break;
		}
	}
  });
  
  socket.on('online', function(nuser) {
	 for(var i=0; i<users.length; i++){
		if(users[i].username == nuser){
			users[i].online = new Date().getTime();
			break;
		}
	}
  });
  
});
