angular.module('prms.pageComponents.about', [
    'js/pageComponents/about/html/about.html',
    'ui.router'
]).directive('about', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/pageComponents/about/html/about.html'
        };
    }
]);
