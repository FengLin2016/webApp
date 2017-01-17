/* 饼图组件对象 */
var H5ComponentPie = function(name, cfg){
 	var component = new H5ComponentBase(name, cfg);

 	var w = cfg.width/2;
 	var h = cfg.height/2;

 	var cns = document.createElement('canvas');
 	var ctx = cns.getContext('2d');
 	component.append(cns);
 	cns.width = ctx.width =w;
 	cns.height = ctx.height = h;
 	var step = cfg.data.length;
 	$(cns).css('zIndex',1);
 	//背景层
 	var r=w/2;
 	ctx.arc(r,r,r,0,2*Math.PI);
 	ctx.fillStyle="#d2d2d2";
 	ctx.fill();


 	//数据层
 	var sAnger = 1.5*Math.PI;
 	var aAnger = (2*Math.PI);
 	var cns = document.createElement('canvas');
 	var ctx = cns.getContext('2d');
 	var color = ['red','green','blue','gray','yellow','#4f3905','#14722a'];
 	$(cns).css('zIndex',2);
 	component.append(cns);
 	cns.width = ctx.width =w;
 	cns.height = ctx.height = h;

 	for (var i = 0; i < step; i++) {
 		var eAnger = sAnger + aAnger * cfg.data[i][1];
 		ctx.beginPath();
 		ctx.moveTo(r,r);
 		ctx.arc(r,r,r-1,sAnger,eAnger);
 		ctx.fillStyle = cfg.data[i][2]?cfg.data[i][2]:color[i];
 		ctx.fill();
 		sAnger = eAnger;

 		//文本信息
 		var text = $('<div class="text"></div>');
 		text.text(cfg.data[i][0]);
 		
 		var rad  = (2*Math.PI/360)*(360/step)*i;
 		var x = r+Math.sin(rad)*r;
 		var y = r+Math.cos(rad)*r;

 		if(x<(w/2)){
	 		text.css('right',(w-x));
	 	}else{
	 		text.css('left',x);
	 	}
	 	
	 	if(y<h/2){
	 		text.css('bottom',(h-y));	
	 	}else{
	 		text.css('top',y);
	 	}
	 	
	 	text.css('transition','all 0.5s '+(1+i*0.5)+'s');
 		component.append(text);
 	}
 	
 	//遮罩层
 	var cns = document.createElement('canvas');
 	var ctx = cns.getContext('2d');
 	component.append(cns);
 	$(cns).css('zIndex',3);
 	cns.width = ctx.width =w;
 	cns.height = ctx.height = h;
 	ctx.lineWidth = 1;
 	ctx.fillStyle = '#eee';
 	ctx.strokeStyle = '#eee';
	//遮罩层动画
 	function animatepie(per){
	 	ctx.clearRect(0,0,w,h);
	 	ctx.beginPath();
	 	ctx.moveTo(r,r);
	 	if(per<=0){
	 		ctx.arc(r,r,r,0,2*Math.PI);
	 	}else{
	 		ctx.arc(r,r,r,sAnger,sAnger+2*Math.PI*per,true);
	 	}
	 	ctx.fill();
 	}

 	animatepie(0);

 	component.on('onLoad',function(){
 		var per = 0;
 		setTimeout(function(){
 			var t = setInterval(function(){
		 		per=per+0.01;
		 		animatepie(per);
		 		if(per>=1){
		 			clearInterval(t);
		 		}
		 	},10)
 		},500)
	 	
 	});

 	component.on('onLeave',function(){
 		var per = 1;
	 	var t = setInterval(function(){
	 		per=per-0.01;
	 		animatepie(per);
	 		if(per<=0){
	 			clearInterval(t);
	 		}
	 	},10)
 	});
 	
 	
 	return component;
 }










