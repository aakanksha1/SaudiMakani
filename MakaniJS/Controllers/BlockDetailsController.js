MakaniPostSaudiApp.controller("BlockDetailsController", ['$scope', '$location', 'Service', 'Constants', 'BreadCrum', 'filterFilter', 'LocaleConstants', function ($scope, $location, Service, Constants, BreadCrum, filterFilter, LocaleConstants) {

  
    //$scope.BlockDetails = [];
    
    //Http Service Get Data
    Service.get(Constants.BlockDetailsUri)
    .then(function (response) {
        
        $scope.BlockDetails = response.data[0];
       
    })

    //post

    $scope.submit = function () {
        alert("ss");
        $index = $scope.BlockDetails.BDetails.indexOf(filterFilter($scope.BlockDetails.BDetails, { id: $scope.BlockDetails.id })[0])
        $scope.BlockDetails.BDetails[$index] = angular.copy($scope.eventDetail);
        console.log($scope.BlockDetails.BDetails[$index]);
    };
}]);