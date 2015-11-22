
var main = function() {

  var _cfg = TodoApp.config;
  var _api = TodoApp.api;

  var _todoId = function(e) {
    return $(e.target).data(_cfg.todoIdDataAttr);
  };

  var _showEditForm = function(e) {
    $(_cfg.todoFormWrapperClass).hide();
    $(_cfg.todoFormWrapperIdPrefix + _todoId(e)).show();
  };

  var _showNewForm = function(e) {
    $(_cfg.todoFormNewId).show();
  };

  var _deleteTodo = function(e) {
    var url = $(e.target).data(_cfg.urlDataAttr);
    _api.deleteTodo(url, _todoId(e));
  };

  var _cancelEdit = function(e) {
    if (_todoId(e)) {
      $(_cfg.todoFormWrapperIdPrefix + _todoId(e)).hide();
    } else {
      $(_cfg.todoFormWrapperClass + _cfg.todoFormNewId).hide();
    }
    $(document).trigger('flash:hide');
  };

  var _submitForm = function(e) {
    if (_todoId(e)) {
      _api.updateTodo(_todoId(e));
    } else {
      _api.createTodo(_todoId(e));
    }
  };

  var _showFlashSuccess = function(e, message) {
    var el = $(_cfg.flashClass);
    el.html(message);
    el.addClass('alert-success');
    el.show();
  };

  var _showFlashError = function(e, message) {
    var el = $(_cfg.flashClass);
    el.html(message.responseText);
    el.addClass('alert-danger');
    el.show();
  };

  var _hideFlash = function(e) {
    $(_cfg.flashClass).hide();
  };


  var actions = [

    {
      action: 'click',
      selector: _cfg.editButtonClass,
      handler: _showEditForm
    },
    {
      action: 'click',
      selector: _cfg.newButtonClass,
      handler: _showNewForm
    },
    {
      action: 'click',
      selector: _cfg.deleteButtonClass,
      handler: _deleteTodo
    },
    {
      action: 'click',
      selector: _cfg.formCancelClass,
      handler: _cancelEdit
    },
    {
      action: 'click',
      selector: _cfg.formSubmitClass,
      handler: _submitForm
    },
    {
      action: 'flash:success',
      selector: null,
      handler: _showFlashSuccess
    },
    {
      action: 'flash:error',
      selector: null,
      handler: _showFlashError
    },
    {
      action: 'flash:hide',
      selector: null,
      handler: _hideFlash
    }
    
  ];

  actions.map(function(a) {
    if (a.selector) {
      $(document).on(a.action, a.selector, a.handler);
    } else {
      $(document).on(a.action, a.handler);
    }
  }.bind(this));

};

TodoApp.main = main;

