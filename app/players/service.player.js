(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .factory('Player', Player);

  /** @ngInject */
  function Player (FIREBASE_URL, $firebaseAuth, $firebaseObject, $firebaseArray, Auth) {

    var itemsRef = new Firebase(FIREBASE_URL + '/players');
    var Player = $firebaseObject.$extend({
      $$defaults: {
        teams: new Array(),
        companies: new Array(),
        payments: new Array(),
        guardians: new Array()
      }
    });
    var Players = $firebaseArray.$extend({
      $$defaults: {
        teams: new Array(),
        companies: new Array(),
        payments: new Array(),
        guardians: new Array()
      }
    })

    /* example of a manager object (userData)
    {
      first_name: 'Jordan',
      last_name: 'Skole',
      email: 'jordan@wolfpackapps.com',
      cell_phone: '2488817460',
      work_phone: '3135551234',
      birthday: '1985-07-16T19:20+01:00',
      street: '169 Saxon Ct',
      street2: 'Ste 200',
      city: 'Rochester Hills',
      state: 'MI',
      teams: [ // false if no teams
        '29c8cuc2u0c-0c3': true,
        'u20e9c-e2ic3': true
      ],
      companies: [ // false if no companies yet
        '29c8cuc2u0c-0c3': true,
        'u20e9c-e2ic3': true
      ],
      payments: [ // false if no payments yet
        '29c8cuc2u0c-0c3': true,
        'u20e9c-e2ic3': true
      ],
      guardians: [
        '9kps2djec3ij-23dd2-2jdxn2': true
      ]
    }
    */
    return {

      // return Object
      get: function (playerId) {
        return Player(itemsRef.child(playerId));
      },

      // return Array
      getByEmail: function (playerEmail) {
        var query = itemsRef.orderByChild('email').equalTo(playerEmail);
        return Players(query);
      },

      // return Array
      getByCompany: function (companyId) {
        var query = itemsRef.orderByChild('companies').equalTo(companyId);
        return Players(query);
      },

      // return Array
      all: function () {
        // TODO: check for super admin
        return Players(itemsRef);
      }
    }


  }

})();
