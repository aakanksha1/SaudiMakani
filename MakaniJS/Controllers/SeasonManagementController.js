MakaniPostSaudiApp.controller("SeasonManagementController", ['$scope', 'filterFilter', 'Service', 'Constants', 'BreadCrum', 'LocaleConstants', 'config', function ($scope, filterFilter, Service, Constants, BreadCrum, LocaleConstants, config) {

    //Locale Constants
    $scope.Save = LocaleConstants[locale]["Save"];
    $scope.Cancel = LocaleConstants[locale]["Cancel"];
    $scope.EnterName = LocaleConstants[locale]["EnterName"];
    $scope.Thenameisrequired = LocaleConstants[locale]["Thenameisrequired"];
    $scope.Logo = LocaleConstants[locale]["Logo"];
    $scope.Browse = LocaleConstants[locale]["Browse"];
    $scope.EndDate = LocaleConstants[locale]["EndDate"];
    $scope.StartDate = LocaleConstants[locale]["StartDate"];   
    $scope.Logo = LocaleConstants[locale]["Logo"];
    $scope.Description = LocaleConstants[locale]["Description"];
    $scope.Name = LocaleConstants[locale]["Name"];
    $scope.Competition = LocaleConstants[locale]["Competition"];
    $scope.CreateNewSeason = LocaleConstants[locale]["CreateNewSeason"];    
    $scope.EditSeason = LocaleConstants[locale]["EditSeason"];
    $scope.DeactivateSeason = LocaleConstants[locale]["DeactivateSeason"];
    $scope.Enable = LocaleConstants[locale]["Enable"];
    $scope.Season = LocaleConstants[locale]["Seasons"];
    $scope.Enabled = LocaleConstants[locale]["Enabled"];
    $scope.City = LocaleConstants[locale]["City"];
    $scope.select = LocaleConstants[locale]["Select"];

    $scope.data = [];
    $scope.Seasons = [];
    $scope.season = {};
    $scope.FormPostType;

    //Http Services Get Data
    Service.get(Constants.SeasonsUri)
    .then(function (response) {
        $scope.Seasons = response.data;
        $scope.Competitions = $scope.Seasons.Competitions;
        $scope.totalItems = $scope.Seasons.Seasons.length;
        $scope.currentPage = 1;
        $scope.numPerPage = config.paginationItemsPerPage;

        //Pagination control
        $scope.paginate = function (value) {
            var begin, end, index;
            $scope.begin = ($scope.currentPage - 1) * $scope.numPerPage;
            $scope.end = $scope.begin + $scope.numPerPage;
            index = $scope.Seasons.Seasons.indexOf(value);
            return ($scope.begin <= index && index < $scope.end);
        };
    });

    //Add new Record / Save Edited Records
    $scope.submit = function () {
        if ($scope.FormPostType == "edit") {           
            $('#myModal').modal('hide');
            startDate = $("#startDate").val();
            endDate = $("#endDate").val();
            $scope.errMessage = '';
            var curDate = new Date();
            var day = ("0" + curDate.getDate()).slice(-2);
            var month = ("0" + (curDate.getMonth() + 1)).slice(-2);

            var today = curDate.getFullYear() + "/" + (month) + "/" + (day);

            if (new Date(startDate) >= new Date(endDate)) {
                $scope.errMessage = 'End date and Time should be greater than Start date & Time.';
                //alert($scope.errMessage)
                return false;
            }
            if (new Date(startDate) < new Date(today)) {
                $scope.errMessageStartDate = 'Start date should be less than todays date & Time.';
                return false;
            }
            else {
                $index = $scope.Seasons.Seasons.indexOf(filterFilter($scope.Seasons.Seasons, { id: $scope.season.id })[0])
                $scope.Seasons.Seasons[$index] = angular.copy($scope.season);
                $scope.errMessageStartDate = '';
                $('#myModal').modal('hide');
                $(".commontext").removeClass('has-error');
            }
        }
        else {
       
            startDate = $("#startDate").val();
            endDate = $("#endDate").val();
            $scope.errMessage = '';
            var curDate = new Date();
            var day = ("0" + curDate.getDate()).slice(-2);
            var month = ("0" + (curDate.getMonth() + 1)).slice(-2);

            var today = curDate.getFullYear() + "/" + (month) + "/" + (day);
            
            if (new Date(startDate) >= new Date(endDate)) {
                $scope.errMessage = 'End date and Time should be greater than Start date & Time.';
                //alert($scope.errMessage)
                return false;
            }
            else if (new Date(startDate) <= curDate) {
                $scope.errMessageStartDate = 'Start date should be less than todays date & Time.';
                return false;
            }
            else {
                $scope.season.id = $scope.generateId();
                $scope.Seasons.Seasons.push($scope.season);
                $('#myModal').modal('hide');
       
            }
        }
        $scope.totalItems = $scope.Seasons.Seasons.length;
    };

    //Deactivate selected/all Season

    $scope.remove = function () {
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {

            if ($scope.Seasons.Seasons[i] && $scope.Seasons.Seasons[i].selected) {
                $index = $scope.Seasons.Seasons.indexOf($scope.Seasons.Seasons[i]);
                $scope.Seasons.Seasons.splice($index, 1);
            }
        }
        $scope.totalItems = $scope.Seasons.Seasons.length;
        $scope.selectedAll = false;
    };


    //Enable/Disable Edit Button on Checkbox Checked
    $scope.disableEdit = function () {
        var result=0;          
            for (var i = $scope.end - 1; i >= $scope.begin; i--) {
                if ($scope.Seasons.Seasons[i] && $scope.Seasons.Seasons[i].selected) {
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
            if ($scope.Seasons.Seasons[i] && $scope.Seasons.Seasons[i].selected) {
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
            if ($scope.Seasons.Seasons[i]) {
                var items = items + 1;
                if ($scope.Seasons.Seasons[i].selected) {
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
    $scope.editSeason = function (postType) {
        $scope.errMessageStartDate = '';
        $scope.errMessage = '';
        $scope.CreateEditSeasontitle = $scope.EditSeason = LocaleConstants[locale]["EditSeason"];
        $scope.FormPostType = postType;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.Seasons.Seasons[i] && $scope.Seasons.Seasons[i].selected) {
                $index = $scope.Seasons.Seasons.indexOf($scope.Seasons.Seasons[i]);
                $scope.season = angular.copy($scope.Seasons.Seasons[$index]);
            }
        }

       // $scope.season = angular.copy(filterFilter($scope.Seasons.Seasons, { selected: true })[0]);
    };

    //Add new record using model pop-up 
    $scope.addSeason = function (postType) {
        $scope.errMessageStartDate = '';
        $scope.errMessage = '';
        $scope.CreateEditSeasontitle = $scope.CreateNewSeason = LocaleConstants[locale]["CreateNewSeason"];
        $scope.FormPostType = postType;
        $scope.season = {};
        $(".commontext").removeClass('has-error');
    };

    //Reset selected records 
    $scope.reset = function () {
        $scope.Seasons.selected = {};
        $scope.errMessageStartDate = '';
        $scope.errMessage = '';
    };

    //check/uncheck 'SelectAll' Checkbox
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }
        for (var i = $scope.begin; i < $scope.end; i++) {
            $index = $scope.Seasons.Seasons.indexOf($scope.Seasons.Seasons[i]);
            $scope.Seasons.Seasons[$index].selected = $scope.selectedAll;
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
    $scope.save = function () {
        $scope.$broadcast('show-errors-check-validity');
    };

    $scope.checkSeasonDateValidation = function (startDate, endDate) {
        startDate = $("#startDate").val();
        endDate = $("#endDate").val();
        $scope.errMessage = '';
      
        var curDate = new Date();
        var day = ("0" + curDate.getDate()).slice(-2);
        var month = ("0" + (curDate.getMonth() + 1)).slice(-2);

        var today = curDate.getFullYear() + "/" + (month) + "/" + (day);

        if (new Date(startDate) >= new Date(endDate)) {
            $scope.errMessage = 'End date and Time should be greater than Start date & Time';
            //alert($scope.errMessage)
            return false;
        }
        if (new Date(startDate) <= new Date(today)) {
            $scope.errMessageStartDate = 'Start date should be less than todays date & Time.';
            return false;
        }
        if (new Date(endDate) < new Date(today)) {
            $scope.errMessage = 'End date should be less than todays date & Time.';
            return false;
}
        if (new Date(startDate) >= new Date(today)) {
            $scope.errMessageStartDate = '';
            return true;
        }
    };


    //show dropdown value as a text in season grid  
    $scope.showCompetition = function (season) {
        var selected = [];
        if (season.competition || season.competition == 0) {
            selected = filterFilter($scope.Seasons.Competitions, { key: season.competition });
        }
        return selected.length ? selected[0].value : '';
    };        
}]);

