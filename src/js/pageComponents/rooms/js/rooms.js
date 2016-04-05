angular.module('prms.pageComponents.rooms', [
    'js/pageComponents/rooms/html/rooms.html',
    'prms.components.carousel',
    'prms.components.datePicker',
    'prms.menuFilter',
    'prms.roomCard',
    'prms.roomsFilter',
    'prms.factory.rooms',
    'ui.router'
]).directive('rooms', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/pageComponents/rooms/html/rooms.html',
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
