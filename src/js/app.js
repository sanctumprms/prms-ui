angular.module('prms', [
    'ngTouch',
    'app.config',
    'app.pages'
]);

angular.module('app.pages', [
    'app.pageComponents.login'
]);
