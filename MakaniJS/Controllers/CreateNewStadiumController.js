MakaniPostSaudiApp
     .directive('fdInput', fdInput)
    .directive('flInput', flInput)
    .controller("CreateNewStadiumController", ['$scope', 'Service', 'Constants', 'LocaleConstants','filterFilter', 'BreadCrum', '$localStorage', 'CommonService', '$location', function ($scope, Service, Constants, LocaleConstants, filterFilter, BreadCrum, $localStorage, CommonService, $location) {

        //Locale Contstants
        $scope.CreateNewStadium = LocaleConstants[locale]["CreateNewStadium"];
        $scope.SeatDetails = LocaleConstants[locale]["SeatDetails"];
        $scope.BlockDetails = LocaleConstants[locale]["BlockDetails"];
        $scope.StadiumDetails = LocaleConstants[locale]["StadiumDetails"];
        $scope.GeneralDetails = LocaleConstants[locale]["GeneralDetails"];
        $scope.Location = LocaleConstants[locale]["Location"];
        $scope.Name = LocaleConstants[locale]["Name"];
        $scope.Logo = LocaleConstants[locale]["Logo"];
        $scope.City = LocaleConstants[locale]["City"];
        $scope.Capacity = LocaleConstants[locale]["Capacity"];
        $scope.Add = LocaleConstants[locale]["Add"];
        $scope.Delete = LocaleConstants[locale]["Delete"];
        $scope.DefaultPricing = LocaleConstants[locale]["DefaultPricing"];
        $scope.Pricing = LocaleConstants[locale]["Pricing"];
        $scope.Category = LocaleConstants[locale]["Category"];
        $scope.Defaultpricingdata = LocaleConstants[locale]["Defaultpricingdata"];
        $scope.Edit = LocaleConstants[locale]["Edit"];
        $scope.EditSuitesheader = LocaleConstants[locale]["EditSuites"];
        $scope.Image = LocaleConstants[locale]["Image"];
        $scope.Size = LocaleConstants[locale]["Size"];
        $scope.Seats = LocaleConstants[locale]["Seats"];
        $scope.Price = LocaleConstants[locale]["Price"];
        $scope.Save = LocaleConstants[locale]["Save"];
        $scope.Cancel = LocaleConstants[locale]["Cancel"];
        $scope.Browse = LocaleConstants[locale]["Browse"];
        $scope.EditStadiumDetail = LocaleConstants[locale]["EditStadiumDetail"];
        $scope.AddDefaultPricingSchema = LocaleConstants[locale]["AddDefaultPricingSchema"];
        $scope.EnterName = LocaleConstants[locale]["EnterName"];
        $scope.AddEditSuits = LocaleConstants[locale]["AddEditSuits"];
        $scope.Seats = LocaleConstants[locale]["Seats"];
        $scope.EnterSeats = LocaleConstants[locale]["EnterSeats"];
        $scope.EnterSize = LocaleConstants[locale]["EnterSize"];
        $scope.EnterPrice = LocaleConstants[locale]["EnterPrice"];
        $scope.UploadstadiumImage = LocaleConstants[locale]["UploadstadiumImage"];
        $scope.Latitude = LocaleConstants[locale]["Latitude"];
        $scope.Longitude = LocaleConstants[locale]["Longitude"];
        $scope.LoremIpsum = LocaleConstants[locale]["LoremIpsum"];
        $scope.AddCustomBlocks = LocaleConstants[locale]["AddCustomBlocks"];
        $scope.AddRectangularBlocks = LocaleConstants[locale]["AddRectangularBlocks"];
        $scope.BlockDetails = LocaleConstants[locale]["BlockDetails"];
        $scope.EnterBlockName = LocaleConstants[locale]["EnterBlockName"];
        $scope.NoofSeats = LocaleConstants[locale]["NoofSeats"];
        $scope.Color = LocaleConstants[locale]["Color"];
        $scope.Gate = LocaleConstants[locale]["Gate"];
        $scope.EGateRamp = LocaleConstants[locale]["EGateRamp"];
        $scope.Seatshasdefined = LocaleConstants[locale]["Seatshasdefined"];
        $scope.Classbox = LocaleConstants[locale]["Classbox"];
        $scope.Delete = LocaleConstants[locale]["Delete"];
        $scope.select = LocaleConstants[locale]["Select"];
        $scope.class = LocaleConstants[locale]["class"];
        $scope.Seatnumber = LocaleConstants[locale]["Seatnumber"];
        $scope.Detailsseat = LocaleConstants[locale]["Detailsoftheseat"];
        $scope.Gateway = LocaleConstants[locale]["Gateway"];
        $scope.Cancel = LocaleConstants[locale]["Cancel"];
        $scope.Creatrowscolumns = LocaleConstants[locale]["Creatrowscolumns"];
        $scope.NumberofRows = LocaleConstants[locale]["NumberofRows"];
        $scope.Increasingcolumns = LocaleConstants[locale]["Increasingcolumns"];
        $scope.Increasingrows = LocaleConstants[locale]["Increasingrows"];
        $scope.Top = LocaleConstants[locale]["Top"];
        $scope.Bottom = LocaleConstants[locale]["Bottom"];
        $scope.NumberofColumns = LocaleConstants[locale]["NumberofColumns"];

        $scope.EditSuite = [];
        $scope.DefaultPricingSchema = [];
        $scope.data = [];
        $scope.templatemanageStadium = [];
        $scope.submitFormPosttype;
        $scope.orderByField = 'Name';
        $scope.reverseSort = false;
        $scope.showstadium = false;
        $scope.editstadium = true;
        $scope.SeatSelected = true;
        $localStorage.newBlockInformation = [];
        $scope.currentSeatData = [];
        $scope.selectedBlockDetailsArr = [];   
        //Hide and show for tab views
        $scope.stadiumInformation = true;
        $scope.blockInformation = false;
        $scope.blockFormDetails = false;
        $scope.seatInformation = false;
        $scope.seatInformationfooter = false;
        $scope.myssData = false;
        $scope.activeCustomSeat = false;
        $scope.activeRectSeat = false;
        var firstIndex = null;
        var lastIndex = null;
        $scope.blocksTab = false;
        $scope.blockDetails = [];
        $scope.blockData = [];

        if (CommonService.id && CommonService.id != null) {
            $scope.CreateEditStadium = LocaleConstants[locale]["EditStadiumDetail"];
        } else {
            $scope.CreateEditStadium = LocaleConstants[locale]["CreateNewStadium"];
        }

        //Http Service Get Data
        Service.get(Constants.CreateNewStadium)
        .then(function (response) {
            console.log(response);
            $scope.templatemanageStadium = response.data[0];

            if (CommonService.id && CommonService.id != null) {               
                $scope.Stadium =response.data[0]; // CommonService.UpdatedStadium;
                $scope.stadium = angular.copy(filterFilter($scope.Stadium.Stadiums, { id: CommonService.id })[0]);
                console.log($scope.stadium);
            }
            //$scope.StadiumDetails = $scope.StadiumData;

            $scope.Stadium = $scope.templatemanageStadium.City;
            $scope.DefaultPricingSchema = $scope.templatemanageStadium.DefaultPricingSchemas;
            $scope.EditSuite = $scope.templatemanageStadium.EditSuites;
            $scope.colors = response.data[1];
            $scope.gateNames = response.data[2];
            $scope.gateENames = response.data[3];
            $scope.seatColors = response.data[4];
            $scope.classBox = response.data[5];
            $scope.totalItems = $scope.templatemanageStadium.Stadiums.length;
            $scope.currentPage = 1;
            $scope.numPerPage = 5;

            //Pagination controller
            $scope.paginate = function (value) {
                var begin, end, index;
                begin = ($scope.currentPage - 1) * $scope.numPerPage;
                end = begin + $scope.numPerPage;
                index = $scope.templatemanageStadium.Stadiums.indexOf(value);
                return (begin <= index && index < end);
            };
        });


        //seat page
        $scope.seats = { isDefined: false };
        
        $(document).on('click', '.is-poly-group.selected > polygon', function () {
           
            //debugger;
            if ($('.is-poly-group.selected > polygon').first().attr("is-poly") == "true") {
                var selectedId = $('.is-poly-group.selected > polygon').first().attr("id");
                if ($scope.blockData) {
                    var filteredBlock = angular.copy(filterFilter($scope.blockData, { blockId: selectedId }));
                    if (filteredBlock) {
                        $scope.selectedBlockData = filteredBlock[0];
                    } else {
                        if ($scope.blockData) {
                            $scope.selectedBlockData = '';
                        }
                    };
                }

                     $scope.blockFormInfo();
                $scope.$apply();
            }

        //To disply the block details form

        //$scope.selectedBlockDetailsArr = [];
        //$(document).on('click', '.drawn-block > .is-poly', function () {
        //    $scope.blockFormInfo();
        //    $scope.$apply();
        });


        $(document).on('click', '.is-square-group.selected > rect', function () {
            if ($('.is-square-group.selected > rect').first().attr("is-rect") == "true") {
                var selectedId = $(".is-square-group.selected > rect").first().attr("id");
                if ($scope.blockData) {
                    var filteredBlock = angular.copy(filterFilter($scope.blockData, { blockId: selectedId }));
                    if (filteredBlock) {
                        $scope.selectedBlockData = filteredBlock[0];
                    } else {
                        if ($scope.blockData) {
                            $scope.selectedBlockData = '';
                        }
                    };
                }

                $scope.blockFormInfo();
                $scope.$apply();
            }
        });


        $scope.customForm = function () {
            $scope.blockFormDetails = false;
        }
        $scope.rectForm = function () {

            $scope.blockFormDetails = false;
        }


        $scope.blockFormInfo = function () {
          
            $scope.stadiumInformation = false;
            $scope.blockInformation = true;
            $scope.blockFormDetails = true;
            $scope.seatInformation = false;
        };
        
        $scope.reset = function () {
         
            $(".commontext").removeClass('has-error');          
        };

        $(document).on('click', '.is-seat-real', function (event) {

            if (event.shiftKey) {
                if (firstIndex == null) {
                    firstIndex = this;
                }
                else {

                    lastIndex = this;
                    var lastValue = $(lastIndex).attr("id").replace('seat-', '');
                    var firstValue = $(firstIndex).attr("id").replace('seat-', '');
                    if (parseInt(lastValue) > parseInt(firstValue)) {

                        for (var i = parseInt(firstValue) ; i <= parseInt(lastValue) ; i++) {
                            $("#seat-" + i).addClass("selected");
                        }
                    } else if (parseInt(lastValue) < parseInt(firstValue)) {

                        for (var i = parseInt(lastValue) ; i <= parseInt(firstValue) ; i++) {
                            $("#seat-" + i).addClass("selected");
                        }

                    }

                    firstIndex = null;

                }
                //event.preventDefault();
            }


        });


        $(document).on('click', '.is-seat-real', function () {

            $scope.SeatSelected = false;
            $scope.selectedSeats = [];
           
            var items;
            if (items = $(".is-seat-real.selected")) {
                $.each(items, function (i, j) {
                    $scope.selectedSeats.push({ id: $(j).attr("id"), row: $(j).attr("row"), col: $(j).attr("col"), cx: $(j).attr("cx"), cy: $(j).attr("cy"), r: $(j).attr("r") });
                });
                $scope.$apply();
            }
         
        });

        ////Form Submit
        //$scope.submitForm = function () {

        //    if ($scope.FormPostType == "edit") {
        //        $index = $scope.templatemanageStadium.Stadiums.indexOf(filterFilter($scope.templatemanageStadium.Stadiums, { id: $scope.stadium.id })[0]);
        //        $scope.templatemanageStadium.Stadiums[$index] = angular.copy($scope.stadium);
        //        $("#confirmPopup").modal('show');
        //        $scope.templatemanageStadium.Stadiums.selected = {};
        //        $scope.showstadium = false;
        //        $scope.editstadium = true;
        //    }
        //    else {

        //        $scope.stadium.id = $scope.templatemanageStadium.Stadiums.length + 1;
        //        $scope.templatemanageStadium.Stadiums.push($scope.stadium);
        //        $scope.templatemanageStadium.Stadiums.selected = {};
        //        $scope.showstadium = false;
        //        $scope.editstadium = true;
        //    }

        //    $scope.totalItems = $scope.templatemanageStadium.Stadiums.length;
        //};

        //$scope.submitForm = function () {
        //    if (CommonService.postType && CommonService.postType == 'edit') {
        //        if (CommonService.UpdatedStadium && CommonService.UpdatedStadium != null) {
        //            $index = CommonService.UpdatedStadium.indexOf(filterFilter(CommonService.UpdatedStadium, {
        //                id: $scope.stadium.id
        //            })[0])
        //            CommonService.UpdatedStadium[$index] = angular.copy($scope.stadium);
        //            $scope.CommonServiceScope = CommonService;
        //            $scope.CommonServiceScope.UpdatedStadium = CommonService.UpdatedEvent;
        //        }
        //        else {

        //            $index = $scope.templatemanageStadium.Stadiums.indexOf(filterFilter($scope.templatemanageStadium.Stadiums, {
        //                id: $scope.stadium.id
        //            })[0])
        //            $scope.templatemanageStadium.Stadiums[$index] = angular.copy($scope.stadium);
        //            $scope.CommonServiceScope = CommonService;
        //            $scope.CommonServiceScope.UpdatedStadium = $scope.templatemanageStadium.Stadiums;
        //        }
        //    }
        //    else {
        //        $scope.stadium.id = $scope.generateId();
        //        $scope.templatemanageStadium.Stadiums.push($scope.stadium);
        //        $scope.CommonServiceScope = CommonService;
        //        $scope.CommonServiceScope.UpdatedStadium = $scope.templatemanageStadium.Stadiums;
        //    }
        //};


            //Reset selected records 
            $scope.reset = function () {
            $scope.templatemanageStadium.selected = {
            };
            $scope.showstadium = false;
            $scope.editstadium = true;
        };

            //Enable/Disable Delete Button on Checkbox Checked
            $scope.disableEdit = function () {
            var result = filterFilter($scope.templatemanageStadium.Stadiums, { selected: true });
            if (result && result.length == 1) {
                $('.icon-pencil').addClass('checked');
                return false;
            } else {
                $('.icon-pencil').removeClass('checked');
                return true;
            }
        };

            //check/uncheck record checkbox and 'selectall' checkbox
            $scope.UnCheckMain = function () {
            $scope.selectedAll = true;
            var result = filterFilter($scope.templatemanageStadium.Stadiums, { selected: false });
            if (result && result.length) {
                $scope.selectedAll = false;
            }
            if (result && result.length > 1) {
                $scope.selectedAll = false;
            }
            $scope.disableEdit();
        };

            //check/uncheck 'SelectAll' Checkbox
            $scope.checkAll = function () {
            if (!$scope.selectedAll) {
                $scope.selectedAll = false;

            } else {
                $scope.selectedAll = true;
            }
            angular.forEach($scope.templatemanageStadium.Stadiums, function (stadium) {
                stadium.selected = $scope.selectedAll;
            });
        };

            //Add and Edit of stadium details in template managment 
            //Edit Suites Handler
            $scope.submitEditSuites = function () {
                if ($scope.FormPostType == "edit") {
                    $index = $scope.EditSuite.indexOf(filterFilter($scope.EditSuite, { id: $scope.editSuite.id })[0])
                    $scope.EditSuite[$index] = angular.copy($scope.editSuite);
                    $('#Add-EditSuites-Modal').modal('hide');
                    //$(".commontext").removeClass('has-error');
                }
                else {
                    $scope.editSuite.id = $scope.generateId();
                    $scope.EditSuite.push($scope.editSuite);
                    $('#Add-EditSuites-Modal').modal('hide');
                    //$(".commontext").removeClass('has-error');
                }                
            };

            //Default Pricing Form submit
            $scope.submitDefaultPricing = function ($PricingSchema) {

            var addCategory = true;
            var PriceSchema = $("#txtPriceSchema").val();
            var PriceSchemaselect = $("#ddlSelect option:selected").val();

            if (PriceSchema == "" || PriceSchemaselect == "") {

                if (PriceSchema == "") {
                    $('#txtPriceSchema').addClass('has-errormessge');

            }
                if (PriceSchemaselect == "") {
                    $('#ddlSelect').addClass('has-errormessge');
            }

            }
            else if (PriceSchema != "" || PriceSchemaselect != " ") {
                $('#txtPriceSchema').removeClass('has-errormessge');
                $('#ddlSelect').removeClass('has-errormessge');
                $('#ancherAdd').removeClass('anchordisabled');
                for (var i = 0; i < $scope.DefaultPricingSchema.length - 1; i++) {
                    if ($scope.DefaultPricingSchema[i].selectedCategory === $PricingSchema.selectedCategory) {
                        addCategory = false;
                }
            }

                if (addCategory) {
                    $PricingSchema.id = $scope.generateId();
                    $PricingSchema.isNew = false;
                    $scope.errorMessage = "";
                }
                else {

                    $scope.errorMessage = LocaleConstants[locale]["categoryErrorMessage"];
                    $('#ancherAdd').addClass('anchordisabled');
            }
            }
        };


        $(document).on('click', '#ancherAdd', function () {
            $('#ancherAdd').addClass('anchordisabled');
        });

        $scope.addPricingSchema = function () {
            $scope.DefaultPricingSchema.push({
                Defaultpricingdata: "",
                selected: false,
                isNew: true
        });
            $scope.errorMessage = "";
        };

        $scope.cancelDefaultPricing = function ($PricingSchema) {
            $index = $scope.DefaultPricingSchema.indexOf($PricingSchema);
            $scope.DefaultPricingSchema.splice($index, 1);
            $scope.errorMessage = "";
            $('#ancherAdd').removeClass('anchordisabled');
        };

            //Deactivate selected/all PricingSchemas
            $scope.removePricingSchemas = function () {
            var len = $scope.DefaultPricingSchema.length;
            for (var i = len - 1; i >= 0; i--) {
                if ($scope.DefaultPricingSchema[i].selected) {
                    $index = $scope.DefaultPricingSchema.indexOf($scope.DefaultPricingSchema[i]);
                    $scope.DefaultPricingSchema.splice($index, 1);
            }
            }
            $scope.DefaultPricingselectedAll = false;
        };

            //Take a copy of record to edit in model pop-up 
            $scope.editEditSuite = function (postType) {
            $scope.AddEditSuitesheader = LocaleConstants[locale]["EditSuitesEdit"];
            $scope.FormPostType = postType;
            $scope.editSuite = angular.copy(filterFilter($scope.EditSuite, { selected: true })[0]);
        };

            //Take a copy of record to edit in model pop-up 
            $scope.resetEditSuite = function () {
            $scope.EditSuite.selected = {};
            $(".commontext").removeClass('has-error');
        };

            //Enable/Disable Edit Button on Checkbox Checked
            $scope.create_stadium_disableEdit = function () {
            var result = filterFilter($scope.EditSuite, { selected: true });
            if (result && result.length == 1) {
                $('.icon-pencil').addClass('checked');
                $('.icon-pencil').removeClass('anchordisabled');
                //$(".commontext").removeClass('has-error');
                return false;

            } else {
                $('.icon-pencil').removeClass('checked');
                $('.icon-pencil').addClass('anchordisabled');
                $('.ui-icon-pencil').removeClass('anchordisabled');
                //$(".commontext").removeClass('has-error');
                return true;
            }
        };

            //Enable/Disable edit button on checkbox Change 
            $scope.edit_siute_UnCheckMain = function () {
            $scope.editsiuteselectedAll = true;

            var result = filterFilter($scope.EditSuite, { selected: false });
            if (result && result.length) {
                $scope.editsiuteselectedAll = false;
            }
            if (result && result.length > 1) {
                $scope.editsiuteselectedAll = false;
            }
            $scope.create_stadium_disableEdit();
        };


            //Enable/Disable Delete Button on Checkbox Checked
            $scope.create_stadium_disableDelete = function () {
            var result = filterFilter($scope.DefaultPricingSchema, { selected: true });
            if (result && result.length >= 1) {
                $('.deleteicon').addClass('checked');
                return false;
            } else {
                $('.deleteicon').removeClass('checked');
                return true;
            }
        };

            //check/uncheck record checkbox and 'selectall' checkbox
            $scope.create_stadium_UnCheckMain = function () {
            $scope.DefaultPricingselectedAll = true;

            var result = filterFilter($scope.DefaultPricingSchema, { selected: false });
            if (result && result.length) {
                $scope.DefaultPricingselectedAll = false;
            }
            if (result && result.length > 1) {
                $scope.DefaultPricingselectedAll = false;
            }
            $scope.disableEdit();
        };

            //check/uncheck 'SelectAll' Checkbox
            $scope.create_stadium_checkAll = function () {
            if (!$scope.DefaultPricingselectedAll) {
                $scope.DefaultPricingselectedAll = false;

            } else {
                $scope.DefaultPricingselectedAll = true;
            }
            angular.forEach($scope.DefaultPricingSchema, function (PricingSchema) {
                PricingSchema.selected = $scope.DefaultPricingselectedAll;
            });
        };

            //Add new record using model pop-up 
            $scope.addsuites = function (postType) {
            $scope.AddEditSuitesheader = LocaleConstants[locale]["EditSuitesAdd"];
            $scope.FormPostType = postType;
            $scope.editSuite = {};
            //$(".commontext").removeClass('has-error');
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

            //show respective Sadium detail on Gate and EGate dropdown Selection 
            $scope.showval = false;
            $scope.selectedGate = false;
            $scope.selectedEGate = false;
            $scope.isShowHide = function () {
            if ($scope.selectedGate) {
                $scope.showval = true;
            } else if ($scope.selectedEGate) {
                $scope.showval = true;
            } else {
                $scope.showval = false;
            }
        };

        $scope.stadiumInfo = function () {
            $localStorage.copyStadiumdata = $localStorage.myStadiumDetails;
            $scope.stadiumInformation = true;
            $scope.blockInformation = false;
            $scope.blockFormDetails = false;
            $scope.seatInformation = false;
            $("#stadiumDetails").addClass("active").siblings().removeClass("active");
            $("#blockDetails a").removeClass("in-active");


        };


        $scope.blockInfo = function () {
            $scope.blockInformation = true;
            $scope.blockFormDetails = false;
            $scope.stadiumInformation = false;
            $scope.seatInformation = false;
            $("#seatDetails a").removeClass("in-active");
        };



        $scope.seatInfoblank = function () {

            $scope.stadiumInformation = false;
            $scope.blockInformation = false;
            $scope.seatInformation = true;
            $scope.seatInformationfooter = true;
            $('#create-rows-cols').modal('hide');
        };
        $scope.colrowseatInfo = function () {

            //  console.log(defineSeats);
            $('#create-rows-cols').modal('hide');
        }

        $scope.seatInfo = function () {

            $('.icon-pencil').removeClass('anchordisabled');
            console.log($scope.currentSeatData);
            //doEmptySeatSet();
            if ($('.is-square-group.selected > rect').first().attr("is-rect") == "true") {
            $scope.selectedBlockIds = $(".is-square-group.selected > rect").first().attr("id");
            if ($scope.currentSeatData.length > 0) {
                $scope.selectedSeatdata = (filterFilter($scope.currentSeatData, { id: $scope.selectedBlockIds })[0]);

                if ($scope.selectedSeatdata == undefined) {
                    doEmptySeatSet();
                    //  $scope.colrowseatInfo();
                    $scope.stadiumInformation = false;
                    $scope.blockInformation = false;
                    $scope.seatInformation = true;
                    $scope.activeCustomSeat = false;
                    $scope.activeRectSeat = true;
                    $('#create-rows-cols').modal('hide');

                }

           else if ($scope.selectedSeatdata.id == $scope.selectedBlockIds && $scope.selectedSeatdata.selected.length > 0) {

                    $scope.stadiumInformation = false;
                    $scope.blockInformation = false;
                    $scope.seatInformation = true;
                    $scope.activeCustomSeat = false;
                    $scope.activeRectSeat = true;
                    $scope.selectedSeats = $scope.selectedSeatdata.selected;

                    callandpapulateData($scope.currentSeatData, $scope.selectedSeatdata.id);
                    $scope.SeatSelected = false;
                    $('#create-rows-cols').modal('hide');
            }

            }
            else {
                doEmptySeatSet();
                $scope.selectedBlockData.BlockType = "Rect";
                    $scope.stadiumInformation = false;
                    $scope.blockInformation = false;
                    $scope.seatInformation = true;
                    $scope.activeCustomSeat = false;
                    $scope.activeRectSeat = true;
                    $('#create-rows-cols').modal('hide');

            }
                //  GetSeatDataFromAngular($scope.currentSeatData);
        }
            if ($('.is-poly-group.selected > polygon').first().attr("is-poly") == "true") {
                // $scope.activeCustomSeat = true;
                $scope.selectedBlockIds = $('.is-poly-group.selected > polygon').first().attr("id");
                if ($scope.currentSeatData.length > 0) {
                    $scope.selectedSeatdata = (filterFilter($scope.currentSeatData, { id: $scope.selectedBlockIds })[0]);

                    if ($scope.selectedSeatdata == undefined) {
                        doEmptySeatSet();
                        //  $scope.colrowseatInfo();
                        $scope.stadiumInformation = false;
                        $scope.blockInformation = false;
                        $scope.seatInformation = true;
                        $scope.activeCustomSeat = true;
                        $scope.activeRectSeat = false;
                        $('#create-rows-cols').modal('hide');

                    }

                    else if ($scope.selectedSeatdata.id == $scope.selectedBlockIds && $scope.selectedSeatdata.selected.length > 0) {

                        $scope.stadiumInformation = false;
                        $scope.blockInformation = false;
                        $scope.seatInformation = true;
                        $scope.activeCustomSeat = true;
                        $scope.activeRectSeat = false;
                        $scope.selectedSeats = $scope.selectedSeatdata.selected;

                        callandpapulateData($scope.currentSeatData, $scope.selectedSeatdata.id);
                        $scope.SeatSelected = false;
                        $('#create-rows-cols').modal('hide');
                }

                }
                else {
                    doEmptySeatSet();
                    $scope.selectedBlockData.BlockType = "Custom";
                    $scope.stadiumInformation = false;
                    $scope.blockInformation = false;
                    $scope.seatInformation = true;
                    $scope.activeCustomSeat = true;
                    $scope.activeRectSeat = false;
                    $('#create-rows-cols').modal('hide');

            }
                //  GetSeatDataFromAngular($scope.currentSeatData);
        }

        };

            //$scope.defineSeatInfo = function () {

            //    console.log($scope.defineSeats);
            //    $('#create-rows-cols').modal('hide');
            //};

            //To show the block tab after the click on save of stadium info
            $scope.newStadiumInfo = function () {
                //debugger;
                //$scope.myImage = [];
                //$scope.stadium.id = $scope.templatemanageStadium.Stadiums.length + 1;
                //$scope.templatemanageStadium.Stadiums.push($scope.stadium);
                //$localStorage.myImage = $("#boardBgImage").attr("href");
                //$scope.stadiumDetails = angular.merge($scope.stadium, $localStorage.myImage);
                //console.log($scope.stadiumDetails);
                //$("#confirmPopup").modal('show');
                //$scope.blockInfo();
                //$("#blockDetails").removeClass("in-active");
                //$("#blockDetails").addClass("active").siblings().removeClass("active");
                //$("#blockDetails").removeClass("disabled");


                ///temparory code for saving new stadium and edit stadium
                if (CommonService.postType && CommonService.postType == 'edit') {
                    if (CommonService.UpdatedStadium && CommonService.UpdatedStadium != null) {
                        $index = CommonService.UpdatedStadium.indexOf(filterFilter(CommonService.UpdatedStadium, {
                            id: $scope.stadium.id
                        })[0])
                        CommonService.UpdatedStadium[$index] = angular.copy($scope.stadium);
                        $scope.CommonServiceScope = CommonService;
                        $scope.CommonServiceScope.UpdatedStadium = CommonService.UpdatedEvent;
                    }
                    else {

                        $index = $scope.templatemanageStadium.Stadiums.indexOf(filterFilter($scope.templatemanageStadium.Stadiums, {
                            id: $scope.stadium.id
                        })[0])
                        $scope.templatemanageStadium.Stadiums[$index] = angular.copy($scope.stadium);
                        $scope.CommonServiceScope = CommonService;
                        $scope.CommonServiceScope.UpdatedStadium = $scope.templatemanageStadium.Stadiums;
                    }
                }
                else {
                    $scope.stadium.id = $scope.generateId();
                    $scope.templatemanageStadium.Stadiums.push($scope.stadium);
                    $scope.CommonServiceScope = CommonService;
                    $scope.CommonServiceScope.UpdatedStadium = $scope.templatemanageStadium.Stadiums;
                }
                //end submitform


                //Written By Kiran Ganta As per new requirment
                //----------------------------------------------
            $scope.stadium.thisFileName = $(".board-bg-image").attr("id"); //added newly
            $scope.stadium.thisXpos = $(".board-bg-image").attr("x"); //added newly
            $scope.stadium.thisYpos = $(".board-bg-image").attr("y"); //added newly
            $scope.stadium.thisWidth = $(".board-bg-image").attr("width"); //added newly
            $scope.stadium.thisHeight = $(".board-bg-image").attr("height"); //added newly

            $scope.stadium.id = $scope.templatemanageStadium.Stadiums.length + 1;
            $scope.templatemanageStadium.Stadiums.push($scope.stadium);
            $localStorage.myImage = $(".board-bg-image").attr("href");

            $scope.stadiumDetails = angular.merge($scope.stadium, $localStorage.myImage);
            $("#confirmPopup").modal('show');
            $scope.blockInfo();
            $("#blockDetails").removeClass("in-active");
            $("#blockDetails").addClass("active").siblings().removeClass("active");
            $("#blockDetails").removeClass("disabled");


        };



            //Required field validation
            var stadiumImageValue;
            $scope.save = function () {
            var value = $("#filename").val();
            stadiumImageValue = $("#filestadiumImage").val();
            if (value == "") {
                $('#filename').addClass('has-errormessge');
            }
            if (stadiumImageValue == "") {
                $('#filestadiumImage').addClass('has-errormessge');
            }
            $scope.$broadcast('show-errors-check-validity');


        };

        $("#fileLogo").on('change', function () {
            $('#filename').removeClass('has-errormessge');
        });
        $("#chooseStadiumPic").on('change', function () {
            $('#filestadiumImage').removeClass('has-errormessge');
        });

        $scope.PricingSchemaValidation = function () {
            $scope.$broadcast('show-errors-check-validity');
        };
        $scope.EditSuites = function () {
            $scope.$broadcast('show-errors-check-validity');
        };
        $scope.saveNewStadium = function () {
            $scope.$broadcast('show-errors-check-validity');
        };

            //To show the seat tab after the click on save of block info
            $scope.newBlockInfo = function () {
            if ($('.is-square-group.selected > rect').first().attr("is-rect") == "true") {
                $scope.blockFormDetails = false;
                var selectedBlock = $(".is-square-group.selected > rect");
                var blockId = selectedBlock.attr('id');
                var blockW = selectedBlock.attr('width');
                var blockH = selectedBlock.attr('height');
                var axisX = selectedBlock.attr('x');
                var axisY = selectedBlock.attr('y');

                if ($scope.blockData) {

                    var filteredBlock = angular.copy(filterFilter($scope.blockData, { blockId: blockId }));
                    if (filteredBlock.length > 0) {
                        $index = $scope.blockData.indexOf(filterFilter($scope.blockData, { blockId: blockId })[0]);
                        $scope.selectedBlockData.blockW = blockW;
                        $scope.selectedBlockData.blockH = blockH;
                        $scope.selectedBlockData.axisX = axisX;
                        $scope.selectedBlockData.axisY = axisY;
                        $scope.blockData[$index] = angular.copy($scope.selectedBlockData);
                    } else {
                        $scope.selectedBlockData.BlockType = "Rect";
                        $scope.selectedBlockData.blockId = blockId;
                        $scope.selectedBlockData.blockW = blockW;
                        $scope.selectedBlockData.blockH = blockH;
                        $scope.selectedBlockData.axisX = axisX;
                        $scope.selectedBlockData.axisY = axisY;
                        $scope.blockData.push($scope.selectedBlockData);
                        console.log($scope.blockData);
                        GetDataFromAngular($scope.blockData);
                        //$scope.getDataFromBlock($scope.blockData);
                };
            }
            }

                //for custom blcok information and coordinates
            if ($('.is-poly-group.selected > polygon').first().attr("is-poly") == "true") {


                $scope.blockFormDetails = false;
                var selectedBlock = $('.is-poly-group.selected > polygon');
                var blockId = selectedBlock.attr('id');
                var blockPoints = selectedBlock.attr('points');


                if ($scope.blockData) {

                    var filteredBlock = angular.copy(filterFilter($scope.blockData, { blockId: blockId }));
                    if (filteredBlock.length > 0) {
                        $index = $scope.blockData.indexOf(filterFilter($scope.blockData, { blockId: blockId })[0]);
                        $scope.selectedBlockData.blockPoints = blockPoints;
                        $scope.blockData[$index] = angular.copy($scope.selectedBlockData);
                    } else {
                        $scope.selectedBlockData.BlockType = "Custom";
                        $scope.selectedBlockData.blockId = blockId;
                        $scope.selectedBlockData.blockPoints = blockPoints;
                        $scope.blockData.push($scope.selectedBlockData);
                        console.log($scope.blockData);
                        //GetDataFromAngular($scope.blockData);
                        GetCustomBlockDataFromAngular($scope.blockData);
                        //$scope.getDataFromBlock($scope.blockData);
                };
            }
            }

            $scope.blockInfo();
            $("#seatDetails a").removeClass("in-active");
            $("#seatDetails").addClass("active").siblings().removeClass("active");
            $("#seatDetails").removeClass("disabled");


        };


            //To Selected Block Remove
            $scope.blockRemove = function () {
            alert("block delete");
            var selectedId = $(".is-square-group.selected > rect").first().attr("id");
            if ($scope.blockData) {
                var filteredBlock = (filterFilter($scope.blockData, { blockId: selectedId }));
                if (filteredBlock[0].blockId == selectedId) {
                    //$scope.blockData.remove();
                    $index = $scope.blockData.indexOf(filterFilter($scope.blockData, { id: filteredBlock[0].blockId })[0])
                    $scope.blockData.splice($index, 1);
                   $('.drawn-block.selected').remove();

                } else {
                    if ($scope.blockData) {
                        $scope.selectedBlockData = '';
                }
            };
            }



                //$scope.checkexist = (filterFilter($scope.currentSeatData, { id: $scope.selectedBlockIds }))
                //if ($scope.checkexist.length > 0) {

                //    if ($scope.checkexist[0].id == $scope.selectedBlockIds) {

                //        $index = $scope.currentSeatData.indexOf(filterFilter($scope.currentSeatData, { id: $scope.checkexist[0].id })[0])
                //        // $scope.currentSeatData[$index] = angular.splice({ id: $scope.selectedBlockIds, selected: $scope.selectedSeats, unselected: $scope.unSselectedSeats, rowColPos: $scope.defineSeats });
                //        $scope.currentSeatData.splice($index, 1);
                //        $scope.selectedSeats = '';
                //        $scope.SeatSelected = true;
                //        $scope.blockInfo();
                //        $("#blockDetails").addClass("active").siblings().removeClass("active");
                //        console.log($scope.currentSeatData);
            console.log($scope.blockData);


                //$('.drawn-block.selected').remove();
        };


            //To Selected Block Cancel
            $scope.newblockCancel = function () {
            alert('block cancel');
            $('.drawn-block.selected').remove();
            $scope.blockFormDetails = false;
        };



            //seats save
            $scope.unSselectedSeats = [];

        var itemsClassVal;
        $scope.selectedSeatDetails = function () {

            debugger;
            console.log($scope.currentSeatData);
            if (itemsClassVal = $('.is-seat-real.un-selected')) {
                $scope.unSselectedSeats = [];
                $.each(itemsClassVal, function (i, j) {
                    $scope.unSselectedSeats.push({ id: $(j).attr("id"), row: $(j).attr("row"), col: $(j).attr("col"), cx: $(j).attr("cx"), cy: $(j).attr("cy"), r: $(j).attr("r") });
                });

        };
            if ($('.is-square-group.selected > rect').first().attr("is-rect") == "true") {
            $scope.selectedBlockIds = $(".is-square-group.selected > rect").first().attr("id");
            $scope.checkexist = (filterFilter($scope.currentSeatData, { id: $scope.selectedBlockIds }))
            if ($scope.checkexist.length > 0) {

                    if ($scope.checkexist[0].id == $scope.selectedBlockIds) {

                        $index = $scope.currentSeatData.indexOf(filterFilter($scope.currentSeatData, { id: $scope.checkexist[0].id })[0]);
                        $scope.currentSeatData[$index] = angular.copy({ id: $scope.selectedBlockIds, selected: $scope.selectedSeats, unselected: $scope.unSselectedSeats, rowColPos: $scope.defineSeats, selectedgateandSeatColor: $scope.seatdata });
            }

            }
            else {
                // $scope.currentSeatData = [];
                $scope.currentSeatData.push({ id: $scope.selectedBlockIds, selected: $scope.selectedSeats, unselected: $scope.unSselectedSeats, rowColPos: $scope.defineSeats, selectedgateandSeatColor: $scope.seatdata });

                $scope.defineSeats = [];
                //  GetSeatDataFromAngular($scope.currentSeatData);
            }
        }


            if ($('.is-poly-group.selected > polygon').first().attr("is-poly") == "true") {
                $scope.selectedBlockIds = $('.is-poly-group.selected > polygon').first().attr("id");
                $scope.checkexist = (filterFilter($scope.currentSeatData, { id: $scope.selectedBlockIds }))
                if ($scope.checkexist.length > 0) {

                    if ($scope.checkexist[0].id == $scope.selectedBlockIds) {

                        $index = $scope.currentSeatData.indexOf(filterFilter($scope.currentSeatData, { id: $scope.checkexist[0].id })[0]);
                        $scope.currentSeatData[$index] = angular.copy({ id: $scope.selectedBlockIds, selected: $scope.selectedSeats, unselected: $scope.unSselectedSeats, rowColPos: $scope.defineSeats, selectedgateandSeatColor: $scope.seatdata });

                }

                }
                else {
                    // $scope.currentSeatData = [];
                    $scope.currentSeatData.push({ id: $scope.selectedBlockIds, selected: $scope.selectedSeats, unselected: $scope.unSselectedSeats, rowColPos: $scope.defineSeats, selectedgateandSeatColor: $scope.seatdata });

                    $scope.defineSeats = [];
                    //  GetSeatDataFromAngular($scope.currentSeatData);
            }
        }

            console.log($scope.currentSeatData);

            //// GetSeatDataFromAngular($scope.currentSeatData);
            //  if ($scope.currentSeatData.length > 0) {
            //      //GetSeatDataFromAngular($scope.currentSeatData);
            //      console.log();
            //  }
            $scope.SeatSelected = true;
            $scope.blockInfo();
            $("#blockDetails").addClass("active").siblings().removeClass("active");
        };



            //delete seatInformation

            $scope.deleteSeatsInfo = function () {
            alert("delete seat info");

                //$scope.selectedSeats = '';
                //$scope.currentSeatData = '';    
            $scope.selectedBlockIds = $(".is-square-group.selected > rect").first().attr("id");
            $scope.checkexist = (filterFilter($scope.currentSeatData, { id: $scope.selectedBlockIds }))
            if ($scope.checkexist.length > 0) {

                if ($scope.checkexist[0].id == $scope.selectedBlockIds) {

                    $index = $scope.currentSeatData.indexOf(filterFilter($scope.currentSeatData, { id: $scope.checkexist[0].id })[0])
                    // $scope.currentSeatData[$index] = angular.splice({ id: $scope.selectedBlockIds, selected: $scope.selectedSeats, unselected: $scope.unSselectedSeats, rowColPos: $scope.defineSeats });
                    $scope.currentSeatData.splice($index, 1);
                    $scope.selectedSeats = '';
                    $scope.SeatSelected = true;
                    $scope.blockInfo();
                    $("#blockDetails").addClass("active").siblings().removeClass("active");
                    console.log($scope.currentSeatData);
                    //$scope.$apply();
                    //$scope.selectedSeats = '';

            }

            }
        };

            //console.log($localStorage.newBlockInformation[1][0][0].attr(''));
            $scope.init = function () {
            var url = $location.path().split("/");
            if (url[1]) {
                var elem = $('.navbar-right li').not(".brand-name").has('[href*=' + url[1] + ']');
                if (elem) {
                    if (elem[0]) {
                        angular.element(elem[0].childNodes[0]).triggerHandler('click');
                }
            }
            }
        }

            //Document Ready Event
            angular.element(document).ready(function () {
                $scope.init();
        });

            //show dropdown value as a text in club grid  
            $scope.showPricingSchema = function (PricingSchema) {
            var selected = [];
            if (PricingSchema.selectedCategory) {
                selected = filterFilter($scope.templatemanageStadium.DefaultPricingSchemacategories, { id: PricingSchema.selectedCategory });
            }
            return selected.length ? selected[0].name : '';
        };
    }]);
