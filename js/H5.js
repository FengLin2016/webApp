/* 内容管理对象 */
var H5 = function(){
	this.id=('h5_'+Math.random()).replace(".","_");
	this.el=$("<div class='h5' id="+this.id+"></div>");
	this.page = [];
	$('body').append(this.el.hide());

	/**
	 * 新增一个页面
	 */
	this.addPage = function(name,desc){
		var page = $('<div class="h5_page section"></div>');
		
		if(name != undefined){
			page.addClass('h5_page_'+name);
		}

		if(desc != undefined){
			page.text(desc);
		}
		this.page.push(page);
		this.el.append(page);

		if(typeof this.whenAddPage == 'function'){
			this.whenAddPage();
		}
		return this;
	}

	/**
	 * 新增组件
	 */
	this.addComponent = function(name,cfg){
		var page = this.page.slice(-1)[0];
		var cfg = cfg || {};
		cfg = $.extend({
			type:'base'
		},cfg);
		switch(cfg.type){
			case 'base':
				component = new  H5ComponentBase(name,cfg);
				break;
			case 'bar':
				component = new  H5ComponentBar(name,cfg);
				break;
			case 'bar_v':
				component = new  H5ComponentBar_v(name,cfg);
				break;
			case 'pie':
				component = new  H5ComponentPie(name,cfg);
				break;
			case 'point':
				component = new  H5ComponentPoint(name,cfg);
				break;
			case 'polyline':
				component = new  H5ComponentPolyline(name,cfg);
				break;
			case 'radar':
				component = new  H5ComponentRadar(name,cfg);
				break;
			case 'ring':
				component = new  H5ComponentRing(name,cfg);
				break;
			default:
		}
		page.append( component );
		return this;
	}


	/**
	 * 初始化呈现
	 */
	this.loader = function( fistPage ){
		this.el.fullpage({
			onLeave:function(index,nextIndex,direction){
	            $(this).find(".h5_component").trigger('onLeave');
	         },
	         afterLoad:function(index,nextIndex,direction){
	            $(this).find(".h5_component").trigger('onLoad');
	         }
		});
		this.el.find(".h5_page:eq(0) .h5_component").trigger('onLoad');
		this.el.show();
		fistPage && $.fn.fullpage.moveTo(fistPage);
	}

	this.loader = typeof H5_loading == 'function' ? H5_loading : this.loader;
	return this;
}
