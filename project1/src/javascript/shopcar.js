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

    for(var i=0;i<result.length;i++){
        //获得当前cookie的信息
        var cookieinfo = result[i];
        var infos = cookieinfo.split("&");
        var cookie0 = infos[0];
        var order_id = cookie0.split(":")[1];
        var cookie1 = infos[1];
        var shopname = cookie1.split(":")[1];
        var cookie2 = infos[2];
        var goodsname = cookie2.split(":")[1];
        var cookie3 = infos[3];
        var goodsnimg = cookie3.split(":")[1];
        var cookie4 = infos[4];
        var goodscolor = cookie4.split(":")[1];
        var cookie5 = infos[5];
        var goodssize = cookie5.split(":")[1];
        var cookie6 = infos[6];
        var goodsamount = cookie6.split(":")[1];
        var cookie7 = infos[7];
        var goodsprice = cookie7.split(":")[1];
        //创建骨架
        var goods = document.getElementById("goods");
        var div = document.createElement("div");
        $(div).addClass("order");
        goods.appendChild(div);

        //第一段
        var div1 = document.createElement("div");
        $(div1).addClass("first");
        div.appendChild(div1);
        var a1 = document.createElement("a");
        $(a1).html(shopname);
        $(a1).addClass("a1");
        div1.appendChild(a1);

        //第二段
        var div2 = document.createElement("div");
        $(div2).addClass("second");
        div.appendChild(div2);

        var benefit = document.createElement("div");
        div2.appendChild(benefit);
        $(benefit).addClass("benefit");
        var adv =  document.createElement("a");
        benefit.appendChild(adv);
        $(adv).addClass("adv");
        var word = "满99元减10元";
        $(adv).html(word);

        var text = document.createElement("div");
        div2.appendChild(text);
        $(text).addClass("text");
        var ckb2 = document.createElement("input");
        ckb2.type = "checkbox";
        text.appendChild(ckb2);
        $(ckb2).addClass("ckb2");
        $(ckb2).attr("checked","checked");

        var img1 = document.createElement("img");
        text.appendChild(img1);
        $(img1).addClass("img1");
        $(img1).attr({"src":goodsnimg});

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
        $(a_size).html("尺码："+goodssize+"码");

        var a_color = document.createElement("a");
        explain.appendChild(a_color);
        $(a_color).addClass("a3");
        $(a_color).html("颜色："+goodscolor);

        var a_price = document.createElement("a");
        text.appendChild(a_price);
        $(a_price).addClass("a4");
        $(a_price).html(goodsprice);


        var amount = document.createElement("div");
        text.appendChild(amount);
        $(amount).addClass("amount");

        var minus = document.createElement("button");
        amount.appendChild(minus);
        $(minus).addClass("minus");

        var value = document.createElement("input");
        amount.appendChild(value);
        $(value).addClass("value");
        $(value).val(goodsamount);

        var plus = document.createElement("button");
        amount.appendChild(plus);
        $(plus).addClass("plus");

        var price1 = document.createElement("a");
        text.appendChild(price1);
        $(price1).addClass("text-price");

        var store = document.createElement("a");
        text.appendChild(store);
        $(store).addClass("store");
        $(store).html("移入收藏夹");

        var del = document.createElement("a");
        text.appendChild(del);
        $(del).addClass("del");
        $(del).html("删除");


    }
    //实现各个按键的功能
    //计算出小计里面的金额
    function setPrice1(){
        for(var i=0;i<$(".order").length;i++){
            var amount = parseInt($(".value").eq(i).val());
            var price = parseFloat($(".a4").eq(i).html());
            var price1 = price * amount;
            $(".text-price").eq(i).html(price1.toFixed(2));
        }
    }
    setPrice1();

    //获得总计里面的金额
    function setPrice2(){
        var sum_price = 0.00;
        for(var i=0;i<$(".order").length;i++){
            var isChecked = $(".ckb2").eq(i).attr("checked");
            if(isChecked == "checked"){
                sum_price += parseFloat($(".text-price").eq(i).html());
            }
        }
        $(".span2").html("&yen; "+sum_price.toFixed(2));
    }
    setPrice2();

    //数量选择
    //plus:
    $(".plus").each(function(i){
        $(".plus").eq(i).click(function(){
         var value = parseInt($(".value").eq(i).val()) + 1;
         $(".value").eq(i).val(value);
            setPrice1();
            setPrice2();
            jianshu();
         });
    });

    //minus:
    $(".minus").each(function(i){
        $(".minus").eq(i).click(function(){
            var value = parseInt($(".value").eq(i).val()) - 1;
            if(value <= 0){
                value = 1;
            }
            $(".value").eq(i).val(value);
            setPrice1();
            setPrice2();
            jianshu();
        });
    });

    //value:
    $(".value").each(function(i){
        $(this).blur(function(){
            var value = parseInt($(".value").eq(i).val());
            if(value<=1||isNaN(value)){
                value = 1;
            }
            $(".value").eq(i).val(value);
            setPrice1();
            setPrice2();
            jianshu();
        });
    });

    function ckb1(){
        var isFlag = true;
        $(".ckb2").each(function(i){
            var isChecked = $(this).attr("checked");
            if(isChecked != "checked"){
                isFlag = false;
            }
        });
        if(isFlag){
            $(".all input").attr({"checked":"checked"});
        }else{
            console.log("a");
            $(".all input").attr({"checked":false})
        }
    }
    ckb1();

    //对商品的件数进行统计
    function jianshu(){
        var amount = 0;
        $(".ckb2").each(function(i){
            var isChecked = $(this).attr("checked");
            if(isChecked == "checked"){
                amount += parseInt($(".value").eq(i).val());
            }
        });
        $(".general2 .span1").html(amount);
    }
    jianshu();
    function allChoose(){
        var isChecked = $(".all input").eq(0).attr("checked");
        if(isChecked == "checked"){
            $(".ckb2").attr({"checked":"checked"});
        }else{
            $(".ckb2").attr({"checked":false});
        }
    }

    //点击ckb2按钮
    $(".ckb2").each(function(i){
        $(this).click(function(){
            setPrice2();
            ckb1();
            jianshu();
        });
    });


    //点击全选按钮
    $(".all input").each(function(i){
        $(this).click(function(){
            setPrice2();
            var isChecked = $(this).attr("checked");
            if(isChecked == "checked"){
                $(".all input").attr({"checked":"checked"});
            }else{
                $(".all input").attr({"checked":false});
            }
            allChoose();
            jianshu();
            setPrice2();
        });
    });

    //删除del
    $(".del").each(function(i){
        $(this).click(function(){
            $(".order").eq(i).remove();
            setPrice2();
            ckb1();
            jianshu();
        });
    });

    //将基本信息放入Cookie中

    $(".pay").click(function(){
        var isFlag = false;
        $(".ckb2").each(function(i){
            var isChecked = $(this).attr("checked");
            if(isChecked == "checked"){
                isFlag = true;
            }
        });

        if(isFlag) {
            var time = new Date();
            var yy = time.getFullYear();
            var MM = time.getMonth() + 1;
            if (MM < 10) {
                MM = '0' + MM;
            }
            var dd = time.getDate();
            if (dd < 10) {
                dd = '0' + dd;
            }
            var hh = time.getHours();
            if (hh < 10) {
                hh = '0' + hh;
            }
            var mm = time.getMinutes();
            if (mm < 10) {
                mm = '0' + mm;
            }
            var ss = time.getSeconds();
            if (ss < 10) {
                ss = '0' + ss;
            }
            var prefix = yy + '' + MM + '' + dd + '' + hh + '' + mm + '' + ss;
            var order_id = prefix + parseInt(getRandom(1000, 1100));



            $(".order").each(function (i) {
                var isChecked = $(".ckb2").attr("checked");
                var value = "";
                if (isChecked == "checked") {
                    value = "&shopname:" + $("#goods .a1").eq(i).html() +
                        "&goodsimg:" + $("#goods .img1").eq(i).attr("src") +
                        "&goodsname:" + $("#goods .p1").eq(i).html() +
                        "&goodssize:" + $("#goods .a2").eq(i).html() +
                        "&goodscolor:" + $("#goods .a3").eq(i).html() +
                        "&goodsprice:" + $("#goods .a4").eq(i).html() +
                        "&goodsamount:" + $("#goods .value").eq(i).val() +
                        "&goodsprice1:" + $("#goods .text-price").eq(i).html();
                    value = "order_id:" + order_id + value + "&all:" + $(".general2 .span2").html();
                    setCookie("order"+ i + order_id, value, 7);
                }
            });
            window.location.href = "balance.html";
        }else{
            alert("请选择商品！");
        }
    });

}