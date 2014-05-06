<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>邮件签名工具</title>
		<link type="text/css" rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
		<link type="text/css" rel="stylesheet" href="assets/sm.css">
		<script src="assets/jquery.min.js"></script>
		<script src="assets/painter.min.js"></script>
		<script src="assets/sm.js"></script>
	</head>
	<body>
		<div class="wrap">
			<h2>邮件签名生成工具</h2>
			<div class="content clearfix">
				<div class="info">
					<form class="form">
						<div class="form-group">
							<label class="control-label" for="realname">真名</label>
							<input type="text" class="form-control" id="realname">
						</div>
						<div class="form-group">
							<label class="control-label" for="nickname">花名</label>
							<input type="text" class="form-control" id="nickname">
						</div>
						<div class="form-group">
							<label class="control-label" for="department">部门</label>
							<input type="text" class="form-control" id="department" value="数字阅读事业部-">
						</div>
						<div class="form-group">
							<label class="control-label" for="title">职位</label>
							<input type="text" class="form-control" id="title">
						</div>
						<div class="form-group">
							<label class="control-label" for="position">座位</label>
							<input type="text" class="form-control" id="position" value="西溪园区 2-4-N-">
						</div>
						<div class="form-group">
							<label class="control-label" for="mobile">手机号</label>
							<input type="text" class="form-control" id="mobile">
						</div>
						<div class="form-group">
							<label class="control-label" for="telphone">座机号</label>
							<input type="text" class="form-control" id="telphone" value="0571-811">
						</div>
						<button type="button" class="btn btn-primary" id="make">生　成</button>
					</form>
				</div>
				<div class="out">
					<div id="outbox"></div>
					<button type="button" class="btn btn-success" id="down">下载签名</button>
				</div>
			</div>
		</div>

		<div id="smbox" style="display:none;"></div>
		<form id="fileDown" action="download.php" method="post" style="display:none"><input type="hidden" name="code"><input type="hidden" name="name" value="邮件签名图"></form>
	</body>
</html>