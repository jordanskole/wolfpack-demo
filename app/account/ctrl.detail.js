(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('AccountDetailController', AccountDetailController);

  /** @ngInject */
  function AccountDetailController ($log, $scope, $state, $mdSidenav, CurrentAuth, Manager, Company) {

    var vm = this;
    vm.me = CurrentAuth;

    // read this for 3-way data binding and controllerAs syntax
    // http://stackoverflow.com/a/28803778/1061009
    // Manager.$bindTo($scope, 'manager');
    Manager
      .$loaded()
      .then(function (managerData) {
        vm.manager = managerData;
      });

    Company
      .mine()
      .$loaded()
      .then(function (companyData) {
        vm.companies = companyData;
      }, function (error) {
        $log.error(error);
      });

    /*
     * Functions
     */

    vm.saveManager = function (route, createRoute) {
      vm.manager
        .$save()
        .then(function (ref) {
          if ($state.params.action === 'create') {
            $state.go(createRoute, {}, {reload: true})
          } else {
            $state.go(route, {}, {reload: true})
          }
        });
    }

    vm.createCompany = function () {
      vm.companies
        .$add({'manager_id': vm.me.uid})
        .then(function (newCompany) {
          vm.manager.companies.push(newCompany.key());
          vm.manager.$save().then(function () {
            $state.go('li.account.company.name', {id: newCompany.key(), action: 'create' });
          })
        });
    }

    vm.range = function (num) {
      return new Array(num);
    }


    // manager.$loaded()
    //   .then(function () {
    //     $log.log('loaded');
    //     manager.first_name = 'Jordan';
    //     manager.last_name = 'Skole';
    //     manager.email = 'jordan@skole.us';
    //     manager.cell_phone = '2488817460';
    //     manager.work_phone = '3135551234';
    //     manager.birthday = '1985-07-16T19 =20+01 =00';
    //     manager.street = '169 Saxon Ct';
    //     manager.street2 = 'Ste 200';
    //     manager.city = 'Rochester Hills';
    //     manager.state = 'MI';
    //
    //     manager.$save();
    //   })


  }

})();
