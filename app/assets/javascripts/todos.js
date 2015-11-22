
$( document ).ready(function() {
  var todosApp = function() {

    var _showEditForm = function(e) {
      var todoId = $(e.target).data('todo_id');
      $(TodoApp.config.todoFormWrapperClass).hide();
      $(TodoApp.config.todoFormWrapperIdPrefix + todoId).show();
    };

    var _showNewForm = function(e) {
      $(TodoApp.config.todoFormNewId).show();
    };

    var _deleteTodo = function(e) {
      var todoId = $(e.target).data('todo_id');
      var url = $(e.target).data('url');
      TodoApp.api.deleteTodo(url, todoId);
    };

    var _cancelEdit = function(e) {
      var todoId = $(e.target).data('todo_id') || 'new-todo';
      $(TodoApp.config.todoFormWrapperIdPrefix + todoId).hide();
    };

    var _submitForm = function(e) {
      var todoId = $(e.target).data('todo_id') || null;
      if (todoId) {
        TodoApp.api.updateTodo(todoId);
      } else {
        TodoApp.api.createTodo(todoId);
      }
    };

    var actions = [

      {
        action: 'click',
        selector: '.todo-edit-button',
        handler: _showEditForm
      },
      {
        action: 'click',
        selector: '.todo-new-button',
        handler: _showNewForm
      },
      {
        action: 'click',
        selector: '.todo-delete-button',
        handler: _deleteTodo
      },
      {
        action: 'click',
        selector: '.todo-edit-form-cancel-button',
        handler: _cancelEdit
      },
      {
        action: 'click',
        selector: '.todo-edit-form-submit-button',
        handler: _submitForm
      }
      
    ];

    actions.map(function(a) {
      console.log('actions', a);
      $(document).on(a.action, a.selector, a.handler)
    }.bind(this));



  }();
}); 
