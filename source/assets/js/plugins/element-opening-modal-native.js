
(function(factory){
  'use strict';
  // CommonJS/RequireJS and "native" compatibility
  if(typeof module !== "undefined" && typeof exports === "object") {
    // A commonJS/RequireJS environment
    if(typeof window !== "undefined") {
      // Window and document exist, so return the factory's return value.
      module.exports = factory();
    } else {
      // Let the user give the factory a Window and Document.
      module.exports = factory;
    }
  } else {
    // Assume a traditional browser.
    window.OpeningModal = factory();
  }
})(function(){

  // OpeningModal DEFINITION
  // ===================
  var OpeningModal = function( element, option ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    // this.option = typeof option === 'string' ? option : null;
    this.options = {};
    this.options.target = options.target;
    this.options.changeContent = !options.changeContent ? null : options.changeContent;
    this.options.ajaxLink = !options.ajaxLink ? null : options.ajaxLink;
    this.options.requestType = !options.requestType ? null : options.requestType;
    this.options.loadLink = !options.loadLink ? null : options.loadLink;
    this.options.backdrop = !options.backdrop ? null : options.backdrop;

    this.init();
  };

  // OpeningModal METHODS
  // ================
  OpeningModal.prototype = {

    init : function() {
      var self = this;
      this.actions();

      // self.element.setAttribute('data-closed', true); // Fix onblur on Chrome
      // self.element.addEventListener('click', self.toggle, true);
      self.element.addEventListenerOrAttachEvent(self.toggle, 'click',  true);

    },

    actions : function() {
      var self = this, elm = self.element, opt = self.options;
      
      self.toggle = function (e) {
        var targetModal = document.getElementById(opt.target);
        if(opt.ajaxLink) {
          self.ajax();
        }
        else {
          var objModal = new Modal(targetModal, {
            duration: 500,
            backdrop: opt.backdrop,
            newContent: opt.changeContent,
            replaceContainer: 'data-replace',
            replaceHref: opt.loadLink
          });
          objModal.open();
        }          
      };
      self.ajax = function () {

        var request = new RequestAjax (),
            sendRequest, parrams;
        
        if(!opt.requestType || opt.requestType !== 'POST') {
          parrams = {id: elm.getAttribute('data-id')};
          sendRequest = request.sendRequest(opt.ajaxLink, self.ajaxGet.success, self.ajaxGet.error, opt.requestType, parrams);
        }

        else {
          parrams = '';
          sendRequest = request.sendRequest(opt.ajaxLink, self.ajaxPost.success, self.ajaxPost.error, 'post', parrams);
        }
      };
      self.ajaxGet = {
        success: function (response) {
          var targetModal = document.getElementById(opt.target);
          var objModal = new Modal(targetModal, {
            duration : 500,
            backdrop: opt.backdrop,
            newContent : response,
            replaceContainer : 'data-replace'
          });
          objModal.open();
        },
        error: function (err) {
          alert(err);
        }
      };
      self.ajaxPost = {
        success: function (response) {
          alert(response);
        },
        error: function (err) {
          alert(err);
        }
      };
    }
  };

  // OpeningModal DATA API
  // =================
  var OpeningModals = document.querySelectorAll('[data-toggle="opening-modal"]'), 
      i = 0, 
      modalLength = OpeningModals.length;
  for (i; i < modalLength; i++ ) {
      var elmShowModal = OpeningModals[i],
          options = {
            target : elmShowModal.getAttribute('data-target'),
            changeContent : elmShowModal.getAttribute('data-content'),  
            requestType : elmShowModal.getAttribute('data-request'),
            ajaxLink : elmShowModal.getAttribute('data-href-ajax'),
            loadLink: elmShowModal.getAttribute('data-href'),
            backdrop: elmShowModal.getAttribute('data-backdrop')
          };
    new OpeningModal(elmShowModal, options);
  }

  return OpeningModal;

});