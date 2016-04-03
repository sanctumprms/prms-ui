angular.module('prms.pageComponents.home', [
    'js/pageComponents/home/html/home.html',
    'prms.components.carousel',
    'prms.components.datePicker',
    'ui.router'
]).directive('home', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/pageComponents/home/html/home.html'
        };
    }
]);
