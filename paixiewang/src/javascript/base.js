//获取随机数
function getRandom(_min,_max){
    return Math.random()*(_max-_min) + _min;
}

//设置指定的日期函数
function _getDate(num){
    var d = new Date();
    var ms = 24 * 60 * 60 * 1000 * num + d.getTime();
    return new Date(ms);
}
//写入cookie
function setCookie(key,value,expires){ //expires当有值时，则为true，否则为false
    var _value = key + "=" + value;
    if(expires){
        _value += ";expires=" + _getDate(expires);
    }
    document.cookie = _value;

    /*
     document.cookie = "username=李四;expires=" + _getDate(1);

     document.cookie = _value +";expires=" + _getDate(1);

     */
}


//根据指定的key获取对应的value
function getCookie(key){
    var cookies = document.cookie;
    //console.log(cookies);
    cookies = cookies.split("; ");
    //console.log(cookies);
    for(var i = 0;i < cookies.length;i++){
        var cookie = cookies[i].split("=");
        //console.log(cookie);
        if(cookie[0] == key){
            return cookie[1];
        }
    }
    return "";
}

//删除指定的cookie
function removeCookie(key){
    document.cookie = key + "=;expires=" + new Date(0);
}

//获取内部或外部样式的属性
function _getStyle(obj,att){
    if(obj.currentStyle){
        return obj.currentStyle[att];
    }else{
        return getComputedStyle(obj,null)[att];
    }
}

//
var utility = {
    Ajax:{send:function(method,url,async,successFn){
        //1.建立请求对象
        var req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if(req.readyState==4&&req.status==200){
                if(typeof successFn == "function"){
                    successFn(req.responseText);
                }
            }
        }
        //2.建立服务器连接
        req.open(method,url,async);
        //3.发送请求
        req.send(null);
    }
    }
}

