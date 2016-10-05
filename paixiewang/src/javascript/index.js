/**
 * Created by zhuke on 2016/10/3.
 */

/*效果:onmouseover一个窗口，窗口会显示display为block,离开为none*/

window.onload = function(){
    //登录按钮：
    $("#login").click(function(){
        window.location.href = "html/login.html";
    });

    $(".h-sign").mouseover(function(){
        $(this).css({textDecoration:"underline"});
        $(this).click(function(){
            window.location.href = "html/signup.html";
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

    //轮播图2：
    $(function(){
        var timer2;
        var length2 = parseInt($("#carousel div").css("width"));
        var num2 = $(".c-album2 li").length;
        $(".c-album2 li").eq(0).addClass("display2");
        function autoplay(obj,num,length,time,isLeft){
            var leftRes = parseInt($(obj).css("left"));
            if(leftRes == (isLeft ? 0 : -num*length)){
                leftRes = (isLeft ? -num*length : 0);
                $(obj).animate({left:leftRes+'px'},1);
                $(".c-album2 li").eq(isLeft ? num-1 : 0).addClass("display2");
            }
            if(isLeft){
                leftRes += length;
            }else{
                leftRes -= length;
            }
            $(obj).animate({left:leftRes+'px'},time);
            var index = Math.abs(parseInt(leftRes)/length);
            $(".c-album2 li").removeClass();
            if(index == num){
                index = 0;
            }
            $(".c-album2 li").eq(index).addClass("display2");
        }

        function go(){
            autoplay(".c-album1",num2,length2,1000,false);
        }
        timer2 = setInterval(go,3000);
        //点击下面的li进行图片的选择
        $(".c-album2 li").click(function(e){
            var target = e.target;
            if(target == this){
                clearInterval(timer2);
                $(".c-album2 li").removeClass();
                $(this).addClass("display2");
                var index = $(this).index();
                $(".c-album1").animate({left:index*-1263+'px'},1000);
                timer2 = setInterval(go, 3000);
            }
        });

        $("#carousel .inner").mouseover(function(){
           $("#butleft").css({display:"block"});
           $("#butright").css({display:"block"});
        });
        $("#carousel .inner").mouseout(function(){
            $("#butleft").css({display:"none"});
            $("#butright").css({display:"none"});
        });
        //点击左右边的小点改变图片的内容
        $("#butleft").mouseover(function(){
            $("#butleft").css({backgroundPosition:"-41px 0px"});
            $("#butleft").click(function(){
                clearInterval(timer2);
                autoplay(".c-album1",num2,length2,1,true);
                timer2 = setInterval(go,3000);
            });
        });
        $("#butleft").mouseout(function(){
            $("#butleft").css({backgroundPosition:"0px 0px"});
        });

        $("#butright").mouseover(function(){
            $("#butright").css({backgroundPosition:"-41px -81px"});
            $("#butright").click(function(){
                clearInterval(timer2);
                autoplay(".c-album1",num2,length2,1,false);
                timer2 = setInterval(go,3000);
            });
        });
        $("#butright").mouseout(function(){
            $("#butright").css({backgroundPosition:"0px -81px"});
        });
    })

    //点击activity中的head来切换下面的内容
    $(".a-head ul li").mouseover(function(e){
        var target = e.target;
        if(target == this){
            var index = $(this).index();
            for(var i=1;i<4;i++){
                $(".a-bottom"+(i)).css({display:"none"});
            }
            $(".a-bottom"+(index+1)).css({display:"block"});
        }
    });

    //点击使得格子中的内容活动起来
    $("#activity div .a-bottom table tbody tr td dl").mouseover(function(e) {
            var dt1 = this.getElementsByTagName("dt")[0];
            $(dt1).animate({marginLeft:'0px'},200);
    });
    $("#activity div .a-bottom table tbody tr td dl").mouseleave(function(e) {
            console.log("nihao");
            var dt1 = this.getElementsByTagName("dt")[0];
            $(dt1).animate({marginLeft:'12px'},200);
    });

    //所有商品分类
    $("#down-list").mouseover(function(){
        $("#nest").css({display:"block"});
    });
    $("#down-list").mouseout(function(){
        $("#nest").css({display:"none"});
    });

    //去除广告
    $("#advertise .ad-del").click(function(){
        $("#ad-div1").slideToggle();
    });
}
