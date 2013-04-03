(function($){

	var fontYahei = new Font(null,'Microsoft Yahei');
	painterSM = new Painter('sm',{width:650,height:125});

	var make = function(info){
		
		painterSM.add('Image',{src:'assets/bg-sign.png'},{x:0,y:0},0);
		painterSM.add('Image',{image:info.image,width:60,height:60},{x:275,y:15},1);
		painterSM.add('Text',{text:'我来也（花名）',color:'#f36f21',size:14,bold:'bold'},{x:350,y:12},1);
		painterSM.add('Text',{text:'阿里学院-在线培训中心-网站产品-UED',color:'#888888'},{x:350,y:36},1);
		painterSM.add('Text',{text:'电话：0571-81176163 分机76163',color:'#888888'},{x:350,y:52},1);
		painterSM.add('Text',{text:'手机：13162347210',color:'#888888'},{x:350,y:68},1);
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
			var imgAvatar = new Image();
			imgAvatar.src = $('#imgFace')[0].src;
			make({image:imgAvatar});
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