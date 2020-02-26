      $(function () {
        $("#left>li").mouseenter(function () {
          $("#center>li:eq(" + $(this).index() + ")").show().siblings().hide();
        });
        $("#right>li").mouseenter(function () {
          $("#center>li").eq($(this).index() + 9).show().siblings().hide();
        });
//      焦点图部分
$(".wrap>ul>li").mouseenter(function () {
        
        $(this).css("opacity", "1").siblings().css("opacity", "0.4");
      });
      
      $(".wrap").mouseleave(function () {
        //让所有的li都变亮
        //$("li");
        //$(".wrap li");
        //$(".wrap>ul>li")
        
        //$(this).children().children("li");
        $(this).find('li').css("opacity", 1);
      });
//    手风琴部分
$(function () {
  var colors;

    $("#box").accordion(colors, 20);

  });
$.fn.accordion = function (colors, width) {
  colors = colors || [];
  width = width || 0;


  var $li = this.find("li");

  var boxLength = this.width();
  var maxLength = boxLength - ($li.length - 1) * width;
  var avgLength = boxLength / $li.length;

  //更改li的颜色
  $li.each(function (i, e) {
    $(e).css("backgroundColor", colors[i]);
  });

  //给li注册鼠标经过事件
  $li.on("mouseenter", function () {
    $(this).stop().animate({width: maxLength}).siblings().stop().animate({width: width})
  });

  $li.on("mouseleave", function () {
    $li.stop().animate({width: avgLength});
  });
};
      })