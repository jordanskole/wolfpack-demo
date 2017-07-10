(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .factory('Helper', Helper);

  /** @ngInject */
  function Helper () {

    return {
      randomString: function randomString(length) {
        return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
      }
    };
  }

})();
