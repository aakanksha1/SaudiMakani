MakaniPostSaudiApp.controller("TemplatemanagementController", ['$scope', 'filterFilter', 'Service', 'Constants', 'LocaleConstants', 'BreadCrum', '$localStorage', 'CommonService', '$location', function ($scope, filterFilter, Service, Constants, LocaleConstants, BreadCrum, $localStorage, CommonService, $location) {
    $scope.session = {};

    $scope.newStadiumInfo = function () {

    };
    //Locale Constants
    $scope.Create = LocaleConstants[locale]["Create"];
    $scope.EditEvent = LocaleConstants[locale]["EditEvent"];
    $scope.EditStadium = LocaleConstants[locale]["EditStadium"];
    $scope.Stadiums = LocaleConstants[locale]["Stadiums"];
    $scope.Save = LocaleConstants[locale]["Save"];
    $scope.Cancel = LocaleConstants[locale]["Cancel"];
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
    $scope.EditSuites = LocaleConstants[locale]["EditSuites"];
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
    $scope.Delete = LocaleConstants[locale]["Delete"];
    $scope.select = LocaleConstants[locale]["Select"];


    $scope.EditSuite = [];
    $scope.DefaultPricingSchema = [];
    $scope.data = [];
    $scope.templatemanageStadium = [];
    $scope.submitFormPosttype;
    $scope.orderByField = 'Name';
    $scope.reverseSort = false;
    $scope.showstadium = false;
    $scope.editstadium = true;
     
    //Http Service Get Data 
    Service.get(Constants.CreateNewStadium)
    .then(function (response) {
        //console.log(response);
        $scope.templatemanageStadium = response.data[0];
        $scope.templatemanageStadium = $scope.templatemanageStadium;
        $scope.Stadium = $scope.templatemanageStadium.City;
        $scope.DefaultPricingSchema = $scope.templatemanageStadium.DefaultPricingSchemas; 
        $scope.EditSuite = $scope.templatemanageStadium.EditSuites;
        $scope.colors = response.data[1];
        $scope.gateNames = response.data[2];
        $scope.gateENames = response.data[3];
        $scope.totalItems = $scope.templatemanageStadium.Stadiums.length;
        $scope.currentPage = 1;
        $scope.numPerPage = 5;

        if (CommonService.UpdatedStadium) {
           
            $scope.templatemanageStadium.Stadiums = CommonService.UpdatedStadium;
        }
        else {
            
            $scope.templatemanageStadium.Stadiums = $scope.templatemanageStadium.Stadiums;
        }
      
        //Pagination controller
        $scope.paginate = function (value) {     
            $scope.begin = ($scope.currentPage - 1) * $scope.numPerPage;
            $scope.end = $scope.begin + $scope.numPerPage;
            index = $scope.templatemanageStadium.Stadiums.indexOf(value);
            return ($scope.begin <= index && index < $scope.end);
        };
    });
    //Take a copy of record to edit in model pop-up 
    $scope.editStadiums = function (postType) {
        $scope.commonServiceScope = CommonService;
        $scope.stadiumDetail = angular.copy(filterFilter($scope.templatemanageStadium.Stadiums, { selected: true })[0]);
        $scope.commonServiceScope.id = $scope.stadiumDetail.id;
        $scope.commonServiceScope.postType = postType;
        $location.path('/templatemanage/Stadiums/CreateNewStadium');
    };

    //To Create New Stadium
    $scope.createnewstadium = function (postType) {
        $scope.Stadium = CommonService;
        $scope.Stadium.id = null;      
        $location.path('/templatemanage/Stadiums/CreateNewStadium');
    }

    //show dropdown value as a text in club grid  
    $scope.showStadiumCity = function (stadium) {
        var selected = [];
        if (stadium.City) {
            selected = filterFilter($scope.templatemanageStadium.City, { key: stadium.City });
        }
        return selected.length ? selected[0].value : '';
    };

    //Reset selected records 
    $scope.reset = function () {
        $scope.templatemanageStadium.selected = {};
        $scope.showstadium = false;
        $scope.editstadium = true;
    };

    //Enable/Disable Delete Button on Checkbox Checked
    $scope.disableEdit = function () {
        var result = 0;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.templatemanageStadium.Stadiums[i] && $scope.templatemanageStadium.Stadiums[i].selected) {
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



    //check/uncheck record checkbox and 'selectall' checkbox
    $scope.UnCheckMain = function () {
        var result = 0;
        var items = 0;
        for (var i = $scope.end - 1; i >= $scope.begin; i--) {
            if ($scope.templatemanageStadium.Stadiums[i]) {
                var items = items + 1;
                if ($scope.templatemanageStadium.Stadiums[i].selected) {
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

    //check/uncheck 'SelectAll' Checkbox
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }

        for (var i = $scope.begin; i < $scope.end; i++) {
            $index = $scope.templatemanageStadium.Stadiums.indexOf($scope.templatemanageStadium.Stadiums[i]);
            $scope.templatemanageStadium.Stadiums[$index].selected = $scope.selectedAll;
        }
    };
   
    //Add new record using model pop-up 
    $scope.addsuites = function (postType) {
        $scope.FormPostType = postType;
        $scope.editSuite = {};
    };

    //Current Crum update from Bread Crum Service
    $scope.crum = BreadCrum;

  

}]);