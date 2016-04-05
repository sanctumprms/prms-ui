angular.module('prms.navigation', [
    'js/components/navigation/html/navigation.html'
])
.component('navigation', {
    bindings: {},
    templateUrl: 'js/components/navigation/html/navigation.html',
    transclude: true,
    controller: 'navigationCtrl'
})
.controller('navigationCtrl', ['$scope', '$element', '$location',
    function ($scope, $element, $location) {


        $scope.menuConfig = {
            main:[],
            user:[]
        };

        $scope.menuConfig.user = [
            {
                name: 'Notifications',
                key:'notifications',
                class:'fa fa-bell',
                url:'/notifications',
                selected: false
            }, {
                name: 'Mail',
                key:'mail',
                class:'fa fa-envelope',
                url:'/mail',
                selected: false
            }, {
                name: 'Profile',
                key:'profile',
                class:'fa fa-user',
                url:'/profile',
                selected: false
            }
         ];


        $scope.menuConfig.main = [{
            name: 'Home',
            key:'home',
            url:'/home',
            selected: true
        }, {
            name: 'About',
            key:'about',
            url:'/about',
            selected: false
        }, {
            name: 'Rooms',
            key:'rooms',
            url:'/rooms',
            selected: false
        }, {
            name: 'Restaurant',
            key:'restaurants',
            url:'/restaurants/index',
            selected: false
        }, {
            name: 'Gallery',
            key:'gallery',
            url:'/gallery',
            selected: false
        }, {
            name: 'Contact',
            key:'contact',
            url:'/contact',
            selected: false
        }];

        $scope.menuNavigation = $scope.menuConfig;

        $scope.selectMenu = function (obj, sel) {
            angular.forEach(obj.main, function (v, k) {
                if (obj.main[k].key === sel.key) {
                    obj.main[k].selected = true;
                }else {
                    obj.main[k].selected = false;
                }
            });

            angular.forEach(obj.user, function (v, k) {
                if (obj.user[k].key === sel.key) {
                    obj.user[k].selected = true;
                }else {
                    obj.user[k].selected = false;
                }
            });
        };

        $scope.init = function () {
            var selKey = $location.url().split('/');
            var sel = {
                key: selKey[1]
            };

            $scope.selectMenu($scope.menuNavigation, sel);
        };

        $scope.init();
    }]);
