(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('PaymentDetailController', PaymentDetailController);

  /** @ngInject */
  function PaymentDetailController ($log, $state, $mdSidenav, Auth, CurrentAuth, Payment) {

    var vm = this;
    vm.data = $state.current.data;
    vm.payment = Payment.get($state.params.id);
    vm.payment.$watch(function (event) {
      Payment.enrichPayment(vm.payment).then(function () {
        $log.log(vm.payment)
      });
    });

  }

})();
