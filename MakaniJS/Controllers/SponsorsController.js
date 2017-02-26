//Bread Crum Service - to update model between App controllers and Side Bar Controller
MakaniPostSaudiApp.controller("SponsorsController", ['$scope', 'filterFilter', 'Service', 'Constants', 'LocaleConstants', 'BreadCrum', 'config', function ($scope, filterFilter, Service, Constants, LocaleConstants, BreadCrum, config) {

    //Locale Constants
    $scope.Save = LocaleConstants[locale]["Save"];
    $scope.Cancel = LocaleConstants[locale]["Cancel"];
    $scope.EnterName = LocaleConstants[locale]["EnterName"];
    $scope.Thenameisrequired = LocaleConstants[locale]["Thenameisrequired"];
    $scope.SponsorHeader = LocaleConstants[locale]["Sponsors"];
    $scope.CreateNewSponsor = LocaleConstants[locale]["CreateNewSponsor"];   
    $scope.EditSponsor = LocaleConstants[locale]["EditSponsor"];
    $scope.DeleteSponsor = LocaleConstants[locale]["Sponsors"];
    $scope.Link = LocaleConstants[locale]["Link"];
    $scope.City = LocaleConstants[locale]["City"];
    $scope.Logo = LocaleConstants[locale]["LogoName"];
    $scope.Browse = LocaleConstants[locale]["Browse"];
    $scope.Description = LocaleConstants[locale]["Description"];
    $scope.Name = LocaleConstants[locale]["Name"];
    $scope.DeleteSponsors = LocaleConstants[locale]["DeleteSponsors"];
   

    $scope.data = [];
    $scope.Sponsor = [];
    $scope.sponsor = {};
    $scope.FormPostType;

    //Http Services Get Data
    Service.get(Constants.Sponsoruri)
    .then(function (response) {
        $scope.Sponsor = response.data;
        $scope.totalItems = $scope.Sponsor.Sponsors.length;
        $scope.currentPage = 1;
        $scope.numPerPage = config.paginationItemsPerPage;

        //Pagination control
        $scope.paginate = function (value) {
            //var begin, end, index;
            $scope.begin = ($scope.currentPage - 1) * $scope.numPerPage;
            $scope.end = $scope.begin + $scope.numPerPage;
            index = $scope.Sponsor.Sponsors.indexOf(value);
            return ($scope.begin <= index && index < $scope.end);
        };
    });

    //Add new Record / Save Edited Records
    $scope.submit = function () {
        if ($scope.FormPostType == "edit") {
            $index = $scope.Sponsor.Sponsors.indexOf(filterFilter($scope.Sponsor.Sponsors, { id: $scope.sponsor.id })[0])
            $scope.Sponsor.Sponsors[$index] = angular.copy($scope.sponsor);
            $('#myModal').modal('hide');
        }
        else {
            $scope.sponsor.id = $scope.generateId();
            $scope.Sponsor.Sponsors.push($scope.sponsor);
            $('#myModal').modal('hide');
        }
        $scope.totalItems = $scope.Sponsor.Sponsors.length;
    };

    //Deactivate selected/all Sponsor
    $scope.remove = function () {
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {

            if ($scope.Sponsor.Sponsors[i] && $scope.Sponsor.Sponsors[i].selected) {
                $index = $scope.Sponsor.Sponsors.indexOf($scope.Sponsor.Sponsors[i]);
                $scope.Sponsor.Sponsors.splice($index, 1);
            }
        }
        $scope.totalItems = $scope.Sponsor.Sponsors.length;
        $scope.selectedAll = false;
    };

    //Enable/Disable Edit Button on Checkbox Checked
    $scope.disableEdit = function () {
        var result = 0;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.Sponsor.Sponsors[i] && $scope.Sponsor.Sponsors[i].selected) {
                var result = result + 1;
            }
        }
        if (result && result == 1) {
            $('.icon-pencil').addClass('checked');
            $('.icon-pencil').removeClass('anchordisabled');
            result = 0;
            return false;
        } else {
            $('.icon-pencil').removeClass('checked');
            $('.icon-pencil').addClass('anchordisabled');
            result = 0;
            return true;
        }
    };

    //Enable/Disable Delete Button on Checkbox Checked
    $scope.disableDelete = function () {
        var result = 0;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.Sponsor.Sponsors[i] && $scope.Sponsor.Sponsors[i].selected) {
                var result = result + 1;
            }
        }

        if (result && result >= 1) {
            $('.deleteicon').addClass('checked');
            result = 0;
            return false;
        } else {
            $('.deleteicon').removeClass('checked');
            result = 0;
            return true;
        }
    };

    //check/uncheck record checkbox and 'selectall' checkbox
    $scope.UnCheckMain = function () {
        var result = 0;
        var items = 0;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.Sponsor.Sponsors[i]) {
                var items = items + 1;
                if ($scope.Sponsor.Sponsors[i].selected) {
                    var result = result + 1;
                }
            }
        }

        if (result && result == items) {
            $scope.selectedAll = true;
            items = 0;
            result = 0;
        } else {
            $scope.selectedAll = false;
            items = 0;
            result = 0;
        }

        $scope.disableEdit();
    };

    //Take a copy of record to edit in model pop-up 
    $scope.editSponsor = function (postType) {
        $scope.CreateEditSponsortitle = LocaleConstants[locale]["EditSponsor"];
        $scope.FormPostType = postType;
       
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.Sponsor.Sponsors[i] && $scope.Sponsor.Sponsors[i].selected) {
                $index = $scope.Sponsor.Sponsors.indexOf($scope.Sponsor.Sponsors[i]);
                $scope.sponsor = angular.copy($scope.Sponsor.Sponsors[$index]);
            }
        }
    };

    //Add new record using model pop-up 
    $scope.addSponsor = function (postType) {
        $scope.CreateEditSponsortitle = LocaleConstants[locale]["CreateNewSponsor"];
        $scope.FormPostType = postType;
        $scope.sponsor = {};
        $(".commontext").removeClass('has-error');
    };

    //Reset selected records 
    $scope.reset = function () {
        $scope.Sponsor.selected = {};
    };

    //check/uncheck 'SelectAll' Checkbox
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }

        for (var i = $scope.begin; i < $scope.end; i++) {
            $index = $scope.Sponsor.Sponsors.indexOf($scope.Sponsor.Sponsors[i]);
            $scope.Sponsor.Sponsors[$index].selected = $scope.selectedAll;
        }
    };

    //method to generate ID
    $scope.generateId = function () {
        var date = new Date();
        $scope.second = ((date.getSeconds() < 10 ? '0' : '') + date.getSeconds());
        $scope.randomnumber = Math.floor((Math.random() * 6) + 50);
        return parseFloat($scope.randomnumber) + parseFloat($scope.second);
    };

    //Current Crum update from Bread Crum Service
    $scope.crum = BreadCrum;

    angular.element(document).ready(function () {
        initDatePicker();
    });

    //Required field validation

    $scope.saveSponser = function () {
        $scope.$broadcast('show-errors-check-validity');
    };

}]);