<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Webkit CSS 阻塞渲染</title>
	<link rel="stylesheet" href="css1.php">
	<link rel="stylesheet" href="css2.php">
	<link rel="stylesheet" href="css3.php">
</head>
<body>
	

	<h2>结论：css不论直接link或者异步加载，均要等最后一个加载完成后，页面才会统一渲染。</h1>

	<h3>默认加载前3个</h2>
	<div class="class1">class1，显示为绿色，延迟2秒</div>
	<div class="class2">class2，显示为灰色，延迟3秒</div>
	<div class="class3">class3，显示为红色，延迟5秒</div>
	<br><br><br>
	<p><button id="btn">点击，加载后三个</button></p>
	<div class="class4">class4，显示为紫色，延迟2秒</div>
	<div class="class5">class5，显示为粉色，延迟3秒</div>
	<div class="class6">class6，显示为蓝色，延迟5秒</div>
	<script src="when.js"></script>
	<script>
	var cssList = ['css4.php', 'css5.php', 'css6.php'],
		base = "/";

	var log = function(msg) {
		console.log(msg);
	};

	var loadCss = function(i) {
		var defererd = when.defer();

		var link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		var css = cssList[i];
		link.onload = function() {
			log(css + ' is ok.');
			defererd.resolve();
		};
		link.href =  css;

		document.getElementsByTagName('head')[0].appendChild(link);

		return defererd.promise;
	};


	document.getElementById('btn').onclick = function() {
		this.disabled = true;

		var date = new Date();

		when.all([loadCss(0), loadCss(1), loadCss(2)]).then(function() {
			log('all done.');
			log('time:' + (new Date - date));
		});

		/* 串行加载就没这个问题。
		loadCss(0).then(function() {
			return loadCss(1);
		}).then(function() {
			return loadCss(2);
		}).then(function() {
			log('all done.');
			log('time:' + (new Date - date));
		});
		*/
	};
	</script>

	<?php 
		sleep(10);
		print_r('<div class="class1">class1，显示为绿色，延迟2秒</div>
	<div class="class2">class2，显示为灰色，延迟3秒</div>
	<div class="class3">class3，显示为红色，延迟5秒</div>');

	 ?>
	
</body>
</html>