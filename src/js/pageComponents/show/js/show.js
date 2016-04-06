angular.module('prms.pageComponents.show', [
    'js/pageComponents/show/html/show.html',
    'prms.factory.rooms',
    'prms.roomsFilter',
    'ui.router'
])
.directive('show', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/pageComponents/show/html/show.html',
            controller: ['$scope', 'roomsFactory', function ($scope, roomsFactory) {
                /*Variable*/
                $scope.rooms = undefined;


                /*Function for processing*/
                $scope.getRooms = function () {
                    roomsFactory.get(function (data) {
                        $scope.rooms = data;
                    }, function (error) {
                        $scope.rooms = error;
                    });

                    console.debug($scope.rooms);
                };

                /*Initial function calls*/
                $scope.init = function () {
                    $scope.getRooms();
                };

                $scope.init();
            }]
        };
    }
]);
