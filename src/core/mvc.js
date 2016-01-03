/**
 * @module core
 * @description 基础核心模块
 *
 */
/**
 * MVC类
 * @class module:MVC
 * @classdesc MVC类
 *
 */

define([], function(){

  var MVC = {
    /**
     * set方法负责根据属性传递链，从头到尾触发属性改变事件
     * @param {String} key   关键值属性
     * @param {Object|String|Number|Array} value 关键值
     */
    set: function (key, value, noTrim) {
      var accessor = this.__accessor__ = this.__accessor__ || {};
      var storage = this.__storage__ = this.__storage__ || {};
      if (accessor[key]) {
        var target = accessor[key].target;
        var targetKey = accessor[key].targetKey;
        var setOption = 'set' + this.getUpperOption(targetKey);
        if (target[setOption]) {
          target[setOption](value, noTrim);
          if (!noTrim) {
            this.realTrigger(targetKey, value);
          }
        } else {
          target.set(targetKey, value, noTrim);
        }
      } else {
        storage[key] = value;
        if (!noTrim) {
          this.realTrigger(key, value);
        }

      }

    },
    getUpperOption: function (targetKey) {
      if (!this.uppers) {
        this.uppers = {};
      }
      if (!this.uppers[targetKey]) {
        this.uppers[targetKey] = targetKey.substr(0, 1).toUpperCase() + targetKey.substr(1);
      }
      return this.uppers[targetKey];
    },
    /**
     get方法负责根据属性传递链，从头到尾搜寻属性option，直到取得，
     如果有this.option捉着this.getOption()即为获得；
     如果没有则调用链上下一节的get(option)
     */
    /**
     * get方法负责根据属性传递链，从头到尾搜寻属性option，直到取得，
     * 如果有this.option捉着this.getOption()即为获得；
     * 如果没有则调用链上下一节的get(option)
     * @param  {string} option 关键值属性
     * @param  {Object} param 附带的参数
     * @param  {bool} isRootOption 是否是原始关键值，true的话不走getUpperOption
     * @return {Object}        返回关键值
     */
    get: function (option, param, isRootOption) {
      var getOption, accessor = this.__accessor__ = this.__accessor__ || {};
      var storage = this.__storage__ = this.__storage__ || {};
      if (accessor[option]) {
        var target = accessor[option].target;
        var targetKey = accessor[option].targetKey;
        getOption = 'get' + this.getUpperOption(targetKey);
        return target[getOption] ? target[getOption](param) : target.get(targetKey, param);
      }


      getOption = 'get' + this.getUpperOption(option);

      if (this[getOption] && !isRootOption) {
        return this[getOption](param);
      }
      if (storage.hasOwnProperty(option)) {
        return storage[option];
      }

    },

    /**
     option: this中的属性名字
     bindTo功能有两个，一个是：绑定事件，obj的option发生变化时将触发this的响应
     另一个为：指定get的传递，this在调用get（option）时候将传递到obj的get(option)或者getOption或者option属性
     依次传递，直到取得值;
     secondName为option在obj中的名字，可缺省
     noTrim:true的时候不会立即出发，默认触发
     */
    /**
     * option:this中的属性名字
     * bindTo功能有两个，一个是：绑定事件，obj的option发生变化时将触发this的响应
     * 另一个为：指定get的传递，this在调用get（option）时候将传递到obj的get(option)或者getOption或者option属性
     * 依次传递，直到取得值;
     * secondName为option在obj中的名字，可缺省
     * noTrim:true的时候不会立即出发，默认触发
     * @param  {Object} key       关键值属性
     * @param  {Object} target    被绑定目标
     * @param  {Object} targetKey 目标关键值
     * @param  {Boolean} noTrim    是否立即触发
     * @example
     * marker.bindTo('view',map)
     */
    bindTo: function (key, target, targetKey, noTrim) {

      var that = this;
      var optionName = targetKey || key;

      target.on(optionName, function (e) {
        that.realTrigger(key, e);
      }, that); //向api层绑定

      if (!this.__accessor__) {
        this.__accessor__ = {};
      }
      this.unBind(key);
      this.__accessor__[key] = {
        target: target,
        targetKey: optionName
      };

      if (!noTrim) {
        this.realTrigger(key); //bind之后触发一次自身的change事件
      }
    },
    bindsTo: function (keys, target) {
      for (var i = 0; i < keys.length; i += 1) {
        this.bindTo(keys[i], target, keys[i], true);
      }
    },
    unBind: function (key) {
      if (this.__accessor__[key]) {
        var item = this.__accessor__[key];
        item.target.off(item.targetKey, this);
        delete this.__accessor__[key];
      }
    },
    unBindAll: function () {
      for (var hash in this.__accessor__) {
        if (this.__accessor__.hasOwnProperty(hash)) {
          this.unBind(hash);
        }
      }
    },
    realTrigger: function (key, e) {
      if (this[key + 'Changed']) {
        this[key + 'Changed'](e);
      } else if (this.changed) {
        this.changed(e);
      }
      this.emit(key, e);
    },

    keysReady: function (keys, obj, cbk) {
      var shorts = new(M.Class.extend({
        includes: [M.Events, M.MVC]
      }))();
      shorts.changed = function () {
        var flag = true;
        for (var i = 0; i < keys.length; i += 1) {
          if (!shorts.get(keys[i])) {
            flag = false;
          }
        }
        if (flag) {
          shorts.unBindAll();
          cbk();
        }
      };
      for (var i = 0; i < keys.length; i += 1) {
        shorts.bindTo(keys[i], obj);
      }
    },
    setValues: function (obj) {
      var key, value;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          value = obj[key];
          this.set(key, value);
        }

      }
    }
  };

  return MVC;

});

