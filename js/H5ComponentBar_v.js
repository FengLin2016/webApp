/* 垂直柱图组件对象 */
var H5ComponentBar_v = function(name, cfg){
 	var component = new H5ComponentBase(name, cfg);

 	$(cfg.data).each(function(idx,item){
 		var line = $("<div class='line'></div>");
 		var name = $("<div class='name'>"+item[0]+"</div>");
 		var marks = item[1]*100+"%";
 		var pre = $("<div class='pre'>"+marks+"</div>");
 		var color = ['red','green','blue','gray','#ccc','#ffaaaa','#ccaadd'];
 		var bg = item[2] ||  color[idx];
 		var progress = $("<div class='progress' style='height:"+marks+"'><div class='bg' style='background:"+bg+"'></div></div>");
 		pre.css('bottom',marks);
 		line.append(name).append(progress).append(pre);
 		component.append(line);
 	});
 	
 	
 	return component;
 }
