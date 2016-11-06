$(function(){
	setPage();
});

function setPage(){
	$.ajax({
		type:"get",
		data:"json",
		url:"../json/vedio.json",
		async:true,
		success:function(data){
			var result = data.result;
			$.each(result, function(index) {
				addInfo(result[index]);
			});
		}
	});
	
	function addInfo(obj){
		console.log(obj);
		var pinglun = obj.comments;
		var poster = "../"+obj.poster;
		var laiyuan = obj.source;
		var vedioulr = "../"+obj.vediourl;
		var mingzi = obj.name;
		
		var vedio_box = $("<div class='vedio_box'></div>");
		var vedio = $("<video  controls></video>");
		var name = $("<div class='name'></div>");
		var menu = $("<div class='menu'></div>");
		var source = $("<span class='source'></span>");
		var _comment = $("<span class='comment iconfont2'></span>");
		var store = $("<span class='store iconfont2'></span>");
		var share = $("<span class='share iconfont2'></span>");
		
		$(".content").append(vedio_box);
		vedio_box.append(vedio);
		vedio_box.append(name)
		vedio_box.append(menu);
		menu.append(source);
		menu.append(_comment);
		menu.append(store);
		menu.append(share);
		
		source.text(laiyuan);
		_comment.html("<a>&#xf0114;</a>&nbsp;"+pinglun);
		store.html("<a>&#xe631;</a>");
		share.html("<a>&#xe63c;</a>");
		name.text(mingzi);
		vedio.attr({"poster":poster,"src":vedioulr});
	}
}
