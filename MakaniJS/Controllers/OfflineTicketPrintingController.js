MakaniPostSaudiApp.controller("OfflineTicketPrintingController", ['$scope', 'Service', 'Constants', 'BreadCrum', 'LocaleConstants', 'filterFilter', 'config', function ($scope, Service, Constants, BreadCrum, LocaleConstants, filterFilter, config) {

    //Locale Constants
    $scope.Save = LocaleConstants[locale]["Save"];
    $scope.Cancel = LocaleConstants[locale]["Cancel"];
    $scope.SeatSelectionMethod = LocaleConstants[locale]["SeatSelectionMethod"];
    $scope.StartDate = LocaleConstants[locale]["StartDate"];
    $scope.Stadium = LocaleConstants[locale]["Stadium"];
    $scope.CreateNewJob = LocaleConstants[locale]["CreateNewJob"];
    $scope.DeactivateJob = LocaleConstants[locale]["DeactivateJob"];
    $scope.OfflineTicketPrinting = LocaleConstants[locale]["OfflineTicketPrinting"];
    $scope.DownloadTickets = LocaleConstants[locale]["DownloadTickets"];
    $scope.JobStatus = LocaleConstants[locale]["JobStatus"];;
    $scope.NumberofTickets = LocaleConstants[locale]["NumberofTickets"];
    $scope.Save = LocaleConstants[locale]["Save"];
    $scope.Cancel = LocaleConstants[locale]["Cancel"];
    $scope.Event = LocaleConstants[locale]["Event"];
    $scope.Askfornewjob = LocaleConstants[locale]["Askfornewjob"];
    $scope.ticketsavailable = LocaleConstants[locale]["ticketsavailable"];
    $scope.Select = LocaleConstants[locale]["Select"];
    $scope.Enterprise = LocaleConstants[locale]["Enterprise"];
    $scope.Selectingseats = LocaleConstants[locale]["Selectingseats"];
    $scope.Manuallyselectedseats = LocaleConstants[locale]["Manuallyselectedseats"];
    $scope.Downloadingfile = LocaleConstants[locale]["Downloadingfile"];
    $scope.Percentagebox = LocaleConstants[locale]["Percentagebox"];
    $scope.Percentagestadium = LocaleConstants[locale]["Percentagestadium"];
    $scope.percentageclassstadium = LocaleConstants[locale]["percentageclassstadium"];
    $scope.stadium = LocaleConstants[locale]["Stadiums"];
    $scope.LorenIpsum = LocaleConstants[locale]["LorenIpsum"];
    $scope.Selectionseats = LocaleConstants[locale]["Selectionseats"];
    $scope.Browse = LocaleConstants[locale]["Browse"];
    $scope.Square = LocaleConstants[locale]["Square"];
    $scope.Ratio = LocaleConstants[locale]["Ratio"];
    $scope.SelectionBoxes = LocaleConstants[locale]["SelectionBoxes"];
    $scope.Numberofselectedseats = LocaleConstants[locale]["Numberofselectedseats"];
    $scope.Group = LocaleConstants[locale]["Group"];
    $scope.Oftotalseats = LocaleConstants[locale]["Oftotalseats"];
    $scope.Oftotalavailable = LocaleConstants[locale]["Oftotalavailable"];
    $scope.Category = LocaleConstants[locale]["Category"];
    $scope.Selectedseats = LocaleConstants[locale]["Selectedseats"];

    $scope.data = [];
    $scope.Tickets = [];
    $scope.ticket = {};
    $scope.FormPostType;

    //Http Services Get Data
    Service.get(Constants.TicketsUri)
    .then(function (response) {
        $scope.Tickets = response.data;
        $scope.totalItems = $scope.Tickets.Tickets.length;
        $scope.currentPage = 1;
        $scope.numPerPage = config.paginationItemsPerPage;

        //Pagination control
        $scope.paginate = function (value) {
            //var begin, end, index;
            $scope.begin = ($scope.currentPage - 1) * $scope.numPerPage;
            $scope.end = $scope.begin + $scope.numPerPage;
            index = $scope.Tickets.Tickets.indexOf(value);
            return ($scope.begin <= index && index < $scope.end);
        };
    });
    $scope.submitting = false;
    //Add new Record / Save Edited Records
    $scope.submit = function () {
        {
            $scope.submitting = true;
            $scope.ticket.id = $scope.Tickets.Tickets.length + 1;
            //$scope.ticket.id = $scope.generateId();
            $scope.Tickets.Tickets.push($scope.ticket);
            $('#myModal').modal('hide');
            $scope.ticket = {};
        }
        // $scope.totalItems = $scope.Tickets.Tickets.length;
    };

    //method to generate ID
    $scope.generateId = function () {
        var date = new Date();
        $scope.second = ((date.getSeconds() < 10 ? '0' : '') + date.getSeconds());
        $scope.randomnumber = Math.floor((Math.random() * 6) + 50);
        return parseFloat($scope.randomnumber) + parseFloat($scope.second);
    };


    //Deactivate selected/all ticket
    $scope.remove = function () {
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {

            if ($scope.Tickets.Tickets[i] && $scope.Tickets.Tickets[i].selected) {
                $index = $scope.Tickets.Tickets.indexOf($scope.Tickets.Tickets[i]);
                $scope.Tickets.Tickets.splice($index, 1);
            }
        }
        $scope.totalItems = $scope.Tickets.Tickets.length;
        $scope.selectedAll = false;
    };

    //Enable/Disable Edit Button on Checkbox Checked
    $scope.disableEdit = function () {
        var result = 0;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.Tickets.Tickets[i] && $scope.Tickets.Tickets[i].selected) {
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
            if ($scope.Tickets.Tickets[i] && $scope.Tickets.Tickets[i].selected) {
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
            if ($scope.Tickets.Tickets[i]) {
                var items = items + 1;
                if ($scope.Tickets.Tickets[i].selected) {
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
    $scope.editTickets = function (postType) {
        $scope.FormPostType = postType;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.Tickets.Tickets[i] && $scope.Tickets.Tickets[i].selected) {
                $index = $scope.Tickets.Tickets.indexOf($scope.Tickets.Tickets[i]);
                $scope.ticket = angular.copy($scope.Tickets.Tickets[$index]);
            }
        }
    };

    //Add new record using model pop-up 
    $scope.addTickets = function (postType) {
        $scope.FormPostType = postType;
        $scope.ticket.selected = {};
    };

    //Reset selected records 
    $scope.reset = function () {
        $scope.ticket.selected = {};
    };

    //check/uncheck 'SelectAll' Checkbox
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }

        for (var i = $scope.begin; i < $scope.end; i++) {
            $index = $scope.Tickets.Tickets.indexOf($scope.Tickets.Tickets[i]);
            $scope.Tickets.Tickets[$index].selected = $scope.selectedAll;
        }
    };

    //Current Crum update from Bread Crum Service
    $scope.crum = BreadCrum;

    angular.element(document).ready(function () {
        initDatePicker();
    });

    //Hide Show Number of selected seats	

    $scope.isPercBoxDiv = true;
    $scope.ShowHidePercBoxDiv = function () {
        $scope.isPercBoxDiv = false;
    }
    $scope.isHiddenPercSelectedSeats = true;
    $scope.ShowHideSelectedSeats = function () {
        $scope.isHiddenPercSelectedSeats = false;
    }
    //Required field validation
    $scope.newJob = function () {
        $scope.$broadcast('show-errors-check-validity');
    };
    // Model Ask for a new job
    $scope.isShown = function (selectingseats) {
        return selectingseats === $scope.selectingseats;
    };
    $scope.isShownDiv = function (selectingseatsDiv) {
        return selectingseatsDiv === $scope.selectingseatsDiv;
    };

    $scope.isShownPerStadium = function (selectseatsPerStadium) {
        return selectseatsPerStadium === $scope.selectseatsPerStadium;
    };

    //show dropdown value as a text in season grid  
    $scope.showHits = function (ticket) {
        var selected = [];
        if (ticket.hits || ticket.hits == 0) {
            selected = filterFilter($scope.Tickets.Hits, { key: ticket.hits });
        }
        return selected.length ? selected[0].value : '';
    };


}]);
