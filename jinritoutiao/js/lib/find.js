$(function(){
	setPage();
});

function setPage(){
	$.ajax({
		type:"get",
		dataType:"json",
		url:"../json/activity.json",
		async:true,
		success:function(data){
			console.log(data);
			var result = data["result"];
			console.log(result);
			$.each(result, function(index) {
				addInfo(result[index]);
			});
		}
	});
	
	function addInfo(obj){
		var brief = obj.brief;
		var imgurl ="../" + obj.imgurl;
		var name = obj.name;
		var single_act = $("<div class='single_act'></div>");
		var img = $("<img class='single_img' />");
		var p1 = $("<p class='name'></p>");
		var p2 = $("<p class='brief'></p>");
		img.attr({"src":imgurl});
		p1.text(name);
		p2.text(brief);
		single_act.append(img);
		single_act.append(p1);
		single_act.append(p2);
		$(".activity").append(single_act);
	}
}
