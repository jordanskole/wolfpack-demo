(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state) {

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      // throw the error
      $log.error(error);

      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("login");
      }
    });

    $rootScope.$state = $state;

    $log.debug('runBlock end');
  }

})();
