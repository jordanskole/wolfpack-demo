(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .factory('Manager', Manager);

  /** @ngInject */
  function Manager (FIREBASE_URL, $firebaseAuth, $firebaseObject, Auth) {

    var itemsRef = new Firebase(FIREBASE_URL + '/managers');
    var Manager = $firebaseObject.$extend({
      $$defaults: {
        companies: new Array()
      }
    });

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
      companies: [ // false if no companies
        '29c8cuc2u0c-0c3': true,
        'u20e9c-e2ic3': true
      ]
    }
    */
    return Manager(itemsRef.child(Auth.$getAuth().uid));


  }

})();
