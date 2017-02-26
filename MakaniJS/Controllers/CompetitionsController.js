MakaniPostSaudiApp
    .controller("CompetitionsController", ['$scope', 'Service', 'Constants', 'BreadCrum', 'LocaleConstants', 'filterFilter', 'config', function ($scope, Service, Constants, BreadCrum, LocaleConstants, filterFilter, config) {

        //Locale Constants
        $scope.Save = LocaleConstants[locale]["Save"];
        $scope.Cancel = LocaleConstants[locale]["Cancel"];
        $scope.EnterName = LocaleConstants[locale]["EnterName"];
        $scope.Thenameisrequired = LocaleConstants[locale]["Thenameisrequired"];
        $scope.Logo = LocaleConstants[locale]["Logo"];
        $scope.Browse = LocaleConstants[locale]["Browse"];
        $scope.EndDate = LocaleConstants[locale]["EndDate"];
        $scope.StartDate = LocaleConstants[locale]["StartDate"];
        $scope.Competition = LocaleConstants[locale]["Competition"];
        $scope.CreateNewCompetition = LocaleConstants[locale]["CreateNewCompetition"];
        $scope.CreateEditCompetition = LocaleConstants[locale]["CreateEditCompetition"];
        $scope.EditCompetition = LocaleConstants[locale]["EditCompetition"];
        $scope.DeactivateCompetition = LocaleConstants[locale]["DeactivateCompetition"];
        $scope.EndDate = LocaleConstants[locale]["EndDate"];
        $scope.StartDate = LocaleConstants[locale]["StartDate"];
        $scope.Logo = LocaleConstants[locale]["Logo"];
        $scope.Description = LocaleConstants[locale]["Description"];
        $scope.Name = LocaleConstants[locale]["Name"];

        $scope.data = [];
        $scope.Competitions = [];
        $scope.competition = {};
        $scope.FormPostType;
        $scope.arrray = [];
        $scope.pagelength = [];

        //Http Services Get Data
        Service.get(Constants.CompetitionsUri)
        .then(function (response) {
            $scope.Competitions = response.data;
            $scope.totalItems = $scope.Competitions.Competitions.length;
            $scope.currentPage = 1;
            $scope.numPerPage = config.paginationItemsPerPage;

            //Pagination control
            $scope.paginate = function (value) {            
                //if ($scope.arrray && $scope.arrray.length > 0) {
                //    $scope.checkcurrentpage = [];
                //    $scope.checkcurrentpage = filterfilter($scope.arrray, { currentpage: $scope.currentpage});//$scope.arrray.get({ currentpage: $scope.currentpage });
                //    if ($scope.checkcurrentpage && $scope.checkcurrentpage.length > 0) {
                //        if ($scope.checkcurrentpage[0].selected1) {
                //            $scope.selectedall = true;
                //        } else {
                //            $scope.selectedall = false;
                //        }
                //    } 
                //}
               
                $scope.begin = ($scope.currentPage - 1) * $scope.numPerPage;
                $scope.end = $scope.begin + $scope.numPerPage;
                index = $scope.Competitions.Competitions.indexOf(value);
                return ($scope.begin <= index && index < $scope.end);

            };     
        });

        $scope.showselectall = function (value) {
            if (($scope.begin <= index && index < $scope.end) && value.selected) {
                $scope.selectedAll = true;
            }
            else {
                $scope.selectedAll = false;
            }
        };
        

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

                if (new Date(startDate) > new Date(endDate)) {
                    $scope.errMessage = 'End Date should be greater than start date.';
                    //alert($scope.errMessage)
                    return false;
                }
                if (new Date(startDate) < new Date(today)) {
                    $scope.errMessageCurrDate = 'Start date should not be before today.';
                    return false;
                }
                else {
                    $index = $scope.Competitions.Competitions.indexOf(filterFilter($scope.Competitions.Competitions, { id: $scope.competition.id })[0])
                    $scope.Competitions.Competitions[$index] = angular.copy($scope.competition);
                    $scope.errMessageCurrDate = '';
                    $('#myModal').modal('hide');
                    $(".commontext").removeClass('has-error');
                }

            }
            else {
                startDate = $("#startDate").val();
                endDate = $("#endDate").val();
                $scope.errMessage = '';
                var curDate = new Date();

                if (new Date(startDate) > new Date(endDate)) {
                    $scope.errMessage = 'End Date should be greater than start date.';
                    return false;
                }
                else if (new Date(startDate) < new Date(today)) {
                    $scope.errMessage = 'Start date should not be before today.';
                    return false;
                }
                else {
                    $scope.competition.id = $scope.generateId();
                    $scope.competition.LogoName = $('#txtLogo').val();
                    $scope.Competitions.Competitions.push($scope.competition);
                    $('#myModal').modal('hide');
                    $(".commontext").removeClass('has-error');
                }
            }
            $scope.totalItems = $scope.Competitions.Competitions.length;
        };

        //Deactivate selected/all Competition
        $scope.remove = function () {
            for (var i = $scope.end - 1; i >= $scope.begin; i--) {

                if ($scope.Competitions.Competitions[i] && $scope.Competitions.Competitions[i].selected) {
                    $index = $scope.Competitions.Competitions.indexOf($scope.Competitions.Competitions[i]);
                    $scope.Competitions.Competitions.splice($index, 1);
                }
            }
            $scope.totalItems = $scope.Competitions.Competitions.length;
            $scope.selectedAll = false;
        };

        //Enable/Disable Edit Button on Checkbox Checked
        $scope.disableEdit = function () {
            var result = 0;
            for (var i = $scope.end - 1; i >= $scope.begin; i--) {
                if ($scope.Competitions.Competitions[i] && $scope.Competitions.Competitions[i].selected) {
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
                if ($scope.Competitions.Competitions[i] && $scope.Competitions.Competitions[i].selected) {
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
                if ($scope.Competitions.Competitions[i]) {
                    var items = items + 1;
                    if ($scope.Competitions.Competitions[i].selected) {
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
        $scope.editCompetition = function (postType) {
            $scope.errMessageCurrDate = '';
            $scope.errMessage = '';
            $scope.CreateEditCompetitionTitle = LocaleConstants[locale]["EditCompetition"];
            $scope.FormPostType = postType;
            for (var i = $scope.end - 1; i >= $scope.begin; i--) {
                if ($scope.Competitions.Competitions[i] && $scope.Competitions.Competitions[i].selected) {
                    $index = $scope.Competitions.Competitions.indexOf($scope.Competitions.Competitions[i]);
                    $scope.competition = angular.copy($scope.Competitions.Competitions[$index]);
                }
            }
        }

        //Add new record using model pop-up 
        $scope.addCompetition = function (postType) {
            $scope.CreateEditCompetitionTitle = LocaleConstants[locale]["CreateNewCompetition"];
            $scope.errMessageCurrDate = '';
            $scope.errMessage = '';
            $scope.FormPostType = postType;
            $scope.competition = {};

        };

        //Reset selected records 
        $scope.reset = function () {
            $scope.competition.selected = {};
            $(".commontext").removeClass('has-error');
        };

        //check/uncheck 'SelectAll' Checkbox
        $scope.checkAll = function () {         
            if (!$scope.selectedAll) {
                $scope.selectedAll = false;
            } else {
                $scope.selectedAll = true;
            }

            for (var i = $scope.begin; i < $scope.end; i++) {
                $index = $scope.Competitions.Competitions.indexOf($scope.Competitions.Competitions[i]);
                $scope.Competitions.Competitions[$index].selected = $scope.selectedAll;
            }
            //$scope.arrray.push({ currentPage: $scope.currentPage, selected1: $scope.selectedAll });
            //console.log($scope.arrray);
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
        $scope.save = function () {
            $scope.$broadcast('show-errors-check-validity');
        };

        $scope.checkDateValidation = function (startDate, endDate) {
            startDate = $("#startDate").val();
            endDate = $("#endDate").val();
            $scope.errMessage = '';
            var curDate = new Date();
            var day = ("0" + curDate.getDate()).slice(-2);
            var month = ("0" + (curDate.getMonth() + 1)).slice(-2);

            var today = curDate.getFullYear() + "/" + (month) + "/" + (day);
            if (new Date(startDate) > new Date(endDate)) {
                $scope.errMessage = 'End Date should be greater than start date.';
                //alert($scope.errMessage)
                return false;
            }
            if (new Date(startDate) < new Date(today)) {
                $scope.errMessageCurrDate = 'Start date should not be before today.';
                return false;
            }
            if (new Date(endDate) < new Date(today)) {
                $scope.errMessageCurrDate = 'End date should not be before today.';
                return false;
            }
            if (new Date(startDate) >= new Date(today)) {
                $scope.errMessageCurrDate = '';
                return true;
            }
        };


    }]);
