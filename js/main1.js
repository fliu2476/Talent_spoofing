// var tag = $('.carousel-container ul'); //获取轮播图更改left值的目标
// var tagLi = tag.find('li'); //获取轮播图中的一页
// var sWidth = parseInt(tagLi.css('width')); //获取轮播图单页的宽度
// var len = tagLi.length; //获取轮播图的页数
// var nextBtn = $(".next-btn"); //向下翻页按钮
// var preBtn = $(".pre-btn");  //向上翻页按钮
// var btn = $(".btn-group li");
// var index = 0;
// var timer;
//
//
// $(".carousel").hover(function () {
//    clearInterval(timer);
// },function () {
//     timer = setInterval(function () {
//         scroll(index);
//         index++;
//         if (index == len) {
//             index=0;
//         }
//     },3000)
// }).trigger('mouseleave');
//
//
// function scroll(index) {
//     var nowLeft = -index*sWidth;
//     if (!tag.is(":animated")){
//         tag.animate({'left':nowLeft},1000);
//         btn.filter(".active").removeClass("active");
//         btn.eq(index).addClass("active");
//     }
//
// }
//
// nextBtn.click(function () {
//     if (!tag.is(":animated")){
//         ++index;
//         if (index==len){
//             index=0;
//         }
//         scroll(index);
//     }
//
// });
//
// preBtn.click(function () {
//     if(!tag.is(":animated")){
//         --index;
//         if (index==-1){
//             index=len-1;
//         }
//         scroll(index);
//     }
//
// });
//
// btn.click(function () {
//    index = $(this).index();
//     scroll(index);
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
   if(!oUl.is(":animated")){
       i++;
       move();
   }
});

/**
 * 上一页
 */
pre.click(function () {
   if(!oUl.is(":animated")){
       i--;
       move();
   }
});

/**
 * 点击小圆点跳转到对应页
 */
$(".btn-group li").click(function () {
   if(!oUl.is(":animated")){
       i=$(this).index();
       move();
   }
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
    oUl.animate({left:-i * sWidth + 'px'},1000);
    if(i==len-1){
        $(".btn-group li").eq(0).addClass("active").siblings().removeClass("active");
    }else {
        $(".btn-group li").eq(i).addClass("active").siblings().removeClass("active");
    }
}












// console.log(slideNum);
// console.log(tag);
// console.log(halfV);
/**
 * 翻页函数
 */
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



/**
 * 自动轮播
 */
// function carouselMove() {
//     timer = setInterval(function () {
//         scroll();
//     }, 3000);
// }
/**
 * 鼠标移入，停止轮播
 */
// $(".carousel").hover(function () {
//     console.log("鼠标移入");
//     clearInterval(timer);
//     // console.log(timer);
// },function () {
//     carouselMove();
// });

/**
 * 鼠标点击翻页
 */

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
$(".person .item").click(function () {
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

$(document).ready(function () {
    carouselMove();
});