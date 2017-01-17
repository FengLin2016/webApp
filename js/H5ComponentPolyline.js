/* 柱图组件对象 */
 var H5ComponentPolyline = function(name, cfg){
 	var component = new H5ComponentBase(name, cfg);

 	var w = cfg.width/2;
 	var h = cfg.height/2;

 	var cns = document.createElement('canvas');
 	var ctx = cns.getContext('2d');
 	component.append(cns);
 	cns.width = ctx.width =w;
 	cns.height = ctx.height = h;

 	//设值名称
 
 	
 	//水平线
 	var step = 10;
 	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle='#aaa';
 	for (var i = 0; i < step+1; i++) {
 		var y = (h/step)*i;
 		ctx.moveTo(0,y);
 		ctx.lineTo(w,y);
 	}

 	step = cfg.data.length;
 	//竖线
 	for (var i = 0; i < step+2; i++) {
 		var x = (w/(step+1))*i;
 		ctx.moveTo(x,0);
 		ctx.lineTo(x,h);
 		if(cfg.data[i]){
 			var text = $("<div class='text'></div>");
 			text.text(cfg.data[i][0]);
 			text.css({left:x,bottom:"-20px",width:(w/(step+1)),marginLeft:(w/(step+1))/2});
 			component.append(text);
 		}
 	}
 	ctx.stroke();

 	//数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');

	component.append(cns);
 	cns.width = ctx.width =w;
 	cns.height = ctx.height = h;

 	function animatePoly(ctx,per){
	 	ctx.clearRect(0,0,w,h);
	 	//画点
	 	ctx.beginPath();
	 	ctx.lineWidth = 1;
		ctx.strokeStyle='#ff8878';
	 	//点
	 	var x = y =0 ;
	 	for( i in cfg.data){
	 		x = (w/(cfg.data.length+1))*i+(w/(cfg.data.length+1));
	 		y = h*(1-cfg.data[i][1]*per);
	 		ctx.moveTo(x,y);
	 		ctx.arc(x,y,3,0,2*Math.PI);
	 		cfg.data[i][2] && (ctx.fillStyle = cfg.data[i][2]);
	 		ctx.fillText(cfg.data[i][1],x-8,y-10);
	 	}
	 	ctx.moveTo((w/(cfg.data.length+1)),h*(1-cfg.data[0][1]*per));
	 	for( i in cfg.data){
	 		x = (w/(cfg.data.length+1))*i+(w/(cfg.data.length+1));
	 		y = h*(1-cfg.data[i][1]*per);
	 		ctx.lineTo(x,y);
	 	}
	 	ctx.stroke();
	 	
	 	//绘制阴影
	 	ctx.lineTo(x,h);
	 	ctx.lineTo(w-x,h);
	 	ctx.fillStyle="rgba(255, 136, 120, 0.5)";
	 	ctx.fill();
 	}

 	component.on('onLoad',function(){
 		var per = 0;
 		setTimeout(function(){
 			var t = setInterval(function(){
		 		per=per+0.01;
		 		animatePoly(ctx,per);
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
	 		animatePoly(ctx,per);
	 		if(per<=0){
	 			clearInterval(t);
	 		}
	 	},10)
 	});
 	
 	
 	return component;
 }
