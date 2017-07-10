/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('FIREBASE_URL', 'https://clubmanager.firebaseio.com/')
    .constant('STRIPE_KEY', function () {
      return 'STRIPE_KEY';
    });

})();
