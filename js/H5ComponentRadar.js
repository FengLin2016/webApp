/* 雷达图组件对象 */
 var H5ComponentRadar = function(name, cfg){
 	var component = new H5ComponentBase(name, cfg);

 	var w = cfg.width/2;
 	var h = cfg.height/2;

 	var cns = document.createElement('canvas');
 	var ctx = cns.getContext('2d');
 	component.append(cns);
 	cns.width = ctx.width =w;
 	cns.height = ctx.height = h;
 	var step = cfg.data.length;
 	//画圆
 	var r = w/2;
 	var iscolor = true;
 	for (var s = 10; s > 0; s--) {
	 	ctx.beginPath();
	 	//背景正多边形
	 	for (var i = 0; i < step; i++) {
	 		var rad  = (2*Math.PI/360)*(360/step)*i;
	 		var x = r+Math.sin(rad)*r * (s/10);
	 		var y = r+Math.cos(rad)*r *(s/10);
	 		if(i==0){
	 			ctx.moveTo(x,y);
	 		}
	 		ctx.lineTo(x,y);

	 	}
	 	ctx.fillStyle = (iscolor = !iscolor)?'#f1f9ff':'#99c0ff';
	 	ctx.fill();
	 	ctx.closePath();
 	}

 	ctx.beginPath();

 	//绘制伞骨
 	for (var i = 0; i < step; i++) {
 		var rad  = (2*Math.PI/360)*(360/step)*i;
 		var x = r+Math.sin(rad)*r;
 		var y = r+Math.cos(rad)*r;
 		ctx.moveTo(r,r);
 		ctx.lineTo(x,y);
 		//数据名称
	 	var text = $('<div class="text"></div>');
	 	text.text(cfg.data[i][0]);
	 	component.append(text);
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
 	}

 	ctx.strokeStyle = '#aaa';
 	ctx.stroke();
 	
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width =w;
 	cns.height = ctx.height = h;
	component.append(cns);

	//数据
 	function animateRadar(per){

 		ctx.clearRect(0,0,w,h);
 		ctx.beginPath();
 		//数据圆点
	 	for (var i = 0; i < step; i++) {
		 	var rad  = (2*Math.PI/360)*(360/step)*i;
	 		var x = r+Math.sin(rad)*r * (per)*cfg.data[i][1];
	 		var y = r+Math.cos(rad)*r *(per)*cfg.data[i][1];
	 		ctx.moveTo(x,y);
	 		ctx.arc(x,y,3,0,2*Math.PI);
	 		ctx.fillStyle = '#ff7676';
	 		ctx.fill();
	 	}
 		//数据线
 		for (var i = 0; i < step; i++) {
		 	var rad  = (2*Math.PI/360)*(360/step)*i;
	 		var x = r+Math.sin(rad)*r * (per)*cfg.data[i][1];
	 		var y = r+Math.cos(rad)*r *(per)*cfg.data[i][1];
	 		if(i==0){
	 			ctx.moveTo(x,y);
	 		}
	 		ctx.lineTo(x,y);
	 	}

	 	ctx.strokeStyle = '#cd5f7e';
	 	ctx.closePath();
	 	ctx.stroke();
 	}

 



 	component.on('onLoad',function(){
 		var per = 0;
 		setTimeout(function(){
 			var t = setInterval(function(){
		 		per=per+0.01;
		 		animateRadar(per);
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
	 		animateRadar(per);
	 		if(per<=0){
	 			clearInterval(t);
	 		}
	 	},10)
 	});
 	
 	
 	return component;
 }

