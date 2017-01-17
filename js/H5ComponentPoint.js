/* 散点图表组件对象 */
 var H5ComponentPoint = function(name, cfg){
 	var component = new H5ComponentBase(name, cfg);

 	$.each(cfg.data,function(idx,item){
 		var point = $('<div class="point" id="'+idx+'"></div>');
 		var pre = item[1]/cfg.data[0][1]*100+'%';
 		var name = $('<div class="name">'+item[0]+'</div>');
 		var marks = $('<div class="marks">'+item[1]*100+'%'+'</div>');
 		name.appendTo(point);
 		marks.appendTo(name);
 		point.width(pre)
 			 .height(pre)
 			 .css("background-color",item[2])
 			 .appendTo(component);
 		point.css('transition','all 1s '+idx*.5+'s') 
 		item[3]	&&  point.css('left',item[3]);
 		item[4]	&&  point.css('top',item[4]);
 	});

 	component.find('.point').on('click',function(){

        component.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');

        return false;
   }).eq(0).addClass('point_focus')
 	return component;
 }
