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
    var Tabs, defaults, pluginName;

    pluginName = 'contentTabs';
    defaults = {
      displayTabs: true,
      maintainTabState: false,
      pinPanelIntro: false,
      tabLocation: 'left',
      tabActiveClass: 'active'
    };
    Tabs = (function() {
      function Tabs(element, options) {
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
        this.tabStateKey = 'ctab';
        this.hashObject = null;
        this.init();
      }

      Tabs.prototype.init = function() {
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

      Tabs.prototype.getStateFromHash = function() {
        var state, _ref;

        this.hashObject = this.getHashObject();
        if (!this.hashObject) {
          return null;
        }
        state = (_ref = this.hashObject[this.tabStateKey]) != null ? _ref : null;
        if (!state) {
          return null;
        }
        return this.activeTab = this.hashObject[this.tabStateKey];
      };

      Tabs.prototype.getHashObject = function() {
        var arg, args, arr, hash, item, _i, _len;

        hash = this.getUrlHash();
        if (!hash) {
          return null;
        }
        args = {};
        arr = hash.split('&');
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          item = arr[_i];
          arg = item.split('=');
          if (arg.length > 1) {
            args[arg[0]] = arg[1];
          } else {
            args[arg[0]] = void 0;
          }
        }
        return args;
      };

      Tabs.prototype.buildHashObject = function() {
        return $.param(this.hashObject);
      };

      Tabs.prototype.updateHash = function(eq) {
        eq += '';
        if (!this.hashObject) {
          this.hashObject = {};
        }
        this.hashObject[this.tabStateKey] = eq;
        this.setUrlHash(this.buildHashObject());
        console.log('content tabs update: ');
        return console.log(this.hashObject);
      };

      Tabs.prototype.getUrlHash = function() {
        if (window.location.hash) {
          return window.location.hash.substring(1);
        } else {
          return null;
        }
      };

      Tabs.prototype.setUrlHash = function(hash) {
        return window.location.hash = hash;
      };

      Tabs.prototype.updateState = function(eq) {
        this.activeTab = eq;
        this.selectTab(eq);
        return this.selectPanel(eq);
      };

      Tabs.prototype.setTabsPosition = function(pos) {
        return this.el.addClass(pos);
      };

      Tabs.prototype.getTabs = function() {
        if (!this.tabs) {
          return this.el.find('.contentTabsNav').find('li');
        }
      };

      Tabs.prototype.selectTab = function(eq) {
        if (this.options.maintainTabState) {
          this.updateHash(eq);
        }
        return this.getTabs().removeClass(this.options.tabActiveClass).eq(eq).addClass(this.options.tabActiveClass);
      };

      Tabs.prototype.removeTabs = function() {
        this.el.addClass('tabsNone');
        return this.getTabs().remove();
      };

      Tabs.prototype.getPanels = function() {
        if (!this.panels) {
          return this.el.find('.contentTabsPanel');
        }
      };

      Tabs.prototype.selectPanel = function(eq) {
        return this.getPanels().hide().eq(eq).show();
      };

      Tabs.prototype.pinPanels = function() {
        var $this, sectionsToPin;

        sectionsToPin = void 0;
        $this = void 0;
        this.el.addClass('pinPanelIntro');
        sectionsToPin = this.el.find('.contentTabsPanelIntro');
        return sectionsToPin.each(function() {
          $this = $(this);
          return $this.insertBefore($this.parent());
        });
      };

      return Tabs;

    })();
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_#{pluginName}')) {
          $.data(this, 'plugin_#{pluginName}', new Tabs(this, options));
        }
      });
    };
  });

}).call(this);
