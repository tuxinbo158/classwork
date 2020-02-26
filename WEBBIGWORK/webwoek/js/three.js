// 导航栏
      //给li注册鼠标进入事件,让li下面的span top：0  播放音乐
      $(".nav li").mouseenter(function () {
        $(this).children("span").stop().animate({top: 0});
        //播放音乐
        var idx = $(this).index();
//      $(".nav audio").get(idx).load();
//      $(".nav audio").get(idx).play();
      }).mouseleave(function () {
        $(this).children("span").stop().animate({top: 60});
      });
      
      

// 轮播图

   var count = 0;
    
    $(".arrow-right").click(function () {
      count++;
      
      
      if(count == $(".slider li").length){
        count = 0;
      }
      console.log(count);
      //让count渐渐的显示，其他兄弟渐渐的隐藏
      $(".slider li").eq(count).fadeIn(1000).siblings("li").fadeOut(1000);
    });
    
    $(".arrow-left").click(function () {
      count--;
  
      if(count == -1){
        count = $(".slider li").length - 1;
      }
      console.log(count);
      //让count渐渐的显示，其他兄弟渐渐的隐藏
      $(".slider li").eq(count).fadeIn().siblings("li").fadeOut();
    })
//  tab选项卡
$(".tab-item").mouseenter(function () {
        //两件事件
        $(this).addClass("active").siblings().removeClass("active");
        var idx = $(this).index();
        $(".main").eq(idx).addClass("selected").siblings().removeClass("selected");
      });
//我的学习
//思路分析：
          //1. 给所有的span注册点击事件，让当前span的兄弟div显示出来
          $(".groupTitle").click(function () {
            //下一个兄弟：nextElementSibling
            
            //链式编程：在jQuery里面，方法可以一直调用下去。
            $(this).next().slideDown(200).parent().siblings().children("div").slideUp(200);
          });
//        我的日志
//获取需要的元素

  //最外面的div
  var box = my$("box");
  //文字div
  var content = my$("content");
  //装滚动条的div---容器
  var scroll = my$("scroll");
  //滚动条
  var bar = my$("bar");

  //设置滚动条的高度
  //滚动条的高/装滚动条的div的高=box的高/文字div的高
  //滚动条的高=装滚动条的div的高*box的高/文字div的高
  var height = scroll.offsetHeight * box.offsetHeight / content.offsetHeight;
  bar.style.height = height + "px";

  //移动滚动条
  bar.onmousedown = function (e) {
    var spaceY = e.clientY - bar.offsetTop;
    document.onmousemove = function (e) {//移动事件
      var y = e.clientY - spaceY;
      y=y<0?0:y;//最小值
      y=y>scroll.offsetHeight-bar.offsetHeight?scroll.offsetHeight-bar.offsetHeight:y;
      bar.style.top = y + "px";

      //设置鼠标移动的时候,文字不被选中

      window.getSelection? window.getSelection().removeAllRanges():document.selection.empty();

      //滚动条的移动距离/文字div的移动距离=滚动条最大的移动距离/文字div的最大移动距离

      //文字div的移动距离=滚动条的移动距离*文字div的最大移动距离/滚动条最大的移动距离

      var moveY=y*(content.offsetHeight-box.offsetHeight)/(scroll.offsetHeight-bar.offsetHeight);
      //设置文字div的移动距离
      content.style.marginTop=-moveY+"px";




    };
  };

  document.onmouseup=function () {
    //鼠标抬起的时候,把移动事件干掉
    document.onmousemove=null;
  };
