/**
 * Created by zhuke on 2016/10/5.
 */
window.onload = function(){
    //登录按钮：
    $("#login").click(function(){
        window.location.href = "login.html";
    });

    $(".h-sign").mouseover(function(){
        $(this).css({textDecoration:"underline"});
        $(this).click(function(){
            window.location.href = "signup.html";
        });
    });
    $(".h-login").mouseout(function(){
        $(this).css({textDecoration:"none"});
    });

    //网站导航
    $(".web-guide").mouseover(function(){
        $(".web-guide div").css({display:"block"});
        $(".web-guide .div1").css({backgroundColor:"white",borderColor:"#ccc",borderBottomColor:"#fafafa"});
        $(".web-guide .div1 .img1").css({backgroundPosition:"-142px -493px"});

    });

    $(".web-guide").mouseout(function(){
        $(".web-guide div").css({display:"none"});
        $(".web-guide .div1").css({display:"block",backgroundColor:"#fafafa",borderColor:"#fafafa"});
        $(".web-guide .div1 .img1").css({backgroundPosition:"-142px -500px"});
        $(".web-guide").mouseover(function(){ return false;});
    });

    //我的拍鞋
    $(".mine").mouseover(function(){
        $(".mine div").css({display:"block"});
        $(".mine .div1").css({backgroundColor:"white",borderColor:"#ccc",borderBottomColor:"#fafafa"});
        $(".mine .div1 .img1").css({backgroundPosition:"-142px -493px"});

        $(".mine").mouseout(function(){
            $(".mine div").css({display:"none"});
            $(".mine .div1").css({display:"block",backgroundColor:"#fafafa",borderColor:"#fafafa"});
            $(".mine .div1 .img1").css({backgroundPosition:"-142px -500px"});
        });
    });

    //轮播图1：
    $(function(){
        $(".t-ablum2 li a").eq(0).removeClass().addClass("display1");
        function autoplay(obj,num,length,time,isLeft){
            var leftRes = parseInt($(obj).css("left"));
            if(leftRes == (isLeft ? 0 : -num*length)){
                leftRes = (isLeft ? -num*length : 0);
                $(obj).animate({left:leftRes+'px'},1);
                $(".t-ablum2 li a").eq(isLeft ? num-1 : 0).addClass("display1");
            }
            if(isLeft){
                leftRes += length;
            }else{
                leftRes -= length;
            }
            $(obj).animate({left:leftRes+'px'},time);
            var index = Math.abs(parseInt(leftRes)/length);
            $(".t-ablum2 li a").removeClass();
            if(index == num){
                index = 0;
            }
            $(".t-ablum2 li a").eq(index).addClass("display1");
        }
        var timer1;
        var length1 = parseInt($(".t-adv").css("width"));
        var num1 = $(".t-ablum2 li").length;
        function go(){
            autoplay(".t-ablum1",num1,212,1000,false);
        }
        timer1 = setInterval(go,3000);
        //点击下面的a进行图片的选择
        $(".t-ablum2 li a").click(function(e){
            var target = e.target;
            if(target == this){
                clearInterval(timer1);
                $(".t-ablum2 li a").removeClass();
                $("this").addClass(".display1");
                var index = $(this).parent().index();
                $(".t-ablum1").animate({left:index*-212+'px'},1000);
                timer1 = setInterval(go, 3000);
            }
        });
    })

    //放大镜
    //获取元素的纵坐标（相对于窗口）
    function getTop(e){
        var offset=e.offsetTop;
        if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
        return offset;
    }
    //获取元素的横坐标（相对于窗口）
    function getLeft(e){
        var offset=e.offsetLeft;
        if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
        return offset;
    }


    var display = document.getElementById("big");
    var square = document.getElementById("square");
    var shower = document.getElementById("shower");

    //改变small中选中的图片
    function getSrc(obj){
        return $(obj).attr("src");
    }
    function setSrc(obj,val){
        $(obj).attr("src",val);
    }
    var $small = $(".small");//jQuery对象
    var small = $small[0];//DOM对象
    var lis = small.getElementsByTagName("li");
    lis[0].style.backgroundPosition = "0px -6px";
    var imgs = small.getElementsByTagName("img");
    for(var i = 0; i < imgs.length; i++ ){
        $(imgs[i]).click(function(){
            for(var i=0; i<3;i++){
                lis[i].style.backgroundPosition = "0px -80px";
            }
            this.parentNode.style.backgroundPosition = "0px -6px";
            var val = getSrc(this);
            setSrc("#big img",val);
            shower.style.background = "url("+val+")" + " no-repeat";
        });
    }

    display.onmouseover= display.onmousemove = function(evt){
            square.style.display = "block";
            shower.style.display = "block";
            var e = evt||event;
            var displayY = getTop(display);
            var displayX = getLeft(display);
            var left1 = e.pageX;
            var top1 = e.pageY;

            square.style.top = (e.pageY - displayY -105) +"px";
            square.style.left = (e.pageX - displayX - 105)+"px";

            if(parseInt(square.style.top)<=0){
                square.style.top = "0px";
            }
            if(parseInt(square.style.top)>=211){
                square.style.top = "211px";
            }
            if(parseInt(square.style.left)<=0){
                square.style.left = "0px";
            }
            if(parseInt(square.style.left)>=211){
                square.style.left = "211px";
            }

          var showerX = (parseInt(square.style.left))/422*800;
          var showerY = (parseInt(square.style.top))/422*800;
          shower.style.backgroundPosition = ""+(-showerX)+"px " + (-showerY) + "px";
    }
        display.onmouseout = function(){
            square.style.display = "none";
            shower.style.display = "none";
        }

    //改变summary中选项中的颜色：
    var $sum_color = $("#summary .color ul");
    var sum_color = $sum_color[0];
    var color_lis = sum_color.getElementsByTagName("li");
    //var imgSrc = $(color_lis[0].getElementsByTagName("img")[0]).attr("src");
    //var imgColor = $(color_lis[0].getElementsByTagName("img")[0]).attr("alt");
    //color_lis[0].style.borderColor = "#cf2525";
    var imgSrc = "";
    var imgColor = "";
    for(var i=0; i < color_lis.length; i++){
        color_lis[i].onclick = function(){
            imgSrc = $(this.getElementsByTagName("img")[0]).attr("src");
            imgColor = $(this.getElementsByTagName("img")[0]).attr("alt");
            for(var j=0; j < color_lis.length; j++){
                color_lis[j].style.borderColor = "#8e8e8e";
            }
            this.style.borderColor = "#cf2525";
        }
    }

    //改变summary中选项中的尺码
    var $sum_size = $("#summary .size ul");
    var sum_size = $sum_size[0];
    var size_lis = sum_size.getElementsByTagName("li");
    //size_lis[0].style.borderColor = "#cf2525";
    //var size = size_lis[0].innerHTML;
    var size = "";
    for(var i=0; i < size_lis.length; i++){
        size_lis[i].onclick = function(){
            for(var j=0; j < size_lis.length; j++){
                size_lis[j].style.borderColor = "#8e8e8e";
            }
            size = this.innerHTML;
            this.style.borderColor = "#cf2525";
        }
    }

    //改变summary中选项中的数量
    $(".plus").click(function(){
        var val = parseInt($(".count input").val());
        if(val<100){
            $(".plus").css({background:"url('../image/detail/plus2.jpg') no-repeat"});
            val ++;
            $(".minus").css({background:"url('../image/detail/minus2.jpg') no-repeat"});
            $(".count input").val(val);
            if(val>=100){
                $(".plus").css({background:"url('../image/detail/plus1.jpg') no-repeat"});
            }
        }
    });

    $(".minus").click(function(){
        var val = parseInt($(".count input").val());
        if(val > 1){
            $(".minus").css({background:"url('../image/detail/minus2.jpg') no-repeat"});
            val--;
            $(".count input").val(val);
            if(val<=1){
                $(".minus").css({background:"url('../image/detail/minus1.jpg') no-repeat"});
            }
        }
    });

    var $count_input = $(".count input");
    var count_input = $count_input[0];
        count_input.onfocus = count_input.onblur =function(){
        var val = parseInt($(".count input").val());
        $(".count input").val(val);
        if(val>1){
            $(".minus").css({background:"url('../image/detail/minus2.jpg') no-repeat"});
        }else{
            $(".count input").val(1);
            $(".minus").css({background:"url('../image/detail/minus1.jpg') no-repeat"});
        }
    }

    var time = new Date();
    var yy = time.getFullYear();
    var MM = time.getMonth()+1;
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
    var prefix = yy + '' + MM + '' + dd + ''+ hh +'' + mm + '' + ss;
    var order_id = prefix + parseInt(getRandom(1000, 1100));


    //单击加入购物车时建立Cookie
    //基本信息：订单号，商店名称，东西名称，东西图片，颜色，尺码，数量，价格
    //订单号：
        $(".push").click(function(){
            console.log(imgSrc);
            console.log(imgColor);
            console.log(size);
            if(imgSrc!=""&&imgColor!=""&&size!="") {
                var time = new Date();
                var yy = time.getFullYear();
                var MM = time.getMonth()+1;
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
                var prefix = yy + '' + MM + '' + dd + ''+ hh +'' + mm + '' + ss;

                var order_id = prefix + parseInt(getRandom(1000, 1100));
                //商店名称:
                var shopname = $("#shopname").html();
                //东西名称:
                var goodsname = $("#summary h3").html();
                //东西图片:
                var goodsimg = imgSrc;
                //东西颜色:
                var goodscolor = imgColor;
                //东西尺码:
                var goodssize = size;
                //东西数量:
                var goodsamount = $(".count input").val();
                //东西价格:
                var goodsprice = $(".price span").html();

                var value = "order_id:" + order_id + "&shopname:" + shopname + "&goodname:" + goodsname +
                    "&goodsimg:" + goodsimg + "&goodscolor:" + goodscolor + "&goodssize:" + goodssize +
                    "&goodsamount:" + goodsamount + "goodsprice" + goodsprice.substring(1);
                setCookie("goods" + order_id, value, 7);
                window.location.href = "";
            }else{
                alert("请查看信息是否填写完整！不可遗漏");
            }
        });

        //下面的Tab切换
        $("#introduce .txt1").eq(0).css({display:"block"});
        //点击上面的tab进行样式的变动
        for(var i=0;i<$(".intro-top li").length;i++){
            $(".intro-top li").eq(i).click(function(){
                var index = $(this).index();
                for(var j=0;j<index;j++){
                    $(".intro-top li").eq(j).css({
                        borderLeft:"solid 1px #ccc",
                        borderTop:"solid 1px #ccc",
                        borderRight:"none",
                        height:"34px",marginTop:"3px",
                        borderBottom:"solid 1px #cc0000",
                        color:"black"
                    });
                }
                for(var j=index+1;j<$(".intro-top li").length;j++){
                    $(".intro-top li").eq(j).css({
                        borderRight:"solid 1px #ccc",
                        borderTop:"solid 1px #ccc",
                        borderLeft:"none",
                        height:"34px",marginTop:"3px",
                        borderBottom:"solid 1px #cc0000",color:"black"
                    });
                }
                $(this).css({
                    marginTop:"0px",border:"solid 1px #cc0000",
                    borderBottom:"none",height:"35px",borderTop:"solid 3px #cc0000",
                    color:"#cc0000"
                });
                console.log(index);
                if(index<4){
                    for(var i=0;i<4;i++){
                        $("#introduce .txt1").eq(i).css({display:"none"});
                    }
                    $("#introduce .txt1").eq(index).css({display:"block"});
                }
            });
        }


}