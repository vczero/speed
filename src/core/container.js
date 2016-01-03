/**
 * @module core
 * @description 基础核心模块
 *
 */
/**
 * Dom类
 * @class module:Dom
 * @classdesc $
 *
 */
define(['$'], function($){

  var id_prefix = Speed._ID_prefix;

  return {
    /*头部容器*/
    Header:     $(id_prefix + 'header'),
    /*底部容器*/
    Footer:     $(id_prefix + 'footer'),
    /*中间容器*/
    Content:    $(id_prefix + 'content'),
    /*左侧栏容器*/
    LeftPanel:  $(id_prefix + 'leftpanel'),
    /*右侧栏容器*/
    RightPanel: $(id_prefix + 'rightPanel'),
    /*弹出框、选项容器*/
    FramePort:  $(id_prefix + 'frameport'),

    /*清除所有内容*/
    emptyAll: function(){
      this.Header.empty();
      this.Footer.empty();
      this.Content.empty();
      this.LeftPanel.empty();
      this.RightPanel.empty();
      this.FramePort.empty();
    }
  };

});