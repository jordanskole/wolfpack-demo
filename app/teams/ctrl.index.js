(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('TeamIndexController', TeamIndexController);

  /** @ngInject */
  function TeamIndexController ($log, $state, $mdSidenav, Auth, CurrentAuth, CurrentManager, CurrentCompany, Manager, Team) {

    var vm = this;
    vm.me = CurrentManager;
    vm.company = CurrentCompany;
    vm.data = $state.current.data;

    Team
      .getAllByCompany(vm.company.$id)
      .$loaded()
      .then(function (teamData) {
        vm.teams = teamData;
        $log.log(teamData)
      })

    vm.createTeam = function () {
      vm.teams
        .$add({'company_id': vm.company.$id})
        .then(function (newTeam) {

          $log.log('Just created a new Team:');
          $log.log(newTeam);

          vm.company.teams.push(newTeam.key());
          vm.company.$save().then(function () {
            $state.go('li.teams.detail.name', {id: newTeam.key(), action: 'create' });
          })
        });
    }
  }

})();
