(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('NotificationIndexController', NotificationIndexController);

  /** @ngInject */
  function NotificationIndexController ($log, $state, $mdSidenav, $mdDialog, Auth, CurrentAuth, CurrentManager, CurrentCompany, Company) {

    var vm = this;
    vm.data = $state.current.data;

    // check if all of the required information is there
    if (CurrentManager.first_name && CurrentManager.last_name && (CurrentManager.phone_cell || CurrentManager.phone_work) && CurrentManager.address_street && CurrentManager.address_city && CurrentManager.address_state && CurrentManager.address_zip) {
      vm.account = true;
    }

    if (CurrentManager.companies.length > 0) {
      vm.hasCompany = true;
      vm.company = CurrentCompany;
    }

    if (CurrentCompany && CurrentCompany.teams.length > 0) {
      vm.teams = true;
    }

    if (CurrentCompany && CurrentCompany.coaches.length > 0) {
      vm.coaches = true;
    }

    if (CurrentCompany && CurrentCompany.players.length > 0) {
      vm.players = true;
    }

    vm.comingSoon = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('This feature is coming soon!')
        .textContent('We\'re working as hard as possible to make Wolfpack Club Manager a realty. Stay tuned!')
        .ariaLabel('This feature is coming soon')
        .ok('Got it!')
        .targetEvent(ev)
    );

  };

  }

})();
