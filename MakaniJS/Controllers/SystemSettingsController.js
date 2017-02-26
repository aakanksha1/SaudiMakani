MakaniPostSaudiApp.controller("SystemSettingsController", ['$scope', 'filterFilter', 'Service', 'Constants', 'BreadCrum', 'LocaleConstants', function ($scope, filterFilter, Service, Constants, BreadCrum, LocaleConstants) {

    $scope.data = [];

    $scope.TaskStatus = LocaleConstants[locale]["Tickets"];
    $scope.Componentheader = LocaleConstants[locale]["Componentheader"];
    $scope.ComponentMonitor = LocaleConstants[locale]["ComponentMonitor"];
    $scope.Status = LocaleConstants[locale]["Status"];
    $scope.LastChecked = LocaleConstants[locale]["LastChecked"];
    $scope.OfflineTask = LocaleConstants[locale]["OfflineTask"]; 
    $scope.BarcodeTask = LocaleConstants[locale]["BarcodeTask"];
    $scope.OfflineTaskProgresscomplted = "78% Completed";
    $scope.BarcodeTaskProgresscomplted = "50% Completed";
    $scope.TimeElapsed = "Last Checked : 13:02";

    //Http Service Get Data RunningTasks
    Service.get(Constants.ComponentMonitoringUri)
    .then(function (response) {
        $scope.ComponentMonitoring = response.data;
        $scope.TaskvsStatus = $scope.ComponentMonitoring.TaskvsStatus;
        $scope.Components = $scope.ComponentMonitoring.Compoenents;
    });


    //Current Crum update from Bread Crum Service
    $scope.crum = BreadCrum;

}]);