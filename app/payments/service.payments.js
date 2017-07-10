(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .factory('Payment', Payment);

  /** @ngInject */
  function Payment ($q, FIREBASE_URL, $firebaseAuth, $firebaseObject, $firebaseArray, Auth, Team, Player) {

    var itemsRef = new Firebase(FIREBASE_URL + '/payments');
    var Payment = $firebaseObject.$extend({
      $$defaults: {
        // default goes here
      }
    });
    var Payments = $firebaseArray.$extend({
      $$defaults: {
        // default goes here
      }
    })

    /* example of a payment object
    {
      company_id: 'whiucljkwxdh',
      team_id: 'cwjli2eidj', // teamId
      player_id: 'jwcioppjcw', // playerId
      payee_id: 'wcuhcepo2dep', // playerId or parentId
      payee_type: 'player', // player, guardian
      amount: 120000, // in cents
      method: 'ach', // 'ach', 'cc', 'manual_payment',
      note: 'Cathy gave me a person check at the bubble on the date' // optional text body for notes
    }
    */

    return {

      // return Object
      get: function (paymentId) {
        return Payment(itemsRef.child(paymentId));
      },

      // return Array
      getByCompany: function (companyId) {
        var query = itemsRef.orderByChild('company_id').equalTo(companyId);
        return Payments(query);
      },

      // return Array
      getByPlayer: function (playerId) {
        var query = itemsRef.orderByChild('player_id').equalTo(playerId);
        return Payments(query);
      },

      // return Array
      getByTeam: function (teamId) {
        var query = itemsRef.orderByChild('team_id').equalTo(teamId);
        return Payments(query);
      },

      // return Array
      all: function () {
        return Payments(itemsRef);
      },

      // return Array
      // accept an array of payments like would be returned
      // above
      enrichPayments: function (payments) {
        return $q(function (resolve, reject) {

          let finished = _.after(payments.length * 2, function () {
            // resolve enrichPayments
            // after forEach payments and forEach teams has finished
            resolve(payments);
          });

          _.forEach(payments, function (payment) {
            Player
              .get(payment.player_id)
              .$loaded()
              .then(function (playerData) {
                payment.player = playerData;
                finished();
                return payment;
              })
              .catch(function (error) {
                reject(error);
              });
          });

          _.forEach(payments, function (payment) {
            Team
              .get(payment.team_id)
              .$loaded()
              .then(function (teamData) {
                payment.team = teamData;
                finished();
                return payment;
              })
              .catch(function (error) {
                reject(error);
              });
          });

        });

      },

      enrichPayment: function (payment) {
        return $q(function (resolve, reject) {
          Player
            .get(payment.player_id)
            .$loaded()
            .then(function (playerData) {
              payment.player = playerData;
              return payment;
            })
            .then(function(payment) {
              return Team.get(payment.team_id).$loaded();
            })
            .then(function(teamData) {
              payment.team = teamData;
              resolve(payment);
            });
        });
      }

      // return Array
      // enrichPayments = function (payments) {
      //   _.forEach(payments, functon (payment) {
      //     Player
      //       .get(payment.player_id)
      //       .$loaded()
      //       .then(function () {
      //         payment.
      //       })
      //   })
      // }
    }


  }

})();
