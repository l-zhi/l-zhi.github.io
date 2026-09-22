(function(exports){

	var noop = function(){};

	Function.prototype.delegate = function(scope){
		var that = this;
		return function(){
			that.apply(scope, arguments);
		};
	};
	var extend = function(obj1, obj2){
		if(arguments.length == 1){
			this.extend(this, obj1);
			return this;
		}
		for(var i in obj2)
			obj1[i] = obj2[i];
		return obj1;
	};

	var Event = (function(){
		var _EventList = {};

		var bind = function( name, fn){
			if(!_EventList[name]){
				_EventList[name] = [];
			}
			_EventList[name].push(fn);
		}

		var trigger = function(name, scope){
			var _list = _EventList[name];
			for (var i = 0; i < _list.length; i++) {
				_list[i].call(name, scope || {});
			};
		}

		return {
			bind:bind,
			trigger:trigger
		}
	})();



	requestAnimationFrame = window.requestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.msRequestAnimationFrame ||
	    window.oRequestAnimationFrame ||
	    function(callback) {return setTimeout(callback, 1000 / 60); };		

	cancelAnimationFrame = window.cancelAnimationFrame ||
	    window.mozCancelAnimationFrame ||
	    window.webkitCancelAnimationFrame ||
	    window.msCancelAnimationFrame ||
	    window.oCancelAnimationFrame ||
	    function(callback) {return clearTimeout(callback, 1000 / 60); };
	
	var Scroller = function(selector, opts){
		if(!selector && typeof selector != 'string') return;
		var _s = selector;
		var _opts = opts || {};
		this.init(_s, _opts);
	}


	var _default_opts = {
		Scontainer : '.container',
		hScroll : false,
		vScroll : false,
		momentum : false,
		bounce : false,
		lockDirection : true
	};
	Scroller.prototype = {
		init: function(s, opts){
			this.opts = extend(_default_opts, opts);
			var $el = document.querySelector(s + ' ' + this.opts.Scontainer);
			var $parent = document.querySelector(s);
			this.$el = $el;
			this._H = $parent.offsetHeight - $el.offsetHeight;
			this._W = $parent.offsetWidth - $el.offsetWidth;	
			this.$el.style.webkitTransform = 'translate3D(0, 0, 0)';

			if(this.opts.hScroll){
				this.lock = 'lock_y';
			}
			if(this.opts.vScroll){
				this.lock = 'lock_x';
			}
			if(this.opts.hScroll && this.opts.vScroll){
				this.lock = undefined;
			}

			this.initEvent(opts);
		},
		_touchstart : function(evt){
			this.drag = true;
			target = evt.targetTouches[0];
			this._x = this._x || 0;
			this._y = this._y || 0;

			this.startX = target.pageX;
			this.startY = target.pageY;
			this.srartTime = new Date();

			this._clientX = target.pageX - this._x;
			this._clientY = target.pageY - this._y;
			this.$el.addEventListener('touchmove', this.update.delegate(this));
			this.$el.addEventListener('touchend', this.clearEvent.delegate(this));
			//this.$el.classList.add('disabled');
			this.draw(); //鼠标点击开始
			evt.preventDefault();
		},

		initEvent: function(opts){
			this.$el.addEventListener('touchstart', this._touchstart.delegate(this));
			if(opts.scrollEnd)	
				Event.bind('scrollEnd', opts.scrollEnd || noop);
			if(opts.onScroll)
				Event.bind('onScroll', opts.onScroll || noop);
		},
		draw: function(){
			//没位移就不渲染
			if (!this._shouldMoved) {
				rAF = requestAnimationFrame(this.draw.delegate(this));
				return;
			}
			this.$el.style.webkitTransform = 'translate3D(' + this._x + 'px, ' + this._y + 'px, 0)';

			this._shouldMoved = false;
			rAF = requestAnimationFrame(this.draw.delegate(this));
		},
		clearEvent: function(evt){
			if(!this.drag) return;
			this.drag = false;
			this.$el.removeEventListener("touchmove");
			this.$el.removeEventListener("touchend");
			cancelAnimationFrame(rAF);
			if(this.opts.momentum){
				var target = evt.changedTouches[0];
				var endX = target.pageX;
				var endY = target.pageY;
				var endTime = new Date();
				var disTime = endTime - this.srartTime;
				var disTime = 1/disTime * 50000;
				if(undefined == this.lock || 'lock_x' == this.lock){
					var direction_y = endY - this.startY < 0 ? -1 : 1;
					this._y = this._y + disTime * direction_y;
					if(this._y > 0) this._y = 0;
					if(this._y < this._H) this._y = this._H;		
				}
				if(undefined == this.lock || 'lock_y' == this.lock){
					var direction_x = endX - this.startX < 0 ? -1 : 1;
					this._x = this._x + disTime * direction_x;
					if(this._x > 0) this._x = 0;
					if(this._x < this._W) this._x = this._W;
				}

				this.$el.style.webkitTransform = 'translate3d('+ this._x +'px, ' + this._y + 'px, 0px)';
				this.$el.style.webkitTransitionDuration = '500ms';
				var me = this;
				setTimeout(function(){
					me.$el.style.webkitTransform = 'translate3d('+ this._x +'px, ' + this._y + 'px, 0px)';
					me.$el.style.webkitTransitionDuration = '0ms';
					Event.trigger('scrollEnd');
				}, 500);
			}
			if(this.opts.lockDirection){
				this.lock = undefined;
			}
		},			
		update: function(evt){
			if(!this.drag) return;
			var target = evt.targetTouches[0];
			var disY = target.pageY - this._clientY;
			var disX = target.pageX - this._clientX;
			if(disY == disX){
				return;
			}
			if(this.opts.lockDirection && undefined == this.lock){
				this.lock = Math.abs(this._y - disY) > Math.abs(this._x - disX) ? 'lock_x' : 'lock_y';
			}
			if(undefined == this.lock || 'lock_x' == this.lock){
				this._y = disY;
				if( !this.opts.bounce ){
					if(this._y > 0) this._y = 0;
					if(this._y < this._H) this._y = this._H;
				}

			}
			if(undefined == this.lock || 'lock_y' == this.lock){
				this._x = disX;
				if( !this.opts.bounce ){
					if(this._x > 0) this._x = 0;
					if(this._x < this._W) this._x = this._W;
				}
				
			}			
			this._shouldMoved = true;
			evt.preventDefault();
			Event.trigger('onScroll');
		}
	}
	exports.Scroller = Scroller;
})(window);