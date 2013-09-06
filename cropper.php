<?php
	
	//参数未做容错，保证前台提交正确即可

	$dw = $_POST['dw'];
	$dh = $_POST['dh'];
	$w = $_POST['w'];
	$h = $_POST['h'];
	$x = $_POST['x'];
	$y = $_POST['y'];

	$img = base64_decode($_POST['code']);

	$img_d = imagecreatetruecolor($dw, $dh);
	$img_s = imagecreatefromstring($img);
	imagecopyresampled($img_d, $img_s, 0, 0, $x, $y, $dw, $dh, $w, $h);

	ob_start();
	imagepng($img_d);
	$contents = ob_get_contents();
	ob_end_clean();

	echo json_encode(array('code'=>base64_encode($contents)));

	imagedestroy($img_d);