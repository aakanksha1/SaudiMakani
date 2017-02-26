MakaniPostSaudiApp.controller('SidebarController', function ($scope, $location, CommonService, BreadCrum) {

    //Updating Sider Bar through common ngservice
    $scope.Eventsidebar = CommonService;

    //Crum click event handler
    $scope.updateCrum = function ($event, location) {
        $scope.crum = BreadCrum;
        $scope.crum.sidebar = $event.target.textContent;
        $location.path(location);
        angular.forEach($scope.Eventsidebar, function (value, key) {
            value.active = "";
            if (value.name == $event.target.textContent) {
                value.active = "active";
            }
        });
    }

    $scope.isCurrentPath = function (path, name) {
        if ($location.path().match("/" + path)) {
            $scope.crum = BreadCrum;
            $scope.crum = BreadCrum;
            $scope.crum.sidebar = name;
            return true;
        }
    };
});

