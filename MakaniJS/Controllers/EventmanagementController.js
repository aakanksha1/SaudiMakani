MakaniPostSaudiApp.controller("EventmanagementController", ['$scope', 'Service', 'Constants', 'BreadCrum', 'filterFilter', 'LocaleConstants', 'CommonService', '$location', function ($scope, Service, Constants, BreadCrum, filterFilter, LocaleConstants, CommonService, $location) {

    //Locale Constants
    $scope.CreateNewEvent = LocaleConstants[locale]["CreateNewEvent"];
    $scope.EditEvent = LocaleConstants[locale]["EditEvent"];
    $scope.DeactivateEvent = LocaleConstants[locale]["DeactivateEvent"];
    $scope.Status = LocaleConstants[locale]["Status"];
    $scope.EndDate = LocaleConstants[locale]["EndDate"];
    $scope.EventDate = LocaleConstants[locale]["EventDate"];
    $scope.StartDate = LocaleConstants[locale]["StartDate"];
    $scope.Championship = LocaleConstants[locale]["Championship"];
    $scope.Events = LocaleConstants[locale]["Events"];
    $scope.CreateEvent = LocaleConstants[locale]["CreateEvent"];
    $scope.DefineSeats = LocaleConstants[locale]["DefineSeats"];
    $scope.DefineBlock = LocaleConstants[locale]["DefineBlock"];
    $scope.EventDetailsHeader = LocaleConstants[locale]["EventDetailsHeader"];
    $scope.Description = LocaleConstants[locale]["Description"];
    $scope.Name = LocaleConstants[locale]["Name"];
    $scope.Championship = LocaleConstants[locale]["Championship"];
    $scope.FirstClub = LocaleConstants[locale]["FirstClub"];
    $scope.SecondClub = LocaleConstants[locale]["SecondClub"];
    $scope.Stadium = LocaleConstants[locale]["Stadium"];
    $scope.EventDate = LocaleConstants[locale]["EventDate"];
    $scope.TPEDate = LocaleConstants[locale]["TPEDate"];
    $scope.TPSDate = LocaleConstants[locale]["TPSDate"];
    $scope.EnableSelling = LocaleConstants[locale]["EnableSelling"];
    $scope.Active = LocaleConstants[locale]["Active"];
    $scope.Nooftickets = LocaleConstants[locale]["Nooftickets"];
    $scope.SBED = LocaleConstants[locale]["SBED"];
    $scope.BED = LocaleConstants[locale]["BED"];
    $scope.ActivateSuites = LocaleConstants[locale]["ActivateSuites"];
    $scope.Activateotherfans = LocaleConstants[locale]["Activateotherfans"];
    $scope.EnableeventProfilling = LocaleConstants[locale]["EnableeventProfilling"];
    $scope.Stadium1 = LocaleConstants[locale]["Stadium1"];
    $scope.AddCategory = LocaleConstants[locale]["AddCategory"];
    $scope.Addnewprice = LocaleConstants[locale]["Addnewprice"];
    $scope.TicketPriceDetails = LocaleConstants[locale]["TicketPriceDetails"];
    $scope.ActivationDate = LocaleConstants[locale]["ActivationDate"];
    $scope.Price = LocaleConstants[locale]["Price"];
    $scope.Category = LocaleConstants[locale]["Category"];
    $scope.Price = LocaleConstants[locale]["Price"];
    $scope.Active = LocaleConstants[locale]["Active"];
    $scope.Name = LocaleConstants[locale]["Name"];
    $scope.AddSponsor = LocaleConstants[locale]["AddSponsor"];
    $scope.DeleteSponsor = LocaleConstants[locale]["DeleteSponsor"];
    $scope.Sponsors = LocaleConstants[locale]["Sponsors"];
    $scope.Logo = LocaleConstants[locale]["Logo"];
    $scope.Save = LocaleConstants[locale]["Save"];
    $scope.Cancel = LocaleConstants[locale]["Cancel"];
    $scope.Stadium2 = LocaleConstants[locale]["Stadium2"];
    $scope.Stadium3 = LocaleConstants[locale]["Stadium3"];
    $scope.EnterName = LocaleConstants[locale]["EnterName"];
    $scope.Thenameisrequired = LocaleConstants[locale]["Thenameisrequired"];
    $scope.EnterChampionship = LocaleConstants[locale]["EnterChampionship"];
    $scope.TheChampionshipisrequired = LocaleConstants[locale]["TheChampionshipisrequired"];
    $scope.Suitdetails = LocaleConstants[locale]["Suitdetails"];
    $scope.select = LocaleConstants[locale]["Select"];
    $scope.ActivatingratingPitch = LocaleConstants[locale]["ActivatingratingPitch"];
    $scope.ActivateSale = LocaleConstants[locale]["ActivateSale"];
    $scope.Activating = LocaleConstants[locale]["Activating"];
    $scope.Institutions = LocaleConstants[locale]["RegulatedInstitutions"];
    $scope.mandatoryfield = LocaleConstants[locale]["mandatoryfield"];
    $scope.Add = LocaleConstants[locale]["Add"];
    $scope.Delete = LocaleConstants[locale]["Delete"];
    $scope.BrowserTemplates = LocaleConstants[locale]["BrowserTemplates"];
    $scope.Computer = LocaleConstants[locale]["Computer"];
    $scope.select = LocaleConstants[locale]["Select"];
    $scope.Mobile = LocaleConstants[locale]["Mobile"];
    $scope.Emailtemplate = LocaleConstants[locale]["Emailtemplate"];
    $scope.Templatemobilemessages = LocaleConstants[locale]["Templatemobilemessages"];

    $scope.EventDetails = [];
    $scope.SponsorsName = [];
    $scope.HideEvent = false;
    $scope.HideeditEvents = true;
    // $scope.HideaddEvents = true;
    $scope.FormPostType;

    //Http Service Get Data
    Service.get(Constants.CreateEventUri)
    .then(function (response) {
        $scope.StadiumData = response.data;
        $scope.EventDetails = $scope.StadiumData;
        $scope.RegulatedInstitutions = $scope.EventDetails.RegulatedInstitutions;
        $scope.Mandatoryfields = $scope.EventDetails.Mandatoryfields;
        $scope.totalItems = $scope.EventDetails.Events.length;
        $scope.currentPage = 1;
        $scope.numPerPage = 5;

        if (CommonService.UpdatedEvent) {
            $scope.EventDetails.Events = CommonService.UpdatedEvent;
        }
        else {
            $scope.EventDetails.Events = $scope.StadiumData.Events;
        }


        //Pagination Control
        $scope.paginate = function (value) {
            //var begin, end, index;
            $scope.begin = ($scope.currentPage - 1) * $scope.numPerPage;
            $scope.end = $scope.begin + $scope.numPerPage;
            index = $scope.EventDetails.Events.indexOf(value);
            return ($scope.begin <= index && index < $scope.end);
        };
    });

    //Form Post- Save Edited Records
    $scope.submit = function () {
        $index = $scope.EventDetails.Events.indexOf(filterFilter($scope.EventDetails.Events, { id: $scope.eventDetail.id })[0])
        $scope.EventDetails.Events[$index] = angular.copy($scope.eventDetail);
    };

    //Deactivate selected/all Competition
    $scope.remove = function () {

        for (var i = $scope.end - 1; i >= $scope.begin; i--) {

            if ($scope.EventDetails.Events[i] && $scope.EventDetails.Events[i].selected) {
                $index = $scope.EventDetails.Events.indexOf($scope.EventDetails.Events[i]);
                $scope.EventDetails.Events.splice($index, 1);
            }
        }
        $scope.totalItems = $scope.EventDetails.Events.length;
        $scope.selectedAll = false;
    };

    //Enable/Disable Edit Button on Checkbox Checked
    $scope.disableEdit = function () {
        var result = 0;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.EventDetails.Events[i] && $scope.EventDetails.Events[i].selected) {
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
            if ($scope.EventDetails.Events[i] && $scope.EventDetails.Events[i].selected) {
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
            if ($scope.EventDetails.Events[i]) {
                var items = items + 1;
                if ($scope.EventDetails.Events[i].selected) {
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
    $scope.editEvent = function (postType) {
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.EventDetails.Events[i] && $scope.EventDetails.Events[i].selected) {
                $index = $scope.EventDetails.Events.indexOf($scope.EventDetails.Events[i]);
                $scope.eventDetail = angular.copy($scope.EventDetails.Events[$index]);
            }
        }
        $scope.commonServiceScope = CommonService;
        $scope.commonServiceScope.id = $scope.eventDetail.id;
        $scope.commonServiceScope.postType = postType;
        $location.path('/eventmanage/events/CreateNewEvent');

    };

    $scope.CreateNewEvents = function (postType) {
        $scope.Event = CommonService;
        $scope.Event.id = null;
        $scope.commonServiceScope = CommonService;
        $scope.commonServiceScope.postType = postType;
        $location.path('/eventmanage/events/CreateNewEvent');
    };

    //Reset selected records 
    $scope.reset = function () {
        $scope.EventDetails.Events.selected = {};
        $scope.eventDetail = {};
        $scope.showval = false;
        $scope.showfooter = false;

    };

    //check/uncheck 'SelectAll' Checkbox
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }

        for (var i = $scope.begin; i < $scope.end; i++) {
            $index = $scope.EventDetails.Events.indexOf($scope.EventDetails.Events[i]);
            $scope.EventDetails.Events[$index].selected = $scope.selectedAll;
        }
    };

    //Checks for Error
    $scope.checkError = function (startDate, endDate) {
        $scope.errMessage = '';
        if (endDate < startDate) {
            $scope.errMessage = 'End Date should be less than start date';
            return false;
        }
    };

    //Checks current date
    $scope.checkCurr = function (startDate) {
        $scope.errMessage = '';
        $scope.curDate = new Date();
        if (startDate < $scope.curDate) {
            $scope.errMessage = 'Start date should not be before today.';
            return false;
        }
    };

    //Checks for Event Date to be greater than current Date
    $scope.checkEvent = function (eventDate) {
        $scope.errEventMessage = '';
        $scope.curDate = new Date();
        if (eventDate < $scope.curDate) {
            $scope.errEventMessage = 'Event Date and Time should be greater than current Date & Time.';
            return false;
        }
    };

    //Current Crum update from Bread Crum Service
    $scope.crum = BreadCrum;

    //Initiat Date picker on document ready
    angular.element(document).ready(function () {
        initDatePicker();
    });

}]);