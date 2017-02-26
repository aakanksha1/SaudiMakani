//Bread Crum Service - to update model between App controllers and Side Bar Controller
MakaniPostSaudiApp
    .controller("ClubManagementController", ['$scope', 'filterFilter', 'Service', 'Constants', 'LocaleConstants', 'BreadCrum', 'config', '$location', function ($scope, filterFilter, Service, Constants, LocaleConstants, BreadCrum, config, $location) {

        //Locale Constants
        $scope.Save = LocaleConstants[locale]["Save"];
        $scope.Cancel = LocaleConstants[locale]["Cancel"];
        $scope.EnterName = LocaleConstants[locale]["EnterName"];
        $scope.Thenameisrequired = LocaleConstants[locale]["Thenameisrequired"];
        $scope.ClubHeader = LocaleConstants[locale]["Club"];
        $scope.CreateNewClub = LocaleConstants[locale]["CreateNewClub"];
        $scope.EditClub = LocaleConstants[locale]["EditClub"];
        $scope.DeleteClub = LocaleConstants[locale]["DeleteClub"];
        $scope.Link = LocaleConstants[locale]["Link"];
        $scope.City = LocaleConstants[locale]["City"];
        $scope.Browse = LocaleConstants[locale]["Browse"];
        $scope.Description = LocaleConstants[locale]["Description"];
        $scope.Name = LocaleConstants[locale]["Name"];
        $scope.LogoName = LocaleConstants[locale]["LogoName"];
        $scope.CreateNewStadium = LocaleConstants[locale]["CreateNewStadium"];
        $scope.DeleteStadium = LocaleConstants[locale]["DeleteStadium"];
        $scope.Stadiumsheader = LocaleConstants[locale]["Stadiums"];
        $scope.select = LocaleConstants[locale]["Select"];


        $scope.data = [];
        $scope.Club = [];
        $scope.club = {};
        $scope.Stadiums = {};
        $scope.FormPostType;

        //Http Services Get Data
        Service.get(Constants.Cluburi)
        .then(function (response) {
            $scope.Club = response.data;
            $scope.totalItems = $scope.Club.Clubs.length;
            $scope.currentPage = 1;
            $scope.numPerPage = config.paginationItemsPerPage;

            //Pagination control
            $scope.paginate = function (value) {
                var begin, end, index;
                $scope.begin = ($scope.currentPage - 1) * $scope.numPerPage;
                $scope.end = $scope.begin + $scope.numPerPage;
                index = $scope.Club.Clubs.indexOf(value);
                return ($scope.begin <= index && index < $scope.end);
            };
        });

        Service.get(Constants.TemplatemanagesUri)
    .then(function (response) {
        //console.log(response);
        $scope.templatemanageStadium = response.data[0];
    });

        //Add new Record / Save Edited Records
        $scope.submit = function () {
            if ($scope.FormPostType == "edit") {
                $index = $scope.Club.Clubs.indexOf(filterFilter($scope.Club.Clubs, { id: $scope.club.id })[0])
                $scope.Club.Clubs[$index] = angular.copy($scope.club);
                $('#myModal').modal('hide');
                $(".commontext").removeClass('has-error');
            }
            else {
                $scope.club.id = $scope.generateId();
                $scope.Club.Clubs.push($scope.club);
                $('#myModal').modal('hide');
                $(".commontext").removeClass('has-error');
            }
            $scope.totalItems = $scope.Club.Clubs.length;
        };

        $scope.submitStadium = function () {
            if ($scope.FormPostType == "edit") {
                $index = $scope.Club.Clubs.indexOf(filterFilter($scope.Club.Clubs, { id: $scope.club.id })[0])
                $scope.Club.Clubs[$index] = angular.copy($scope.club);

            }
            else {
                $scope.club.id = $scope.generateId();
                $scope.Club.Clubs.push($scope.club);

            }
            $scope.totalItems = $scope.Club.Clubs.length;
        };

        //Deactivate selected/all club
        $scope.remove = function () {
           for (var i = $scope.end - 1; i >= $scope.begin; i--) {

                if ($scope.Club.Clubs[i] && $scope.Club.Clubs[i].selected) {
                    $index = $scope.Club.Clubs.indexOf($scope.Club.Clubs[i]);
                    $scope.Club.Clubs.splice($index, 1);
                }
            }
            $scope.totalItems = $scope.Club.Clubs.length;
            $scope.selectedAll = false;
        };

        //Enable/Disable Edit Button on Checkbox Checked
        $scope.disableEdit = function () {
            var result = 0;
            for (var i = $scope.end - 1; i >= $scope.begin; i--) {
                if ($scope.Club.Clubs[i] && $scope.Club.Clubs[i].selected) {
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
                if ($scope.Club.Clubs[i] && $scope.Club.Clubs[i].selected) {
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
                if ($scope.Club.Clubs[i]) {
                    var items = items + 1;
                    if ($scope.Club.Clubs[i].selected) {
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
        $scope.editClub = function (postType) {
            $scope.FormPostType = postType;
            $scope.CreateEditClubtitle = LocaleConstants[locale]["EditClub"];
            for (var i = $scope.end - 1; i >= $scope.begin; i--) {
                if ($scope.Club.Clubs[i] && $scope.Club.Clubs[i].selected) {
                    $index = $scope.Club.Clubs.indexOf($scope.Club.Clubs[i]);
                    $scope.club = angular.copy($scope.Club.Clubs[$index]);
                }
            }
        };

        //show dropdown value as a text in club grid  
        $scope.showClubCity = function (club) {
            var selected = [];
            if (club.city || club.city == 0) {
                selected = filterFilter($scope.Club.City, { key: club.city });
            }
            return selected.length ? selected[0].value : '';
        };

        //Add new record using model pop-up 
        $scope.addClub = function (postType) {
            $scope.CreateEditClubtitle = LocaleConstants[locale]["CreateNewClub"];
            $scope.FormPostType = postType;
            $scope.club = {};
            $(".commontext").removeClass('has-error');
            
        };

        //Reset selected records 
        $scope.reset = function () {
            $scope.Club.selected = {};
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
                $index = $scope.Club.Clubs.indexOf($scope.Club.Clubs[i]);
                $scope.Club.Clubs[$index].selected = $scope.selectedAll;
            }
        };

        $scope.AddnewStadium = function () {
            $("#myModal").on('hidden.bs.modal', function () {
                $location.path("/templatemanage/Stadiums/CreateNewStadium");
                $scope.$apply();
            });
            $('#myModal').modal('hide');
        };


        //Enable/Disable Delete Button on Checkbox Checked
        $scope.Stadiums_disableDelete = function () {
            if ($scope.templatemanageStadium && $scope.templatemanageStadium.Stadiums) {
                var result = filterFilter($scope.templatemanageStadium.Stadiums, { selected: true });
                if (result && result.length >= 1) {
                    $('.popupdelete').addClass('checked');
                    return false;
                } else {
                    $('.popupdelete').removeClass('checked');
                    return true;
                }
            }
        };

        //Deactivate selected/all club
        $scope.Stadiums_remove = function () {
            var len = $scope.templatemanageStadium.Stadiums.length;
            for (var i = len - 1; i >= 0; i--) {
                if ($scope.templatemanageStadium.Stadiums[i].selected) {
                    $index = $scope.templatemanageStadium.Stadiums.indexOf($scope.templatemanageStadium.Stadiums[i]);
                    $scope.templatemanageStadium.Stadiums.splice($index, 1);
                }
            }
            $scope.totalItems = $scope.Club.Clubs.length;
            $scope.Stadiums_selectedAll = false;
        };

        //check/uncheck 'SelectAll' Checkbox
        $scope.Stadiums_checkAll = function () {
            if (!$scope.Stadiums_selectedAll) {
                $scope.Stadiums_selectedAll = false;
            } else {
                $scope.Stadiums_selectedAll = true;
            }
            angular.forEach($scope.templatemanageStadium.Stadiums, function (stadium) {
                stadium.selected = $scope.Stadiums_selectedAll;
            });
        };

        //check/uncheck record checkbox and 'selectall' checkbox
        $scope.Stadiums_UnCheckMain = function () {
            $scope.Stadiums_selectedAll = true;
            if ((filterFilter($scope.templatemanageStadium.Stadiums, { selected: false })).length) {
                $scope.Stadiums_selectedAll = false;
            }
            if ((filterFilter($scope.templatemanageStadium.Stadiums, { selected: false })).length > 1) {
                $scope.Stadiums_selectedAll = false;
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
            $("#myModal").off('hidden.bs.modal');
        });

        $scope.save = function () {
            $scope.$broadcast('show-errors-check-validity');
        };

    }]);

$(document).on("change", "#fileUploadLogo", function () {
    var value = $("#fileUploadLogo").val();
    var filename = value.replace(/^.*\\/, "");
    $("#txtLogoStadium").val(filename);
});

