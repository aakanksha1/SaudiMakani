MakaniPostSaudiApp.controller("NotificationManagementController", ['$scope', 'filterFilter', 'Service', 'Constants', 'BreadCrum', function ($scope, filterFilter, Service, Constants, BreadCrum) {
    
    //Current Crum update from Bread Crum Service
    $scope.crum = BreadCrum;
}]);