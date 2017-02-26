MakaniPostSaudiApp.controller("DefineSeatsController", ['$scope', 'Service', 'Constants', 'LocaleConstants', 'filterFilter', 'BreadCrum', 'CommonService', '$location', function ($scope, Service, Constants, LocaleConstants, filterFilter, BreadCrum, CommonService, $location) {

    //Locale Constants
    $scope.CreateEvent = LocaleConstants[locale]["CreateEvent"];
    $scope.DefineSeats = LocaleConstants[locale]["DefineSeats"];
    $scope.DefineBlock = LocaleConstants[locale]["DefineBlock"];
    $scope.EventDetailsHeader = LocaleConstants[locale]["EventDetailsHeader"];
    $scope.Save = LocaleConstants[locale]["Save"];
    $scope.Cancel = LocaleConstants[locale]["Cancel"];
    $scope.Edit = LocaleConstants[locale]["Edit"];
    $scope.Select = LocaleConstants[locale]["Select"];
    $scope.Detailsoftheseat = LocaleConstants[locale]["Detailsoftheseat"];
    $scope.Seating = LocaleConstants[locale]["Seating"]; 
    $scope.Priceoftheseat = LocaleConstants[locale]["Priceoftheseat"];
    $scope.Usethedefaultpriceplan = LocaleConstants[locale]["Usethedefaultpriceplan"]; 
    $scope.SeatCondition = LocaleConstants[locale]["SeatCondition"];
    $scope.class = LocaleConstants[locale]["class"]; 
    $scope.Seatnumber = LocaleConstants[locale]["Seatnumber"];

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


    //Current Crum update from Bread Crum Service
    $scope.crum = BreadCrum;
   
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
        $location.path('/eventmanage/events/defineseats');


        ////@BEGIN: print block and seats in tab "defineSeat"
        ////====================================================================
        ////TODO:  need to write if('.is-block').is('.is-square'))
        ////------------------------------------------------------
        //var sampleSeatJsonForSquare = [
        //    {
        //        'cx': 15,
        //        'cy': 44.301025390625,
        //        'r': 15,
        //        'id': 'seat-6',
        //        'row': 'row-3',
        //        'col': 'col-0',
        //        'class': 'is-seat-real un-selected',
        //        'isSeatReal': true,
        //        'style': ''
        //    },
        //    {
        //        'cx': 47,
        //        'cy': 44.301025390625,
        //        'r': 15,
        //        'id': 'seat-7',
        //        'row': 'row-3',
        //        'col': 'col-1',
        //        'class': 'is-seat-real un-selected',
        //        'isSeatReal': true,
        //        'style': ''
        //    },
        //    {
        //        'cx': 79,
        //        'cy': 44.301025390625,
        //        'r': 15,
        //        'id': 'seat-8',
        //        'row': 'row-3',
        //        'col': 'col-2',
        //        'class': 'is-seat-real un-selected',
        //        'isSeatReal': true,
        //        'style': ''
        //    }
        //];

        ////@fn:execute square shape fn
        ////-------------------------------------------------
        ////fn:execute: printFetchedSeatsInSquareForEventsScreenFn(domDisplayHolderId, savedSeatsData, selectedBlockId, selectedBlockW, selectedBlockH)
        //printFetchedSeatsInSquareForEventsScreenFn('defineSeatsView', sampleSeatJsonForSquare, 'block-0', 149, 164);

        ////TODO:  need to write if('.is-block').is('.is-poly'))
        ////------------------------------------------------------
        ////create temporary json for seats
        //var sampleSeatJsonForPoly = [
        //        {
        //            'cx': 538.0267944335938,
        //            'cy': 262.7453918457031,
        //            'r': 2.5,
        //            'id': "seat-8",
        //            'class': 'is-seat-real un-selected',
        //            'isSeatReal': true,
        //            'style': ''
        //        },
        //        {
        //            'cx': 558.0836791992188,
        //            'cy': 262.7453918457031,
        //            'r': 2.5,
        //            'id': "seat-7",
        //            'class': 'is-seat-real selected',
        //            'isSeatReal': true,
        //            'style': 'fill: orange'
        //        }
        //    ];

        //    var sampleBlockPoints = '487.7578430175781,78.84732055664062,425.1073303222656,152.1365966796875,522.0382690429688,237.24671936035156,574.050048828125,141.49783325195312';

        //    //@fn:execute custom shape fn
        //    //-------------------------------------------------
        //    //fetchCustomShapeFn(boardForSingleBlockHolderId, seatDimension, seatSpace, thisSavedSeatsJson)
        //    //fetchCustomShapeFn('stadiumBlockHolder', 5, 2, reqArray);
        //    //fetchCustomShapeFromDbFn('defineSeatsView', 5, 2, sampleSeatJson, $scope.EventBlockId, block.Coordinates);
        //    fetchCustomShapeFromDbFn('defineSeatsView', 5, 2, sampleSeatJson, 'block-1', sampleBlockPoints);

        ////====================================================================
        ////@END: print block and seats in tab "defineSeat"
    };
    $scope.defineBlockDetails = function () {

        $scope.blockData = '';
        $scope.eventDetailslInformation = false;
        $scope.defineBlocklInformation = true;
        $scope.seatblockFormDetails = false;
        $scope.editEventDetailsInfo = true;
        $scope.showfooter = false;

    };

    angular.element(document).ready(function () {
        
        $("#defineSeatss a").trigger("click");
    });

}]);

