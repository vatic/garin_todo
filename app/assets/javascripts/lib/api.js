'use strict';

(function() {

  var api = {
    updateTodo: function(todoId) {
      var formData = $('#edit_todo_' + todoId).serialize();
      var url = $('.todo-edit-form-wrapper#' + todoId).data('url');
      $.post(url, formData)
        .done(function(data) {
          console.log('data',data);
          $('#todo_title_' + todoId).html(data.title);
          $('#todo_deadline_at_' + todoId).html(data.deadline_at);
          $('.todo-edit-form-wrapper#' + todoId).addClass('hidden');
        })
        .fail(function(error) {
          console.log('error', error);
        })
    },
    createTodo: function() {
      var formData = $('#new_todo').serialize();
      var url = $('.todo-edit-form-wrapper#new-todo').data('url');
      $.post(url, formData)
        .done(function(data) {
          console.log('data',data);
          $('.todos-list').append(data.html);
        })
        .fail(function(error) {
          console.log('error', error);
        })
    },

    deleteTodo: function(url, todoId) {
      var formData = {
        _method: 'delete'
      };

      if ( confirm('Are you sure?') ) {
        $.post(url, formData)
          .done(function(data) {
            console.log('data',data);
            $('#todo_row_' + todoId).remove();

          })
          .fail(function(error) {
            console.log('error', error);
          })
      }
    }

  }

  TodoApp.api = api;
})();
