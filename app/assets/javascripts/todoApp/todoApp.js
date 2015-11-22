
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
    $(_cfg.todoFormWrapperIdPrefix + _todoId(e)).hide();
  };

  var _submitForm = function(e) {
    if (_todoId(e)) {
      _api.updateTodo(_todoId(e));
    } else {
      _api.createTodo(_todoId(e));
    }
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
    }
    
  ];

  actions.map(function(a) {
    $(document).on(a.action, a.selector, a.handler)
  }.bind(this));

};

TodoApp.main = main;

