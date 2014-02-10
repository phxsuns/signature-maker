(function($){

	var fontName = 'Microsoft Yahei';
	var painterSM = new Painter('sm',{width:331,height:291});

	var make = function(info){
		
		painterSM.init();
		//背景
		painterSM.add('Image',{src:'assets/bg.png'},{x:0,y:0},0);
		//姓名
		painterSM.add('Text',{text:info.realname,color:'#999999',size:26,bold:'',font:fontName},{x:129,y:114},1);
		
		var realnameWidth = 27 * info.realname.length;
		painterSM.add('Text',{text:info.nickname,color:'#999999',size:18,bold:'',font:fontName},{x:129 + realnameWidth,y:122},1);
		
		//部门
		painterSM.add('Text',{text:info.department,color:'#bdbdbd',size:12,font:fontName},{x:129,y:150},1);
		
		//职位
		painterSM.add('Text',{text:info.title,color:'#bdbdbd',size:12,font:fontName},{x:129,y:168},1);
		
		//座位
		painterSM.add('Text',{text:info.position,color:'#9d9d9d',size:12,font:fontName},{x:150,y:192},1);

		//手机
		painterSM.add('Text',{text:info.mobile,color:'#9d9d9d',size:12,font:fontName},{x:46,y:250},1);
		
		//座机
		painterSM.add('Text',{text:info.telphone,color:'#9d9d9d',size:12,font:fontName},{x:198,y:250},1);

		painterSM.draw();
		
	};

	var tips = {
		show: function(node,text){
			node.parents('.form-group').addClass('has-error');
		},
		init: function(){
			$('.form').on('mousedown',function(){
				$('.form-group').removeClass('has-error');
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

			//获取名字
			var realname = $('#realname').val();
			var nickname = $('#nickname').val();

			if(!realname){
				tips.show($('#realname'));
				isOk = false;
			}
			if(nickname){
				nickname = '（' + nickname + '）';
			}

			//获取部门
			var department = $('#department').val();
			if(department.substr(-1,1) === '-'){
				tips.show($('#department'));
				isOk = false;
			}
			if(!department) department = '数字阅读事业部';

			//获取职位
			var title = $('#title').val();
			if(!title){
				tips.show($('#title'));
				isOk = false;
			}

			//获取座位
			var position = $('#position').val();
			if(!position || position.substr(-1,1) === '-'){
				tips.show($('#position'));
				isOk = false;
			}

			//获取手机
			var mobile = $('#mobile').val();
			if(!mobile || mobile.length != 11 || !mobile.match(/^[0-9]+$/)){
				tips.show($('#mobile'));
				isOk = false;
			}

			//获取固定电话
			var telphone = $('#telphone').val();
			if(!telphone.match(/^([0-9]|-)+$/) || telphone.length != 13){
				tips.show($('#telphone'));
				isOk = false;
			}

			//绘制
			//isOk = 1;//调试代码
			if(isOk){
				make({
					realname:realname,
					nickname:nickname,
					department:department,
					title:title,
					position:position,
					mobile:mobile,
					telphone:telphone
				});
				$('#outbox').html('<img src="http://img01.taobaocdn.com/tps/i1/T1cKm3XkRpXXXXXXXX-48-48.gif">');
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
		
	});

})(jQuery)