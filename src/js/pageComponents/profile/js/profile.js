angular.module('prms.pageComponents.profile', [
    'js/pageComponents/profile/html/profile.html',
    'ui.router'
]).directive('profile', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/pageComponents/profile/html/profile.html'
        };
    }
]);
