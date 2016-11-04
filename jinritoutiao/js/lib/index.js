var page = [".info_prev",".info",".info_next"];

//页面刚加载时，就需要启动运行的方法
$(function(){
	navSender();
	getNews("top");
});

//对页面分类栏的设置与渲染
function navSender(){
	var info = localStorage.getItem("news_category");
	if(info != null){
		setTitle();
	}else{
		$.ajax({
			type:"get",
			data:"json",
			url:"json/title.json",
			async:true,
			success:function(data){
				//手机端和客户端获得json格式文件是data显示的类型是不同的。
				var info = JSON.parse(data);
				var chosen = info["chosen"];
				var str = "";
				$.each(chosen, function(index){
					if(index>0){
						str = str + "&";
					}
					var obj = {"name":"","category":""};
					obj.name = chosen[index]["name"];
					obj.category = chosen[index]["category"];
					str = str + JSON.stringify(obj);
				});
				localStorage.setItem("news_category",str);
				setTitle();
			}
		});
	}
	
	function setTitle(){
		var data = localStorage.getItem("news_category");
		var info = data.split("&");
		$.each(info, function(index){
			var detail = JSON.parse(info[index]);
			var a = $("<a class='title_a'>"+detail["category"]+"</a>");
			$("#category").append(a);
			a.on("touchstart",function(){
				var arr = $(".title_a");
				$.each(arr, function(index){
					$(arr[index]).css({"color":"#fbc5c6","fontSize":"1rem"});
				});
				a.css({"color":"#ffffff","fontSize":"1.3rem"});
			});
		});
	}
}

//获取当前，左边，右边 的类别的新闻信息
function getNews(name){
		var data = localStorage.getItem("news_category");
		var info = data.split("&");
		var name_current = name;
		var name_prev = "";
		var name_next = "";
		$.each(info, function(index) {
			var obj = JSON.parse(info[index]);
			var len = info.length;
			if(obj.name == name&&len>1){
				if(index == 0){
					var obj = JSON.parse(info[index+1]);
					name_next = obj.name;
				}else if(index == len-1){
					var obj = JSON.parse(info[index-1]);
					name_prev = obj.name;
				}else{
					var obj = JSON.parse(info[index-1]);
					name_prev = obj.name;
					var obj = JSON.parse(info[index+1]);
					name_next = obj.name;
				}
			}
		});
		getSingleNew(name,1);
		if(name_prev!=""){
			getSingleNew(name_prev,0);
		}
		if(name_next!=""){
			getSingleNew(name_next,2);
		}
}

//根据标题栏上面的分类来加载对于类型的新闻信息(获取单个页面的加载信息)
function getSingleNew(name,isFlag){
	var url_value = "json/"+name+".json";
	$.ajax({
		type:"get",
		data:"json",
		url:url_value,
		async:true,
		success:function(data){
			setPage(data,isFlag);
		}
	});
}

//根据获取的数据来设置相关的新闻
function setPage(data,isFlag){
	//var info = JSON.parse(data);
	//console.log(info);
	var info = data;
	var result = info.result;
	var data = result.data;
	var len = data.length;
	for(var i=0;i<len;i++){
		var news = data[i];
		setNews(news,isFlag);
	}
	
}

function setNews(news,isFlag){
	console.log(isFlag);
	var title_val = news["title"];
	var imgUrl = news["thumbnail_pic_s"];
	var author_name = news["author_name"];
	var _url = news["url"];
	var box = $("<div class='box'></div>");
	$(page[isFlag]).append(box);//每一个新闻类都有一个info
	var img = $("<img class='new_img' src='"+imgUrl+"' />");
	var title = $("<p class='title'></p>");
	var brief = $("<div class='new_beirf'></div>");
	var hot = $("<p class='hot'>热门</p>");
	var del = $("<p class='del'>x</p>");
	var author = $("<p class='author'></p>");
	author.text(author_name);
	title.text(title_val);
	brief.append(title);
	brief.append(hot);
	brief.append(del);
	brief.append(author);
	box.append(img);
	box.append(brief);
}
