var myWisper;

$(function(){
	loadSwiper();
})

function loadSwiper(){
	myWisper = new Swiper("#banner",{
		autoplay:false,
		pagination:".swiper-pagination",
		autoplayDisableOnInteraction:false,
		paginationClickable:true,
		onInit : function(myWisper){
			/*先清除所有*/
			swiperAnimateCache(myWisper);
			/*在执行动画*/
			swiperAnimate(myWisper);
		},
		onSlideChangeEnd:function(swiper){
			swiperAnimate(swiper);
		}
	});
}

$("#start").on("click",function(){
	window.location.href = "index.html";
});
