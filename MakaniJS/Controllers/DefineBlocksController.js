MakaniPostSaudiApp.controller("DefineBlocksController", ['$scope', 'Service', 'Constants', 'LocaleConstants', 'filterFilter', 'BreadCrum', 'CommonService', '$location', function ($scope, Service, Constants, LocaleConstants, filterFilter, BreadCrum, CommonService, $location) {

    //Locale Constants
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
    $scope.Category = LocaleConstants[locale]["Category"];
    $scope.Price = LocaleConstants[locale]["Price"];
    $scope.EnterPrice = LocaleConstants[locale]["EnterPrice"];
    $scope.Active = LocaleConstants[locale]["Active"];
    $scope.Name = LocaleConstants[locale]["Name"];
    $scope.AddSponsor = LocaleConstants[locale]["AddSponsor"];
    $scope.DeleteSponsor = LocaleConstants[locale]["DeleteSponsor"];
    $scope.Sponsorsheader = LocaleConstants[locale]["Sponsors"];
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
    $scope.Select = LocaleConstants[locale]["Select"];
    $scope.BrowserTemplates = LocaleConstants[locale]["BrowserTemplates"];
    $scope.Computer = LocaleConstants[locale]["Computer"];
    $scope.select = LocaleConstants[locale]["Select"];
    $scope.Mobile = LocaleConstants[locale]["Mobile"];
    $scope.Emailtemplate = LocaleConstants[locale]["Emailtemplate"];
    $scope.Templatemobilemessages = LocaleConstants[locale]["Templatemobilemessages"];
    $scope.mandatoryfield = LocaleConstants[locale]["mandatoryfield"];
    $scope.Institutionsheader = LocaleConstants[locale]["RegulatedInstitutions"];
    $scope.Add = LocaleConstants[locale]["Add"];
    $scope.Delete = LocaleConstants[locale]["Delete"];
    $scope.Activating = LocaleConstants[locale]["Activating"];
    $scope.ActivateSale = LocaleConstants[locale]["ActivateSale"];
    $scope.ActivatingratingPitch = LocaleConstants[locale]["ActivatingratingPitch"];
    $scope.AddMandatoryfield = LocaleConstants[locale]["AddMandatoryfield"];
    $scope.AddInstitution = LocaleConstants[locale]["AddInstitution"];
    $scope.AddSponsors = LocaleConstants[locale]["AddSponsors"];
    $scope.Browse = LocaleConstants[locale]["Browse"];
    $scope.AddCategoryPrice = LocaleConstants[locale]["AddCategoryPrice"];
    $scope.AddCategoryPriceheader = LocaleConstants[locale]["AddCategoryPrice"];


    //Http Service to Get Data
    Service.get(Constants.CreateEventUri).then(function (response) {
        $scope.StadiumData = response.data;
        $scope.EventDetails = $scope.StadiumData;
        $scope.TPEDetails = $scope.EventDetails.TicketEventPriceDetailstable;
    });

    $scope.eventDetailslInformation = true;
    $scope.defineBlocklInformation = false;
    $scope.seatblockFormDetails = false;
    $scope.editEventDetailsInfo = false;


    $scope.eventDetail = function () {

        if ($('.drawn-block').hasClass('selected')) {
            $scope.eventDetailslInformation = true;
            $scope.defineBlocklInformation = false;
            $scope.seatblockFormDetails = false;
        }
    };

    $scope.submitCategoryprice = function () {
        $scope.PriceDetail.ActivationDate = new Date();
        $scope.TPDetails.tabledata.push($scope.PriceDetail);
        $('#categoryPrice-Add-Modal').modal('hide');
    }

    $scope.resetCategoryprice = function () {
        $scope.PriceDetail = {};
        $('#categoryPrice-Add-Modal').modal('hide');
    }

    $scope.saveCategoryPrice = function () {
        $scope.$broadcast('show-errors-check-validity');
    };




    //Current Crum update from Bread Crum Service
    $scope.crum = BreadCrum;

    //Initiat Date picker on document ready
    //angular.element(document).ready(function () {
    //    initDatePicker();
    //});
    //Required field validation
    $scope.save = function () {
        $scope.$broadcast('show-errors-check-validity');
    };

    $scope.checkDateValidation = function (startDate, endDate) {
        startDate = $("#startDate").val();
        endDate = $("#endDate").val();
        $scope.errMessage = '';
        var curDate = new Date();

        if (new Date(startDate) > new Date(endDate)) {
            $scope.errMessage = '.End Date should be greater than start date';
            //alert($scope.errMessage)
            return false;
        }
        if (new Date(startDate) + 1 < curDate) {
            $scope.errMessage = '.Start date should not be before today';
            return false;
        }
    };

    //Check current event date
    $scope.checkEventDateValidation = function (eventDate) {
        startDate = $("#eventDate").val();
        $scope.errMessage = '';
        var curDate = new Date();
        if (new Date(startDate) < curDate) {
            $scope.errEventMessage = '.Start date should not be before today';
            return false;
        }
        else {
            $scope.errEventMessage = '';
            return true;
        }
    };

    $scope.priceValidation = function ($event) {
        if ($event.keyCode > 57 || $event.keyCode < 45) {
            $event.preventDefault();
        }
    };

    $scope.eventDetailslInformation = true;
    $scope.defineBlocklInformation = false;
    $scope.seatblockFormDetails = false;
    $scope.editEventDetailsInfo = false;

    $scope.eventDetail = function () {

        $scope.blockData = '';
        $scope.eventDetailslInformation = true;
        $scope.defineBlocklInformation = false;
        $scope.seatblockFormDetails = false;
        $scope.editEventDetailsInfo = false;

    };

    $scope.defineBlock = function () {

        $scope.blockData = '';
        $scope.eventDetailslInformation = false;
        $scope.defineBlocklInformation = false;
        $scope.seatblockFormDetails = false;
        $scope.editEventDetailsInfo = true;
        $scope.showfooter = false;

    };



    $scope.defineSeat = function () {

        $scope.blockData = '';
        $scope.eventDetailslInformation = false;
        $scope.defineBlocklInformation = false;
        $scope.seatblockFormDetails = true;
    };
    $scope.defineBlockDetails = function () {

        $scope.blockData = '';
        $scope.eventDetailslInformation = false;
        $scope.defineBlocklInformation = true;
        $scope.seatblockFormDetails = false;
        $scope.editEventDetailsInfo = true;
        $scope.showfooter = false;

    };
  

    $(document).on('click', '.is-square-group.drawn-block.selected > rect', function () {
   
        //  $scope.selectedBlockId = $(".drawn-block.saved.is-square-group.selected > rect").attr("id");
        $scope.defineBlockDetails();
        $scope.$apply();
        $scope.selectedBlockId = $(".drawn-block.saved.is-square-group.selected > rect").attr("id");
        alert($scope.selectedBlockId);
    });



    $(document).on('click', '.is-poly-group.drawn-block.selected> polygon', function () {

      
        $scope.defineBlockDetails();
        $scope.$apply();
        $scope.selectedBlockId = $(".is-poly-group.drawn-block.selected> polygon").attr("id");
        alert($scope.selectedBlockId);
    });
    $scope.getImageData = function () {
        debugger;
        // TODO : Needs to be updated as dynamic
        FetchStadiumPicFn();
    };

    //check/uncheck 'SelectAll' Checkbox
    $scope.EventPriceDetail_checkAll = function () {
        if (!$scope.EventPriceDetail_selectedAll) {
            $scope.EventPriceDetail_selectedAll = false;
        } else {
            $scope.EventPriceDetail_selectedAll = true;
        }
        angular.forEach($scope.TPEDetails, function (EventPriceDetail) {
            EventPriceDetail.selected = $scope.EventPriceDetail_selectedAll;
        });
    };

    //check/uncheck record checkbox and 'selectall' checkbox
    $scope.EventPriceDetail_UnCheckMain = function () {
        $scope.EventPriceDetail_selectedAll = true;
        if ((filterFilter($scope.TPEDetails, { selected: false })).length) {
            $scope.EventPriceDetail_selectedAll = false;
        }
        if ((filterFilter($scope.TPEDetails, { selected: false })).length > 1) {
            $scope.EventPriceDetail_selectedAll = false;
        }
    };

    $scope.submitEventCategoryprice = function () {

        $scope.EventPriceDetail.ActivationDate = new Date();

        $scope.TPEDetails.push($scope.EventPriceDetail);

        $('#categoryEventPrice-Add-Modal').modal('hide');
    }

    //Reset selected records 
    $scope.reset = function () {
        $scope.EventDetails.Events.selected = {};
        $scope.eventDetail = {};
        $scope.showval = false;
        $scope.showfooter = false;

    };

    angular.element(document).ready(function () {
        $scope.getImageData();
        $("#defineBlocks a").trigger("click");
    });

}]);

