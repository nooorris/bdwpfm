
/*

  Shape Shifter
  =============
  A canvas experiment by Kenneth Cachia
  http://www.kennethcachia.com

  Updated code
  ------------
  https://github.com/kennethcachia/Shape-Shifter 

*/
function initArray(){
   this.length=initArray.arguments.length
   for(var i=0;i<this.length;i++)
   this[i+1]=initArray.arguments[i] }
   var d=new initArray(
     "星期日",
     "星期一",
     "星期二",
     "星期三",
     "星期四",
     "星期五",
     "星期六");
//document.write(today.getFullYear(),"年",today.getMonth()+1,"月",today.getDate(),"日 ",d[today.getDay()+1]," ");
 

/*农历部分*/
 
var CalendarData=new Array(100);
var madd=new Array(12);
var tgString="甲乙丙丁戊己庚辛壬癸";
var dzString="子丑寅卯辰巳午未申酉戌亥";
var numString="一二三四五六七八九十";
var monString="正二三四五六七八九十冬腊";
var weekString="日一二三四五六";
var sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear,cMonth,cDay,TheDate;
CalendarData = new Array(0xA4B,0x5164B,0x6A5,0x6D4,0x415B5,0x2B6,0x957,0x2092F,0x497,0x60C96,0xD4A,0xEA5,0x50DA9,0x5AD,0x2B6,0x3126E, 0x92E,0x7192D,0xC95,0xD4A,0x61B4A,0xB55,0x56A,0x4155B, 0x25D,0x92D,0x2192B,0xA95,0x71695,0x6CA,0xB55,0x50AB5,0x4DA,0xA5B,0x30A57,0x52B,0x8152A,0xE95,0x6AA,0x615AA,0xAB5,0x4B6,0x414AE,0xA57,0x526,0x31D26,0xD95,0x70B55,0x56A,0x96D,0x5095D,0x4AD,0xA4D,0x41A4D,0xD25,0x81AA5,0xB54,0xB6A,0x612DA,0x95B,0x49B,0x41497,0xA4B,0xA164B, 0x6A5,0x6D4,0x615B4,0xAB6,0x957,0x5092F,0x497,0x64B, 0x30D4A,0xEA5,0x80D65,0x5AC,0xAB6,0x5126D,0x92E,0xC96,0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B, 0x60A57,0x52B,0xA93,0x40E95);
madd[0]=0;
madd[1]=31;
madd[2]=59;
madd[3]=90;
madd[4]=120;
madd[5]=151;
madd[6]=181;
madd[7]=212;
madd[8]=243;
madd[9]=273;
madd[10]=304;
madd[11]=334;
 
function GetBit(m,n){
return (m>>n)&1;
}
function e2c(){
TheDate= (arguments.length!=3) ? new Date() : new Date(arguments[0],arguments[1],arguments[2]);
var total,m,n,k;
var isEnd=false;
var tmp=TheDate.getYear();
if(tmp<1900){
   tmp+=1900;
}
total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38;
 
if(TheDate.getYear()%4==0&&TheDate.getMonth()>1) {
   total++;
}
for(m=0;;m++){
   k=(CalendarData[m]<0xfff)?11:12;
   for(n=k;n>=0;n--){
    if(total<=29+GetBit(CalendarData[m],n)){
     isEnd=true; break;
    }
    total=total-29-GetBit(CalendarData[m],n);
   }
   if(isEnd) break;
}
cYear=1921 + m;
cMonth=k-n+1;
cDay=total;
if(k==12){
   if(cMonth==Math.floor(CalendarData[m]/0x10000)+1){
    cMonth=1-cMonth;
   }   
   if(cMonth>Math.floor(CalendarData[m]/0x10000)+1){
    cMonth--;
   }  
}
}
 
function GetcDateString(){
var tmp="";
//tmp+=tgString.charAt((cYear-4)%10);
//tmp+=dzString.charAt((cYear-4)%12);
//tmp+="(";
//tmp+=sx.charAt((cYear-4)%12);
//tmp+=")年 ";
if(cMonth<1){
   tmp+="(闰)";
   tmp+=monString.charAt(-cMonth-1);
}else{
   tmp+=monString.charAt(cMonth-1);
}
tmp+="月";
tmp+=(cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"三十"));
if (cDay%10!=0||cDay==10){
   tmp+=numString.charAt((cDay-1)%10);
}
return tmp;
}
 
function GetLunarDay(solarYear,solarMonth,solarDay){
//solarYear = solarYear<1900?(1900+solarYear):solarYear;
if(solarYear<1921 || solarYear>2020){
return "";
}else{
   solarMonth = (parseInt(solarMonth)>0) ? (solarMonth-1) : 11;
   e2c(solarYear,solarMonth,solarDay);
   return GetcDateString();
}

}
function timeElapse(today,date){
    var seconds = (Date.parse(today) - Date.parse(date)) / 1000;
    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours;
    }
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds = seconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var result = "第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分钟 <span class=\"digit\">" + seconds + "</span> 秒"; 
    return days
}
var today = new Date()
var together = new Date();
together.setFullYear(2018,9,6);          //时间年月日（月份选择从0-11）
together.setHours(14);                      //小时    
together.setMinutes(30);                    //分钟
together.setSeconds(0);                 //秒前一位
together.setMilliseconds(2);                //秒第二位
var yy=today.getFullYear();
var mm=today.getMonth()+1;
var dd=today.getDate();

function showCal(){
    return GetLunarDay(yy,mm,dd);
} 

var S = {
    init: function () {
        var action = window.location.href,
            i = action.indexOf('?a=');

        S.Drawing.init('.canvas');
        document.body.classList.add('body--ready');

        if (i !== -1) {
            S.UI.simulate(decodeURI(action).substring(i + 3));
        } else {
             S.UI.simulate('#circle|亲爱的|化化小仙女|今天是|'+showCal()+'|我们相识的|第'+timeElapse(today,together)+'天|送你一个|小礼物|#countdown 5|#show', 3000);

           // S.UI.simulate('#show', 3000);
        }

        S.Drawing.loop(function () {
            S.Shape.render();
        });
    }
};



function show() {
    window.location.href = "2.html";
}


S.Drawing = (function () {
    var canvas,
        context,
        renderFn
    requestFrame = window.requestAnimationFrame ||
                   window.webkitRequestAnimationFrame ||
                   window.mozRequestAnimationFrame ||
                   window.oRequestAnimationFrame ||
                   window.msRequestAnimationFrame ||
                   function (callback) {
                       window.setTimeout(callback, 1000 / 60);
                   };

    return {
        init: function (el) {
            canvas = document.querySelector(el);
            context = canvas.getContext('2d');
            this.adjustCanvas();

            window.addEventListener('resize', function (e) {
                S.Drawing.adjustCanvas();
            });
        },

        loop: function (fn) {
            renderFn = !renderFn ? fn : renderFn;
            this.clearFrame();
            renderFn();
            requestFrame.call(window, this.loop.bind(this));
        },

        adjustCanvas: function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        },

        clearFrame: function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
        },

        getArea: function () {
            return { w: canvas.width, h: canvas.height };
        },

        drawCircle: function (p, c) {
            context.fillStyle = c.render();
            context.beginPath();
            context.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true);
            context.closePath();
            context.fill();
        }
    }
}());


S.UI = (function () {
    var input = document.querySelector('.ui-input'),
        ui = document.querySelector('.ui'),
        help = document.querySelector('.help'),
        commands = document.querySelector('.commands'),
        overlay = document.querySelector('.overlay'),
        canvas = document.querySelector('.canvas'),
        interval,
        isTouch = false, //('ontouchstart' in window || navigator.msMaxTouchPoints),
        currentAction,
        resizeTimer,
        time,
        maxShapeSize = 30,
        firstAction = true,
        sequence = [],
        cmd = '#';

    function formatTime(date) {
        var h = date.getHours(),
            m = date.getMinutes(),
        m = m < 10 ? '0' + m : m;
        return h + ':' + m;
    }

    function getValue(value) {
        return value && value.split(' ')[1];
    }

    function getAction(value) {
        value = value && value.split(' ')[0];
        return value && value[0] === cmd && value.substring(1);
    }

    function timedAction(fn, delay, max, reverse) {
        clearInterval(interval);
        currentAction = reverse ? max : 1;
        fn(currentAction);

        if (!max || (!reverse && currentAction < max) || (reverse && currentAction > 0)) {
            interval = setInterval(function () {
                currentAction = reverse ? currentAction - 1 : currentAction + 1;
                fn(currentAction);

                if ((!reverse && max && currentAction === max) || (reverse && currentAction === 0)) {
                    clearInterval(interval);
                }
            }, delay);
        }
    }

    function reset(destroy) {
        clearInterval(interval);
        sequence = [];
        time = null;
        destroy && S.Shape.switchShape(S.ShapeBuilder.letter(''));
    }

    function performAction(value, tsp) {
        var action,
            value,
            current;

        overlay.classList.remove('overlay--visible');
        sequence = typeof (value) === 'object' ? value : sequence.concat(value.split('|'));
        input.value = '';
        checkInputWidth();

        timedAction(
            function (index) {
                current = sequence.shift();
                action = getAction(current);
                value = getValue(current);
                switch (action) {
                    case 'countdown':
                        value = parseInt(value) || 10;
                        value = value > 0 ? value : 10;

                        timedAction(function (index) {
                            if (index === 0) {
                                if (sequence.length === 0) {
                                    S.Shape.switchShape(S.ShapeBuilder.letter(''));
                                } else {
                                    performAction(sequence);
                                }
                            } else {
                                S.Shape.switchShape(S.ShapeBuilder.letter(index), true);
                            }
                        }, 1000, value, true);
                        break;

                    case 'rectangle':
                        value = value && value.split('x');
                        value = (value && value.length === 2) ? value : [maxShapeSize, maxShapeSize / 2];

                        S.Shape.switchShape(S.ShapeBuilder.rectangle(Math.min(maxShapeSize, parseInt(value[0])), Math.min(maxShapeSize, parseInt(value[1]))));
                        break;

                    case 'circle':
                        value = parseInt(value) || maxShapeSize;
                        value = Math.min(value, maxShapeSize);
                        S.Shape.switchShape(S.ShapeBuilder.circle(value));
                        break;
                 
                        

                    case 'time':
                        var t = formatTime(new Date());

                        if (sequence.length > 0) {
                            S.Shape.switchShape(S.ShapeBuilder.letter(t));
                        } else {
                            timedAction(function () {
                                t = formatTime(new Date());
                                if (t !== time) {
                                    time = t;
                                    S.Shape.switchShape(S.ShapeBuilder.letter(time));
                                }
                            }, 1000);
                        }
                        break;
                    case 'calendar':
                        var D=new Date();
                        var yy=D.getFullYear();
                        var mm=D.getMonth()+1;
                        var dd=D.getDate();
                        if (yy<100) yy="19"+yy;
                        t = yy+'年'+GetLunarDay(yy,mm,dd);
                        S.Shape.switchShape(S.ShapeBuilder.letter(t));
                    case 'show':
                        show();
                        break;
                    default:
                        S.Shape.switchShape(S.ShapeBuilder.letter(current[0] === cmd ? 'What?' : current));


                }
            }, tsp, sequence.length);
    }

    function checkInputWidth(e) {
        if (input.value.length > 18) {
            ui.classList.add('ui--wide');
        } else {
            ui.classList.remove('ui--wide');
        }

        if (firstAction && input.value.length > 0) {
            ui.classList.add('ui--enter');
        } else {
            ui.classList.remove('ui--enter');
        }
    }

    function bindEvents() {
        document.body.addEventListener('keydown', function (e) {
            input.focus();

            if (e.keyCode === 13) {
                firstAction = false;
                reset();
                performAction(input.value, 3000);
            }
        });

        input.addEventListener('input', checkInputWidth);
        input.addEventListener('change', checkInputWidth);
        input.addEventListener('focus', checkInputWidth);

        help.addEventListener('click', function (e) {
            overlay.classList.toggle('overlay--visible');
            overlay.classList.contains('overlay--visible') && reset(true);
        });

        commands.addEventListener('click', function (e) {
            var el,
                info,
                demo,
                tab,
                active,
                url;

            if (e.target.classList.contains('commands-item')) {
                el = e.target;
            } else {
                el = e.target.parentNode.classList.contains('commands-item') ? e.target.parentNode : e.target.parentNode.parentNode;
            }

            info = el && el.querySelector('.commands-item-info');
            demo = el && info.getAttribute('data-demo');
            url = el && info.getAttribute('data-url');

            if (info) {
                overlay.classList.remove('overlay--visible');

                if (demo) {
                    input.value = demo;

                    if (isTouch) {
                        reset();
                        performAction(input.value, 3000);
                    } else {
                        input.focus();
                    }
                } else if (url) {
                    //window.location = url;
                }
            }
        });

        canvas.addEventListener('click', function (e) {
            overlay.classList.remove('overlay--visible');
        });
    }

    function init() {
        bindEvents();
        input.focus();
        isTouch && document.body.classList.add('touch');
    }

    // Init
    init();

    return {
        simulate: function (action, tsp) {
            performAction(action, tsp);
        }
    }
}());


S.UI.Tabs = (function () {
    var tabs = document.querySelector('.tabs'),
        labels = document.querySelector('.tabs-labels'),
        triggers = document.querySelectorAll('.tabs-label'),
        panels = document.querySelectorAll('.tabs-panel');

    function activate(i) {
        triggers[i].classList.add('tabs-label--active');
        panels[i].classList.add('tabs-panel--active');
    }

    function bindEvents() {
        labels.addEventListener('click', function (e) {
            var el = e.target,
                index;

            if (el.classList.contains('tabs-label')) {
                for (var t = 0; t < triggers.length; t++) {
                    triggers[t].classList.remove('tabs-label--active');
                    panels[t].classList.remove('tabs-panel--active');

                    if (el === triggers[t]) {
                        index = t;
                    }
                }

                activate(index);
            }
        });
    }

    function init() {
        activate(0);
        bindEvents();
    }

    // Init
    init();
}());


S.Point = function (args) {
    this.x = args.x;
    this.y = args.y;
    this.z = args.z;
    this.a = args.a;
    this.h = args.h;
};


S.Color = function (r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};

S.Color.prototype = {
    render: function () {
        return 'rgba(' + this.r + ',' + +this.g + ',' + this.b + ',' + this.a + ')';
    }
};


S.Dot = function (x, y) {
    this.p = new S.Point({
        x: x,
        y: y,
        z: 5,
        a: 1,
        h: 0
    });

    this.e = 0.07;
    this.s = true;

    this.c = new S.Color(255, 255, 255, this.p.a);

    this.t = this.clone();
    this.q = [];
};

S.Dot.prototype = {
    clone: function () {
        return new S.Point({
            x: this.x,
            y: this.y,
            z: this.z,
            a: this.a,
            h: this.h
        });
    },

    _draw: function () {
        this.c.a = this.p.a;
        S.Drawing.drawCircle(this.p, this.c);
    },

    _moveTowards: function (n) {
        var details = this.distanceTo(n, true),
            dx = details[0],
            dy = details[1],
            d = details[2],
            e = this.e * d;

        if (this.p.h === -1) {
            this.p.x = n.x;
            this.p.y = n.y;
            return true;
        }

        if (d > 1) {
            this.p.x -= ((dx / d) * e);
            this.p.y -= ((dy / d) * e);
        } else {
            if (this.p.h > 0) {
                this.p.h--;
            } else {
                return true;
            }
        }

        return false;
    },

    _update: function () {
        if (this._moveTowards(this.t)) {
            var p = this.q.shift();

            if (p) {
                this.t.x = p.x || this.p.x;
                this.t.y = p.y || this.p.y;
                this.t.z = p.z || this.p.z;
                this.t.a = p.a || this.p.a;
                this.p.h = p.h || 0;
            } else {
                if (this.s) {
                    this.p.x -= Math.sin(Math.random() * 3.142);
                    this.p.y -= Math.sin(Math.random() * 3.142);
                } else {
                    this.move(new S.Point({
                        x: this.p.x + (Math.random() * 50) - 25,
                        y: this.p.y + (Math.random() * 50) - 25,
                    }));
                }
            }
        }

        d = this.p.a - this.t.a;
        this.p.a = Math.max(0.1, this.p.a - (d * 0.05));
        d = this.p.z - this.t.z;
        this.p.z = Math.max(1, this.p.z - (d * 0.05));
    },

    distanceTo: function (n, details) {
        var dx = this.p.x - n.x,
            dy = this.p.y - n.y,
            d = Math.sqrt(dx * dx + dy * dy);

        return details ? [dx, dy, d] : d;
    },

    move: function (p, avoidStatic) {
        if (!avoidStatic || (avoidStatic && this.distanceTo(p) > 1)) {
            this.q.push(p);
        }
    },

    render: function () {
        this._update();
        this._draw();
    }
}


S.ShapeBuilder = (function () {
    var gap = 13,
        shapeCanvas = document.createElement('canvas'),
        shapeContext = shapeCanvas.getContext('2d'),
        fontSize = 500,
        fontFamily = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif';

    function fit() {
        shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
        shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
        shapeContext.fillStyle = 'red';
        shapeContext.textBaseline = 'middle';
        shapeContext.textAlign = 'center';
    }

    function processCanvas() {
        var pixels = shapeContext.getImageData(0, 0, shapeCanvas.width, shapeCanvas.height).data;
        dots = [],
        pixels,
        x = 0,
        y = 0,
        fx = shapeCanvas.width,
        fy = shapeCanvas.height,
        w = 0,
        h = 0;

        for (var p = 0; p < pixels.length; p += (4 * gap)) {
            if (pixels[p + 3] > 0) {
                dots.push(new S.Point({
                    x: x,
                    y: y
                }));

                w = x > w ? x : w;
                h = y > h ? y : h;
                fx = x < fx ? x : fx;
                fy = y < fy ? y : fy;
            }

            x += gap;

            if (x >= shapeCanvas.width) {
                x = 0;
                y += gap;
                p += gap * 4 * shapeCanvas.width;
            }
        }

        return { dots: dots, w: w + fx, h: h + fy };
    }

    function setFontSize(s) {
        shapeContext.font = 'bold ' + s + 'px ' + fontFamily;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function init() {
        fit();
        window.addEventListener('resize', fit);
    }

    // Init
    init();

    return {
        imageFile: function (url, callback) {
            var image = new Image();
            var a = S.Drawing.getArea();

            image.onload = function () {
                shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
                shapeContext.drawImage(this, 0, 0, a.h * 0.6, a.h * 0.6);
                callback(processCanvas());
            };

            image.onerror = function () {
                callback(S.ShapeBuilder.letter('What?'));
            }

            image.src = url;


        },

        circle: function (d) {
            var r = Math.max(0, d) / 2;
            shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
            shapeContext.beginPath();
            shapeContext.arc(r * gap, r * gap, r * gap, 0, 2 * Math.PI, false);
            shapeContext.fill();
            shapeContext.closePath();

            return processCanvas();
        },

        letter: function (l) {
            var s = 0;

            setFontSize(fontSize);
            s = Math.min(fontSize,
                        (shapeCanvas.width / shapeContext.measureText(l).width) * 0.8 * fontSize,
                        (shapeCanvas.height / fontSize) * (isNumber(l) ? 1 : 0.45) * fontSize);
            setFontSize(s);

            shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
            shapeContext.fillText(l, shapeCanvas.width / 2, shapeCanvas.height / 2);

            return processCanvas();
        },

        rectangle: function (w, h) {
            var dots = [],
                width = gap * w,
                height = gap * h;

            for (var y = 0; y < height; y += gap) {
                for (var x = 0; x < width; x += gap) {
                    dots.push(new S.Point({
                        x: x,
                        y: y,
                    }));
                }
            }

            return { dots: dots, w: width, h: height };
        }
    };
}());


S.Shape = (function () {
    var dots = [],
        width = 0,
        height = 0,
        cx = 0,
        cy = 0;

    function compensate() {
        var a = S.Drawing.getArea();

        cx = a.w / 2 - width / 2;
        cy = a.h / 2 - height / 2;
    }

    return {
        shuffleIdle: function () {
            var a = S.Drawing.getArea();

            for (var d = 0; d < dots.length; d++) {
                if (!dots[d].s) {
                    dots[d].move({
                        x: Math.random() * a.w,
                        y: Math.random() * a.h
                    });
                }
            }
        },

        switchShape: function (n, fast) {
            var size,
                a = S.Drawing.getArea();

            width = n.w;
            height = n.h;

            compensate();

            if (n.dots.length > dots.length) {
                size = n.dots.length - dots.length;
                for (var d = 1; d <= size; d++) {
                    dots.push(new S.Dot(a.w / 2, a.h / 2));
                }
            }

            var d = 0,
                i = 0;

            while (n.dots.length > 0) {
                i = Math.floor(Math.random() * n.dots.length);
                dots[d].e = fast ? 0.25 : (dots[d].s ? 0.14 : 0.11);

                if (dots[d].s) {
                    dots[d].move(new S.Point({
                        z: Math.random() * 20 + 10,
                        a: Math.random(),
                        h: 18
                    }));
                } else {
                    dots[d].move(new S.Point({
                        z: Math.random() * 5 + 5,
                        h: fast ? 18 : 30
                    }));
                }

                dots[d].s = true;
                dots[d].move(new S.Point({
                    x: n.dots[i].x + cx,
                    y: n.dots[i].y + cy,
                    a: 1,
                    z: 5,
                    h: 0
                }));

                n.dots = n.dots.slice(0, i).concat(n.dots.slice(i + 1));
                d++;
            }

            for (var i = d; i < dots.length; i++) {
                if (dots[i].s) {
                    dots[i].move(new S.Point({
                        z: Math.random() * 20 + 10,
                        a: Math.random(),
                        h: 20
                    }));

                    dots[i].s = false;
                    dots[i].e = 0.04;
                    dots[i].move(new S.Point({
                        x: Math.random() * a.w,
                        y: Math.random() * a.h,
                        a: 0.3, //.4
                        z: Math.random() * 4,
                        h: 0
                    }));
                }
            }
        },

        render: function () {
            for (var d = 0; d < dots.length; d++) {
                dots[d].render();
            }
        }
    }
}());


S.init();
