/**
 * Created by zhuke on 2016/10/5.
 */
window.onload = function(){
    //眉头的效果设置
    function setColor(index){
        $(".flow ul hr").eq(index).css({ backgroundColor:"#ec480a"});
        $(".flow ul a").eq(index).css({backgroundColor:"#ec480a"});
        $(".flow ul span").eq(index).css({color:"#ec480a"});
    }
    setColor(0);

    //获取Cookie的值
    var cookies = document.cookie;
    cookies = cookies.split("; ");
    var result = [];
    for(var i=0;i<cookies.length;i++){
        var cookie = cookies[i].split("=");
        if(cookie[0].substring(0,5) == "goods"){
            result[result.length] = cookie[1];
        }
    }
    console.log(result[0]);
    for(var i=0;i<result.length;i++){
        //获得当前cookie的信息
        var cookieinfo = result[i];

        //创建骨架
        var goods = document.getElementById("goods");
        var div = document.createElement("div");
        $(div).addClass("order");
        goods.appendChild(div);

        //第一段
        var div1 = document.createElement("div");
        $(div1).addClass("first");
        div.appendChild(div1);
        var ckb1 = document.createElement("input");
        ckb1.type = "checkbox";
        $(ckb1).attr("checked","checked");
        div1.appendChild(ckb1);
        var a1 = document.createElement("a");

    }
}