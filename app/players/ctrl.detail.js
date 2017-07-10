(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('PlayerDetailController', PlayerDetailController);

  /** @ngInject */
  function PlayerDetailController ($log, $state, $mdSidenav, Auth, CurrentAuth, CurrentCompany, Player) {

    var vm = this;
    vm.data = $state.current.data;

    Player
      .get($state.params.id)
      .$loaded()
      .then(function (playerData) {
        $log.log(playerData)
        vm.player = playerData;
      });

    vm.savePlayer = function (route) {
      vm.player
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
