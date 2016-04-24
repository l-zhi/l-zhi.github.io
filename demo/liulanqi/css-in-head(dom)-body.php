<!DOCTYPE HTML>
<html>  
 <head>  
  <meta http-equiv="content-type" content="text/html; charset=utf-8">  
  <title> 浏览器渲染机制 </title>
  <link rel="stylesheet" href="css/style.css"/>
  <link rel="stylesheet" href="proxy/style.php"/>
 </head>
 <body>
  <p class="p1"></p>
  <p class="p2"></p>
  <p class="p3"></p>
  <h3>css 都放在头部，并且后面的 css 延迟 6s, html为1000000的p标签循环输出（模拟大的dom）。 </h3>
  <p><strong>结论</strong>：ie和chrome dom很大的时候会当css加载完成就构建render tree 而不需要等待所有的dom加载完成。</p>
  <pre>
  &lt;!DOCTYPE HTML&gt;
  &lt;html&gt;
   &lt;head&gt;
    &lt;meta http-equiv="content-type" content="text/html; charset=utf-8"&gt;
    &lt;title&gt; 浏览器渲染机制 &lt;/title&gt;
    &lt;link rel="stylesheet" href="css/style.css"/&gt;
    &lt;link rel="stylesheet" href="proxy/style.php"/&gt;
   &lt;/head&gt;
   &lt;body&gt;
    &lt;p class="p1"&gt;&lt;/p&gt;
    &lt;p class="p2"&gt;&lt;/p&gt;
    &lt;p class="p3"&gt;&lt;/p&gt;
    &lt;?php
      for ($i=0; $i &lt; 1000000; $i++) {
          print_r("&lt;p class='p1'&gt;&lt;/p&gt;");
      }
      echo 'END';
    ?&gt;
  </pre>

    <?php
      for ($i=0; $i < 1000000; $i++) {
          print_r("<p class='p1'></p>");
      }
      echo 'END';
    ?>

 </body>
</html>