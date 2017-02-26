MakaniPostSaudiApp.controller("HeaderController", function ($scope, CommonService, BreadCrum, $route, $location, LocaleConstants) {

    //Locale Constants
    $scope.userProfile = {};
    $scope.userProfile.name = LocaleConstants[locale]["UserProfileName"];
    $scope.userProfile.title = LocaleConstants[locale]["UserProfileTitle"];
    $scope.primaryActions = {};
    $scope.primaryActions.barcode = LocaleConstants[locale]["GenerateBarCode"];
    $scope.primaryActions.stadium = LocaleConstants[locale]["StadiumSetUp"]; 
    $scope.primaryActions.event = LocaleConstants[locale]["CreateEvent"]; 
    $scope.primaryActions.label = LocaleConstants[locale]["MAKANIADMINPORTAL"];
    $scope.navigation = {};
    $scope.navigation.MORE = LocaleConstants[locale]["MORE"];
    $scope.navigation.tab1 = LocaleConstants[locale]["Navigationtab1"];
    $scope.navigation.tab2 = LocaleConstants[locale]["Navigationtab2"];
    $scope.navigation.tab3 = LocaleConstants[locale]["Navigationtab3"];
    $scope.navigation.tab4 = LocaleConstants[locale]["Navigationtab4"];
    $scope.navigation.tab5 = LocaleConstants[locale]["Navigationtab5"];
    $scope.navigation.tab6 = LocaleConstants[locale]["Navigationtab6"];
    $scope.navigation.tab7 = LocaleConstants[locale]["Navigationtab7"];
    $scope.navigation.tab8 = LocaleConstants[locale]["Navigationtab8"];
    $scope.navigation.tab9 = LocaleConstants[locale]["Navigationtab9"];
   
    $scope.MORE = function (event) {
        $(event.target.parentNode).addClass('active');
        $(event.target.parentNode).siblings().removeClass('active');
    }
 

    /*Side Bar EventsManagment*/
    $scope.EventsSideBar = function (event) {
        $scope.Eventsidebar = CommonService;
        $scope.Eventsidebar.tab1 = { "name": LocaleConstants[locale]["Events"], "uri": "eventmanage/events", "active": "active" };
        $scope.Eventsidebar.tab2 = { "name": LocaleConstants[locale]["OfflineTicketsPrinting"], "uri": "eventmanage/OfflineTicketsPrinting", "active": "" };
        $scope.Eventsidebar.tab3 = { "name": LocaleConstants[locale]["Competitions"], "uri": "eventmanage/Competitions", "active": "" };
        $scope.Eventsidebar.tab4 = { "name": LocaleConstants[locale]["Importofflinesoldtickets"], "uri": "eventmanage/Importofflinesoldtickets", "active": "" };
        $scope.crum = BreadCrum;
        $scope.crum.tab = LocaleConstants[locale]["EventManagement"];
        $scope.crum.sidebar = $scope.Eventsidebar.tab1.name;    
        $(event.target.parentNode).siblings().removeClass('active');
        $(event.target.parentNode).addClass('active');
    }

    /*Side Bar TemplateManagement*/
    $scope.TemplateSideBar = function (event) {
        $scope.Eventsidebar = CommonService;
        $scope.Eventsidebar.tab1 = { "name": LocaleConstants[locale]["Stadiums"], "uri": "templatemanage/Stadiums", "active": "active" };
        $scope.Eventsidebar.tab2 = { "name": LocaleConstants[locale]["Suites"], "uri": "templatemanage/Suites", "active": "" };
        $scope.Eventsidebar.tab3 = { "name": LocaleConstants[locale]["TicketsQRCode"], "uri": "templatemanage/TicketsQRCode", "active": "" };
        $scope.Eventsidebar.tab4 = { "name": LocaleConstants[locale]["TicketsTemplates"], "uri": "templatemanage/TicketsTemplates", "active": "" };
        $scope.crum = BreadCrum;
        $scope.crum.tab = LocaleConstants[locale]["TemplateManagement"];
        $scope.crum.sidebar = $scope.Eventsidebar.tab1.name;
        $(event.target.parentNode).siblings().removeClass('active');
        $(event.target.parentNode).addClass('active');
    }

    /*need modification*/
    $scope.ClubSideBar = function (event) {
        $scope.Eventsidebar = CommonService;
        $scope.Eventsidebar.tab1 = { "name": LocaleConstants[locale]["Club"], "uri": "clubmanagement/Club", "active": "active" };
        $scope.Eventsidebar.tab2 = { "name": LocaleConstants[locale]["Sponsors"], "uri": "clubmanagement/Sponsors", "active": "" };
        $scope.Eventsidebar.tab3 = { "name": LocaleConstants[locale]["OfflineEntities"], "uri": "clubmanagement/OfflineEntities", "active": "" };
        $scope.Eventsidebar.tab4 = { "name": "", "uri": "", "active": "" };

        $scope.crum = BreadCrum;
        $scope.crum.tab = LocaleConstants[locale]["ClubManagement"];
        $scope.crum.sidebar = $scope.Eventsidebar.tab1.name;
        $(event.target.parentNode).siblings().removeClass('active');
        $(event.target.parentNode).addClass('active');
    }

    $scope.SeasonSideBar = function (event) {
        $scope.Eventsidebar = CommonService;
        $scope.Eventsidebar.tab1 = { "name": LocaleConstants[locale]["Seasons"], "uri": "seasonmanage/Seasons", "active": "active" };
        $scope.Eventsidebar.tab2 = { "name": LocaleConstants[locale]["SeasonTickets"], "uri": "seasonmanage/SeasonalTickets", "active": "" };
        $scope.Eventsidebar.tab3 = { "name": LocaleConstants[locale]["SeasonalCards"], "uri": "seasonmanage/SeasonalCards", "active": "" };
        $scope.Eventsidebar.tab4 = { "name": "", "uri": "", "active": "" };
        $scope.crum = BreadCrum;
        $scope.crum.tab = LocaleConstants[locale]["SeasonManagment"];
        $scope.crum.sidebar = $scope.Eventsidebar.tab1.name;
        $(event.target.parentNode).siblings().removeClass('active');
        $(event.target.parentNode).addClass('active');
    }

    $scope.UserManagementSideBar = function (event) {
        $scope.Eventsidebar = CommonService;
        $scope.Eventsidebar.tab1 = { "name": LocaleConstants[locale]["Userpurchases"], "uri": "usermanage/userpurchases", "active": "active" };
        $scope.Eventsidebar.tab2 = { "name": LocaleConstants[locale]["Userprofiles"], "uri": "usermanage/userprofiles", "active": "" };
        $scope.Eventsidebar.tab3 = { "name": LocaleConstants[locale]["Setupclassification"], "uri": "usermanage/setupclassification", "active": "" };
        $scope.Eventsidebar.tab4 = { "name": "", "uri": "", "active": "" };
        $scope.crum = BreadCrum;
        $scope.crum.tab = LocaleConstants[locale]["UserManagement"];
        $scope.crum.sidebar = $scope.Eventsidebar.tab1.name;
        $(event.target.parentNode).siblings().removeClass('active');
        $(".listActive").removeClass('active');
        $('.morelistActive').addClass('active');
        $(event.target.parentNode).addClass('active');
    }


    $scope.NotificationManagementSideBar = function (event) {
        $scope.Eventsidebar = CommonService;
        $scope.Eventsidebar.tab1 = { "name": LocaleConstants[locale]["Stadiums"], "uri": "notificationmanagement/Stadiums", "active": "active" };
        $scope.Eventsidebar.tab2 = { "name": LocaleConstants[locale]["Suites"], "uri": "notificationmanagement/Suites", "active": "" };
        $scope.Eventsidebar.tab3 = { "name": LocaleConstants[locale]["TicketsQRCode"], "uri": "notificationmanagement/TicketsQRCode", "active": "" };
        $scope.Eventsidebar.tab4 = { "name": LocaleConstants[locale]["TicketsTemplates"], "uri": "notificationmanagement/TicketsTemplates", "active": "" };
        $scope.crum = BreadCrum;
        $scope.crum.tab = LocaleConstants[locale]["TemplateManagement"];
        $scope.crum.sidebar = $scope.Eventsidebar.tab1.name;
        $(event.target.parentNode).siblings().removeClass('active');
        $(".listActive").removeClass('active');
        $('.morelistActive').addClass('active');
        $(event.target.parentNode).addClass('active');
    }

    $scope.SystemSettingsSideBar = function (event) {
        $scope.Eventsidebar = CommonService;
        $scope.Eventsidebar.tab1 = { "name": LocaleConstants[locale]["Security"], "uri": "systemsettings/Security", "active": "active" };
        $scope.Eventsidebar.tab2 = { "name": LocaleConstants[locale]["SystemGlobalConfiguration"], "uri": "systemsettings/SystemGlobalConfiguration", "active": "" };
        $scope.Eventsidebar.tab3 = { "name": LocaleConstants[locale]["ComponentsMonitoring"], "uri": "systemsettings/ComponentsMonitoring", "active": "" };
        $scope.Eventsidebar.tab4 = { "name": LocaleConstants[locale]["SystemLookupsDefinition"], "uri": "systemsettings/SystemLookupsDefinition", "active": "" };
        $scope.crum = BreadCrum;
        $scope.crum.tab = LocaleConstants[locale]["SystemSettings"];
        $scope.crum.sidebar = $scope.Eventsidebar.tab1.name;
        $(event.target.parentNode).siblings().removeClass('active');
        $(".listActive").removeClass('active');
        $('.morelistActive').addClass('active');
        $(event.target.parentNode).addClass('active');
    }

    $scope.ReportsSideBar = function (event) {
        $scope.Eventsidebar = CommonService;
        $scope.Eventsidebar.tab1 = { "name": LocaleConstants[locale]["Stadiums"], "uri": "reports/Stadiums", "active": "active" };
        $scope.Eventsidebar.tab2 = { "name": LocaleConstants[locale]["Suites"], "uri": "reports/Suites", "active": "" };
        $scope.Eventsidebar.tab3 = { "name": LocaleConstants[locale]["TicketsQRCode"], "uri": "reports/TicketsQRCode", "active": "" };
        $scope.Eventsidebar.tab4 = { "name": LocaleConstants[locale]["TicketsTemplates"], "uri": "reports/TicketsTemplates", "active": "" };
        $scope.crum = BreadCrum;
        $scope.crum.tab = LocaleConstants[locale]["TemplateManagement"];
        $scope.crum.sidebar = $scope.Eventsidebar.tab1.name;
        $(event.target.parentNode).siblings().removeClass('active');
        $(".listActive").removeClass('active');
        $('.morelistActive').addClass('active');
        $(event.target.parentNode).addClass('active');
    }

    /*End need modification*/

    $scope.Dashboard = function (event) {
        $(event.target.parentNode).siblings().removeClass('active');
        $(event.target.parentNode).addClass('active');
    }
    /*Side Bar Events*/

    //Controller Initialize Handler
    $scope.init = function () {
        var url = $location.path().split("/");
        if (url[1]) {
            var elem = $('.navbar-right li').not(".brand-name").has('[href*=' + url[1] + ']');
            if (elem) {
                if (elem[0]) {
                    angular.element(elem[0].childNodes[0]).triggerHandler('click');
                    angular.element(elem[1].childNodes[0]).triggerHandler('click');
                }
            }
        }
    }

    //Document Ready Event
    angular.element(document).ready(function () {
        $scope.init();
    });

});