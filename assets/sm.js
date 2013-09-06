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
		
	};
	
	var croper = {
		data: {},
		init: function(){
			var me = this;
			//裁剪插件
			var ias = $('#imgPhoto').imgAreaSelect({
				handles: true,
				instance: true,
				aspectRatio: '1:1',
				fadeSpeed: 100,
				minHeight: 60,
				minWidth: 60,
				x1: 0,
				y1: 0,
				x2: 60,
				y2: 60,
				hide: true,
				onSelectEnd: function(o,d){
					//console.log(d);
					me.data.result = d;
				}
			});
			this.data.ias = ias;
			this.data.result = {'x1':0,'y1':0,'x2':60,'y2':60,'width':60,'height':60};

			//弹出框插件
			var pop = $('#pop');
			var mask = $('#mask');
			pop.find('.h-close').bind('click',function(e){
				e.preventDefault();
				mask.fadeOut();
				pop.fadeOut();
				ias.setOptions({hide:1});
			});

			$('#imgSelectOk').bind('click',function(e){
				e.preventDefault();
				var result = me.data.result;
				me.crop(result.x1,result.y1,result.width,result.height,function(data){
					mask.fadeOut();
					pop.fadeOut();
					if(data) $('#imgFace')[0].src = data;
					ias.setOptions({hide:1});
				});
				
			});

			return ias;
		},
		show: function(img){
			var ias = this.data.ias;
			if(!ias) ias = this.init();//第一次显示作初始化
			var pop = $('#pop');
			var mask = $('#mask');
			pop.fadeIn();
			mask.fadeIn();
			var photo = $('#imgPhoto')[0];
			photo.src = img.src;
			photo.onload = function(){
				ias.setOptions({show:1,imageHeight:img.height,imageWidth:img.width});
			}
			this.data.img = img;
		},
		crop: function(x,y,w,h,cb){
			//裁剪
			var img = this.data.img;
			if(!img){
				cb && cb('');
			}
			// var c = document.createElement('canvas');
			// var ctx = c.getContext('2d');
			// c.width = 60;
			// c.height = 60;
			// ctx.drawImage(img,x,y,w,h,0,0,60,60);	
			// cb && cb(c.toDataURL());
			var data = img.src;
			var num = data.indexOf('base64,');
			var code = data.substring(num+7);
			$.post('cropper.php',{code:code,dw:60,dh:60,x:x,y:y,w:w,h:h},function(data){
				cb && cb('data:image/jpeg;base64,'+data.code);
			},'json');
		}
	};

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
			var name = rname;
			name += fname ? '（'+fname+'）' : '';

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
				//$('#imgFace')[0].src = this.result;
				var img = new Image();
				img.src = this.result;
				img.onload = function(){
					croper.show(img);
				}
			}
			$('#fileForm')[0].reset();
		});
		
	});

})(jQuery)