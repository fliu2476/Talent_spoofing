/**
 * Created by Franck Liu on 2016/7/9 0009.
 */
// var timer = null;
// $(".carousel-container ul li").clone(true).appendTo(".carousel-container ul");
// var tag = $('.carousel-container ul'); //获取轮播图更改left值的目标
// var tagLi = tag.find('li'); //获取轮播图中的一页
// var initLeft = parseInt(tag.css('left')); //获取轮播中ul的初始left值
// var deltValue = parseInt(tagLi.css('width')); //获取轮播图单页的宽度
// var slideNum = tagLi.length; //获取轮播图的页数
// var nextBtn = $(".next-btn"); //向下翻页按钮
// var preBtn = $(".pre-btn");  //向上翻页按钮
//
//
// // console.log(slideNum);
// // console.log(tag);
// // console.log(halfV);
// /**
//  * 翻页函数
//  */
// function scrollPage(index) {
//     var curLeft = parseInt(tag.css("left"));
//     var targetValue = curLeft + index * deltValue;
//     var halfV = -deltValue*slideNum/2;
//     // console.log(targetValue);
//     // console.log(-halfV);
//     // console.log(halfV);
//     if(targetValue < halfV ) {
//         tag.css("left", initLeft + 'px');
//         curLeft = parseInt(tag.css("left"));
//         targetValue = curLeft + index * deltValue;
//     }
//     else if(targetValue > 0){
//         tag.css("left", halfV + 'px');
//         curLeft = parseInt(tag.css("left"));
//         targetValue = curLeft + index * deltValue;
//     }
//     if (!tag.is(":animated")){
//         tag.animate({"left":targetValue + 'px'},1000);
//     }
// }
//
// /**
//  * 自动轮播
//  */
// function carouselMove() {
//     timer = setInterval(function () {
//         scrollPage(-1);
//     }, 3000);
// }
// /**
//  * 鼠标移入，停止轮播
//  */
// $(".carousel").hover(function () {
//     console.log("鼠标移入");
//     clearInterval(timer);
//     console.log(timer);
// },function () {
//     carouselMove();
// });
//
// /**
//  * 鼠标点击翻页
//  */
//
// nextBtn.click(function () {
//     if(!tag.is(":animated")) {
//         scrollPage(-1);
//     }
//
// });
// preBtn.click(function () {
//    if (!tag.is(":animated")){
//        scrollPage(1);
//    }
// });

var oUl = $(".carousel-container ul");
var oLi = $(".carousel-container ul li");
var sWidth = parseInt(oLi.css("width"));
oLi.first().clone().appendTo(oUl);
var len = $(".carousel-container ul li").length;
var nxt = $(".carousel .next-btn");
var pre = $(".carousel .pre-btn");
var timer = null;
var i=index=0;

/**
 * 自动轮播
 */

timer = setInterval(function () {
    i++;
    move();
},3000);

/**
 * 移入、移出
 */
$(".carousel").hover(function () {
    clearInterval(timer);
},function () {
    timer = setInterval(function () {
        i++;
        move();
    },3000);
});

/**
 * 下一页
 */
nxt.click(function () {
        i++;
        move();
});

/**
 * 上一页
 */
pre.click(function () {
        i--;
        move();
});

/**
 * 点击小圆点跳转到对应页
 */
$(".btn-group li").click(function () {
        i=$(this).index();
        move();
});


/**
 * 移动函数
 */
function move() {
    if(i==len){
        oUl.css("left",0);
        i=1;
    }
    else if(i==-1){
        oUl.css("left",-(len-1) * sWidth + 'px');
        i=len-2;
    }
    oUl.stop().animate({left:-i * sWidth + 'px'},500);
    if(i==len-1){
        $(".btn-group li").eq(0).addClass("active").siblings().removeClass("active");
    }else {
        $(".btn-group li").eq(i).addClass("active").siblings().removeClass("active");
    }
}

/**
 * 公共头部划过li显示上边框
 */
var liIndex = $("header").find(".active").index();
//console.log(liIndex);
$("header li").hover(function () {
   $(this).addClass("active").siblings().removeClass("active");
},function () {
    // console.log( $("header").eq(liIndex));
    $("header li").eq(liIndex).addClass("active").siblings().removeClass("active");
});

/**
 * recent project. 鼠标滑过显示文字按钮
 */
// $(".recent-proj .re-item").mouseenter(function () {
//     $(this).parent().find(".active").removeClass("active");
//     $(this).addClass("active");
// });
$(".recent-proj").on("mouseover",".re-item",function () {
    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
});

/**
 * Test. 鼠标滑过点亮头像
 */
$(".person .item").hover(function () {
   $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
    var index = $(this).index();
    // console.log(index);
    $(".proj-info-wrapper").find(".active").removeClass("active");
    $(".proj-info").eq(index).addClass("active");
});

/**
 * 点击更多加载图片
 */
var oData ='';
$.ajax({
   url: 'json/recent.json',
    success: function (data) {
        oData = data;
        // console.log(oData);
    },
    error: function () {
        console.log("Can't find json file");
    }
});

var num = 0;
$(".btn-more").on('click',function () {
    console.log(oData[0].img);
    $(this).text(' ');
    $(".spinner").addClass('active');
    if(num >=oData.length){
        $(".btn-more").text('Load More');
        $(".spinner").removeClass('active');
        alert("There's no more pic");
    }else {
        setTimeout(function () {
            setInterval(function(){
                $(".item-wrapper").append('<div class="re-item animated fadeIn"><img src="img/'+oData[num].img+'" alt=""><div class="cotain"></div><div class="text"><h3>Billboards</h3><p>Lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.</p><button>See project details</button></div></div>');
                num++;
            }, 300);
            $(".btn-more").text('Load More');
            $(".spinner").removeClass('active');
        },1000);

        // console.log(oData[0].t1);
    }
});

/**
 * facebook,twitter等滑过显示tips
 */
var tips = $(".tips");
var aLink = $(".follow-group a");
var aWidth = aLink.outerWidth();
var marginR = parseInt(aLink.css("margin-right"));
var curLeft = parseInt(tips.css("left"));
var index=0;
var timer1 = null;
aLink.hover(function () {
    clearTimeout(timer1);
    index = $(this).index();
    var txt = $(this).attr("data-text");
    console.log(txt);
    var tarLeft = curLeft + index * (aWidth+marginR);
    tips.text('Follow me on ' + txt);
    tips.css("left", tarLeft + 'px').fadeIn();
},function () {
    timer1 = setTimeout(function () {
        tips.fadeOut('fast');
    },600);
});

tips.hover(function () {
    clearTimeout(timer1);
    tips.css("display","block");
},function () {
    tips.css("display","none");
});