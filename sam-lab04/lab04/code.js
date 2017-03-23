var width = $("#b1").width();
var height = $("#b2").height();

$(document).ready(function() {
	$("#div3").hide();
	$("#menter").hide();
	$("#mleave").hide();
	$("#mclick").hide();
	$("#mdclick").hide();
	$("#resized").hide();
	$("#div4").css("border", "1px solid blue");
	
	//borderfy
	$("#b3").click(function() {
		$("#p0").css("border", "1px solid black");
	});
	
	$("#b4").click(function() {
		$("#p0").css("background-color", "yellow");
	});
	
	//redify
	$("#b0").click(function() {
		$("#p0").css("color", "red");
	});
	
	//wideify
	$("#b1").click(function() {
		$("#b1").css("width", $("#b1").width()*2);
	});
	
	//heightify
	$("#b2").click(function() {
		$("#b2").css("height", $("#b2").height()*2);
	});
	
	//part 2
	
	//blinky!
	$("#b5").click(function() {
		$("#div0").hide( 500 );
	});
	
	//blinky!
	$("#b6").click(function() {
		$("#div3").show();
	});
	
	//fade in!
	$("#b7").click(function() {
		$("p").fadeIn(1250);
	});
	
	//fade out!
	$("#b8").click(function() {
		$("p").fadeOut(1250);
	});
	
	//i want to run away~
	$("#b9").click(function() {
		$("#b9").slideToggle(1250);
	});
	
	//part 3
	
	$("#div4").on({
	    mouseenter: function() {
	    	$("#menter").show();
	    	//$("#menter").hide(3000);
	    },
	    mouseleave: function() {
	    	$("#mleave").show();
	    	//$("#mleave").hide(3000);
	    },
	    click: function() {
	    	$("#mclick").show();
	    	//$("#mclick").hide(3000);
	    },
	    dblclick: function() {
	    	$("#mdclick").show();
	    	//$("#mclick").hide(3000);
	    }
	    /*
	    resize: function() {
	    	$("#resized").show();
	    	//$("#mclick").hide(3000);
	    }
	    */
	});
	
	$(window).resize(function() {
		$("#resized").show();
	 });
	
});
