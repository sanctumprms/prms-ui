angular.module("js/pageComponents/rooms/html/rooms.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/pageComponents/rooms/html/rooms.html",
    "<section class=\"container rooms\"><section class=\"row\"><img class=\"col-xs-12 col-lg-12 col-sm-12 col-md-12\" src=\"js/pageComponents/rooms/imgs/rooms-header.png\"></section><section class=\"row margin-bottom-20\"><div class=\"col-xs-12 col-lg-12 col-sm-12 col-md-12\"><menu-filter></menu-filter></div></section><section class=\"row\"><article class=\"col-xs-12 col-lg-9 col-sm-12 col-md-9\"><div class=\"row\"><div class=\"col-xs-4 col-lg-4 col-sm-4 col-md-4\" ng-repeat=\"room in rooms\"><room-card obj=\"room\"></room-card></div></div></article><aside class=\"col-xs-12 col-lg-3 col-sm-12 col-md-3\"><rooms-filter></rooms-filter></aside></section></section>");
}]);
