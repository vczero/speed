

define(['$', 'text', 'text!src/core/viewport.html', 'FastClick'], function($, text, html, FC){

  FC(document.body);

  //加载模块
  var loadModule = function(){
    var newUrl = Speed.getLocationHref(document);
    var newHash = Speed.getHashByUrl(newUrl);

    //解析模块
    //这块需要约定法则，那就是/module/page?param=中欧&time=2015
    var moduleStr = newHash.split('?')[0];
    if(moduleStr){
      var strs = moduleStr.split('/');
      if(strs.length >= 2 && strs[1]){
        var moduleName = strs[0];
        var pageName = strs[1];

        //加载模块
        var moduleDir = Speed.moduleDir;
        require([moduleDir + '/' + moduleName], function(module){
          if(module[pageName]()){
            var path = moduleDir + '/' + moduleName + '/';
            var modules = module[pageName]();
            for(var i in modules) {
              modules[i] = path + modules[i];
            }
            //加载功能模块
            console.log(modules);
            require(modules, function(){
              var args = Array.prototype.slice.call(arguments, 0);
              console.log(args);
              for(var i in args){
                args[i].show();
              }
            });
          }else{
            //TODO：404 跳转到首页
            //var body = $('body');
            //body.empty();
            //body.append('<h1>404</h1>');
          }
        });
      }
    }
  };

  //初始化页面
  var initPage = function(){
    //如果存在则不创建
    var viewPort = $( Speed._ID_prefix + 'viewport');
    if(!viewPort[0]){
      var body = $('body');
      body.empty();
      //初始化页面
      body.append(html);
    }

  };

  //第 1 次加载模板或者刷新页面
  loadModule();

  initPage();

  //第 2+ 次加载对应模版
  window.onhashchange = function(event){
    loadModule();
  };

});
