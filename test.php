<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Test</title>
		<script src="assets/jquery.min.js"></script>
	</head>
	<body>
	<input type="file" id="f" accept="image/*">
	<form id="frm" action="cropper.php" method="post">
		<input type="text" id="txt" name="code">
	</form>
	<!-- <img src="http://gtms04.alicdn.com/tps/i4/T1aciIFhNeXXcCqLZP-760-290.jpg" id="i"> -->
	<script>
		$('#f').bind('change',function(){
			var file = this.files[0];
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e){
				go(this.result);
			}
		});

		function go(data){
			var n = data.indexOf('base64,');
			var d = data.substring(n+7);
			$('#txt').val(d);
			$('#frm').submit();
		}
	</script>
	</body>
</html>