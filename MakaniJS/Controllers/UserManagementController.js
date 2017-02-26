MakaniPostSaudiApp.controller("UserManagementController", ['$scope', 'filterFilter', 'Service', 'Constants', 'BreadCrum', 'LocaleConstants', function ($scope, filterFilter, Service, Constants, BreadCrum, LocaleConstants) {

    $scope.ticketsheader = LocaleConstants[locale]["Tickets"];
    $scope.seasonheader = LocaleConstants[locale]["Seasons"];
    $scope.competitionheader = LocaleConstants[locale]["Competitions"];
    $scope.eventheader = LocaleConstants[locale]["Event"];
    $scope.caseheader = LocaleConstants[locale]["Case"];
    $scope.paymentmethodheader = LocaleConstants[locale]["PaymentMethod"];
    $scope.paymentdateheader = LocaleConstants[locale]["PaymentDate"];
    $scope.totalamountheader = LocaleConstants[locale]["TotalAmount"];
    $scope.applicationnumberheader = LocaleConstants[locale]["ApplicationNumber"];
    $scope.purchasedateheader = LocaleConstants[locale]["PurchaseDate"];
    $scope.invoicenumberheader = LocaleConstants[locale]["InvoiceNumber"];
    $scope.Selectmethodheader = LocaleConstants[locale]["Selectmethod"];
    $scope.SearchCustomerInformation = LocaleConstants[locale]["SearchCustomerInformation"];
    $scope.Email = LocaleConstants[locale]["Email"];
    $scope.MobileNumber = LocaleConstants[locale]["MobileNumber"];
    $scope.IdentityNumber = LocaleConstants[locale]["IdentityNumber"];
    $scope.StartDate = LocaleConstants[locale]["StartDate"];
    $scope.EndDate = LocaleConstants[locale]["EndDate"];
    $scope.SearchByInvoiceheader = LocaleConstants[locale]["SearchByInvoice"];
    $scope.UserpurchasesHeader = LocaleConstants[locale]["Userpurchases"];
    $scope.RowNumber = LocaleConstants[locale]["RowNumber"];
    $scope.BoxNumber = LocaleConstants[locale]["BoxNumber"];
    $scope.Seatnumber = LocaleConstants[locale]["Seatnumber"];
    $scope.Price = LocaleConstants[locale]["Price"];
    $scope.Category = LocaleConstants[locale]["Category"];
    $scope.BillNumbertickets = LocaleConstants[locale]["BillNumbertickets"];
    //$scope.SeatNumber = LocaleConstants[locale]["SeatNumber"];
    $scope.TicketCategory = LocaleConstants[locale]["TicketCategory"];
    $scope.Close = LocaleConstants[locale]["Close"];
    $scope.recordNotFound = LocaleConstants[locale]["recordNotFound"];
    $scope.errInvoice = LocaleConstants[locale]["errInvoice"];


    $scope.filteredList = [];
    //Http Services Get Data
    Service.get(Constants.UserPurchaseUri)
    .then(function (response) {
        $scope.UserPurchases = response.data;
        //$scope.totalItems = $scope.filteredList.Userpurchases.length;

        $scope.currentPage = 1;
        // $scope.numPerPage = config.paginationItemsPerPage;
        $scope.numPerPage = 5;
        //Pagination control
        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.filteredList.indexOf(value);
            return (begin <= index && index < end);
        };
    });



    //Search method
    $scope.IsVisible = false;

    $scope.searchByInvoice = function () {
        $scope.filteredBillNumber = {};

        var InvoiceValue = $scope.InvoiceNumberValue;

        if (InvoiceValue == null || InvoiceValue == undefined || InvoiceValue == "") {
            $scope.errMessageInvoice = $scope.errInvoice;
            $scope.recordNotFoundMessage = "";
            $scope.IsVisible = false;
            return false;
        }
        if (InvoiceValue != "") {

            var pattrnInvoice = new RegExp("^([0-0]{0,20})$");
            if (InvoiceValue.match(pattrnInvoice)) {
                $scope.errMessageInvoice = "Invalid Identity Number";
               
                return false;
            }
            else {
                $scope.errMessageInvoice = "";
            }
        }
        else {
            //  $scope.filteredList = filterFilter($scope.UserPurchases.UserPurchases, { invoiceNumber: InvoiceValue });
            $scope.filteredList = filterFilter($scope.UserPurchases.UserPurchases, function (number) { return number.invoiceNumber === $scope.InvoiceNumberValue; })

            if ($scope.filteredList.length <= 0) {
                $scope.errMessageInvoice = "";
                $scope.recordNotFoundMessage = $scope.recordNotFound;
                $scope.IsVisible = false;
            }
            else {
                $scope.totalItems = $scope.filteredList.length;
                $scope.errMessageInvoice = "";
                $scope.recordNotFoundMessage = "";
                $scope.IsVisible = true;
            }
        }
    };
  
    $scope.searchByDate = function () {


        var from = $scope.startdate;
        var to = $scope.enddate;

        var email = angular.lowercase($scope.email);
        var identitynumber = $scope.identitynumber;
        var mobilenumber = $scope.mobilenumber;
        if ((email == undefined || email == "") && (identitynumber == undefined || identitynumber == "") && (mobilenumber == "" || mobilenumber == undefined))
        {
            $scope.filteredList = filterFilter($scope.UserPurchases.UserPurchases, function (datedata) { return datedata.purchaseDate >= from && datedata.purchaseDate <= to });
            $scope.errMessageMobile = "";
            $scope.errMessageIdentity = "";
            $scope.errMessageEmail = "";
        }
        else {
            $scope.filteredListDate = filterFilter($scope.UserPurchases.UserPurchases, function (datedata) { return datedata.purchaseDate >= from && datedata.purchaseDate <= to });
            $scope.filteredList = filterFilter($scope.filteredListDate, function (number) { return number.email === email || number.identityNumber === identitynumber || number.mobileNumber === mobilenumber })

        }
    

        var tempEmail = document.getElementById('txtEmail').value;
      
        var atpos = tempEmail.indexOf("@");
        var dotpos = tempEmail.lastIndexOf(".");
      
         if ((from == undefined || from == "") || (to == undefined || to == "")) {
            $scope.errMessageCurrDate = "Start date and End date should not be empty";
            return false;
        }
          if ((from != undefined || from != "") || (to != undefined || to != "")) {
            $scope.errMessageCurrDate = "";
           
        }
          if (new Date(from) > new Date(to)) {
            $scope.errMessageEndDate = '.End Date should be greater than start date';          
            return false;

        }
    ////Email Validation
   
          if (tempEmail == "" && identitynumber == undefined && mobilenumber == undefined)
                    {
        }

         if (tempEmail.length > 0) {
            if (dotpos < atpos + 2 || dotpos + 2 >= tempEmail.length) {

                $scope.errMessageEmail = "Invalid e-mail address";
                $scope.errMessageCommon = '';
                $scope.errMessageIdentity = "";
                return false;
            }
            else
            {
                $scope.errMessageEmail = "";
              
            }
         }
         if(mobilenumber !="")
         {
            
             var pattrnMobile = new RegExp("^([0-0]{0,12})$");
             if (mobilenumber.match(pattrnMobile))
             {
                 $scope.errMessageMobile = "Invalid Mobile Number";
                 $scope.errMessageIdentity = "";
                 $scope.errMessageEmail = "";
                 return false;
             }
             else {
                 $scope.errMessageMobile = "";
             }
         }
         if (identitynumber != "") {

             var pattrnIdentity = new RegExp("^([0-0]{0,20})$");
             if (identitynumber.match(pattrnIdentity)) {
                 $scope.errMessageIdentity = "Invalid Identity Number";
                 $scope.errMessageMobile = "";
                 $scope.errMessageEmail = "";
                 return false;
             }
             else {
                 $scope.errMessageIdentity = "";
             }
         }
   
          if ((from != null && to != null)) {
            $scope.errMessageCurrDate = '';
            $scope.errMessageEndDate = '';
            $scope.errMessageCommon = "";
            if ($scope.filteredList.length <= 0) {
                $scope.recordNotFoundMessage = $scope.recordNotFound;
                $scope.IsVisible = false;
                $scope.errMessageEmail = "";
            }
            else {

                $scope.totalItems = $scope.filteredList.length;
                $scope.recordNotFoundMessage = "";
                $scope.errMessageEmail = "";
                $scope.IsVisible = true;

            }
            return true;
        }
     
        
    };

    $scope.mobilevalidation = function (event) {
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

   
    $scope.selectedRow = null;
    $scope.setClickedRow = function (id) {
        $scope.selectedRow = id;
        $scope.filteredBillNumber = filterFilter($scope.UserPurchases.BillNumberTickets, { id: $scope.selectedRow })[0]
        $scope.billNumber = filterFilter($scope.UserPurchases.UserPurchases, { id: $scope.selectedRow })[0]
    }
    angular.element(document).ready(function () {
        initDatePicker();
    });

    $scope.isShownDiv = function (selectForSearch) {

        if (selectForSearch == "customerInfo") {
            $scope.errMessage = "";
        }
        return selectForSearch === $scope.selectForSearch;
    };

    $('#btnSelect').click(function () {
        if ($('.collapsable').hasClass('showMe')) {
            $('.triangle-icon').removeClass('before');
            $('.triangle-icon').addClass('after');
        }
        else {
            $('.triangle-icon').removeClass('after');
            $('.triangle-icon').addClass('before');
        }
    });
    $scope.checkDateValidation = function (startDate, endDate) {
        startDate = $("#startDate").val();
        endDate = $("#endDate").val();
      
    
        if (new Date(startDate) > new Date(endDate)) {
            $scope.errMessageEndDate = '.End Date should be greater than start date';
            $scope.errMessageCurrDate = '';
            return false;
        }

        if (new Date(startDate) < new Date(endDate)) {
            $scope.errMessageEndDate = '';
            $scope.errMessageCurrDate = '';
            return true;
        }
 
    };
    //Current Crum update from Bread Crum Service
    $scope.crum = BreadCrum;

}]);
