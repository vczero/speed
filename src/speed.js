/*!
 * @name: Speed框架，快速构建Web单页应用，轻量级框架
 * @namespace: Speed
 * */

window.Speed = window.Speed || {};

(function(window, undefined) {

	//初始化框架基本信息
	//@name: Speed
	//@author: vczero
	//Speed需要挂载的静态变量和方法
	Speed = window.Speed;
	Speed.name = 'Speed-SAP';
	Speed.author = 'vczero';
	Speed.version = '0.1';

  //框架模块加载目录，默认，会动态获取
  Speed.dir = 'src/';

  //业务代码和模板加载目录
  Speed.moduleDir = '';

  //调试 默认关闭
  Speed.debug = false;

  //是否开启FastClick，默认true
  Speed.fastclick = true;

  //框架需要规划好样式的前缀，防止样式冲突
  //同时需要规划好组件的z-index，统一使用层级关系

  //私有ID前缀
  Speed._ID_prefix = '#__speed__id_';

  //私有Class前缀
  Speed._Class_prefix = '.__speed__class_';

  //页面劫持和过滤

  //部分静态函数不能放入到Util模块，因为这些是必须加载的，而Util中最好是供开发者调用的可选函数
  //或者开辟一个必须加载Util类，建议打包时可以合并成一个文件
  //单独的Util模块，可以将静态方法挂载在Speed上，同时挂载在一个Util对象上


  //获取含有Hash的URL，这块需要慎重，兼容部分浏览器
  Speed.getLocationHref = function(doc) {
    doc = doc || document;

    //大多数情况这样是OK的
    if (doc.URL === doc.location.href)
      return doc.location.href;

    // 有些webkit内核的浏览器会URI-decode（解码）document.location.href
    // 但是document.URL是编码的，因此需要解码
    if (doc.location.href === decodeURIComponent(doc.URL))
      return doc.URL;

    // firefox 3.6版本仅仅在页面加载时更新document.URL
    // 但是document.location.href的更新是正确及时的
    if (doc.location.hash && decodeURIComponent(doc.location.href.replace(/^[^#]+/, "")) === doc.location.hash)
      return doc.location.href;

    if (doc.URL.indexOf('#') == -1 && doc.location.href.indexOf('#') != -1)
      return doc.location.href;

    return doc.URL || doc.location.href;
  };

  //通过URL获取hash值
  Speed.getHashByUrl = function(url){
    var newURL = url || Speed.getLocationHref(document);
    var hash = String(newURL).replace(/([^#]*)#?([^#]*)#?(.*)/, '$2');
    hash =  decodeURIComponent(hash.replace(/[^#]*#/,'').replace(/#.*/, ''));
    return hash;
  };


	//创建script标签并添加到head
	function loadScript(opts, callback) {
		var script = document.createElement('script');
		script.src = opts.url;
		script.charset = opts.charset || 'utf-8';
		script.defer = true;
		script.async = true;
		document.head.appendChild(script);
		script.onload = function() {
			script.onload = script.onreadystatechange = script.onerror = null;
			script = null;
			callback();
		};
	}
	
	//获取目录
	function getDir(){
		var scripts = document.getElementsByTagName('script') || [];
		var reg = /speed.js$/ig;
		for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src');
      if (src && reg.test(src)) {
        Speed.dir = src.replace(reg, '');
      }
      var baseDir = scripts[i].getAttribute('base_dir');
      if(baseDir){
        Speed.moduleDir = baseDir;
      }
    }
	}
	
	getDir();

	//加载require和入口文件
	loadScript({url: Speed.dir + '3lib/require.js'}, function(){
		var config = [Speed.dir + 'config'];
		require(config, function(){
			var entrance = ['appInit'];
			require(entrance, function(){
				//TODO
			});
		});
	});

})(window);