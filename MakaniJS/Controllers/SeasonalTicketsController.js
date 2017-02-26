MakaniPostSaudiApp.controller("SeasonalTicketsController", ['$scope', 'filterFilter', 'Service', 'Constants', 'BreadCrum', 'LocaleConstants', 'config', function ($scope, filterFilter, Service, Constants, BreadCrum, LocaleConstants, config) {

    //Locale Constants
    $scope.Save = LocaleConstants[locale]["Save"];
    $scope.Cancel = LocaleConstants[locale]["Cancel"];
    $scope.Thenameisrequired = LocaleConstants[locale]["Thenameisrequired"];
    $scope.Browse = LocaleConstants[locale]["Browse"];
    $scope.EndDate = LocaleConstants[locale]["EndDate"];
    $scope.StartDate = LocaleConstants[locale]["StartDate"];
    $scope.NumberofTickets = LocaleConstants[locale]["NumberofTickets"];
    $scope.Active = LocaleConstants[locale]["Active"];
    $scope.Description = LocaleConstants[locale]["Description"];
    $scope.Competition = LocaleConstants[locale]["Competition"];
    $scope.ClubStadiumEvent = LocaleConstants[locale]["ClubStadiumEvent"];
    $scope.AllType = LocaleConstants[locale]["AllType"];
    $scope.SeasonalTicketHeader = LocaleConstants[locale]["SeasonalTicket"];
    $scope.CreateNewSeasonalTicket = LocaleConstants[locale]["CreateNewSeasonalTicket"];
    $scope.EditSeasonalTicket = LocaleConstants[locale]["EditSeasonalTicket"];
    $scope.DeactivateSeasonalTicket = LocaleConstants[locale]["DeactivateSeasonalTicket"];
    $scope.AllCompetitions = LocaleConstants[locale]["AllCompetitions"];
    $scope.select = LocaleConstants[locale]["Select"];
    $scope.TheCompetitions = LocaleConstants[locale]["TheCompetitions"];
    $scope.TheName = LocaleConstants[locale]["TheName"];
    $scope.AllClub = LocaleConstants[locale]["AllClub"];
    $scope.AllStadium = LocaleConstants[locale]["AllStadium"];
    $scope.ValidityInvoice = LocaleConstants[locale]["ValidityInvoice"];
    $scope.EventAddthe = LocaleConstants[locale]["EventAddthe"];
    $scope.Type = LocaleConstants[locale]["Type"];
    $scope.Ticketclubs = LocaleConstants[locale]["Ticketclubs"];
    $scope.StadiumTicket = LocaleConstants[locale]["StadiumTicket"];
    $scope.TicketEvents = LocaleConstants[locale]["TicketEvents"];
    $scope.NumberOfTickets = LocaleConstants[locale]["NumberOfTickets"];
    $scope.Season = LocaleConstants[locale]["Season"];
    $scope.AnActive = LocaleConstants[locale]["AnActive"];
    $scope.NameoftheSeason = LocaleConstants[locale]["NameoftheSeason"];
    $scope.Inactive = LocaleConstants[locale]["Inactive"];
    $scope.Events = LocaleConstants[locale]["Events"];
    $scope.AddCompetition = LocaleConstants[locale]["AddCompetition"];
    $scope.Nameheader = LocaleConstants[locale]["Name"];



    $scope.data = [];
    $scope.SeasonalTickets = [];  
    $scope.FormPostType;

    //Http Services Get Data
    Service.get(Constants.SeasonalTicketsUri)
    .then(function (response) {
        $scope.SeasonalTickets = response.data;
        $scope.tableCompetition = [];
        $scope.tableEvent = [];
        $scope.totalItems = $scope.SeasonalTickets.SeasonalTickets.length;
        $scope.currentPage = 1;
        $scope.numPerPage = config.paginationItemsPerPage;

        //Pagination control
        $scope.paginate = function (value) {
            //var begin, end, index;
            $scope.begin = ($scope.currentPage - 1) * $scope.numPerPage;
            $scope.end = $scope.begin + $scope.numPerPage;
            index = $scope.SeasonalTickets.SeasonalTickets.indexOf(value);
            return ($scope.begin <= index && index < $scope.end);
        };
    });

   //Add new Record / Save Edited Records
    $scope.submit = function () {     
        if ($scope.FormPostType == "edit") {
            if ($scope.selectingType == 'Ticketclubs') {               
                Ticketclubs = true;
                $index = $scope.SeasonalTickets.SeasonalTickets.indexOf(filterFilter($scope.SeasonalTickets.SeasonalTickets, { id: $scope.seasonalTicket.id })[0])
                $scope.SeasonalTickets.SeasonalTickets[$index] = angular.copy($scope.seasonalTicket);
                $('#myModal').modal('hide');
            } else if ($scope.selectingType == 'Stadiumticket') {
                Stadiumticket = true;
                $index = $scope.SeasonalTickets.SeasonalTickets.indexOf(filterFilter($scope.SeasonalTickets.SeasonalTickets, { id: $scope.seasonalTicket.id })[0])
                $scope.SeasonalTickets.SeasonalTickets[$index] = angular.copy($scope.seasonalTicket);
                $('#myModal').modal('hide');
            }
            else if ($scope.selectingType == 'Ticketevents') {
                Ticketevents = true;
                $index = $scope.SeasonalTickets.SeasonalTickets.indexOf(filterFilter($scope.SeasonalTickets.SeasonalTickets, { id: $scope.seasonalTicket.id })[0])
                $scope.SeasonalTickets.SeasonalTickets[$index] = angular.copy($scope.seasonalTicket);
                $('#myModal').modal('hide');
            }
        }
        else {
            if ($scope.selectingType == 'Ticketclubs') {
          
                if ($scope.seasonalTicket.numberoftickets == undefined || $scope.seasonalTicket.enddate == undefined || $scope.seasonalTicket.startdate == undefined)
                {          
                    $(".competitionValidaion").addClass('has-error');             
                    return false;
                }
                else {
                    $scope.seasonalTicket.clubeventstadium = $scope.seasonalTicket.clubs;
                    $scope.seasonalTicket.type = $scope.seasonalTicket.Alltype;//1;//"Ticket Clubs";
                    $scope.competition = $scope.seasonalTicket.competition;
                    $scope.seasonalTicket.id = $scope.getRandomNumber();
                    $scope.SeasonalTickets.SeasonalTickets.push($scope.seasonalTicket);
                    $('#myModal').modal('hide');
                }
               
            }
            if ($scope.selectingType == 'Stadiumticket') {

                $scope.seasonalTicket.description = "";
                if ($scope.seasonalTicket.stadium == undefined || $scope.seasonalTicket.numberoftickets == undefined || $scope.seasonalTicket.seasons == undefined || $scope.seasonalTicket.enddate == undefined || $scope.seasonalTicket.startdate == undefined) {
                    $(".competitionValidaion").addClass('has-error');
                    return false;
                }
                else {
                    $scope.seasonalTicket.clubeventstadium = $scope.seasonalTicket.stadium;
                    $scope.seasonalTicket.type = $scope.seasonalTicket.Alltype;// 2;// "Ticket Stadium";
                    $scope.seasonalTicket.competition = $scope.competition;
                    $scope.seasonalTicket.id = $scope.getRandomNumber();
                    $scope.SeasonalTickets.SeasonalTickets.push($scope.seasonalTicket);
                    $('#myModal').modal('hide');
                }
            }
            if ($scope.selectingType == 'Ticketevents') {
                if ($scope.seasonalTicket.numberoftickets == undefined || $scope.seasonalTicket.enddate == undefined || $scope.seasonalTicket.startdate == undefined) {
                    $(".competitionValidaion").addClass('has-error');
                    return false;
                }
                else {
                    $scope.seasonalTicket.clubeventstadium = $scope.seasonalTicket.events;
                    $scope.seasonalTicket.type = $scope.seasonalTicket.Alltype; //3 // "Ticket Events";
                    $scope.seasonalTicket.competition = $scope.competition;
                    $scope.seasonalTicket.id = $scope.getRandomNumber();
                    $scope.SeasonalTickets.SeasonalTickets.push($scope.seasonalTicket);
                    $('#myModal').modal('hide');
                }
            }
        }
        $scope.errMessageCurrDateStadium = '';
        $scope.errMessageEndDateStadium = '';

        $scope.errMessageCurrDate = '';
        $scope.errMessageEndDate = '';
        $scope.totalItems = $scope.SeasonalTickets.SeasonalTickets.length;
    };

    //Deactivate selected/all seasonalTicket
    $scope.remove = function () {
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {

            if ($scope.SeasonalTickets.SeasonalTickets[i] && $scope.SeasonalTickets.SeasonalTickets[i].selected) {
                $index = $scope.SeasonalTickets.SeasonalTickets.indexOf($scope.SeasonalTickets.SeasonalTickets[i]);
                $scope.SeasonalTickets.SeasonalTickets.splice($index, 1);
            }
        }
        $scope.totalItems = $scope.SeasonalTickets.SeasonalTickets.length;
        $scope.selectedAll = false;
    };

    //Enable/Disable Edit Button on Checkbox Checked
    $scope.disableEdit = function () {
         var result = 0;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.SeasonalTickets.SeasonalTickets[i] && $scope.SeasonalTickets.SeasonalTickets[i].selected) {
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
            if ($scope.SeasonalTickets.SeasonalTickets[i] && $scope.SeasonalTickets.SeasonalTickets[i].selected) {
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

    $scope.numberValidation = function (event) {
        $event = window.event;
        if ($event.keyCode == 8 || $event.keyCode == 46
         || $event.keyCode == 37 || $event.keyCode == 39) {
            return true;
        }
        else if ($event.keyCode < 48 || $event.keyCode > 57) {
            $event.preventDefault();
        }
        else return true;
    };


    $scope.AddCompetitionMethod = function () {
        var tempid = null;
        var valueCompetition=$scope.seasonalTicket.competition;
        
        if (valueCompetition == undefined)
        {
            
            $("#ddlCompetition").addClass('has-error');
            
        }

        if ($scope.seasonalTicket.addallcompetition) {
            $scope.temptableCompetition = [];
            $scope.tableCompetition = {};
            $scope.tempcomp = angular.copy($scope.SeasonalTickets.Competitions);
            $scope.temptableCompetition.push($scope.tempcomp);
            $scope.tableCompetition = $scope.temptableCompetition[0];
        }
        else {
            var tempid = filterFilter($scope.tableCompetition, { id: $scope.seasonalTicket.competition.id });

            if (tempid.length <= 0 || tempid == null) {
                $scope.tableCompetition.push($scope.seasonalTicket.competition);
            }
        }

    }

    $scope.removeCompetitionMethod = function (id) {

        if (confirm("Are you sure to Delete ?")) {
            $scope.selectedIdValue = id;
            var index = $scope.tableCompetition.map(function (item) {
                return item.id;
            }).indexOf($scope.selectedIdValue);

            $scope.tableCompetition.splice(index, 1);
            if ($scope.tableCompetition.length <= 0) {
                $scope.seasonalTicket.addallcompetition = false;
            }
        }
    }

    $scope.AddEventMethod = function () {
        var tempid = null;
        var tempid = filterFilter($scope.tableEvent, { id: $scope.seasonalTicket.events.id });
        if (tempid.length <= 0 || tempid == null) {
            $scope.tableEvent.push($scope.seasonalTicket.events);
        }
    }

    $scope.removeEventMethod = function (id) {
        $scope.selectedId = id;
        var index = $scope.tableEvent.map(function (item) {
            return item.id;
        }).indexOf(id);

        $scope.tableEvent.splice(index, 1);
    }


    //check/uncheck record checkbox and 'selectall' checkbox
    $scope.UnCheckMain = function () {
        var result = 0;
        var items = 0;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.SeasonalTickets.SeasonalTickets[i]) {
                var items = items + 1;
                if ($scope.SeasonalTickets.SeasonalTickets[i].selected) {
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
    $scope.editSeasonalTicket = function (postType) {
        $scope.errMessageCurrDateStadium = '';
        $scope.errMessageEndDateStadium = '';
        $scope.errMessageCurrDate = '';
        $scope.errMessageEndDate = '';
        $scope.AddEditnewseasontickets = LocaleConstants[locale]["EditSeasonalTicket"];
        $scope.FormPostType = postType;
      
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.SeasonalTickets.SeasonalTickets[i] && $scope.SeasonalTickets.SeasonalTickets[i].selected) {
                $index = $scope.SeasonalTickets.SeasonalTickets.indexOf($scope.SeasonalTickets.SeasonalTickets[i]);
                $scope.seasonalTicket = angular.copy($scope.SeasonalTickets.SeasonalTickets[$index]);
            }
        }
    };

    //Add new record using model pop-up 
    $scope.addSeasonalTicket = function (postType) {
        $scope.errMessageCurrDateStadium = '';
        $scope.errMessageEndDateStadium = '';
        $scope.errMessageCurrDate = '';
        $scope.errMessageEndDate = '';

        $scope.AddEditnewseasontickets = LocaleConstants[locale]["Addnewseasontickets"];
        $scope.FormPostType = postType;
        $scope.seasonalTicket = {};
        $(".commontext").removeClass('has-error');
    };

    //Reset selected records 
    $scope.reset = function () {
        $scope.SeasonalTickets.selected = {};
        $scope.errMessageCurrDateStadium = '';
        $scope.errMessageEndDateStadium = '';

        $scope.errMessageCurrDate = '';
        $scope.errMessageEndDate = '';
    };

    //check/uncheck 'SelectAll' Checkbox
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }

        for (var i = $scope.begin; i < $scope.end; i++) {
            $index = $scope.SeasonalTickets.SeasonalTickets.indexOf($scope.SeasonalTickets.SeasonalTickets[i]);
            $scope.SeasonalTickets.SeasonalTickets[$index].selected = $scope.selectedAll;
        }
    };

    //show dropdown value as a text in SeasonalTickets grid  
    $scope.showcompetition = function (seasonalTicket) {
        var selected = [];
        if (seasonalTicket.competition) {
            selected = filterFilter($scope.SeasonalTickets.Competitions, { id: seasonalTicket.competition });
        }
        return selected.length ? selected[0].name : '';
    };

    //show dropdown value as a text in SeasonalTickets grid  
    $scope.showclubeventstadium = function (seasonalTicket) {
        var selected = [];
        if (seasonalTicket.clubeventstadium) {
            selected = filterFilter($scope.SeasonalTickets.ClubEventStadium, { id: seasonalTicket.clubeventstadium });
        }
        return selected.length ? selected[0].name : '';
    };
    //show dropdown value as a text in SeasonalTickets grid  
    $scope.showtype = function (seasonalTicket) {
        var selected = [];
        if (seasonalTicket.type) {
            selected = filterFilter($scope.SeasonalTickets.Alltype, { id: seasonalTicket.type });
        }
        return selected.length ? selected[0].name : '';
    };

    //method to generate random number 
    $scope.getRandomNumber = function () {
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
    $scope.selectingType = 'Ticketclubs';
    $scope.isShownDiv = function (selectingType) {       
        return selectingType === $scope.selectingType;
    };
   
    $scope.checkDateValidation = function (startDate, endDate) {
        startDate = $("#startDate").val();
        endDate = $("#endDate").val();

        var curDate = new Date();
        var day = ("0" + curDate.getDate()).slice(-2);
        var month = ("0" + (curDate.getMonth() + 1)).slice(-2);

        var today = curDate.getFullYear() + "/" + (month) + "/" + (day);
        if (new Date(startDate) > new Date(endDate)) {
            $scope.errMessageEndDate = 'End Date should be greater than start date.';
          
            return false;
        }
        if (new Date(startDate) < new Date(today)) {
            $scope.errMessageCurrDate = 'Start date should not be before today.';
            return false;
        }
        if (new Date(endDate) < new Date(today)) {
            $scope.errMessageEndDate = 'End date should not be before today.';
            return false;
        }
        if (new Date(startDate) >= new Date(today)) {
            $scope.errMessageCurrDate = '';
           
        }
        if (new Date(endDate) >= new Date(startDate)) {
            $scope.errMessageEndDate = '';
           
        }

    };

    $scope.checkDateValidationStadium = function (startDate, endDate) { 

        startDate = $scope.seasonalTicket.startdateStatium;        
        endDate = $scope.seasonalTicket.enddateStadium;
     

        var curDate = new Date();
        var day = ("0" + curDate.getDate()).slice(-2);
        var month = ("0" + (curDate.getMonth() + 1)).slice(-2);

        var today = curDate.getFullYear() + "/" + (month) + "/" + (day);
        if (new Date(startDate) < new Date(today)) {
            $scope.errMessageCurrDateStadium = 'Start date should not be before today.';
            return false;
        }
        if (new Date(endDate) < new Date(today)) {
            $scope.errMessageEndDateStadium = 'End date should not be before today.';
            return false;
        }
        if (new Date(startDate) > new Date(endDate)) {
            $scope.errMessageEndDateStadium = 'End Date should be greater than start date.';

            return false;
        }
     
        if (new Date(startDate) >= new Date(today)) {
            $scope.errMessageCurrDateStadium = '';

        }
        if (new Date(endDate) >= new Date(startDate)) {
            $scope.errMessageEndDateStadium = '';

        }

    };
    $scope.checkDateValidationEvents = function (startDate, endDate) {
        startDate = $scope.seasonalTicket.startdateEvent;
       
        endDate = $scope.seasonalTicket.enddateEvent;

        var curDate = new Date();
        var day = ("0" + curDate.getDate()).slice(-2);
        var month = ("0" + (curDate.getMonth() + 1)).slice(-2);

        var today = curDate.getFullYear() + "/" + (month) + "/" + (day);

        if (new Date(startDate) < new Date(today)) {
            $scope.errMessageCurrDateEvent = 'Start date should not be before today.';
            
            return false;
        }
        if (new Date(endDate) < new Date(today)) {
            $scope.errMessageEndDateEvent = 'End date should not be before today.';

            return false;
        }
        if (new Date(startDate) > new Date(endDate)) {
            $scope.errMessageEndDateEvent = 'End Date should be greater than start date.';

            return false;
        }

      
        if (new Date(startDate) >= new Date(today)) {
            $scope.errMessageCurrDateEvent = '';

        }
        if (new Date(endDate) >= new Date(startDate)) {
            $scope.errMessageEndDateEvent = '';

        }

    };

}]);
