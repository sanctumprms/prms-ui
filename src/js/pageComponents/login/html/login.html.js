angular.module("js/pageComponents/login/html/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/pageComponents/login/html/login.html",
    "<form name=\"loginForm\" ng-submit=\"login(username, password)\"><label>Email: <input type=\"text\" name=\"username\" ng-model=\"username\" required></label><label>Password: <input type=\"password\" name=\"password\" ng-model=\"password\" required></label><input type=\"submit\" value=\"Login\"><p ng-if=\"error\" ng-bind=\"error.message\"></p></form>");
}]);
