<?php
	//参数未做容错，保证前台提交正确即可

	$name = $_POST['name'].'.png';
	$img = base64_decode($_POST['code']);

	header("Content-type: image/png"); 
	header('Content-Disposition: attachment;filename="'.$name.'"'); 

	echo $img;