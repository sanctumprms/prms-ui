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
            })
            .state('rooms', {
                url: '/rooms',
                template: '<rooms></rooms>'
            })
            .state('show', {
                url: '/rooms/show/:id',
                template: '<show></show>'
            })
            .state('about', {
                url: '/about',
                template: '<about></about>'
            })
            .state('profile', {
                url: '/profile',
                template: '<profile></profile>'
            });

        $urlRouterProvider.otherwise('/');

        $sceProvider.enabled(false);

    }
]);
