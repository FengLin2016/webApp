/* 基本图文组件对象 */
var H5ComponentBase = function(name,cfg){
	var cfg = cfg || {};
	var id  = ('h5_c_'+Math.random() ).replace(".","_");
	var cls = 'h5_component_'+cfg.type+'  h5_component_name_'+name;
	var component = $('<div class="h5_component '+cls+'" id="'+id+'"></div>');

	cfg.text   &&  component.text(cfg.text);
	cfg.width  &&  component.width(cfg.width/2);
	cfg.height &&  component.height(cfg.height/2);
	cfg.css    &&  component.css(cfg.css);
	cfg.bg     &&  component.css('background-image','url('+cfg.bg+')');
	cfg.center &&  component.css({
		'margin-left':-(cfg.width/4),
		'left'       :'50%'
	});

	if(typeof cfg.onclick == 'function'){
		component.click(cfg.onclick);
	}

	component.on('onLeave',function(){
		var that = this;
		setTimeout(function(){
			$(that).addClass('h5_component_'+name+'_onLeave');
            $(that).removeClass('h5_component_'+name+'_onLoad');
            cfg.animateOut && $(that).animate(cfg.animateOut);
		},cfg.delay || 0);
            
            return false;
    });
    component.on('onLoad',function(){
    	var that = this;
    	setTimeout(function(){
            $(that).addClass('h5_component_'+name+'_onLoad');
            $(that).removeClass('h5_component_'+name+'_onLeave');
            cfg.animateIn && $(that).animate(cfg.animateIn);
        },cfg.delay || 0);
          return false;
    });

	return component;
}
