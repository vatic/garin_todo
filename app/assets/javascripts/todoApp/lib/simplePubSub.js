'use strict';

var simplePubSub = {};


function(o) {

  var _callstack = {};

  return function() {

     return {

      pub: function(channel, args) {
        
        if (channel in _callstack) {
          _callstack[channel](args);
        } else {
          _callstack[channel] = null;
        }

      },

      sub: function(channel, cb) {
          _callstack[channel] = cb;
      }

    }

  }


}(simplePubSub);

window.simplePubSub = simplePubSub;
