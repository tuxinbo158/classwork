<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!--引用标签库，前缀设置为c-->
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-CN">

	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>学生登录</title>

		<!-- 1. 导入CSS的全局样式 -->
		<link href="../css/bootstrap.min.css" rel="stylesheet">
		<!-- 2. jQuery导入，建议使用1.9以上的版本 -->
		<script src="../js/jquery-3.3.1.js"></script>
		<!-- 3. 导入bootstrap的js文件 -->
		<script src="../js/bootstrap.min.js"></script>
		<!-- 1. 导入CSS的全局样式 -->
		<link href="./css/bootstrap.min.css" rel="stylesheet">
		<!-- 2. jQuery导入，建议使用1.9以上的版本 -->
		<script src="./js/jquery-3.3.1.js"></script>
		<!-- 3. 导入bootstrap的js文件 -->
		<script src="./js/bootstrap.min.js"></script>
	</head>

	<body>
		<div class="container" style="width: 400px;">
			<h3 style="text-align: center;">学生登录</h3>
			<form action="${pageContext.request.contextPath}/loginServlet" method="post">
				<div class="form-group">
					<label for="user">用户名：</label>
					<input type="text" name="stulogid" class="form-control" id="user" placeholder="请输入用户名" value="${cookie.stulogid.value}" id="stu"/>
				</div>
				<div class="form-group">
					<label for="password">密码：</label>
					<input type="password" name="password" class="form-control" id="password" placeholder="请输入密码" value="${cookie.password.value}" id="psd"/>
				</div>

				<div class="form-inline">
					<label for="vcode">验证码：</label>
					<input type="text" name="verifycode" class="form-control" id="verifycode" placeholder="请输入验证码" style="width: 120px;" />
					<a href="javascript:refreshCode();">
						<img src="${pageContext.request.contextPath}/checkCodeServlet" title="看不清点击刷新" id="vcode" />
					</a>
					<a onclick="add()">修改密码</a>
				</div>
				<input type="checkbox" name="check" ${cookie.check.value eq "on"? "checked": ""}/>记住账号
				<hr/>
				<div class="form-group" style="text-align: center;">
					<input class="btn btn btn-primary" type="submit" value="登录">
				</div>
			</form>

			<!-- 出错显示的信息框 -->
			<div class="alert alert-warning alert-dismissible" role="alert">
				<button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
        </button>
				<strong>${login_msg}</strong>
			</div>
						<!-- 模态框（Modal） -->
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog" style="width:500px">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">修改密码</h4>
						</div>
						<div class="modal-body">
							<form id="form2">
							          账号：<input type="number" name="stulogid" class="form-control" id="stulogid">
							          <div><span id="span1"></span></div>
								原密码：<input type="password" name="oldpassword" class="form-control" id="oldpassword">
									  <div><span id="span2"></span></div>
								新密码： <input type="text"class="form-control" id="newpassword1">
								确认密码：<input type="text" name="newpassword" class="form-control" id="newpassword2">
									<div><span id="span3"></span></div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
							<button type="button" class="btn btn-primary" onclick="save()">确认修改</button>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal -->
			</div>
			<script type="text/javascript">
			$(function() {
				$("#stulogid").blur(function() {
					var stulogid = $("#stulogid").val();
					$.post("/EmploymentForStudents/updatePassword", {
						stulogid: stulogid
					}, function(data) {
							if(data.userExsit) {
								$("#span1").css("color", "green");
								$("#span1").html(data.msg1);
							} else {
								$("#span1").css("color", "red");
								$("#span1").html(data.msg1);
							}
					});
				});
				$("#oldpassword").blur(function() {
					//获取username文本输入框的值
					var oldpassword = $("#oldpassword").val();
					var stulogid = $("#stulogid").val();
					if($("#span1").css("color") != "rgb(0, 128, 0)"){
						alert("请先确认账号");
						return;
					}
					$.post("/EmploymentForStudents/updatePassword", {
						stulogid: stulogid,oldpassword: oldpassword
					}, function(data) {
							if(data.passTrue) {
								//用户名存在
								$("#span2").css("color", "green");
								$("#span2").html(data.msg2);
							} else {
								//用户名不存在
								$("#span2").css("color", "red");
								$("#span2").html(data.msg2);
							}
					});
				});
				$("#newpassword2").blur(function() {
					var stulogid = $("#stulogid").val();
					var newpassword1 = $("#newpassword1").val();
					var newpassword2 = $("#newpassword2").val();
					if($("#span1").css("color") != "rgb(0, 128, 0)"){
						alert("请先确认账号");
						return;
					}
					if($("#span2").css("color") != "rgb(0, 128, 0)"){
						alert("请先确认原密码");
						return;
					}
					if(newpassword1 == $('#oldpassword').val()){
						alert("与原密码一致，请重新设置");
						return;
					}
					if (newpassword1 != newpassword2) {
						$("#span3").css("color", "red");
						$("#span3").html("两次密码不一致");
						return;
					}else {
						$("#span3").css("color", "green");
						$("#span3").html("");
					}
				});
			});
				//切换验证码
				function refreshCode() {
					//1.获取验证码图片对象
					var vcode = document.getElementById("vcode");
					//2.设置其src属性，加时间戳
					$('#vcode')[0].src = "${pageContext.request.contextPath}/checkCodeServlet?time=" + new Date().getTime();
				}
				function add() {
					$('#form2')[0].reset();
					$('#form2 span').html("");
					$('#myModal').modal('show');
				}
				
				function save() {
					var stulogid = $("#stulogid").val();
					var newpassword1 = $("#newpassword1").val();
					var newpassword2 = $("#newpassword2").val();
					if ($("#span2").css("color") != "rgb(0, 128, 0)" || $("#span3").css("color") != "rgb(0, 128, 0)" || $("#span1").css("color") != "rgb(0, 128, 0)") {
						alert("请确认填写信息无误后提交！")
						return;
					}
					if(!confirm("确定修改吗？"))
						return;
					$.post("/EmploymentForStudents/updatePassword", {
						stulogid: stulogid,newpassword: newpassword2
					}, function(data) {
							if(data.updateTrue) {
								alert("保存成功!");
								$('#myModal').modal('hide');
								$("#stu").val(stulogid);
								$("#psd").val(newpassword2);
							} else {
								alert("保存失败!");
							}
					});

				}
			</script>
		</div>
	</body>

</html>