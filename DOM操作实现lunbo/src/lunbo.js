window.onload = function(){
	var container = document.getElementById("container");
	var photos = document.getElementById("photos");
	var buttons = document.getElementById("buttons").getElementsByTagName("span");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var index = 1;
	var animated = false;
	var timer;

	function animate(offset){
		var animate = true;
		var newLeft = parseInt(photos.style.left) + offset;
		var time = 300;
		var interval = 10;
		var speed = offset/(time/interval);
		function go(){
			if((speed < 0 && parseInt(photos.style.left) > newLeft) 
				|| (speed >0 && parseInt(photos.style.left) < newLeft))
			{
				photos.style.left = parseInt(photos.style.left) + speed + "px";
				setTimeout(go,interval);
			}
			else
			{
				animated = false;
				photos.style.left = newLeft + "px";
				if(newLeft > -700)
				{
					photos.style.left = -3500 + "px";
				}
				if(newLeft < -3500)
				{
					photos.style.left = -700 + "px";
				}
			}
		}	
		go();
	}
	function showButtons(){
		for(var i = 0; i < buttons.length; i++)
		{
			if(buttons[i].className == "on")
			{
				buttons[i].className = "";
				break;
			}
		}
		buttons[index-1].className = "on";
	}
	next.onclick = function(){
		if(index == 5)
		{
			index = 1;
		}
		else{
			index += 1;
		}
		showButtons();
		if(!animated)
		{
			animate(-700);
		}
	};
	prev.onclick = function(){
		if(index == 1)
		{
			index = 5;
		}
		else{
			index -= 1;
		}
		showButtons();
		if(!animated)
		{
			animate(700);
		}
	};

	for(var i = 0; i < buttons.length; i++)
	{
		buttons[i].onclick = function(){
			if(this.className == "on"){
				return;
			}
			var myIndex = parseInt(this.getAttribute("index"));
			var offset = -700 * (myIndex - index); 
			index = myIndex;
			showButtons();
			if(!animated){
				animate(offset);
			}
		}
	}
	function play(){
		timer = setInterval(function(){
			next.onclick();
		},2000);
	}
	function stop(){
		clearInterval(timer);
	}

	container.onmouseover  = stop;
	container.onmouseout = play;

	play();
}