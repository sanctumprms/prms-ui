angular.module('prms.factory.rooms', ['ngResource'])
.factory('roomsFactory', ['$resource',
    function ($resource) {
        return $resource('stubs/rooms.json', {}, {
            get: {method:'GET', params:{}, isArray:true}
        });
    }
]);
