MakaniPostSaudiApp.controller("CreateEventController", ['$scope', 'Service', 'Constants', 'LocaleConstants', 'filterFilter','BreadCrum', 'CommonService', '$location', function ($scope, Service, Constants, LocaleConstants, filterFilter, BreadCrum, CommonService, $location) {

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

    if (CommonService.id && CommonService.id != null) {
        $scope.Event = LocaleConstants[locale]["EditEvent"];
    } else {
        $scope.Event = LocaleConstants[locale]["CreateEvent"];
    }

    //Http Service to Get Data
    Service.get(Constants.CreateEventUri).then(function (response) {
        $scope.StadiumData = response.data;
        if (CommonService.id && CommonService.id != null) {
            if (CommonService.UpdatedEvent && CommonService.id != null) {
                $scope.eventDetail = angular.copy(filterFilter(CommonService.UpdatedEvent, { id: CommonService.id })[0]);
            }
            else {
                $scope.Events = response.data.Events;
                $scope.eventDetail = angular.copy(filterFilter($scope.Events, { id: CommonService.id })[0]);
            }
        }
        $scope.EventDetails = $scope.StadiumData;
        $scope.RegulatedInstitutions = $scope.EventDetails.RegulatedInstitutions;
        $scope.Mandatoryfields = $scope.EventDetails.Mandatoryfields;
        $scope.TPEDetails = $scope.EventDetails.TicketEventPriceDetailstable;
    });

    //show respective Stadium detail on Stadium dropdown Selection 
    $scope.showval = false;
    $scope.selectedstadium = false;
    $scope.EventDetails = [];
    $scope.SponsorsName = [];


    $scope.isShowHide = function () {
        $scope.StadiumName = "Stadium" + $scope.selectedstadium;
        $scope.TPDetails = $scope.StadiumData.TicketPriceDetailstable[$scope.selectedstadium - 1];
        $scope.Suites = $scope.StadiumData.SuiteDetailstable[$scope.selectedstadium - 1];
        $scope.SponsorsName = $scope.StadiumData.Sponsorstable[$scope.selectedstadium - 1];
        $scope.showval = true;
        $scope.showfooter = true;

    }

    //Form Submit
    $scope.submitForm = function () {
        {
            if (CommonService.postType && CommonService.postType == 'edit') {

                eventDate = $("#eventDate").val();
                startDate = $("#startDate").val();
                endDate = $("#endDate").val();
             
                $scope.errMessage = '';

                if ($scope.eventDetail.SecondClubselected == $scope.eventDetail.FirstClubselected) {
                   
                    $scope.errMessageClub = '.1st and 2nd club should be different';
                    return false;
                }               
                var curDate = new Date();
                var day = ("0" + curDate.getDate()).slice(-2);
                var month = ("0" + (curDate.getMonth() + 1)).slice(-2);
                var hours = curDate.getHours();
                var minutes = curDate.getMinutes();

                var today = curDate.getFullYear() + "-" + (month) + "-" + (day);

                if ((new Date(eventDate) < new Date(startDate)) || (new Date(startDate) < new Date(today))) {
                   // $("#endDate").prop('disabled', true);
                    $scope.errMessage = '.eventDate Date should be greater than start date and not less than current date';
                    return false;
                }

                if ((new Date(endDate) < new Date(startDate)) || (new Date(endDate) > new Date(eventDate))) {
                    $scope.errMessage = '.End Date should be greater than start date and event date';
                    return false;
                }
                var todayWithTime = (hours) + ":" + (minutes) + " " + curDate.getFullYear() + "-" + (month) + "-" + (day);
                if (new Date(eventDate) < new Date(todayWithTime)) {
                    $scope.errEventMessage = '.Event date should not be before today';
                    return false;
                }
                else {


                    if (CommonService.UpdatedEvent && CommonService.UpdatedEvent != null) {
                        $index = CommonService.UpdatedEvent.indexOf(filterFilter(CommonService.UpdatedEvent, { id: $scope.eventDetail.id })[0])
                        CommonService.UpdatedEvent[$index] = angular.copy($scope.eventDetail);
                        $scope.CommonServiceScope = CommonService;
                        $scope.CommonServiceScope.UpdatedEvent = CommonService.UpdatedEvent;
                    }
                    else {

                        $index = $scope.EventDetails.Events.indexOf(filterFilter($scope.EventDetails.Events, { id: $scope.eventDetail.id })[0])
                        $scope.EventDetails.Events[$index] = angular.copy($scope.eventDetail);
                        $scope.CommonServiceScope = CommonService;
                        $scope.CommonServiceScope.UpdatedEvent = $scope.EventDetails.Events;
                    }

                }
            }
            else {
                eventDate = $("#eventDate").val();
                startDate = $("#startDate").val();
                endDate = $("#endDate").val();
             
                $scope.errMessage = '';
                var curDate = new Date();
                var day = ("0" + curDate.getDate()).slice(-2);
                var month = ("0" + (curDate.getMonth() + 1)).slice(-2);
                var hours = curDate.getHours();
                var minutes = curDate.getMinutes();

                var today = curDate.getFullYear() + "/" + (month) + "/" + (day);

                if ($scope.eventDetail.SecondClubselected == $scope.eventDetail.FirstClubselected) {

                    $scope.errMessageClub = '.1st and 2nd club should be different';
                    return false;
                }
             
                if ((eventDate != undefined || eventDate != "") && (startDate != undefined || startDate != "") && (endDate != undefined || endDate != "")) {

                    if ((new Date(eventDate) < new Date(startDate)) || (new Date(startDate) < new Date(today))) {

                        $scope.errMessage = '.eventDate Date should be greater than start date and not less than current date';
                        return false;
                    }

                    if ((new Date(endDate) < new Date(startDate)) || (new Date(endDate) > new Date(eventDate))) {
                        $scope.errMessage = '.End Date should be greater than start date';
                        return false;
                    }

                    var todayWithTime = (hours) + ":" + (minutes) + " " + curDate.getFullYear() + "/" + (month) + "/" + (day);

                    if (new Date(eventDate) < new Date(todayWithTime)) {
                        $scope.errEventMessage = '.Event date should not be before today';
                        return false;
                    }

                

                else {

                    $scope.eventDetail.id = $scope.generateId();
                    $scope.EventDetails.Events.push($scope.eventDetail);
                    $scope.CommonServiceScope = CommonService;
                    $scope.CommonServiceScope.UpdatedEvent = $scope.EventDetails.Events;
                }
                
                }
            }

            //$scope.CommonServiceScope = CommonService;
            //$scope.CommonServiceScope.UpdatedEvent = $scope.EventDetails.Events;
            CommonService.postType = '';
            $scope.EventDetails.Events.selected = {};
            $scope.showval = false;
            $scope.showfooter = false;
        }
    };

    //method to generate ID
    $scope.generateId = function () {
        var date = new Date();
        $scope.second = ((date.getSeconds() < 10 ? '0' : '') + date.getSeconds());
        $scope.randomnumber = Math.floor((Math.random() * 6) + 50);
        return parseFloat($scope.randomnumber) + parseFloat($scope.second);
    };

    $scope.eventDetails = function () {

        if ($('.drawn-block').hasClass('selected')) {
            $scope.eventDetailslInformation = true;
            $scope.defineBlocklInformation = false;
            $scope.seatblockFormDetails = false;
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

    //Deactivate selected/all sponsors
    $scope.Editevent_remove = function () {
        var len = $scope.SponsorsName.tabledata.length;
        for (var i = len - 1; i >= 0; i--) {
            if ($scope.SponsorsName.tabledata[i].selected) {
                $index = $scope.SponsorsName.tabledata.indexOf($scope.SponsorsName.tabledata[i]);
                $scope.SponsorsName.tabledata.splice($index, 1);
            }
        }
        $scope.Sponsor_selectedAll = false;
    };

    //Enable/Disable Delete Button on Checkbox Checked
    $scope.Editevent_disableDelete = function () {
        var result = filterFilter($scope.SponsorsName.tabledata, { selected: true });
        if (result && result.length >= 1) {
            $('.deleteiconevespon').addClass('checked');
            return false;
        } else {
            $('.deleteiconevespon').removeClass('checked');
            return true;
        }
    };


    //check/uncheck record checkbox and 'selectall' checkbox
    $scope.Editevent_UnCheckMain = function () {
        $scope.Sponsor_selectedAll = true;
        if ((filterFilter($scope.SponsorsName.tabledata, { selected: false })).length) {
            $scope.Sponsor_selectedAll = false;
        }
        if ((filterFilter($scope.SponsorsName.tabledata, { selected: false })).length > 1) {
            $scope.Sponsor_selectedAll = false;
        }
    };

    //check/uncheck 'SelectAll' Checkbox
    $scope.Editevent_checkAll = function () {
        if (!$scope.Sponsor_selectedAll) {
            $scope.Sponsor_selectedAll = false;
        } else {
            $scope.Sponsor_selectedAll = true;
        }
        angular.forEach($scope.SponsorsName.tabledata, function (Sponsor) {
            Sponsor.selected = $scope.Sponsor_selectedAll;
        });
    };

    //Reset selected records 
    $scope.reset = function () {
        $scope.EventDetails.Events.selected = {};
        $scope.eventDetail = {};
        $scope.selectedstadium = false;
        $scope.showval = false;
        $scope.showfooter = false;
        $location.path('/eventmanage/events');

    };

    //Enable/Disable Delete Button on Checkbox Checked
    $scope.Mandatoryfields_disableDelete = function () {
        var result = filterFilter($scope.Mandatoryfields, { selected: true });
        if (result && result.length >= 1) {
            $('.popupdelete').addClass('checked');
            return false;

        } else {
            $('.popupdelete').removeClass('checked');
            return true;
        }
    };

    //check/uncheck 'SelectAll' Checkbox
    $scope.Mandatoryfields_checkAll = function () {
        if (!$scope.Mandatoryfields_selectedAll) {
            $scope.Mandatoryfields_selectedAll = false;
        } else {
            $scope.Mandatoryfields_selectedAll = true;
        }
        angular.forEach($scope.Mandatoryfields, function (fields) {
            fields.selected = $scope.Mandatoryfields_selectedAll;
        });
    };

    //check/uncheck record checkbox and 'selectall' checkbox
    $scope.Mandatoryfields_UnCheckMain = function () {
        $scope.Mandatoryfields_selectedAll = true;
        if ((filterFilter($scope.Mandatoryfields, { selected: false })).length) {
            $scope.Mandatoryfields_selectedAll = false;
        }
        if ((filterFilter($scope.Mandatoryfields, { selected: false })).length > 1) {
            $scope.Mandatoryfields_selectedAll = false;
        }
    };

    //Deactivate selected/all sponsors
    $scope.Mandatoryfields_remove = function () {
        var len = $scope.Mandatoryfields.length;
        for (var i = len - 1; i >= 0; i--) {
            if ($scope.Mandatoryfields[i].selected) {
                $index = $scope.Mandatoryfields.indexOf($scope.Mandatoryfields[i]);
                $scope.Mandatoryfields.splice($index, 1);
            }
        }
        $scope.Mandatoryfields_selectedAll = false;
    };

    $scope.addMandatoryfields = function () {
        $scope.fields = {};
        $(".commontext").removeClass('has-error');
    };

    $scope.submitMandatoryfields = function () {
        $scope.EventDetails.Mandatoryfields.push($scope.fields);
        $('#Mandatoryfields-Add-Modal').modal('hide');
        $(".commontext").removeClass('has-error');
    }

    $scope.resetMandatoryfields = function () {
        $scope.fields = {};
        $(".commontext").removeClass('has-error');
        $('#Mandatoryfields-Add-Modal').modal('hide');
    }


    //Enable/Disable Delete Button on Checkbox Checked
    $scope.RegulatedInstitutions_disableDelete = function () {
        var result = filterFilter($scope.RegulatedInstitutions, { selected: true });
        if (result && result.length >= 1) {
            $('.institutionsdelete').addClass('checked');
            return false;
        } else {
            $('.institutionsdelete').removeClass('checked');
            return true;
        }
    };

    //check/uncheck 'SelectAll' Checkbox
    $scope.RegulatedInstitutions_checkAll = function () {
        if (!$scope.RegulatedInstitutions_selectedAll) {
            $scope.RegulatedInstitutions_selectedAll = false;
        } else {
            $scope.RegulatedInstitutions_selectedAll = true;
        }
        angular.forEach($scope.RegulatedInstitutions, function (Institutions) {
            Institutions.selected = $scope.RegulatedInstitutions_selectedAll;
        });
    };

    //check/uncheck record checkbox and 'selectall' checkbox
    $scope.RegulatedInstitutions_UnCheckMain = function () {
        $scope.RegulatedInstitutions_selectedAll = true;
        if ((filterFilter($scope.RegulatedInstitutions, { selected: false })).length) {
            $scope.RegulatedInstitutions_selectedAll = false;
        }
        if ((filterFilter($scope.RegulatedInstitutions, { selected: false })).length > 1) {
            $scope.RegulatedInstitutions_selectedAll = false;
        }
    };

    //Deactivate selected/all sponsors
    $scope.RegulatedInstitutions_remove = function () {
        var len = $scope.RegulatedInstitutions.length;
        for (var i = len - 1; i >= 0; i--) {
            if ($scope.RegulatedInstitutions[i].selected) {
                $index = $scope.RegulatedInstitutions.indexOf($scope.RegulatedInstitutions[i]);
                $scope.RegulatedInstitutions.splice($index, 1);
            }
        }
        $scope.RegulatedInstitutions_selectedAll = false;
    };

    $scope.addInstitutions = function () {
        $scope.Institutions = {};
          $(".commontext").removeClass('has-error');
    };

    $scope.submitInstitutions = function () {
        $scope.EventDetails.RegulatedInstitutions.push($scope.Institutions);
        $('#Institution-Add-Modal').modal('hide');
        $(".commontext").removeClass('has-error');

    }

    $scope.resetInstitutions = function () {
        $scope.Institutions = {};
        $('#Institution-Add-Modal').modal('hide');
        $(".commontext").removeClass('has-error');
    }

    $scope.addCategoryprice = function () {
        $scope.PriceDetail = {};
        $(".commontext").removeClass('has-error');
    };
    $scope.addEventCategoryprice = function () {
        $scope.EventPriceDetail = {};
        $(".commontext").removeClass('has-error');
    };
    $scope.submitCategoryprice = function () {
        $scope.PriceDetail.ActivationDate = new Date();
        $scope.TPDetails.tabledata.push($scope.PriceDetail);
        $('#categoryPrice-Add-Modal').modal('hide');
        $(".commontext").removeClass('has-error');
    }

    $scope.resetCategoryprice = function () {
        $scope.PriceDetail = {};
        $('#categoryPrice-Add-Modal').modal('hide');
        $(".commontext").removeClass('has-error');
    }

    $scope.addSponsors = function () {
        $scope.Sponsor = {};
        $(".commontext").removeClass('has-error');
    };

    //Required field validation
    $scope.saveMandatoryfield = function () {
        $scope.$broadcast('show-errors-check-validity');
    };
    $scope.saveInstitution = function () {
        $scope.$broadcast('show-errors-check-validity');
    };
    $scope.saveCategoryPrice = function () {
        $scope.$broadcast('show-errors-check-validity');
    };
    $scope.saveAddSponsors = function () {
        $scope.$broadcast('show-errors-check-validity');
    };
    $scope.submitSponsors = function () {
        //$id = $scope.generateId();
        $scope.SponsorsName.tabledata.push($scope.Sponsor);
        $('#Sponsors-add-modal').modal('hide');
        $(".commontext").removeClass('has-error');
    }

    $scope.resetSponsors = function () {
        $scope.Sponsor = {};
        $('#Sponsors-add-modal').modal('hide');
        $(".commontext").removeClass('has-error');
    }

    //Current Crum update from Bread Crum Service
    $scope.crum = BreadCrum;

    //Initiat Date picker on document ready
    angular.element(document).ready(function () {
        initDatePicker();
    });
    //Required field validation
    $scope.save = function () {
        $scope.$broadcast('show-errors-check-validity');
       
    };

    $scope.checkDateValidation = function (startDate, endDate) {
        startDate = $("#startDate").val();
        endDate = $("#endDate").val();
        eventDate = $("#eventDate").val();
        $scope.errMessage = '';

        var curDate = new Date();
        var day = ("0" + curDate.getDate()).slice(-2);
        var month = ("0" + (curDate.getMonth() + 1)).slice(-2);

        var today = curDate.getFullYear() + "/" + (month) + "/" + (day);

        if ((new Date(eventDate) < new Date(startDate)) || (new Date(startDate) < new Date(today))) {
            // $("#endDate").prop('disabled', true);
            $scope.errMessage = '.Start should be less than event date and not less than current date';

        }

        if (new Date(endDate) < new Date(today))
        {
            $scope.errMessageEndDate = 'End date should not less than current date';
        }
        if ((new Date(eventDate) > new Date(startDate)) && (new Date(startDate) > new Date(today) || new Date(startDate) == new Date(today))) {
           
            $scope.errMessage = '';

        }

        if ((new Date(endDate) < new Date(startDate)) || (new Date(endDate) > new Date(eventDate))) {
            $scope.errMessagedDate = '.End Date should be greater than start date';
        }
        else
        {
            $scope.errMessagedDate = "";
            return true;
}
    };

    //Check current event date
    $scope.checkEventDateValidation = function (eventDate) {
        eventDate = $("#eventDate").val();
        $scope.errMessage = '';
        var curDate = new Date();
        var day = ("0" + curDate.getDate()).slice(-2);
        var month = ("0" + (curDate.getMonth() + 1)).slice(-2);
        var hours = curDate.getHours();
        var minutes = curDate.getMinutes();
       
      

        var today =(hours) + ":" + (minutes) + " " + curDate.getFullYear() + "-" + (month) + "-" + (day);
  
        if (new Date(eventDate) < new Date(today)) {
            $scope.errEventMessage = '.Event date should not be before today';
            return false;
        }
        else {
            $scope.errEventMessage = '';
            return true;
        }
    };

    //Price Validation
    $scope.priceValidation = function ($event) {
        if ($event.keyCode > 57 || $event.keyCode < 45) {
            $event.preventDefault();
        }
    };

    $scope.eventDetailslInformation = true;
    $scope.defineBlocklInformation = false;
    $scope.seatblockFormDetails = false;
    $scope.editEventDetailsInfo = false;

    $scope.eventDetails = function () {

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
        $location.path('/eventmanage/events/defineblocks');

    };



    $scope.defineSeat = function () {

        $scope.blockData = '';
        $scope.eventDetailslInformation = false;
        $scope.defineBlocklInformation = false;
        $scope.seatblockFormDetails = true;
        $(".commontext").removeClass('has-error');
    };
    $scope.defineBlockDetails = function () {

        $scope.blockData = '';
        $scope.eventDetailslInformation = false;
        $scope.defineBlocklInformation = true;
        $scope.seatblockFormDetails = false;
        $scope.editEventDetailsInfo = true;
        $scope.showfooter = false;
        $location.path('/eventmanage/events/defineblocks');
        $(".commontext").removeClass('has-error');

    };

    $(document).on('click', '.drawn-block.saved.is-square-group.selected > rect', function () {
        //  $scope.selectedBlockId = $(".drawn-block.saved.is-square-group.selected > rect").attr("id");
        $scope.defineBlockDetails();
        $scope.$apply();

    });

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
        $(".commontext").removeClass('has-error');
    }

    $scope.checkClubValidation = function () {
        if ($scope.eventDetail.SecondClubselected == $scope.eventDetail.FirstClubselected) {
            
            $scope.errMessageClub = '.1st and 2nd club should be different';
            return false;
        }
        else {
            $scope.errMessageClub = '';
            return true;
        }
}
}]);
