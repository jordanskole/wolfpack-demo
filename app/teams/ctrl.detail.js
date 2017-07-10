(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('TeamDetailController', TeamDetailController);

  /** @ngInject */
  function TeamDetailController ($state, $mdSidenav, Auth, CurrentAuth, CurrentCompany, Team) {

    var vm = this;
    vm.data = $state.current.data;

    Team
      .get($state.params.id)
      .$loaded()
      .then(function (teamData) {
        vm.team = teamData;

        // set some defaults for the team we aren't really saving this yet
        // vm.team.address_street = CurrentCompany.address_street;
        // vm.team.address_street_2 = CurrentCompany.address_street_2;
        // vm.team.address_city = CurrentCompany.address_city;
        // vm.team.address_state = CurrentCompany.address_state;
        // vm.team.address_zip = CurrentCompany.address_zip;

      }, function (error) {
        $log.error(error);
      });

    vm.saveTeam = function (route, createRoute) {
      vm.team
        .$save()
        .then(function (ref) {
          if ($state.params.action === 'create') {
            $state.go(createRoute)
          } else {
            $state.go(route)
          }
        });
    }

  }

})();
