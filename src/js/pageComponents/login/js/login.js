angular.module('app.pageComponents.login', [
    'js/pageComponents/login/html/login.html',
    'ui.router'
]).directive('login', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                next: '@'
            },
            templateUrl: 'js/pageComponents/login/html/login.html'
        };
    }
]);
