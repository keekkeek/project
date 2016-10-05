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
        console.log(cookie7);
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



        //第三段


    }
}