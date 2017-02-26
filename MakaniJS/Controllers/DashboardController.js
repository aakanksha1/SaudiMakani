MakaniPostSaudiApp.controller("DashboardController", ['$scope', 'Service', 'Constants', 'LocaleConstants', function ($scope, Service, Constants, LocaleConstants) {

    $scope.data = [];

    //Locale Constants
    $scope.RunningTask = LocaleConstants[locale]["RunningTask"];
    $scope.UpcomingEvent = LocaleConstants[locale]["UpcomingEvent"];
    $scope.ActiveEvent = LocaleConstants[locale]["ActiveEvent"];

    //Http Service Get Data RunningTasks
    Service.get(Constants.RunningTasksUri)
    .then(function (response) {
        $scope.RunningTasks = response.data.RunningTask;
    });

    //Http Service Get Data UpcomingEvents
    Service.get(Constants.UpcomingEventsUri)
        .then(function (response) {
            $scope.UpcomingEvents = response.data.UpcomingEvents;
        });

    //Http Service Get Data ActiveEvents
    Service.get(Constants.ActiveEventsUri)
       .then(function (response) {
           $scope.ActiveEvents = response.data.ActiveEvents;
       });
}]);