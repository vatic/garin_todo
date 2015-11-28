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
    updateDoneCss: function(todoId) {
      return function(data) {
        var el = _cfg.doneButtonClass + '#' + todoId;
        $(_cfg.todoTitleIdPrefix + todoId).toggleClass('done');
        $(_cfg.todoDeadlineIdPrefix + todoId).toggleClass('done');
        $(el).data(_cfg.doneDataAttr, data.done);
        if(data.done) {
          $(el).removeClass('btn-info');
          $(el).addClass('btn-default');
          $(el).html('Undo');
        } else {
          $(el).removeClass('btn-default');
          $(el).addClass('btn-info');
          $(el).html('Done');
        }
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
      $.post(url, formData)
        .done(function(data) {
          successHandler(data);
        })
        .fail(function(error) {
          errorHandler(error);
        })
    },

    updateDoneStatus: function(doneStatus, url, todoId) {
      var formData = {
        _method: 'patch',
        todo: {
          done: !doneStatus
        }
      };

      this._post(url, formData, responseHandlers.updateDoneCss(todoId), responseHandlers.updateErrorHandler(todoId));
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
