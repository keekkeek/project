/**
 * Created by zhuke on 2016/10/4.
 */
window.onload = function(){
    //对三个input进行验证。
    //name:
    var nameinfo1 = "请输入邮箱/手机号";
    var nameinfo2 = "用户名长度只能在4-20位字符之间";
    var nameinfo3 = "格式错误";
    var passinfo1 = "6-20位字符,可使用字母、数字或符号的组合";
    var passinfo2 = "密码长度只能在6-20位字符之间";
    var passinfo3 = "请再次输入密码";
    var passinfo4 = "再次输入的密码不一致";
    var info = "输入正确";

    var reg1 = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var reg2 = /^\w+@[a-zA-Z0-9-]+\.(com|cn)$/;

    var reg3 = /^[\x21-\x7E]{6,20}$/;

    $(".name input").focus(function(){
        $(".name span").css({display:"block"}).html(nameinfo1).removeClass().addClass("common");
        $(".name a").css({display:"block"});
    });

    $(".name a").click(function(){
        $(".name input").val("");
        $(".name span").css({display:"block"}).html(nameinfo1).removeClass().addClass("common");
    });

    $(".name input").blur(function(){
        var value1 = $(this).val();
        if(value1!="") {
            if (reg1.test(value1) || reg2.test(value1)) {
                $(".name span").html(info).removeClass().addClass("right");

            } else if (value1.length < 4 || value1.length > 20) {
                $(".name span").html(nameinfo2);
                $(".name span").removeClass().addClass("wrong");
            } else {
                $(".name span").html(nameinfo3).removeClass().addClass("wrong");
            }
        }else{
            $(".name span").css({display: "none"});
            $(".name a").css({display:"none"});
        }
    });


    $(".pass input").focus(function(){
        $(".pass span").css({display:"block"}).html(passinfo1).removeClass().addClass("common");
        $(".pass a").css({display:"block"});
    });

    $(".pass a").click(function(){
        $(".pass input").val("");
        $(".pass span").css({display:"block"}).html(passinfo1).removeClass().addClass("common");
    });

    $(".pass input").blur(function(){
        var value1 = $(this).val();
        if(value1!=""){
            if(reg3.test(value1)){
                $(".pass span").html(info).removeClass().addClass("right");

            }else{
                $(".pass span").html(nameinfo3).removeClass().addClass("wrong");
            }
        }else{
            $(".pass span").css({display: "none"});
            $(".pass a").css({display:"none"});
        }
    });


    $(".pass2 input").focus(function(){
        $(".password-info2").css({display:"block"}).html(passinfo3).removeClass().addClass("common");
        $(".pass2 a").css({display:"block"});
    });

    $(".pass2 a").click(function(){
        $(".pass2 input").val("");
        $(".password-info2").css({display:"block"}).html(passinfo3).removeClass().addClass("common");
    });

    $(".pass2 input").blur(function(){
        var value2 = $(this).val();
        var value1 = $(".pass input").val();
        if(value2!=""){
            if(value1 == value2){
                $(".pass2 span").html(info).removeClass().addClass("right");

            }else{
                $(".pass2 span").html(passinfo4).removeClass().addClass("wrong");
            }
        }else{
            $(".pass2 span").css({display:"none"});
            $(".pass2 a").css({display:"none"});
        }
    });

    $(".signup").click(function(){
        var f1 = $(".name span").attr("class");
        var f2 = $(".pass span").attr("class");
        var f3 = $(".pass2 span").attr("class");
        var f4 = $(".commit input").attr("checked");
        if((f1=="right")&&(f2=="right")&&(f3=="right")&&(f4=="checked")){
            var txt1 = $(".name input").val();
            var txt2 = $(".pass input").val();
            var value = "username:" + txt1 + "&userpassword:" + txt2;
            setCookie("user",value,7);
            alert("注册成功");
            window.location.href = "../index.html";
        }else{
            alert("注册失败，请重新输入");
        }
    });

    $("#right a").click(function(){
        window.location.href = "login.html";
    });

}