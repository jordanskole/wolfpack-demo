(function() {
  'use strict';

  angular
    .module('cmAdmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/tmpl.register.html',
        controller: 'RegisterController',
        controllerAs: 'RegisterCtrl',
        data: {
          title: 'Register'
        }
      })
      .state('register.club', {
        url: '/:id',
        templateUrl: 'app/register/tmpl.club.html',
        controller: 'RegisterClubController',
        controllerAs: 'RegisterClubCtrl',
        data: {
          title: 'Register'
        }
      })
      .state('register.club.team', {
        url: '/team',
        templateUrl: 'app/register/tmpl.team.html',
        controller: 'RegisterTeamController',
        controllerAs: 'RegisterTeamCtrl',
        data: {
          title: 'Register'
        }
      })
      .state('register.club.payment', {
        url: '/payment',
        templateUrl: 'app/register/tmpl.payment.html',
        controller: 'RegisterPaymentController',
        controllerAs: 'RegisterPaymentCtrl',
        data: {
          title: 'Register'
        }
      })
      .state('register.club.confirm', {
        url: '/confirm',
        templateUrl: 'app/register/tmpl.confirm.html',
        controller: 'RegisterPaymentController',
        controllerAs: 'RegisterPaymentCtrl',
        data: {
          title: 'Register'
        }
      })
      .state('login', {
        url: '/',
        templateUrl: 'app/account/tmpl.login.html',
        controller: 'LoginController',
        controllerAs: 'LoginCtrl',
        data: {
          title: 'Login'
        }
      })
      .state('li', {
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "CurrentAuth": ["Auth", function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
          }],
          "CurrentManager": ["Manager", function (Manager) {
            return Manager.$loaded();
          }],
          "CurrentCompany": ["Company", "CurrentManager", function (Company, CurrentManager) {
            if (CurrentManager.companies.length > 0) {
              return Company.get(CurrentManager.companies[0]).$loaded();
            } else {
              return false;
            }
          }]
        },
        url: '/+',
        templateUrl: 'app/account/tmpl.li.html',
        controller: 'AccountController',
        controllerAs: 'AccountCtrl',
        abstract: true,
        data: {
          theme: 'default'
        }
      })
      .state('li.account', {
        url: '/account?action&toast',
        templateUrl: 'app/account/tmpl.detail.html',
        controller: 'AccountDetailController',
        controllerAs: 'AccountDetailCtrl',
        data: {
          title: 'Your Account',
          theme: 'account'
        }
      })
      .state('li.account.name', {
        url: '/name',
        templateUrl: 'app/account/tmpl.detail.name.html',
        data: {
          title: 'Your Account - Edit: Name'
        }
      })
      .state('li.account.email', {
        url: '/email',
        templateUrl: 'app/account/tmpl.detail.email.html',
        data: {
          title: 'Your Account - Edit: Email'
        }
      })
      .state('li.account.phone', {
        url: '/phone',
        templateUrl: 'app/account/tmpl.detail.phone.html',
        data: {
          title: 'Your Account - Edit: Phone'
        }
      })
      .state('li.account.birthday', {
        url: '/birthday',
        templateUrl: 'app/account/tmpl.detail.birthday.html',
        data: {
          title: 'Your Account - Edit: Birthday'
        }
      })
      .state('li.account.address', {
        url: '/address',
        templateUrl: 'app/account/tmpl.detail.address.html',
        data: {
          title: 'Your Account - Edit: Address'
        }
      })
      .state('li.account.companies', {
        url: '/companies',
        templateUrl: 'app/companies/tmpl.index.html',
        controller: 'CompanyIndexController',
        controllerAs: 'CompanyIndexCtrl',
        data: {
          title: 'Your companies'
        }
      })
      .state('li.account.company', {
        url: '/company/:id',
        templateUrl: 'app/companies/tmpl.detail.html',
        controller: 'CompanyDetailController',
        controllerAs: 'CompanyDetailCtrl',
        data: {
          title: 'Your company'
        }
      })
      .state('li.account.company.name', {
        url: '/name',
        templateUrl: 'app/companies/tmpl.detail.name.html',
        data: {
          title: 'Your Company - Edit: Name'
        }
      })
      .state('li.account.company.phone', {
        url: '/phone',
        templateUrl: 'app/companies/tmpl.detail.phone.html',
        data: {
          title: 'Your Company - Edit: Phone'
        }
      })
      .state('li.account.company.fid', {
        url: '/fid',
        templateUrl: 'app/companies/tmpl.detail.fid.html',
        data: {
          title: 'Your Company - Edit: Federal Tax ID'
        }
      })
      .state('li.account.company.sid', {
        url: '/sid',
        templateUrl: 'app/companies/tmpl.detail.sid.html',
        data: {
          title: 'Your Company - Edit: State Tax ID'
        }
      })
      .state('li.account.company.address', {
        url: '/address',
        templateUrl: 'app/companies/tmpl.detail.address.html',
        data: {
          title: 'Your Company - Edit: Address'
        }
      })
      .state('li.notifications', {
        url: '/notifications',
        templateUrl: 'app/notifications/tmpl.index.html',
        controller: 'NotificationIndexController',
        controllerAs: 'NotificationIndexCtrl',
        data: {
          title: 'Your Notifications',
          theme: 'account'
        }
      })
      .state('li.payments', {
        url: '/payments',
        templateUrl: 'app/payments/tmpl.index.html',
        controller: 'PaymentIndexController',
        controllerAs: 'PaymentIndexCtrl',
        data: {
          title: 'Your Payments'
        }
      })
      .state('li.payments.detail', {
        url: '/:id',
        templateUrl: 'app/payments/tmpl.detail.html',
        controller: 'PaymentDetailController',
        controllerAs: 'PaymentDetailCtrl',
        data: {
          title: 'Payment Detail'
        }
      })
      .state('li.teams', {
        url: '/teams',
        templateUrl: 'app/teams/tmpl.index.html',
        controller: 'TeamIndexController',
        controllerAs: 'TeamIndexCtrl',
        data: {
          title: 'Your Teams',
          theme: 'teams'
        }
      })
      .state('li.teams.detail', {
        url: '/:id?action',
        templateUrl: 'app/teams/tmpl.detail.html',
        controller: 'TeamDetailController',
        controllerAs: 'TeamDetailCtrl',
        data: {
          title: 'Team Detail'
        }
      })
      .state('li.teams.detail.name', {
        url: '/name',
        templateUrl: 'app/teams/tmpl.detail.name.html',
        controller: 'TeamDetailController',
        controllerAs: 'TeamDetailCtrl',
        data: {
          title: 'Team Detail - Edit: Name'
        }
      })
      .state('li.teams.detail.age', {
        url: '/age',
        templateUrl: 'app/teams/tmpl.detail.age.html',
        controller: 'TeamDetailController',
        controllerAs: 'TeamDetailCtrl',
        data: {
          title: 'Team Detail - Edit: Age Group'
        }
      })
      .state('li.teams.detail.gender', {
        url: '/gender',
        templateUrl: 'app/teams/tmpl.detail.gender.html',
        controller: 'TeamDetailController',
        controllerAs: 'TeamDetailCtrl',
        data: {
          title: 'Team Detail - Edit: Team Gender'
        }
      })
      .state('li.teams.detail.sport', {
        url: '/sport',
        templateUrl: 'app/teams/tmpl.detail.sport.html',
        controller: 'TeamDetailController',
        controllerAs: 'TeamDetailCtrl',
        data: {
          title: 'Team Detail - Edit: Team Sport'
        }
      })
      .state('li.teams.detail.address', {
        url: '/address',
        templateUrl: 'app/teams/tmpl.detail.address.html',
        controller: 'TeamDetailController',
        controllerAs: 'TeamDetailCtrl',
        data: {
          title: 'Team Detail - Edit: Team Sport'
        }
      })
      .state('li.teams.detail.fee', {
        url: '/fee',
        templateUrl: 'app/teams/tmpl.detail.fee.html',
        controller: 'TeamDetailController',
        controllerAs: 'TeamDetailCtrl',
        data: {
          title: 'Team Detail - Edit: Payment Options'
        }
      })
      .state('li.teams.detail.options', {
        url: '/options',
        templateUrl: 'app/teams/tmpl.detail.options.html',
        controller: 'TeamDetailController',
        controllerAs: 'TeamDetailCtrl',
        data: {
          title: 'Team Detail - Edit: Registration Fee'
        }
      })
      .state('li.players', {
        url: '/players',
        templateUrl: 'app/players/tmpl.index.html',
        controller: 'PlayerIndexController',
        controllerAs: 'PlayerIndexCtrl',
        data: {
          title: 'Your Players',
          theme: 'teams'
        }
      })
      .state('li.players.detail', {
        url: '/:id',
        templateUrl: 'app/players/tmpl.detail.html',
        controller: 'PlayerDetailController',
        controllerAs: 'PlayerDetailCtrl',
        data: {
          title: 'Player Detail'
        }
      })
      .state('li.players.detail.name', {
        url: '/name',
        templateUrl: 'app/players/tmpl.detail.name.html',
        controller: 'PlayerDetailController',
        controllerAs: 'PlayerDetailCtrl',
        data: {
          title: 'Player Detail - Edit: Player name'
        }
      })
      .state('li.players.detail.email', {
        url: '/email',
        templateUrl: 'app/players/tmpl.detail.email.html',
        controller: 'PlayerDetailController',
        controllerAs: 'PlayerDetailCtrl',
        data: {
          title: 'Player Detail - Edit: Player email'
        }
      })
      .state('li.players.detail.phone', {
        url: '/phone',
        templateUrl: 'app/players/tmpl.detail.phone.html',
        controller: 'PlayerDetailController',
        controllerAs: 'PlayerDetailCtrl',
        data: {
          title: 'Player Detail - Edit: Player phone'
        }
      })
      .state('li.players.detail.birthday', {
        url: '/birthday',
        templateUrl: 'app/players/tmpl.detail.birthday.html',
        controller: 'PlayerDetailController',
        controllerAs: 'PlayerDetailCtrl',
        data: {
          title: 'Player Detail - Edit: Player birthday'
        }
      })
      .state('li.players.detail.gender', {
        url: '/gender',
        templateUrl: 'app/players/tmpl.detail.gender.html',
        controller: 'PlayerDetailController',
        controllerAs: 'PlayerDetailCtrl',
        data: {
          title: 'Player Detail - Edit: Player gender'
        }
      })
      .state('li.players.detail.address', {
        url: '/address',
        templateUrl: 'app/players/tmpl.detail.address.html',
        controller: 'PlayerDetailController',
        controllerAs: 'PlayerDetailCtrl',
        data: {
          title: 'Player Detail - Edit: Player address'
        }
      })
      .state('li.coaches', {
        url: '/coaches',
        templateUrl: 'app/coaches/tmpl.index.html',
        controller: 'CoachIndexController',
        controllerAs: 'CoachIndexCtrl',
        data: {
          title: 'Your Coaches',
          theme: 'teams'
        }
      })
      .state('li.coaches.detail', {
        url: '/:id',
        templateUrl: 'app/coaches/tmpl.detail.html',
        controller: 'CoachDetailController',
        controllerAs: 'CoachDetailCtrl',
        data: {
          title: "Coach Detail"
        }
      })
      .state('li.coaches.detail.name', {
        url: '/name',
        templateUrl: 'app/coaches/tmpl.detail.name.html',
        data: {
          title: "Coach Detail - Edit: Name"
        }
      })
      .state('li.coaches.detail.email', {
        url: '/email',
        templateUrl: 'app/coaches/tmpl.detail.email.html',
        data: {
          title: "Coach Detail - Edit: Email"
        }
      })
      .state('li.coaches.detail.phone', {
        url: '/phone',
        templateUrl: 'app/coaches/tmpl.detail.phone.html',
        data: {
          title: "Coach Detail - Edit: Phone Numbers"
        }
      })
      .state('li.coaches.detail.birthday', {
        url: '/birthday',
        templateUrl: 'app/coaches/tmpl.detail.birthday.html',
        data: {
          title: "Coach Detail - Edit: Birthday"
        }
      })
      .state('li.coaches.detail.address', {
        url: '/address',
        templateUrl: 'app/coaches/tmpl.detail.address.html',
        data: {
          title: "Coach Detail - Edit: Address"
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
