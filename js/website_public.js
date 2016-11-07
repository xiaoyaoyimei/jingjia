// JavaScript Document
var GH = window.GH || {};

(function($) {
    GH= {
		
		initCarousel:function () {
			 var slider_array = new Array();
			 $('.bxslider').each(function(i){
				var stype=$(this).data('stype');
				var captions= (null === $(this).data('captions') || undefined ===$(this).data('captions'))?false:$(this).data('captions');
				var pager= (null === $(this).data('pager') || undefined ===$(this).data('pager'))?false:$(this).data('pager');
	
				var slideWidth=$(this).parents('.bxslider-wrap').width()/stype;
				slider_array[i]=$(this).bxSlider({
					pager:pager,
					captions: captions,
					minSlides:stype,
					maxSlides:stype,
					slideWidth:slideWidth,
					       infiniteLoop: false
					});
				});
				}
	}
})(jQuery);
$(function(){

	if($('.bxslider').length>0){

		GH.initCarousel();
		}
	});