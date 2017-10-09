(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, data) {
    $.ajax(this.serverUrl, {
      type: 'POST',
      success: $.post(this.serverUrl, data, function(serverResponse) {
        console.log(serverResponse);
      }),
      error: function(xhr) {
        console.log(xhr.responseText);
      },
      data: JSON.stringify({
        emailAddress: key,
        coffee: data[key]
      }),
      contentType: 'application/json'
    });
  };

  RemoteDataStore.prototype.getAll = function() {
    $.ajax(this.serverUrl, {
      type: 'GET',
      success: $.get(this.serverUrl, function(serverResponse) {
        console.log(serverResponse);
      }),
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  };

  RemoteDataStore.prototype.get = function(key) {
    $.ajax(this.serverUrl + '/' + key, {
      type: 'GET',
      success: $.get(this.serverUrl + '/' + key, function(serverResponse) {
        console.log(serverResponse);
      }),
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    $.ajax(this.serverUrl + '?emailAddress=' + key, {
      type: 'DELETE',
      success: function(serverResponse) {
        console.log(serverResponse);
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);
