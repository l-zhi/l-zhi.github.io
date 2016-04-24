<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
 <head>  
  <meta http-equiv="content-type" content="text/html; charset=utf-8">  
  <title> 浏览器渲染机制 </title>
  <link rel="stylesheet" href="css/style.css?1234"/>
 </head>
 <?php cache_flush(2) ?>
 <body>    
  <p class="p1"></p>

  <?php cache_flush(2); ?>
  <p class="p2"></p>
  <?php cache_flush(2); ?>
  <p class="p3"></p>
    <link rel="stylesheet" href="proxy/style.php?123123"/>
 </body>
</html>

<?php  
function cache_flush($sec){
    ob_flush();  
    flush();  
    sleep($sec);
}
?>