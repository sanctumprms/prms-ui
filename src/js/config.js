angular.module('prms.config', [
    'ui.router'
])
.config(['$stateProvider', '$sceProvider', '$urlRouterProvider',
         '$locationProvider', '$httpProvider', '$compileProvider',
    function ($stateProvider, $sceProvider, $urlRouterProvider,
          $locationProvider, $httpProvider, $compileProvider) {

        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode({ enabled: true, requireBase: false });

        $stateProvider
            .state('home', {
                url: '/',
                template: '<home></home>'
            });


        $urlRouterProvider.otherwise('/');

        $sceProvider.enabled(false);

    }
]);
