
$( document ).ready(function() {
  var todosApp = function() {
    console.log('todos.js loaded...');

    $('.todo-edit-button').on('click', function(e) {
      var todo_id = $(e.target).data('todo_id');
      $('.todo-edit-form-wrapper').addClass('hidden');
      $('.todo-edit-form-wrapper#' + todo_id).removeClass('hidden');
    });

    $('.todo-edit-form-cancel-button').on('click', function(e) {
      var todo_id = $(e.target).data('todo_id');
      console.log('click cancel', todo_id);
      $('.todo-edit-form-wrapper#' + todo_id).addClass('hidden');
    });

    $('.todo-edit-form-submit-button').on('click', function(e) {
      var todo_id = $(e.target).data('todo_id');
      console.log('click submit', todo_id);
      $('#edit_todo_' + todo_id).submit();
    });
  }();
}); 
