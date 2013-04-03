(function(){
	
	var Font = function(url,name){
		this.url = url || '';
		this.name = name || 'FontName'+ (999999 * Math.random() | 0);
		this.loaded = !this.url;
		this.loading = false;
		this.testNode = null;
		this.preWidth = 0;
		this.loadList = [];
	};
	
	Font.prototype._createStyleNode = function(){
		var styleNode = document.createElement("style");
		styleNode.type = 'text/css';
		var styletext = "@font-face {\n";
		styletext += "  font-family: '" + this.name + "';\n";
		styletext += "  src: url('" + this.url + "');\n";
		styletext += "}";
		styleNode.innerHTML = styletext;
		document.head.appendChild(styleNode);
	};

	Font.prototype._createTestNode = function(){
		var node = document.createElement('span');
		// Characters that vary significantly among different fonts
		node.innerHTML = 'giItT1WQy@!-/#\u6C38';
		// Visible - so we can measure it - but not on the screen
		node.style.position      = 'absolute';
		node.style.left          = '-10000px';
		node.style.top           = '-10000px';
		// Large font size makes even subtle changes obvious
		node.style.fontSize      = '300px';
		// Reset any font properties
		node.style.fontFamily    = 'sans-serif';
		node.style.fontVariant   = 'normal';
		node.style.fontStyle     = 'normal';
		node.style.fontWeight    = 'normal';
		node.style.letterSpacing = '0';
		document.body.appendChild(node);
		this.testNode = node;
	}

	Font.prototype._doTestNode = function(){
		if(!this.testNode) this._createTestNode();
		this.testNode.style.fontFamily = this.name;
	}
	
	Font.prototype._validateLoad = function(me){
		me._doTestNode();
		var curWidth = me.testNode.offsetWidth;

		if(me.preWidth && curWidth != me.preWidth){
			me._onload();
		}else{
			me.preWidth = curWidth;
			setTimeout(function(){me._validateLoad(me)},1);
		}
		
	}
	
	Font.prototype.load = function(){

		if(this.loaded){
			this.complete();
			return;
		}
		if(this.loading) return;
		
		this.loading = true;
		

		var me = this;
		loadSrc(this.url,function(){
			me._createStyleNode();
			me._validateLoad(me);
		});
		
	};

	Font.prototype._onload = function(){
		var node = this.testNode;
		node.parentNode.removeChild(node);
		node = null;
		this.node = null;
		this.loaded = true;
		this.loading = false;
		this.complete();
	};

	Font.prototype.complete = function(){
		var list = this.loadList;
		for(var i = 0; i < list.length; i++){
			list[i]();
		}
		this.loadList = [];
	};

	Font.prototype.bindload = function(cb){
		this.loadList.push(cb);
		return this;
	}


	var loadSrc = function(file,cb){

		var xhr = new XMLHttpRequest();
		
		xhr.onload = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				cb();
			}
		};
		
		xhr.open("GET", file, true);
		xhr.send();

	}

	window.Font = Font;
	
})();