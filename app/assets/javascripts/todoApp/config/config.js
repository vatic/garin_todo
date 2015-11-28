'use strict';


(function() {

  var config = {
    flashClass: '.flash',

    todoFormWrapperClass: '.todo-edit-form-wrapper',
    todoFormWrapperIdPrefix: '.todo-edit-form-wrapper#',
    todoEditFormIdPrefix: '#edit_todo_',
    todoNewFormId: '#new_todo',
    todoTitleIdPrefix: '#todo_title_',
    todoDeadlineIdPrefix: '#todo_deadline_at_',
    todoRowIdPrefix: '#todo_row_',
    todoFormNewId: '#new-todo',
    todosListClass: '.todos-list',
    doneButtonClass: '.todo-done-button',
    undoButtonClass: '.todo-undo-button',
    editButtonClass: '.todo-edit-button',
    deleteButtonClass: '.todo-delete-button',
    newButtonClass: '.todo-new-button',
    formCancelClass: '.todo-edit-form-cancel-button',
    formSubmitClass: '.todo-edit-form-submit-button',
    todoIdDataAttr: 'todo_id',
    urlDataAttr: 'url',
    doneDataAttr: 'todo_done'

  };

  TodoApp.config = config;

})();
