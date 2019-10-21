// 根据种子生成随机数
function random(seed){
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// 根据天数决定是否中奖
var date = new Date();
var rnd = date.getFullYear()*10000 + (date.getMonth()+1)*100 + date.getDate()
var num = Math.floor(2*random(rnd));
var img = new Image();
var Images = ['p_0.jpg', 'p_1.jpg'];
img.src = Images[num];

// 获取页面中的样式并禁止选中事件
var bodyStyle = document.body.style;
bodyStyle.webkitUserSelect = 'none';
bodyStyle.mozUserSelect = 'none';

// 获取canvas并做一些初始设置
var canvas = document.querySelector('canvas');


// 图片加载后
img.addEventListener('load', function(){
    var w = img.width;
    var h = img.height;
    var offsetX = canvas.offsetLeft;
    var offsetY = canvas.offsetTop;
    var mousedown = false;

    function eventDown(ev){
        ev.preventDefault();
        mousedown = true;
    }

    function eventUp(ev){
        ev.preventDefault();
        mousedown = false;
    }

    function eventMove(ev){
        ev.preventDefault();
        if(mousedown){
            if(ev.changedTouches){
                ev = ev.changedTouches[ev.changedTouches.length-1];
            }
                // 找到事件触发点，并画圆（消去一个圆）
                var x = (ev.clientX + document.body.scrollLeft || ev.pageX) - offsetX;
                var y = (ev.clientY + document.body.scrollTop || ev.pageY) - offsetY;
                with(ctx){
                    beginPath();
                    arc(x, y, 10, 0, Math.PI*2);
                    fill();
                }
        }
    }
    canvas.width = w;
    canvas.height = h;
    canvas.style.backgroundImage = 'url(' + img.src + ')';
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation='destination-out';
    
    canvas.addEventListener('touchstart', eventDown);
    canvas.addEventListener('touchend', eventUp);
    canvas.addEventListener('touchmove', eventMove);
    canvas.addEventListener('mousedown', eventDown);
    canvas.addEventListener('mouseup', eventUp);
    canvas.addEventListener('mousemove', eventMove);
})