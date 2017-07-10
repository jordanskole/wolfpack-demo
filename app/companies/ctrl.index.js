(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('CompanyIndexController', CompanyIndexController);

  /** @ngInject */
  function CompanyIndexController ($log, $scope, $state, $mdSidenav, CurrentAuth, CurrentManager) {

    var vm = this;
    vm.me = CurrentAuth;
    vm.manager = CurrentManager;


    /*
     * Functions
     */
  }

})();
