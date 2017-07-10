(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .controller('CoachIndexController', CoachIndexController);

  /** @ngInject */
  function CoachIndexController ($log, $state, $mdSidenav, $mdDialog, Helper, Auth, CurrentAuth, CurrentManager, CurrentCompany, Coach) {

    var vm = this;
    vm.data = $state.current.data;

    // build a coaches array, with our details
    vm.coaches = new Array();

    _.forEach(CurrentCompany.coaches, function (coachId) {
      Coach
        .get(coachId)
        .$loaded()
        .then(function (coachData) {
          vm.coaches.push(coachData)
          coachLoaded();
        });
    });

    var coachLoaded = _.after(CurrentCompany.coaches.length, function () {
      // all of our coaches have loaded. Do something.
      $log.log(vm.coaches);
    })

    // this needs to be turned into a service
    vm.inviteCoach = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Invite a coach')
        .textContent('Enter the coach\'s email address, and we will send them an invite')
        .placeholder('jordan@wolfpackapps.com')
        .ariaLabel('Coach to invite')
        // .initialValue('Buddy')
        .targetEvent(ev)
        .ok('Send invite')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(result) {
        // create a new account
        // we might need to validate this as an email
        Auth.$createUser({
          email: result,
          password: Helper.randomString(12)
        })
        .then(function (authData) {
          // create a new Coach
          Coach
            .get(authData.uid)
            .$loaded()
            .then(function (coachData) {
              coachData.status = "invited";
              coachData.email = result;
              coachData.companies.push(CurrentCompany.$id);
              CurrentCompany.coaches.push(coachData.$id);

              // save the new coach id to the company array
              CurrentCompany
                .$save()
                .then(function (companyData) {
                  $log.log('Associated coach with ' + companyData.name);
                });

              coachData
                .$save()
                .then(function (coachData) {
                  $state.go('li.coaches.detail', {id: coachData.key() });
                });
            })
        })
        .catch(function (error) {
          $log.error(error);
        });
      }, function() {
        $log.log('You didn\'t name your dog.');
      });
    };

  }

})();
