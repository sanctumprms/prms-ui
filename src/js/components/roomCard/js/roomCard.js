angular.module('prms.roomCard', [
    'js/components/roomCard/html/roomCard.html'
])
.directive('roomCard', function () {
    return {
        restrict: 'AE',
        transclude: true,
        scope:{
            obj:'='
        },
        templateUrl:'js/components/roomCard/html/roomCard.html'
    };
});
