(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController ($state, $log, $mdSidenav, Auth, CurrentAuth, CurrentManager, CurrentCompany) {

    var vm = this;
    vm.me = CurrentAuth;
    if (CurrentCompany) {
      vm.hasCompany = true;
      vm.company = CurrentCompany;
    } else {
      vm.hasCompany = false;
    }

    /*
     * Functions
     */

    vm.logout = function () {
      // log the user out
      Auth.$unauth();

      // then do something
      $state.go('login');
    }

    vm.toggleSidenav = function () {
      $mdSidenav('left').toggle();
    }

  }

})();
