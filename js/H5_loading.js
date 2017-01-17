var H5_loading = function(images,fistPage){

	var id  = this.id;
	if(this._image === undefined){
		this._image = (images || []).length;
		this.loaded = 0;

		window[id] = this;

		for(s in images){
			var items = images[s];
			var img = new Image();
			img.onload = function(){
				window[id].loader();
			}
			img.src = items;
		}

		$("#rate").text('0%');

		return this;
	}else{

		this.loaded ++ ;

		$("#rate").text(((this.loaded/this._image) *100 >> 0) +'%');

		if(this.loaded < this._image)
		{
			return this;
		}


	}



	

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