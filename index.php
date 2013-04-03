<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Signature-Maker</title>
		<link type="text/css" rel="stylesheet" href="assets/bootstrap.min.css">
		<link type="text/css" rel="stylesheet" href="assets/sm.css">
		<script src="assets/jquery.min.js"></script>
		<script src="assets/bootstrap.min.js"></script>
		<script src="assets/font.js"></script>
		<script src="assets/painter.min.js"></script>
		<script src="assets/sm.js"></script>
	</head>
	<body>
		<div class="container">
			<h2>邮件签名生成工具</h2>
			<div class="row">
				<div class="span12 padding10">
					<img src="assets/face-default.png" id="imgFace">
					<button class="btn" type="button" id="selectFace">选择头像</button>
				</div>
			</div>
			<div class="row">
				<div class="span12 padding10">
					<button class="btn btn-primary" type="button" id="make">生成签名</button>
				</div>
			</div>
			<div class="row">
				<div class="span12 padding10">
					<div id="outbox"></div>
				</div>
			</div>
		</div>
		
		<div id="smbox" style="display:none;"></div>
		<input type="file" id="fileFace" style="visibility: hidden;" accept="image/*">
	</body>
</html>