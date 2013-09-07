(function($){

	var fontZhonghei = new Font('assets/zhonghei.ttf','FZZH');
	var fontZhunhei = new Font('assets/zhunhei.ttf','FZZHH');
	painterSM = new Painter('sm',{width:650,height:125});

	var make = function(info){
		
		painterSM.init();
		//背景
		painterSM.add('Image',{src:'assets/bg-sign.png'},{x:0,y:0},0);
		//头像
		painterSM.add('Image',{image:info.image,width:60,height:60},{x:275,y:15},1);
		//姓名
		painterSM.add('Text',{text:info.name,color:'#f36f21',size:14,bold:'',fontObj:fontZhonghei},{x:350,y:12},1);

		//信息列表
		var listY = [36,52,68,84,100];
		var listColor = '#888888';
		var listText = [info.department,info.telphone,info.phone,info.address,info.site];

		var n = 0;
		for(var i = 0;i < listText.length;i++){
			if(listText[i]){
				painterSM.add('Text',{text:listText[i],color:listColor,fontObj:fontZhunhei,size:12},{x:350,y:listY[n]},1);
				n++;
			}
		}
		// painterSM.add('Text',{text:info.department,color:'#888888'},{x:350,y:36},1);
		// painterSM.add('Text',{text:info.telphone,color:'#888888'},{x:350,y:52},1);
		// painterSM.add('Text',{text:info.phone,color:'#888888'},{x:350,y:68},1);
		// painterSM.add('Text',{text:'地址：杭州市西湖区华星路96号瑞利大厦6楼',color:'#888888'},{x:350,y:84},1);
		// painterSM.add('Text',{text:'网址：daxue.taobao.com',color:'#888888'},{x:350,y:100},1);
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
				cb && cb('data:image/png;base64,'+data.code);
			},'json');
		}
	};

	var tips = {
		show: function(node,text){
			node.find('.control-group').addClass('error');
			node.find('.help-inline').text(text).addClass('show-inline');
		},
		init: function(){
			$('.control-group').on('mousedown',function(){
				$('.control-group').removeClass('error').find('.help-inline').removeClass('show-inline');
			});
		}
	}

	$(function(){

		painterSM.render($('#smbox')[0]);


		painterSM.on('drawComplete',function(){
			$('#outbox').html('<img src="'+painterSM.canvas.toDataURL()+'">');
			$('#down').show();
		});
		

		$('#make').click(function(){

			var isOk = true;

			//获取头像
			var imgAvatar = new Image();
			imgAvatar.src = $('#imgFace')[0].src;

			//获取名字
			var rname = $('#rname').val();
			var fname = $('#fname').val();
			var name = rname;
			name += fname ? '（'+fname+'）' : '';
			if(!rname){
				tips.show($('.step1'),'真名一定要填写哦～');
				isOk = false;
			}

			//获取部门
			var department = '部门：'+$('#department').val();

			//获取固定电话
			var tel = $('#tel').val();
			var telsub = $('#telsub').val();
			var telphone = '电话：'+tel;
			telphone += telsub ? ' 分机'+telsub : '';
			if(!tel) telphone = '';//若未填写，则不显示
			else if(!tel.match(/^([0-9]|-)+$/) || (telsub && !telsub.match(/^[0-9]+$/))){
				tips.show($('.step4'),'电话号码格式不正确');
				isOk = false;
			}

			//获取手机
			var tmpPhone = $('#phone').val();
			var phone = '手机：'+ tmpPhone;
			if(!tmpPhone){
				tips.show($('.step5'),'手机号一定要填写哦～');
				isOk = false;
			}else if(tmpPhone.length != 11 || !tmpPhone.match(/^[0-9]+$/)){
				tips.show($('.step5'),'手机号码格式不正确');
				isOk = false;
			}

			//设置地址
			var address = '地址：杭州市余杭区文一西路969号淘宝城2号楼4楼';

			//设置网站
			var site = '网站：http://daxue.taobao.com'

			//绘制
			//isOk = 1;//调试代码
			if(isOk){
				make({
					image:imgAvatar,
					name:name,
					department:department,
					telphone:telphone,
					phone:phone,
					address:address,
					site:site
				});
				$('#outbox').html('<div class="contentBar"><div id="block_1" class="barlittle"></div><div id="block_2" class="barlittle"></div><div id="block_3" class="barlittle"></div><div id="block_4" class="barlittle"></div><div id="block_5" class="barlittle"></div></div>');
			}

		});
		tips.init();//消除提示事件绑定

		$('#down').click(function(){
			var data = $('#outbox img')[0].src;
			var num = data.indexOf('base64,');
			var code = data.substring(num+7);
			var form = $('#fileDown');
			form.find('input[name=code]').val(code);
			form.submit();
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