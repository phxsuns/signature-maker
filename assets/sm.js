(function($){

	var fontYahei = new Font(null,'Microsoft Yahei');
	painterSM = new Painter('sm',{width:650,height:125});

	var make = function(info){
		
		painterSM.init();
		painterSM.add('Image',{src:'assets/bg-sign.png'},{x:0,y:0},0);
		painterSM.add('Image',{image:info.image,width:60,height:60},{x:275,y:15},1);
		painterSM.add('Text',{text:info.name,color:'#f36f21',size:14,bold:'bold'},{x:350,y:12},1);
		painterSM.add('Text',{text:info.department,color:'#888888'},{x:350,y:36},1);
		painterSM.add('Text',{text:info.telphone,color:'#888888'},{x:350,y:52},1);
		painterSM.add('Text',{text:info.phone,color:'#888888'},{x:350,y:68},1);
		painterSM.add('Text',{text:'地址：杭州市西湖区华星路96号瑞利大厦6楼',color:'#888888'},{x:350,y:84},1);
		painterSM.add('Text',{text:'网址：www.alibado.com',color:'#888888'},{x:350,y:100},1);
		painterSM.draw();
		
	}

	$(function(){

		painterSM.render($('#smbox')[0]);


		painterSM.on('drawComplete',function(){
			$('#outbox').html('<img src="'+painterSM.canvas.toDataURL()+'">');
		});
		

		$('#make').click(function(){

			//获取头像
			var imgAvatar = new Image();
			imgAvatar.src = $('#imgFace')[0].src;

			//获取名字
			var rname = $('#rname').val();
			var fname = $('#fname').val();
			var name = rname+'（'+fname+'）';

			//获取部门
			var department = $('#department').val();

			//获取固定电话
			var tel = $('#tel').val();
			var telsub = $('#telsub').val();
			var telphone = '电话：'+tel;
			telphone += telsub ? ' 分机'+telsub : '';

			//获取手机
			var phone = '手机：'+ $('#phone').val();

			//绘制
			make({image:imgAvatar,name:name,department:department,telphone:telphone,phone:phone});
		});

		$('#selectFace').click(function(){
			$('#fileFace').click();
		});

		$('#fileFace').bind('change',function(e){
			var file = this.files[0];
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e){
				$('#imgFace')[0].src = this.result;
			}
		});

	});

})(jQuery)