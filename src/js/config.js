angular.module('app.config', [
    'ui.router'
])
.config(['$stateProvider', '$sceProvider', '$urlRouterProvider',
         '$locationProvider', '$httpProvider', '$compileProvider',
    function ($stateProvider, $sceProvider, $urlRouterProvider,
          $locationProvider, $httpProvider, $compileProvider) {

        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode({ enabled: true, requireBase: false });

        $stateProvider
            .state('login', {
                url: '/login',
                template: '<login></login>'
            });


        $urlRouterProvider.otherwise('/login');

        $sceProvider.enabled(false);

    }
]);
