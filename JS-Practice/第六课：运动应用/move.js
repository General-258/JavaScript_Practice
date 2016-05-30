function getStyle(obj, name) {//此方法主要是要来区分是否是行间样式，还是非行间样式
    if (obj.currentStyle) {//非行间样式
        return obj.currentStyle[name];
    }
    else {//行间样式
        return getComputedStyle(obj, false)[name];
    }
}
var time = null;
//obj:当前对象  
//value:属性  
//Json: 样式Json，格式例如为：{width:100,height:100}
//num:速度的快慢
//fnEnd:触发的函数，事件，等,如:function(){  //事件内容等}，可为空
function startMove(obj, Json, num, fnEnd) {
    clearInterval(obj.time);//清除obj的time，obj.time的意义为：为每一个对象赋一个自己的定时器，以免产生冲突。
    obj.time = setInterval(function () {
        var bStop = true;//假设所有的值都到了
        for (var attr in Json) {
            var cur = 0;//定义一个默认的对象属性值
            if (attr == 'opacity') {//如果属性等于透明度
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);//四舍五入数学函数，因为计算机计算有小数会有点误差，用此函数消除这点误差
                //当前对象属性value=opacity
            }
            else {
                cur = parseInt(getStyle(obj, attr));
                //当前对象属性value
            }
            var speed = (Json[attr] - cur) / num;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//缓冲运动写法

            if (cur != Json[attr]) {//如果有目标没有到达目标点
                bStop = false;
            }
           
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            }
            else {
                obj.style[attr] = cur + speed + 'px';
            }
            if (bStop) {//如果都到达目标点
                clearInterval(obj.time);//关闭定时器
                if (fnEnd) fnEnd();//执行函数
            }
        }
    }, 30);
};