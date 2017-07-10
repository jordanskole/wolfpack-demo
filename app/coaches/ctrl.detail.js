(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('CoachDetailController', CoachDetailController);

  /** @ngInject */
  function CoachDetailController ($log, $state, $mdSidenav, Auth, CurrentAuth, CurrentManager, CurrentCompany, Coach) {

    var vm = this;
    vm.data = $state.current.data;
    Coach
      .get($state.params.id)
      .$loaded()
      .then(function (coachData) {
        $log.log(coachData)
        vm.coach = coachData;
      });

    vm.saveCoach = function (route) {
      vm.coach
        .$save()
        .then(function (ref) {
          $state.go(route);
        })
    }

    vm.range = function (num) {
      return new Array(num);
    }

  }

})();
