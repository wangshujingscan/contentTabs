// Generated by CoffeeScript 1.3.3

/*!
Content Tabs v1.0.4 (http://okize.github.com/)
Copyright (c) 2013 | Licensed under the MIT license
http://www.opensource.org/licenses/mit-license.php
*/


(function() {

  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return factory(jQuery);
    }
  })(function($) {
    'use strict';

    var Plugin, defaults, pluginName;
    pluginName = 'contentTabs';
    defaults = {
      displayTabs: true,
      maintainTabState: false,
      tabStateKey: 'ctab',
      pinPanelIntro: false,
      tabLocation: 'left',
      tabActiveClass: 'active'
    };
    Plugin = (function() {

      function Plugin(element, options) {
        this.element = element;
        this.el = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.tabs = null;
        this.panels = null;
        this.tabLocationClassName = {
          left: 'tabsVerticalLeft',
          right: 'tabsVerticalRight',
          top: 'tabsHorizontalTop',
          bottom: 'tabsHorizontalBottom'
        };
        this.activeTab = null;
        this.init();
      }

      Plugin.prototype.init = function() {
        var eq, tabs,
          _this = this;
        if (!this.options.displayTabs) {
          this.removeTabs();
          return;
        }
        if (this.options.maintainTabState && (this.getStateFromHash() != null)) {
          this.updateState(this.activeTab);
        }
        this.setTabsPosition(this.tabLocationClassName[this.options.tabLocation]);
        if (this.options.pinPanelIntro) {
          this.pinPanels(this.el);
        }
        tabs = this.getTabs();
        if (!tabs.hasClass(this.options.tabActiveClass)) {
          tabs.eq(0).addClass(this.options.tabActiveClass);
        }
        tabs.eq(tabs.length - 1).addClass('last');
        eq = void 0;
        return tabs.on('click', function(e) {
          e.preventDefault();
          eq = $(e.currentTarget).index();
          return _this.updateState(eq);
        });
      };

      Plugin.prototype.getArgsFromUrl = function(url) {
        var args, item, param, params, _i, _len;
        url = url || window.location.href;
        args = {};
        params = url.slice(url.indexOf('#') + 1).split('&');
        for (_i = 0, _len = params.length; _i < _len; _i++) {
          item = params[_i];
          param = item.split('=');
          if (param[0] === url) {
            return null;
          }
          if (param.length > 1) {
            args[param[0]] = param[1];
          } else {
            args[param[0]] = void 0;
          }
        }
        return args;
      };

      Plugin.prototype.updateUrlHash = function(eq) {
        return window.location.hash = this.options.tabStateKey + '=' + eq;
      };

      Plugin.prototype.getPropertyCount = function(obj) {
        var count, key;
        count = 0;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            count++;
          }
        }
        return count;
      };

      Plugin.prototype.getStateFromHash = function() {
        var args, state, _ref;
        args = this.getArgsFromUrl();
        if (!args) {
          return null;
        }
        state = (_ref = args[this.options.tabStateKey]) != null ? _ref : null;
        if (!state) {
          return null;
        }
        return this.activeTab = args[this.options.tabStateKey];
      };

      Plugin.prototype.setTabsPosition = function(pos) {
        return this.el.addClass(pos);
      };

      Plugin.prototype.updateState = function(eq) {
        this.activeTab = eq;
        this.selectTab(eq);
        this.selectPanel(eq);
      };

      Plugin.prototype.getTabs = function() {
        if (!this.tabs) {
          this.tabs = this.el.find('.contentTabsNav').find('li');
        }
        return this.tabs;
      };

      Plugin.prototype.selectTab = function(eq) {
        if (this.options.maintainTabState) {
          this.updateUrlHash(eq);
        }
        this.getTabs().removeClass(this.options.tabActiveClass).eq(eq).addClass(this.options.tabActiveClass);
      };

      Plugin.prototype.removeTabs = function() {
        this.el.addClass('tabsNone');
        return this.getTabs().remove();
      };

      Plugin.prototype.getPanels = function() {
        if (!this.panels) {
          this.panels = this.el.find('.contentTabsPanel');
        }
        return this.panels;
      };

      Plugin.prototype.selectPanel = function(eq) {
        this.getPanels().hide().eq(eq).show();
      };

      Plugin.prototype.pinPanels = function() {
        var $this, sectionsToPin;
        sectionsToPin = void 0;
        $this = void 0;
        this.el.addClass('pinPanelIntro');
        sectionsToPin = this.el.find('.contentTabsPanelIntro');
        sectionsToPin.each(function() {
          $this = $(this);
          return $this.insertBefore($this.parent());
        });
      };

      return Plugin;

    })();
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_#{pluginName}')) {
          $.data(this, 'plugin_#{pluginName}', new Plugin(this, options));
        }
      });
    };
  });

}).call(this);
