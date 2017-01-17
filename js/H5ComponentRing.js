/* 环图组件对象 */
var H5ComponentRing = function(name, cfg){
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
 	ctx.fillStyle="#eee";
 	ctx.fill();


 	//数据层
 	var sAnger = 1.5*Math.PI;
 	var aAnger = (2*Math.PI);
 	var cns = document.createElement('canvas');
 	var ctx = cns.getContext('2d');
 	$(cns).css('zIndex',2);
 	component.append(cns);
 	cns.width = ctx.width =w;
 	cns.height = ctx.height = h;

 	
	var eAnger = sAnger + aAnger * cfg.data[0][1];
	ctx.beginPath();
	ctx.moveTo(r,r);
	ctx.arc(r,r,r-1,sAnger,eAnger);
	ctx.fillStyle = cfg.data[0][2]?cfg.data[0][2]:'#d2d2d2';
	ctx.fill();

	//文本信息
	var text = $('<div class="text"></div>');
	text.html(cfg.data[0][0]+'<br />'+cfg.data[0][1]*100+'%');
	text.css('transition','all 0.5s 1s');
	component.append(text);


 	//遮罩层
 	var cns1 = document.createElement('canvas');
 	var ctx1 = cns1.getContext('2d');
 	component.append(cns1);
 	$(cns1).css('zIndex',3);
 	cns1.width = ctx1.width =w;
 	cns1.height = ctx1.height = h;
 	ctx1.lineWidth = 1;
 	ctx1.fillStyle = '#eee';
 	ctx1.strokeStyle = '#eee';
	//遮罩层动画
 	function animatepie(per){
	 	ctx1.clearRect(0,0,w,h);
	 	ctx1.beginPath();
	 	ctx1.moveTo(r,r);
	 	if(per<=0){
	 		ctx1.arc(r,r,r,0,2*Math.PI);
	 	}else{
	 		ctx1.arc(r,r,r,sAnger,sAnger+2*Math.PI*per,true);
	 	}
	 	ctx1.fill();
 	}

 	
 	//中间遮罩层
 	var cns = document.createElement('canvas');
 	var ctx = cns.getContext('2d');
 	component.append(cns);
 	$(cns).css('zIndex',4).css('border-radius','50%').css({top:'10%',left:'10%'});
 	cns.width = ctx.width =w*0.8;
 	cns.height = ctx.height = h*0.8;
 	ctx.lineWidth = 1;
 	ctx.fillStyle = '#fff';
 	ctx.strokeStyle = '#fff';
	ctx.arc( (w*0.8)/2, (w*0.8)/2, (w*0.8)/2,sAnger,sAnger+2*Math.PI);
	ctx.fill();


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










