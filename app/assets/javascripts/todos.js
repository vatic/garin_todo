
$( document ).ready(function() {
  var todosApp = function() {
    console.log('todos.js loaded...');

    $(document).on('click', '.todo-edit-button', function(e) {
      var todo_id = $(e.target).data('todo_id');
      console.log('todo-edit-button click', '.todo-edit-form-wrapper#' + todo_id);
      $('.todo-edit-form-wrapper').addClass('hidden');
      $('.todo-edit-form-wrapper#' + todo_id).removeClass('hidden');
    });

    $('.todo-new-button').on('click', function(e) {
      console.log('click new button', e);
      $('#new-todo').removeClass('hidden');
    });

    $(document).on('click', '.todo-delete-button', function(e) {
      var todo_id = $(e.target).data('todo_id');
      var url = $(e.target).data('url');
      var formData = {
        _method: 'delete'
      };

      if ( confirm('Are you sure?') ) {
        $.post(url, formData)
          .done(function(data) {
            console.log('data',data);
            $('#todo_row_' + todo_id).remove();

          })
          .fail(function(error) {
            console.log('error', error);
          })
      }
    });


    $(document).on('click', '.todo-edit-form-cancel-button', function(e) {
      var todo_id = $(e.target).data('todo_id') || 'new-todo';
      console.log('click cancel', todo_id);
      $('.todo-edit-form-wrapper#' + todo_id).addClass('hidden');
    });

    $('.todo-edit-form-submit-button').on('click', function(e) {
      var todo_id = $(e.target).data('todo_id') || null;
      console.log('click submit', todo_id);
      if (todo_id) {
        var formData = $('#edit_todo_' + todo_id).serialize();
        var url = $('.todo-edit-form-wrapper#' + todo_id).data('url');
      } else {
        var formData = $('#new_todo').serialize();
        var url = $('.todo-edit-form-wrapper#new-todo').data('url');
      }
      console.log('serialized data', formData);
      console.log('form url', url);
      $.post(url, formData)
        .done(function(data) {
          console.log('data',data);
          if (todo_id) {
            $('#todo_title_' + todo_id).html(data.title);
            $('#todo_deadline_at_' + todo_id).html(data.deadline_at);
            $('.todo-edit-form-wrapper#' + todo_id).addClass('hidden');
          } else {
            $('.todos-list').append(data.html);
          }
        })
        .fail(function(error) {
          console.log('error', error);
        })
    });


  }();
}); 
