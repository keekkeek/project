/**
 * Created by zhuke on 2016/10/3.
 */

/*效果:onmouseover一个窗口，窗口会显示display为block,离开为none*/

window.onload = function() {
    //jQuery UI使用搜索
        var availableTags = [
            "ActionScript",
            "AppleScript",
            "Asp",
            "BASIC",
            "C",
            "C++",
            "Clojure",
            "COBOL",
            "ColdFusion",
            "C#",
            "Erlang",
            "Fortran",
            "Groovy",
            "Haskell",
            "Java",
            "JavaScript",
            "Jquery",
            "Lisp",
            "Perl",
            "PHP",
            "Python",
            "Ruby",
            "Scala",
            "Scheme"
        ];
        $("#tags").autocomplete({
            source: availableTags
        })
    //登录按钮：
    $("#login").click(function () {
        window.location.href = "html/login.html";
    });

    $(".h-sign").mouseover(function () {
        $(this).css({textDecoration: "underline"});
        $(this).click(function () {
            window.location.href = "html/signup.html";
        });
    });
    $(".h-login").mouseout(function () {
        $(this).css({textDecoration: "none"});
    });

    //网站导航
    $(".web-guide").mouseover(function () {
        $(".web-guide div").css({display: "block"});
        $(".web-guide .div1").css({backgroundColor: "white", borderColor: "#ccc", borderBottomColor: "#fafafa"});
        $(".web-guide .div1 .img1").css({backgroundPosition: "-142px -493px"});

    });

    $(".web-guide").mouseout(function () {
        $(".web-guide div").css({display: "none"});
        $(".web-guide .div1").css({display: "block", backgroundColor: "#fafafa", borderColor: "#fafafa"});
        $(".web-guide .div1 .img1").css({backgroundPosition: "-142px -500px"});
        $(".web-guide").mouseover(function () {
            return false;
        });
    });

    //我的拍鞋
    $(".mine").mouseover(function () {
        $(".mine div").css({display: "block"});
        $(".mine .div1").css({backgroundColor: "white", borderColor: "#ccc", borderBottomColor: "#fafafa"});
        $(".mine .div1 .img1").css({backgroundPosition: "-142px -493px"});

        $(".mine").mouseout(function () {
            $(".mine div").css({display: "none"});
            $(".mine .div1").css({display: "block", backgroundColor: "#fafafa", borderColor: "#fafafa"});
            $(".mine .div1 .img1").css({backgroundPosition: "-142px -500px"});
        });
    });

    //a-adv中的广告特效：
    function changePosition() {
        var src1, src2, src3;
        src1 = $(".a-adv img").eq(0).attr("src");
        src2 = $(".a-adv img").eq(1).attr("src");
        src3 = $(".a-adv img").eq(2).attr("src");
        $(".a-adv img").eq(0).attr("src", src2);
        $(".a-adv img").eq(1).attr("src", src3);
        $(".a-adv img").eq(2).attr("src", src1);
    }

    setInterval(changePosition, 2000);

    //轮播图1：
    $(function () {
        function autoplay(obj, num, length, time, isLeft) {
            var leftRes = parseInt($(obj).css("left"));
            if (leftRes == (isLeft ? 0 : -num * length)) {
                leftRes = (isLeft ? -num * length : 0);
                $(obj).animate({left: leftRes + 'px'}, 1);
                $(".t-ablum2 li a").eq(isLeft ? num - 1 : 0).addClass("display1");
            }
            if (isLeft) {
                leftRes += length;
            } else {
                leftRes -= length;
            }
            $(obj).animate({left: leftRes + 'px'}, time);
            var index = Math.abs(parseInt(leftRes) / length);
            $(".t-ablum2 li a").removeClass();
            if (index == num) {
                index = 0;
            }
            $(".t-ablum2 li a").eq(index).addClass("display1");
        }

        var timer1;
        var length1 = parseInt($(".t-adv").css("width"));
        var num1 = $(".t-ablum2 li").length;

        function go() {
            autoplay(".t-ablum1", num1, 212, 1000, false);
        }

        timer1 = setInterval(go, 3000);
        //点击下面的a进行图片的选择
        $(".t-ablum2 li a").click(function (e) {
            var target = e.target;
            if (target == this) {
                clearInterval(timer1);
                $(".t-ablum2 li a").removeClass();
                $("this").addClass(".display1");
                var index = $(this).parent().index();
                $(".t-ablum1").animate({left: index * -212 + 'px'}, 1000);
                timer1 = setInterval(go, 3000);
            }
        });
    })

    //轮播图2：
    $(function () {
        var timer2;
        var length2 = parseInt($("#carousel div").css("width"));
        var num2 = $(".c-album2 li").length;
        $(".c-album2 li").eq(0).addClass("display2");
        function autoplay(obj, num, length, time, isLeft) {
            var leftRes = parseInt($(obj).css("left"));
            if (leftRes == (isLeft ? 0 : -num * length)) {
                leftRes = (isLeft ? -num * length : 0);
                $(obj).animate({left: leftRes + 'px'}, 1);
                $(".c-album2 li").eq(isLeft ? num - 1 : 0).addClass("display2");
            }
            if (isLeft) {
                leftRes += length;
            } else {
                leftRes -= length;
            }
            $(obj).animate({left: leftRes + 'px'}, time);
            var index = Math.abs(parseInt(leftRes) / length);
            $(".c-album2 li").removeClass();
            if (index == num) {
                index = 0;
            }
            $(".c-album2 li").eq(index).addClass("display2");
        }

        function go() {
            autoplay(".c-album1", num2, length2, 1000, false);
        }

        timer2 = setInterval(go, 3000);
        //点击下面的li进行图片的选择
        $(".c-album2 li").click(function (e) {
            var target = e.target;
            if (target == this) {
                clearInterval(timer2);
                $(".c-album2 li").removeClass();
                $(this).addClass("display2");
                var index = $(this).index();
                $(".c-album1").animate({left: index * -1263 + 'px'}, 1000);
                timer2 = setInterval(go, 3000);
            }
        });

        $("#carousel .inner").mouseover(function () {
            $("#butleft").css({display: "block"});
            $("#butright").css({display: "block"});
        });
        $("#carousel .inner").mouseout(function () {
            $("#butleft").css({display: "none"});
            $("#butright").css({display: "none"});
        });
        //点击左右边的小点改变图片的内容
        $("#butleft").mouseover(function () {
            $("#butleft").css({backgroundPosition: "-41px 0px"});
            $("#butleft").click(function () {
                clearInterval(timer2);
                autoplay(".c-album1", num2, length2, 1, true);
                timer2 = setInterval(go, 3000);
            });
        });
        $("#butleft").mouseout(function () {
            $("#butleft").css({backgroundPosition: "0px 0px"});
        });

        $("#butright").mouseover(function () {
            $("#butright").css({backgroundPosition: "-41px -81px"});
            $("#butright").click(function () {
                clearInterval(timer2);
                autoplay(".c-album1", num2, length2, 1, false);
                timer2 = setInterval(go, 3000);
            });
        });
        $("#butright").mouseout(function () {
            $("#butright").css({backgroundPosition: "0px -81px"});
        });
    })

    //点击activity中的head来切换下面的内容
    $(".a-bottom").eq(1).css({display: "none"});
    $(".a-bottom").eq(2).css({display: "none"});
    $(".a-head ul li").eq(0).css({backgroundColor: "white"});
    $(".a-head ul li").mouseover(function (e) {
        for (var i = 0; i < 3; i++) {
            $(".a-head ul li").eq(i).css({backgroundColor: "#e6e1e1"});
        }
        $(this).css({backgroundColor: "white"});
        var target = e.target;
        if (target == this) {
            var index = $(this).index();
            for (var i = 0; i < 3; i++) {
                $(".a-bottom").eq(i).css({display: "none"});
            }
            $(".a-bottom").eq(index).css({display: "block"});
        }
    });

    //点击使得格子中的内容活动起来
    $("#activity div .a-bottom table tbody tr td dl").mouseover(function (e) {
        var dt1 = this.getElementsByTagName("dt")[0];
        $(dt1).animate({marginLeft: '0px'}, 200);
    });
    $("#activity div .a-bottom table tbody tr td dl").mouseleave(function (e) {
        var dt1 = this.getElementsByTagName("dt")[0];
        $(dt1).animate({marginLeft: '12px'}, 200);
    });

    //nav中的所有商品分类
    $("#down-list").mouseover(function(){
        $("#nest").css({display: "block"});
        for (var i=0;i<7;i++){
            $(".nest-shop").eq(i).mouseover(function(){
                var index = $(this).index();
                for(var j=0;j<7;j++){
                    $(".second").eq(j).css({display:"none"});
                }
                $(".second").eq(index).css({display:"block"});

            });
        }
    });
    $("#down-list").mouseout(function () {
        $("#nest").css({display: "none"});
    });

    /*$(".second").mouseout(function(){
        $(this).css({display:"none"});
    })*/
    //去除广告
    $("#advertise .ad-del").click(function(){
        $("#ad-div1").slideToggle();
    });

    //工具箱1:
    $(".tool1").each(function(i){
        $(this).bind({
            mouseover:function(){
                $(this).css({"backgroundColor":"#c81823","borderRadius":"0px"});
                $(".tool1 a").eq(i).css({"backgroundColor":"#c81823"});
                $(".tool1 em").eq(i).css({"backgroundColor":"#c81823"});
                $(".tool1 em").eq(i).animate({"left":"-62px"},500);
            },
            mouseout:function(){
                $(this).css({"backgroundColor":"#7a6e6e","borderRadius":"3px 0px 0px 3px"});
                $(".tool1 a").eq(i).css({"backgroundColor":"#7a6e6e"});
                $(".tool1 em").eq(i).css({"backgroundColor":"#7a6e6e"});
                $(".tool1 em").eq(i).animate({"left":"35px"},500);
            }
        });
    });
    //工具箱2:
    $(".toola7").click(function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop =0;
    });

    //工具箱3:
    window.onscroll = function(){
        var scrollTop = document.documentElement.scrollTop  || document.body.scrollTop;
        var a_top = parseInt(document.getElementById("activity").offsetTop);

        if(scrollTop >=a_top){
            $("#toolbar3").css({display:"block"});
        }else{
            $("#toolbar3").css({display:"none"});
        }
    }

    $("#toolbar3 li").each(function(i){
        $(this).bind({
            mouseover:function(){
                $(this).css({"backgroundColor":"#c81623"});
                $(".floor1").eq(i).css({"display":"none"});
                $(".front1").eq(i).css({"display":"block","color":"#fff"});
            },
            mouseout:function(){
                $(this).css({"backgroundColor":"#fff"});
                $(".floor1").eq(i).css({"display":"block"});
                $(".front1").eq(i).css({"display":"none"});
            }
        });
    });

    //调整到相应的列表
    var arr_shop = ['womanShop','sportShop','manShop','outdoorShop','clotheShop','childShop'];
    $(".front1").each(function(i){
        $(this).attr("href","#"+arr_shop[i]);
    });

    //跳转到详情页面：
    $("#td1").click(function(){
        window.location.href = "html/detail.html";
    });
    //跳转到详购物页面
    $("#shopcar").click(function(){
        window.location.href = "html/shopcar.html";
    });

    $("td").each(function(i){
        $(this).bind({
            mouseover:function(){
                $(this).css({"opacity":"0.7","filter":"alpha(opacity="+70+")"});
            },
            mouseout:function(){
                $(this).css({"opacity":"1","filter":"alpha(opacity="+100+")"});
            }
        }
        )
    });


}
