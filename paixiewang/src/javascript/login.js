/**
 * Created by zhuke on 2016/10/4.
 */
window.onload = function(){
    $("#infos a").click(function(){
        window.location.href = "signup.html";
    });

    $(".login").click(function(){
        var val1 = $(".name .input1").val();
        var val2 = $(".pass .input2").val();
        var val3 = $(".i-div1 input").attr("checked");
        //将Cookie中的数据找出.
        var cookieInfos = getCookie("user");
        console.log(cookieInfos);
        var cookies = cookieInfos.split("&");
        var cookie1 = cookies[0];
        var cookie2 = cookies[1];
        var name = cookie1.split(":")[1];
        var password = cookie2.split(":")[1];
        if(val1==name && val2== password && val3=="checked"){
            alert("恭喜，登录成功");
            window.location.href = "../index.html";
        }else{
            alert("请重新登录");
        }
    });

}
