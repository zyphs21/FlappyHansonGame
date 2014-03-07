<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <meta charset="utf-8" />
    
  	<title>Flappy Hanson</title>

  <style>
    #game_div, p 
    {
      width: 400px;
      margin: auto;
      margin-top: 20px;
    }
  </style>

  <script type="text/javascript" src="js/phaser.min.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
  </head>
  
  <body>
    <p> FlappyHanson 按下空格键来跳跃 </p>
  	<div id="game_div"> </div>
  	<p>学习原文转载于: <a href="http://blog.lessmilk.com/how-to-make-flappy-bird-in-html5-1/" target="windw_name">lessmilk的博客</a>
  				<a href="http://www.lessmilk.com/" target="windw_name">leesmilk博客主页</a>
  	</p>
  	<p></p>
  </body>
</html>
