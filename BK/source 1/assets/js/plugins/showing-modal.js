/**
 *  @name showing-modal
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'showing-modal';
  var getQuizLiss = function () {
    $.ajax({
      type: 'GET',
      url: '',
      success: function () {
      }
    });
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this.element,
          options = this.options,
          modal = $(options.modal),

          modalDialog = modal.find('.modal-dialog'),
          modalTitle = modal.find('[data-title]'),
          thisTitle = that.text(),
          body = that.closest('body'),
          layer = body.find('.overlay');


      var thatChangeTitle = that.data('reset-title');

      if(this.options.isModalLogout) {
        var btnConfirm = modal.find('#mess-confirm-error-ok');
        btnConfirm.off('click').on('click', function () {
          // go to landing page, for local host
          // window.location.href = '//' + window.location.host + '/landing.html';
          //  for dev server
          window.location.href = '//' + window.location.host;
        });
      }

      that.off('click.showModal').on('click.showModal', function () {

        if(thatChangeTitle) {
          modalTitle.html(thisTitle);
        }

        if(options.activeItem !== '') {
          modal.find('.item').removeClass('active');
          $(options.activeItem).addClass('active');
        }

        modal.modal('show');
      });

      modal.on('show.bs.modal', function() {
        if(options.hasLayer) {
          layer.removeClass('hidden');
        }
        if(options.message !== '') {
          modal.find('.message').html(options.message);
        }
        var newScreenHeight = modal.find('.modal-backdrop.fade.in').height();
        modalDialog.height(newScreenHeight);
      });

      modal.on('hidden.bs.modal', function() {
        if(options.hasLayer) {
          layer.addClass('hidden');
        }
        if(options.message !== '') {
          modal.find('.message').html('');
        }
      });
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    option: 'value',
    btnShow: '',
    modal: '',
    message: '',
    activeItem: '',
    isModalLogout: false,
    hasLayer: false
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
