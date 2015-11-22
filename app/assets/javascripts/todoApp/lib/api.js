'use strict';

(function() {

  var _cfg = TodoApp.config;

  var responseHandlers = {
    rerenderTodoListRow: function(todoId) {
      return function(data) {
        $(_cfg.todoTitleIdPrefix + todoId).html(data.title);
        $(_cfg.todoDeadlineIdPrefix + todoId).html(data.deadline_at);
        $(_cfg.todoFormWrapperIdPrefix + todoId).hide();
        $(document).trigger('flash:success', ['Todo updated with title: ' + data.title]);
      };
    },

    addTodoListRow: function(data) {
      $(_cfg.todosListClass).prepend(data.html);
      $(_cfg.todoFormWrapperClass + _cfg.todoFormNewId).hide();
      $(document).trigger('flash:success', ['Todo created with title: ' + data.title]);
    },

    deleteTodoListRow: function(todoId) {
      return function(data) {
        $(_cfg.todoRowIdPrefix + todoId).remove();
      };
    },

    updateErrorHandler: function(todoId) {
      return function(error) {
        $(document).trigger('flash:error', [error]);
        $(document).trigger('validation:form:error', [error, todoId]);
      };
    },

    createErrorHandler: function(error) {
      $(document).trigger('flash:error', [error]);
      $(document).trigger('validation:form:error', [error]);
    }

  };

  var api = {

    _post: function(url, formData, successHandler, errorHandler) {
      console.log('formData', formData);
      $.post(url, formData)
        .done(function(data) {
          successHandler(data);
        })
        .fail(function(error) {
          //console.log('error', error);
          //$(document).trigger('flash:error', [error]);
          //$(document).trigger('validation:form:error', [error]);
          errorHandler(error);
        })
    },

    updateTodo: function(todoId) {
      var formData = $(_cfg.todoEditFormIdPrefix + todoId).serialize();
      var url = $(_cfg.todoFormWrapperIdPrefix + todoId).data(_cfg.urlDataAttr);
      this._post(url, formData, responseHandlers.rerenderTodoListRow(todoId), responseHandlers.updateErrorHandler(todoId));
    },

    createTodo: function() {
      var formData = $(_cfg.todoNewFormId).serialize();
      var url = $(_cfg.todoFormWrapperClass + _cfg.todoFormNewId ).data(_cfg.urlDataAttr);
      this._post(url, formData, responseHandlers.addTodoListRow, responseHandlers.createErrorHandler);
    },

    deleteTodo: function(url, todoId) {
      var formData = {
        _method: 'delete'
      };

      if ( confirm('Are you sure?') ) {
        this._post(url, formData, responseHandlers.deleteTodoListRow(todoId));
      }
    }

  }

  TodoApp.api = api;
})();
