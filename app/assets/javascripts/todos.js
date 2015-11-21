
$( document ).ready(function() {
  var todosApp = function() {
    console.log('todos.js loaded...');
    $('.todo-edit-button').on('click', function(e) {
      var todo_id = $(e.target).data('todo_id');
      console.log('click', todo_id);
      console.log('click form', $('form#edit_todo_' + todo_id));
      $('.todo-edit-form').addClass('hidden');
      $('form#edit_todo_' + todo_id).removeClass('hidden');
    });
  }();
}); 
