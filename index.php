<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Signature-Maker</title>
		<link type="text/css" rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
		<link type="text/css" rel="stylesheet" href="assets/imageareaselect/css/imgareaselect-animated.css" />
		<link type="text/css" rel="stylesheet" href="assets/sm.css">
		<script src="assets/jquery.min.js"></script>
		<script src="assets/imageareaselect/js/jquery.imgareaselect.pack.js"></script>
		<script src="assets/font.js"></script>
		<script src="assets/painter.min.js"></script>
		<script src="assets/sm.js"></script>
	</head>
	<body>
		<div class="container" id="makerbox">
			<h2>邮件签名生成</h2>
			<div class="row">
				<div class="span2">
					Step1.您的名字
				</div>
				<div class="span10">		
					<input type="text" placeholder="真名" id="rname">
					<input type="text" placeholder="花名" id="fname">
				</div>
			</div>
			<div class="row">
				<div class="span2">
					Step2.设置照片
				</div>
				<div class="span10">		
					<img src="assets/face-default.png" id="imgFace">
					<button class="btn" type="button" id="selectFace">选择照片</utton>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					Step3.选择部门
				</div>
				<div class="span10">		
					<select id="department">
						<option>淘宝大学</option>
						<option>淘宝大学-在线培训中心</option>
						<option>淘宝大学-在线培训中心-点播课程</option>
						<option>淘宝大学-在线培训中心-分享者社区</option>
						<option>淘宝大学-在线培训中心-淘工作</option>
						<option>淘宝大学-在线培训中心-直播访谈</option>
						<option>淘宝大学-在线培训中心-网站产品</option>
						<option>淘宝大学-在线培训中心-网站产品-PD</option>
						<option>淘宝大学-在线培训中心-网站产品-UED</option>
					</select>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					Step4.填写座机
				</div>
				<div class="span10">		
					<input type="text" placeholder="座机号码" id="tel">
					<input type="text" placeholder="分机号码" id="telsub">
				</div>
			</div>
			<div class="row">
				<div class="span2">
					Step5.填写手机
				</div>
				<div class="span10">		
					<input type="text" placeholder="手机号码" id="phone">
				</div>
			</div>
			<div class="row">
				<div class="span12">
					<button class="btn btn-primary btn-large" type="button" id="make">生成签名</button>
					<button class="btn btn-primary btn-large" type="button" id="down" style="display:none;">下载签名</button>
				</div>
			</div>
			<div class="row">
				<div class="span12">
					<div id="outbox"></div>
				</div>
			</div>
		</div>
		
		<div id="mask" class="mask"></div>
		<div id="pop" class="pop modal">
			<div class="modal-header">
				<button type="button" class="close h-close" data-dismiss="modal" aria-hidden="true">×</button>
				<h3>选取照片区域</h3>
			</div>
			<div class="modal-body">
				<div class="photobox">
					<div class="photobg">
						<img src="" id="imgPhoto">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="#" class="btn btn-primary" id="imgSelectOk">确定</a>
				<a href="#" class="btn h-close">取消</a>
			</div>
		</div>
		
		<div id="smbox" style="display:none;"></div>
		<form id="fileForm" style="display:none"><input type="file" id="fileFace" style="visibility: hidden;" accept="image/*"></form>
		<form id="fileDown" action="download.php" method="post" style="display:none"><input type="hidden" name="code"><input type="hidden" name="name" value="邮件签名图"></form>
	</body>
</html>