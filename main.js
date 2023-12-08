
//  ------------------ 判断显示内容 & 倒计时 -------------
// start time
const TARGET_HOUR = 19;
const TARGET_MIN = 0;
const NAME = 'name';
const NAME_ABBR = 'name-abbreviation';

document.addEventListener('DOMContentLoaded', function () {
    // 获取当前时间
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    // 设定限制时间
    var limitHour = TARGET_HOUR;
    var limitMinute = TARGET_MIN;

    // 获取需要显示的元素
    var treeElement = document.getElementById('tree');
    var titleElement = document.querySelector('.title');
    var poemElement = document.querySelector('.poem');
    var remainingTimeElement = document.getElementById('remainingTime');

    // 判断当前时间
    if (hours < limitHour || (hours === limitHour && minutes < limitMinute)) {
        // 显示装饰中的消息
        updateRemainingTime(); // 初始化显示
        setInterval(updateRemainingTime, 1000); // 每秒更新一次
        treeElement.style.display = 'none';
        titleElement.style.display = 'none';
        poemElement.style.display = 'none';
    } else {
        // 显示圣诞树和其他元素
        remainingTimeElement.style.display = 'none';
        document.getElementById('message').style.display = 'none';
        treeElement.style.display = 'block';
        titleElement.style.display = 'block';
        poemElement.style.display = 'block';
    }
});

// 更新剩余时间
function updateRemainingTime() {
    var currentTime = new Date();
    var targetTime = new Date();
    targetTime.setHours(TARGET_HOUR, TARGET_MIN, 0, 0); // 设置目标时间为每天19:00:00

    var timeDifference = targetTime - currentTime;

    if (timeDifference > 0) {
        var remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
        var remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        var remainingTime = `${remainingHours}小时${remainingMinutes}分钟${remainingSeconds}秒`;
        document.getElementById('remainingTime').innerText = remainingTime;
    } else {
        // 清除定时器
        clearInterval(intervalId);
        // 显示圣诞树和其他元素
        document.getElementById('remainingTime').style.display = 'none';
        document.getElementById('tree').style.display = 'block';
        document.querySelector('.title').style.display = 'block';
        document.querySelector('.poem').style.display = 'block';
    }
}

// 圣诞树
var greeting = [
    'printf("{0}");',
    'cout << "{0}" << endl;',
    'WriteLn("{0}");',
    // 'System.out.println( "{0}" );',  // jvav
    'print "{0}"',
    'fmt.Println("{0}");',
    'echo "{0}"',
    'say "{0}"',
    'print("{0}");',
    '(print "{0}")',
    'PRINT "{0}"',
    // '<%= "{0}" %>',
    // 'System.Console.WriteLine("{0}");',
    'console.log("{0}");',
    'document.write("{0}")',
];

var year = new Date().getFullYear()+1;
var str = ["Merry Christmas!", "圣诞快乐！", '圣诞快乐，' + NAME + '!', 
    'Merry Christmas, ' + NAME_ABBR + '!', 'Hello, ' + NAME_ABBR];

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
        });
    };
}

function transform( element, value ) {
    element.style.WebkitTransform = value;
    element.style.MozTransform = value;
    element.style.msTransform = value;
    element.style.OTransform = value;
    element.style.transform = value;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function createBranch(width, height) {
    div = document.createElement( 'div' );
    span = document.createElement( 'span' );

    s = greeting[getRandom(0, greeting.length - 1)].format(str[getRandom(0, str.length - 1)]);
    
    text = document.createTextNode(s); 

    div.setAttribute("id", "branch");
    div.setAttribute("class", "christmas");
    span.setAttribute("id", "text");
    
    span.appendChild(text);
    div.appendChild(span);

    div.style.width = width + 'px';
    div.style.height = height + 'px';
    var green = 50+Math.ceil(Math.random() * 200);
    var other = Math.ceil(Math.random() * 50);
    //console.log("rgba("+other+","+green+","+other+", 1)");
    div.style.backgroundColor = "rgba("+other+","+green+","+other+", 1)";
    //div.style.position = "relative";
    return div;
}

var width = 500;
var height = 600;
var tree = document.getElementById("tree");
tree.style.width = width + 'px';
tree.style.height = height + 'px';
//tree.style.margin = "auto";
//tree.style.background = "#fefefe";

for ( i = 0; i<300; i++) {
    var top_margin = 70;
    var x = width/2;
    var y = Math.round( Math.random() * height ) + top_margin;
    var rx = 0;
    var ry = Math.random() * 360;
    var rz = 0;//-Math.random() * 15;
    var elementWidth = 15 + ( ( (y - top_margin ) / height ) * width / 1.8 );
    var elementHeight = 26;

    //console.log(x, y, rx, ry, rz, elementWidth,  elementHeight)
    var div =  createBranch(elementWidth, elementHeight);

    transform(div, 'translate3d('+x+'px, '+y+'px, 0px) rotateX('+rx+'deg) rotateY('+ry+'deg) rotateZ('+rz+'deg)');
    tree.appendChild( div ); 
}
