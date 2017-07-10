(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .factory('Team', Team);

  /** @ngInject */
  function Team (FIREBASE_URL, $firebaseAuth, $firebaseArray, $firebaseObject, $q, Auth, Manager) {

    var itemsRef = new Firebase(FIREBASE_URL + '/teams');

    /* example of a team object
    {
      nickname: 'Wolves',
      sex: 'female',
      age: '18',
      sport: 'soccer',
      registration_fee: '1200',
      address_city: 'Rochester Hills',
      company_id: '-hcwkho332djn_di',
      coaches: [ // empty array if no coaches
        'hd3ocp3k3': true,
        'ceh03cc3s': true
      ],
      players: [ // empty array if no players
        'u2idysoc': true,
        'd2xoedco': true
      ],
      games: [ // empty array if no games
        'oijdp3dok': true,
        'cjlwkc;ec': true
      ]
    }
    */

    var Team = $firebaseObject.$extend({
      $$defaults: {
        coaches: new Array(),
        players: new Array(),
        games: new Array()
      }
    })

    return {

      // return Object
      get: function (teamId) {
        return $firebaseObject(itemsRef.child(teamId));
      },

      getAllByCompany: function (companyId) {
        // if the logged in user is a manager
        // return the manager's teams
        var query = itemsRef.orderByChild('company_id').equalTo(companyId);
        return $firebaseArray(query);

        // TODO: What if the logged in user is a coach?
        // TODO: What if the user is a player?

      },

      // return Array
      all: function () {

        // return a promise leave this alone for a while
        return $q(function (resolve, reject) {
          Manager
            .$loaded()
            .then(function (managerData) {
              if (managerData.superadmin) {
                resolve($firebaseArray(itemsRef));
              } else {
                reject(new Error('Permission denied. Superadmin only.'));
              }
            }).catch(function (error) {
              reject(error);
            });
        });

      },

      // getAllByState: function (state) {
      //   // TODO: Restrict to superadmin only
      //
      //   var query = itemsRef.orderByChild('address_state').equalTo(state);
      //   return $firebaseArray(query);
      // },
      // getAllByZip: function (zip) {
      //   // TODO: Restrict to super admin only
      //   var query = itemsRef.orderByChild('address_zip').equalTo(zip);
      //   return;
      // },
      // getAllByDistance: function (address) {
      //   // TODO: geocode the address and do something
      //   // TODO: restrict to superadmin only
      //   return;
      // }

    };


  }

})();
