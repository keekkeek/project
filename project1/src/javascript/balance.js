$(function(){
    //眉头的效果设置
    function setColor(index){
        $(".flow ul hr").eq(index).css({ backgroundColor:"#ec480a"});
        $(".flow ul a").eq(index).css({backgroundColor:"#ec480a"});
        $(".flow ul span").eq(index).css({color:"#ec480a"});
    }
    setColor(1);

    var title = $(".shop").html();
    $(".shop").html("");
    //获取Cookie的值
    var cookies = document.cookie;
    console.log(cookies);
    cookies = cookies.split("; ");
    var result = [];
    for(var i=0;i<cookies.length;i++){
        var cookie = cookies[i].split("=");
        if(cookie[0].substring(0,5) == "order"){
            result[result.length] = cookie[1];
        }
    }
    var length = result.length;
    var order_id;
    var all;
    for(var i=0;i<result.length;i++){
        //先建立一个title
        $(".shop").html($(".shop").html() + title);

        var cookieinfo = result[i];
        console.log(cookieinfo);
        var infos = cookieinfo.split("&");
        var cookie0 = infos[0];
        order_id  = cookie0.split(":")[1];
        var cookie1 = infos[1];
        var shopname  = cookie1.split(":")[1];
        var cookie2 = infos[2];
        var goodsimg = cookie2.split(":")[1];
        var cookie3 = infos[3];
        var goodsname = cookie3.split(":")[1];
        var cookie4 = infos[4];
        var goodssize = cookie4.split(":")[1];
        var cookie5 = infos[5];
        var goodscolor = cookie5.split(":")[1];
        var cookie6 = infos[6];
        var goodsprice = cookie6.split(":")[1];
        var cookie7 = infos[7];
        var goodsamount = cookie7.split(":")[1];
        var cookie8 = infos[8];
        var goodsprice1 = cookie8.split(":")[1];
        var cookie9 = infos[9];
        all = cookie9.split(":")[1];

        //创建骨架
        var goods = $(".goods").eq(i); //document.getElementsByClassName("goods")[i];

        var div = document.createElement("div");
        $(div).addClass("order");
        //goods.appendChild(div);
        goods.append(div);

        var div2 = document.createElement("div");
        $(div2).addClass("second");
        div.appendChild(div2);

        var text = document.createElement("div");
        div2.appendChild(text);
        $(text).addClass("text");

        var img1 = document.createElement("img");
        text.appendChild(img1);
        $(img1).addClass("img1");
        $(img1).attr({"src":goodsimg});

        var explain = document.createElement("div");
        text.appendChild(explain);
        $(explain).addClass("explain");

        var p1 = document.createElement("p");
        explain.appendChild(p1);
        $(p1).addClass("p1");
        $(p1).html(goodsname);

        var a_size = document.createElement("a");
        explain.appendChild(a_size);
        $(a_size).addClass("a2");
        $(a_size).html(goodssize);

        var a_color = document.createElement("a");
        explain.appendChild(a_color);
        $(a_color).addClass("a3");
        $(a_color).html(goodscolor);

        var a_price = document.createElement("a");
        text.appendChild(a_price);
        $(a_price).addClass("a4");
        $(a_price).html(goodsprice);

        var value = document.createElement("a");
        text.appendChild(value);
        $(value).addClass("value");
        $(value).html(goodsamount);

        var discount = document.createElement("a");
        text.appendChild(discount);
        $(discount).addClass("discount");
        $(discount).html("--");

        var price1 = document.createElement("a");
        text.appendChild(price1);
        $(price1).addClass("text-price");
        $(price1).html(goodsprice1);

        $(".price3").html("&yen;"+parseInt(all.substring(1)));
        $(".money").html("&nbsp;&yen;"+parseInt(all.substring(1)));
        $(".number").html(parseInt(all.substring(1)));
    }

    //收货地址表单的验证
    var isFlag1 = false,isFlag2 = false,isFlag3 = false,isFlag4 = false;

    function test(){
        var isSelected = $(".select option").eq(0).attr("selected");
        if(isSelected != "selected"){
            isFlag1 = true;
        }else{
            isFlag1 = false;
        }
    }
    test();
    //邮编
    var reg1 = /^\d{6}$/;
    function test1(reg){
        var value = $("form .input1").val();
        if(!reg.test(value)){
            $(".test").html("* 请输入正确的邮编号");
            isFlag2 = false;
        }else{
            $(".test").html("");
            isFlag2 = true;
        }
    }
    $("form .input1").blur(function(){
        test1(reg1);
    });

    //地址信息:
    function test2(reg){
        var value = $("form .input2").val();
        if(!reg.test(value)){
            $(".test1").html("* 地址内容尽量填写更加详细点");
            //isFlag3 = false;
        }else{
            $(".test1").html("");
            //isFlag3 = true;
        }
    }
    var reg2 = /^.{20,}$/
    $("form .input2").blur(function(){
        test2(reg2);
    });

    //手机号码:
    function test3(reg){
        var value = $("form .input4").val();
        if(!reg.test(value)){
            $(".test2").html("* 请输入正确的电话号码");
            isFlag4 = false;
        }else{
            $(".test2").html("");
            isFlag4 = true;
        }
    }
    var reg3 = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    $("form .input4").blur(function(){
        test3(reg3);
    });



    $(".submit1").click(function(){
        var val1 = $("form .input1").val();
        var val2 = $("form .input2").val();
        var val3 = $("form .input3").val();
        var val4 = $("form .input4").val();
        var isFlag = false;
        test();
        test1(reg1);
        test2(reg2);
        test3(reg3);
        if(isFlag1&&isFlag2&&isFlag4){
            isFlag=true;
        }else{
            isFlag = false;
        }
        console.log(isFlag1&&isFlag2&&isFlag4);
        if(val1!=""&&val2!=""&&val3!=""&&val4!=""&&isFlag){
            var value = "order_id:" + order_id + "&all:" + all;
            setCookie("comment" + order_id, value, 7);
            window.location.href = "orderover.html";
        }else{
            alert("请认真填写收货地址页面！");
        }
    });

    $(".return").click(function(){
        window.location.href = "shopcar.html";
    });

    //清除掉order_id的cookie值
    for(var i=0; i<length; i++) {
        removeCookie("order" + i + order_id);
    }
})
