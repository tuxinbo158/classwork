
//获取超链接,注册点击事件,显示登录框和遮挡层
  my$("link").onclick = function () {
    my$("login").style.display = "block";
    my$("bg").style.display = "block";
  };

  //获取关闭,注册点击事件,隐藏登录框和遮挡层
  my$("closeBtn").onclick = function () {
    my$("login").style.display = "none";
    my$("bg").style.display = "none";
  };

  //按下鼠标,移动鼠标,移动登录框
  my$("title").onmousedown = function (e) {
    //获取此时的可视区域的横坐标-此时登录框距离左侧页面的横坐标
    var spaceX = e.clientX - my$("login").offsetLeft;
    var spaceY = e.clientY - my$("login").offsetTop;
    //移动的事件
    document.onmousemove = function (e) {
      //新的可视区域的横坐标-spaceX====>新的值--->登录框的left属性
      var x = e.clientX - spaceX+250;
      var y = e.clientY - spaceY-140;
      my$("login").style.left = x + "px";
      my$("login").style.top = y + "px";

    }
  };

  document.onmouseup=function () {
    document.onmousemove=null;//当鼠标抬起的时候,把鼠标移动事件干掉
  };
