
(function(win){
	var sdx = function(){
		this._init();
	}

	sdx.fn = sdx.prototype;


	/**
	 * 方法：初始化
	 * @author lizhi
	 * @return {Element}
	 */
	sdx.fn._init = function(){
		this.ready();
		return this;
	}


	/**
	 * 方法：初始化资源
	 * @param {(string|Element|Text|Array.<element>|Array.<text>|Object)}
	 * @return {Element}
	 * @constructor
	 */
	sdx.fn.ready = function(){
		var img = ['img/mali.gif', 'img/bg.png'];
		this.loader = new lz.Loader()
	}

	win.sdx = sdx;
})(window);</text></element>