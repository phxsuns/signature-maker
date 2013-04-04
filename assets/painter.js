/**
 * Painter 
 * version 0.1.0 
 * Xhao Sun <sunxuhao@gmail.com> 
 * 2013-04-05 12:35:48
 */

(function(){


/* 
 *  图层类
 *  
 *  初始化参数：
 *  @param {String} type 图层的属性 (当前仅处理 Text 和 Image 两类)
 *  @param {Object} pos 图层的在画布上的位置 {x:横坐标,y:纵坐标}
 *  @param {int} zindex 图层的在画布上的层次
 *  @param {Object} info 图层的内容
 *  	Text类型下 {text:内容,font:字体名,bold:粗细,color:颜色(css值),size:字号(像素，不带单位)[,fontSrc:字体文件URL,fontObj:字体对象]}
 *  	Image类型下 {src:图片URL,width:显示宽度,height:显示高度[,image:图像对象]}
 *
 */

var layer = function(type,pos,zindex,info){

	this.type = type;
	this.pos = pos;
	this.zindex = zindex;

	this.obj = {};
	this.canvas = null;
	this.ready = false;
	this.id = 0;

	if(this.type == 'Text'){

		this.text = info.text || '';
		this.property = {
			font: info.font,
			bold: info.bold || 'normal',
			color: info.color || '#000000',
			size: info.size || 12
		}

		if(info.fontObj) this.loadFont(info.fontObj);
		else if(info.fontSrc) this.loadFont(info.fontSrc);
		else if(!info.font){
			this.property.font = 'Microsoft Yahei';
			this.ready = true;
		}
		else this.ready = true;

	}else if(this.type == 'Image'){

		this.property = {};

		if(info.image){
			this.loadImage(info.image);
			this.src = info.image.src;
		}else{
			this.loadImage(info.src);
			this.src = info.src;
		}

		this.width = info.width || 0;
		this.height = info.height || 0;

	}

}

layer.prototype = {

	setCavans: function(canvas){
		this.canvas = canvas;
		return this;
	},

	setPos: function(pos){
		this.pos = pos;
		return this;
	},
	getPos: function(){
		return this.pos;
	},

	setZindex: function(zindex){
		this.zindex = zindex;
		return this;
	},
	getZindex: function(){
		return this.zindex;
	},

	setText: function(info){
		for(v in info){
			if(v == 'text' || v == 'font' || v == 'bold' || v == 'color' || v == 'size') this.property[v] = info[v];
			else if(v == 'fontSrc' || v == 'fontObj') this.loadFont(info[v]);
		}
		return this;
	},

	setImage: function(info){
		if(info.image){
			this.loadImage(info.image);
			this.src = info.image.src;
		}else{
			this.loadImage(info.src);
			this.src = info.src;
		}
		return this;
	},

	setId: function(id){
		this.id = id;
		return this;
	},

	draw: function(){
		if(!this.canvas) return this;

		var me = this;

		setTimeout(function(){
			if(me.ready){
				if(me.type == 'Text') me._drawHandlerText();
				else if(me.type == 'Image') me._drawHandlerImage();
			}
			else setTimeout(arguments.callee,10);
		},10);

		return this;
	},

	onDrawComplete: function(){},

	_drawHandlerText: function(){
		var c = this.canvas;
		c.textBaseline = 'top';
		c.font = this.property.bold + ' ' + this.property.size + 'px ' + this.property.font;
		c.fillStyle = this.property.color;
		c.fillText(this.text,this.pos.x,this.pos.y);
		this.onDrawComplete();
	},

	_drawHandlerImage: function(){
		var c = this.canvas;
		c.drawImage(this.obj.image, this.pos.x, this.pos.y, this.width, this.height);
		this.onDrawComplete();
	},

	loadFont: function(src){

		var me = this;
		me.ready = false;

		if(typeof src == 'string') var font = new Font(src);
		else var font = src;
		font.bindload(function(){
			me.property.font = font.name;
			me.obj.font = font;
			me.ready = true;
		}).load();

	},

	loadImage: function(src){

		var me = this;
		me.ready = false;

		if(typeof src == 'string'){
			var img = new Image();
			var url = src;
		} else {
			var img = src;
			var url = img.src;
		}
		img.onload = function(){
			me.obj.image = img;
			me.property.width = img.width;
			me.property.height = img.height;
			me.ready = true;
			me.width = me.width || img.width;
			me.height = me.height || img.height;
		}
		img.src = url;

	}


}

/* 
 *  绘图类
 *  
 *  初始化参数
 *  @param {String} id 画布id
 *  @param {object} size 画布大小{width:宽度,height:高度}
 *
 */

var painter = function(id, size){

	this.id = id || 'Painter'+ (999999 * Math.random() | 0);

	size = size || {width:100,height:100};
	this.width = size.width;
	this.height = size.height;

	this.canvas = null;
	this.ctx = null;
	this.layerList = [];
	this.idCount = 0;

	this.eventList = {};

	this._createCanvas();

}

painter.prototype = {

	/* 在画布添加图层
	 * @param {String} type 图层的属性 (Text 和 Image 两类)
	 * @param {object} info 图层的内容
	 * @param {object} pos 图层的在画布上的位置 {x:横坐标,y:纵坐标}
 	 * @param {int} zindex 图层的在画布上的层次
 	 * return 图层对象id
	 */
	add: function(type,info,pos,zindex){
		if(type != 'Text' && type != 'Image') return this;
		pos = pos || {x:0,y:0};
		zindex = zindex || 0;
		var l = new layer(type,pos,zindex,info);
		l.setId(this.idCount++).setCavans(this.ctx);
		this.layerList.push(l);
		return l.id;
	},

	/* 从画布删除图层
	 * @param {Layer} layer 图层对象 或 id
 	 * return painter对象
	 */
	del: function(layer){
		var id = (typeof layer == 'number' || typeof layer == 'string') ? Number(layer) : layer.id;
		var index = util.arrIndexOfByKey(this.layerList,'id',id);
		util.arrRmEle(this.layerList,id);
		return this;
	},

	/* 设置图层
	 * @param {Layer} layer 图层对象 或 id
	 * @param {String} key 设置属性
	 * @param {} value 设置值
 	 * return painter对象
	 */
	set: function(layer,key,value){
		if(typeof layer == 'number' || typeof layer == 'string') layer = this.find(layer);
		switch(key){
			case 'x':
				var y = layer.getPos().y;
				layer.setPos({x:value,y:y});
				break;
			case 'y':
				var x = layer.getPos().x;
				layer.setPos({x:x,y:value});
				break;
			case 'pos':
				layer.setPos(value);
				break;
			case 'zindex':
				layer.setZindex(value);
				break;
			case 'text':
				layer.setText({text:value});
				break;
			case 'color':
				layer.setText({color:value});
				break;
			case 'size':
				layer.setText({size:value});
				break;
			case 'bold':
				layer.setText({bold:value});
				break;
			case 'font':
				layer.setText({fontObj:value});
				break;
			case 'image':
				layer.setImage({src:value});
				break;
		}
		return this;
	},

	/* 批量设置图层
	 * @param {Layer} layer 图层对象 或 id
	 * @param {object} info 设置值（键值对）
 	 * return painter对象
	 */
	sets: function(layer,info){
		if(typeof layer == 'number' || typeof layer == 'string') layer = this.find(layer);
		for(v in info){
			this.set(layer,v,info[v]);
		}
		return this;
	},

	/* 查找图层
	 * @param {Layer} layer id
 	 * return layer对象
	 */
	find: function(layer){
		var index = util.arrIndexOfByKey(this.layerList,'id',layer);
		return this.layerList[index];
	},

	/* 画布渲染至dom节点
	 * @param {Dom} 源生dom对象
 	 * return layer对象
	 */
	render: function(dom){
		dom.appendChild(this.canvas);
		return this;
	},

	/* 将所有图层绘制到画布
	 *
	 */
	draw: function(){
		this.clean();
		var arr = util.arrSortByKey(this.layerList,'zindex');
		this._draw(0);
	},

	clean: function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); 
		return this;
	},

	/* 绑定事件
	 * @param {string} type 事件名
	 * @param {function} cb 事件回调 
 	 * return painter对象
	 */
	on: function(type,cb){
		if(!type) return this;
		cb = cb || function(){};
		this.eventList[type] = this.eventList[type] || [];
		this.eventList[type].push(cb);
		return this;
	},

	/* 解绑事件
	 * @param {string} type 事件名
 	 * return painter对象
	 */
	un: function(type){
		if(!type) return this;
		this.eventList[type] = [];
		return this;
	},

	init: function(){
		this.layerList = [];
	},

	_doEvent: function(type){
		this.eventList[type] = this.eventList[type] || [];
		for(var i = 0;i < this.eventList[type].length; i++){
			this.eventList[type][i]();
		}
	},

	_draw: function(i){
		var me = this;
		this.layerList[i].onDrawComplete = function(){
			if(i<me.layerList.length - 1) me._draw(i+1);
			else me._doEvent('drawComplete');
		};
		this.layerList[i].draw();
	},

	_createCanvas: function(){
		var c = document.createElement('canvas');
		var ctx = c.getContext('2d');
		c.id = this.id;
		c.width = this.width;
		c.height = this.height;
		this.canvas = c;
		this.ctx = ctx;
	}

}

/* 
 *  工具库
 *  
 *
 */

var util = {
	
	/* 
	 *  删除数组元素
	 *  @param {Array} 源数组
	 *  @param {init} 删除索引
	 *  return {Array} 处理过的数组
	 */
	arrRmEle : function(arr,index){
		arr.splice(index,1);
		return arr;
	},

	/* 
	 *  依据对象关键字 数组排序
	 *  @param {Array} 源数组
	 *  @param {String} 关键字(值需要为int类型)
	 *  @param {Boolean} 是否升序，默认升序
	 *  return {Array} 处理过的数组
	 */
	arrSortByKey: function(arr,key,order){
		if(typeof order == 'undefined') order = true;
		for(var i = 0; i < arr.length - 1; i++){
			for (var ii = 0; ii < arr.length - i - 1; ii++){
				if(arr[ii][key] > arr[ii+1][key]){
					var t = arr[ii];
					arr[ii] = arr[ii+1];
					arr[ii+1] = t;
				}
			}
		}
		if(!order) arr.reverse();
		return arr;
	},

	/* 
	 *  依据对象关键字 数组找索引
	 *  @param {Array} 源数组
	 *  @param {String} 关键字
	 *  @param {} 关键字值
	 *  return {int} 索引
	 */
	arrIndexOfByKey: function(arr,key,value){
		for(var i = 0; i < arr.length; i++){
			if(arr[i][key]===value) return i;
		}
		return -1;
	}
	
}

/* 
 * 公开绘图类
 */
window.Painter = painter;

})();