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
      
      //节流阀  ：按下的时候，触发，如果没弹起，不让触发下一次
      //1. 定义一个flag
      var flag = true;
      
      
      //按下1-9这几个数字键，能触发对应的mouseenter事件
      $(document).on("keydown", function (e) {
        if(flag) {
          flag = false;
          //获取到按下的键
          var code = e.keyCode;
          if(code >= 49 && code <= 57){
            //触发对应的li的mouseenter事件
            $(".nav li").eq(code - 49).mouseenter();
          }
        }
       
      });
  
      $(document).on("keyup", function (e) {
        flag = true;
        
        //获取到按下的键 //弹起的时候，触发mouseleave事件
        var code = e.keyCode;
        if(code >= 49 && code <= 57){
          //触发对应的li的mouseenter事件
          $(".nav li").eq(code - 49).mouseleave();
        }
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
      $(".slider li").eq(count).fadeIn().siblings("li").fadeOut();
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