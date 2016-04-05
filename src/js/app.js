angular.module('prms', [
    'ngTouch',
    'prms.config',
    'prms.pages',
    'prms.navigation',
    'prms.footer'
]);

angular.module('prms.pages', [
    'prms.pageComponents.home',
    'prms.pageComponents.rooms'
]);
