(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('CompanyDetailController', CompanyDetailController);

  /** @ngInject */
  function CompanyDetailController ($log, $scope, $state, $mdSidenav, CurrentAuth, Manager, Company) {

    var vm = this;
    vm.me = CurrentAuth;
    $log.log($state.params)

    Company
      .get($state.params.id)
      .$loaded()
      .then(function (companyData) {
        vm.company = companyData;
      });

    /*
     * Functions
     */

    vm.saveCompany = function (route, createRoute) {
      vm.company
        .$save()
        .then(function (ref) {
          if ($state.params.action === 'create') {
            $state.go(createRoute, {}, {reload: true})
          } else {
            $state.go(route, {}, {reload: true})
          }
        });
    }
  }

})();
