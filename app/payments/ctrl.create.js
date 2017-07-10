(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('PaymentCreateController', PaymentCreateController);

  /** @ngInject */
  function PaymentCreateController ($log, $state, $mdDialog, Auth, CurrentManager, CurrentCompany, Payment, Team, Player) {

    var vm = this;
    vm.data = $state.current.data;
    vm.company = CurrentCompany;
    vm.players = new Array();

    Payment
      .all()
      .$loaded()
      .then(function (paymentsData) {
        vm.payments = paymentsData;
        $log.log(vm.payments)
      });

    Team
      .getAllByCompany(CurrentCompany.$id)
      .$loaded()
      .then(function (teamsData) {
        vm.teams = teamsData;
      });

    _.forEach(CurrentCompany.players, function (playerId) {
      Player
        .get(playerId)
        .$loaded()
        .then(function (playerData) {
          vm.players.push(playerData)
          // playerLoaded();
        });
    });

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.recordPayment = function () {
      let paymentToSave = _.merge(vm.payment, {
        method: 'manual_payment',
        payee_type: 'player',
        payee_id: vm.payment.player_id,
        company_id: CurrentCompany.$id,
        created_on: moment().format()
      });


      vm.payments
        .$add(paymentToSave)
        .then(function (savedPaymentData) {
          $mdDialog.hide();
        });

    };

    // vm.clearFields = function () {
    //   $mdDialog.cancel();
    // }

  }

})();
