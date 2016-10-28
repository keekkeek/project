/**
 * Created by zhuke on 2016/10/7.
 */
$(function(){
    function setColor(index){
        $(".flow ul hr").eq(index).css({ backgroundColor:"#ec480a"});
        $(".flow ul a").eq(index).css({backgroundColor:"#ec480a"});
        $(".flow ul span").eq(index).css({color:"#ec480a"});
    }
    setColor(2);

    $("#logo").click(function(){
        window.location.href = "../index.html";
    });

    var cookies = document.cookie;
    console.log(cookies);
    cookies = cookies.split("; ");
    var result = [];
    for(var i=0;i<cookies.length;i++){
        var cookie = cookies[i].split("=");
        if(cookie[0].substring(0,7) == "comment"){
            result[result.length] = cookie[1];
        }
    }

    var cookieinfo = result[0];
    console.log(cookieinfo);
    if(cookieinfo!=null) {
        var infos = cookieinfo.split("&");
        var cookie0 = infos[0];
        var id = cookie0.split(":")[1];
        $(".id").html(id);
        var cookie1 = infos[1];
        var price = cookie1.split(":")[1];
        $(".price").html(price);

        //去掉订单记录
        removeCookie("comment" + id);
    }
})

