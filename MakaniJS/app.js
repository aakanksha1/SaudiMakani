var MakaniPostSaudiApp = angular.module('MakaniPostSaudiApp', ['ngRoute', 'ui.bootstrap', 'ngResource', 'ngStorage']).
config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Dashboard.html',
        controller: 'DashboardController'
    })
        .when('/dashboard', {
            templateUrl: '/partials/Dashboard.html',
            controller: 'DashboardController'
        })
        .when('/eventmanage', {
            controller: 'EventmanagementController',
            templateUrl: '/partials/Eventmanagement.html'
        })
        .when('/eventmanage/events', {
            controller: 'EventmanagementController',
            templateUrl: '/partials/Eventmanagement.html'
        })
        .when('/eventmanage/OfflineTicketsPrinting', {
            controller: 'OfflineTicketPrintingController',
            templateUrl: '/partials/OfflineTicketPrinting.html'
        })
        .when('/eventmanage/Importofflinesoldtickets', {
            controller: 'EventmanagementController',
            templateUrl: '/partials/UserPurchases.html'
        })
        .when('/eventmanage/events/CreateNewEvent', {
            controller: 'CreateEventController',
            templateUrl: '/partials/CreateEvent.html'
        })
         .when('/eventmanage/events/defineblocks', {
             controller: 'DefineBlocksController',
             templateUrl: '/partials/DefineBlocks.html'
         })
        .when('/templatemanage', {
            controller: 'TemplatemanagementController',
            templateUrl: '/partials/Templatemanagement.html'
        })
        .when('/templatemanage/Stadiums', {
            controller: 'TemplatemanagementController',
            templateUrl: '/partials/Templatemanagement.html'
        })
        .when('/templatemanage/Suites', {
            controller: 'TemplatemanagementController',
            templateUrl: '/partials/UserPurchases.html'
        })
        .when('/templatemanage/TicketsQRCode', {
            controller: 'TemplatemanagementController',
            templateUrl: '/partials/UserPurchases.html'
        })
         .when('/templatemanage/TicketsTemplates', {
             controller: 'TemplatemanagementController',
             templateUrl: '/partials/UserPurchases.html'
         })
        .when('/templatemanage/Stadiums/CreateNewStadium', {
            controller: 'CreateNewStadiumController',
            templateUrl: '/partials/CreateNewStadium.html'
        })
        .when('/clubmanagement', {
            controller: 'ClubManagementController',
            templateUrl: '/partials/ClubManagement.html'
        })
         .when('/clubmanagement/Club', {
             controller: 'ClubManagementController',
             templateUrl: '/partials/ClubManagement.html'
         })
        .when('/clubmanagement/Sponsors', {
            controller: 'SponsorsController',
            templateUrl: '/partials/Sponsors.html'

        })
         .when('/clubmanagement/OfflineEntities', {
             controller: 'ClubManagementController',
             templateUrl: '/partials/UserPurchases.html'
         })
       .when('/seasonmanage', {
           controller: 'SeasonManagementController',
           templateUrl: '/partials/SeasonManagement.html'
       })
         .when('/seasonmanage/Seasons', {
             controller: 'SeasonManagementController',
             templateUrl: '/partials/SeasonManagement.html'
         })
        .when('/seasonmanage/SeasonalTickets', {
            controller: 'SeasonalTicketsController',
            templateUrl: '/partials/SeasonalTickets.html'
        })
        .when('/seasonmanage/SeasonalCards', {
            controller: 'SeasonManagementController',
            templateUrl: '/partials/UserPurchases.html'
        })
         .when('/eventmanage/Competitions', {
             controller: 'CompetitionsController',
             templateUrl: '/partials/Competitions.html',
             url: '/eventmanage/Competitions'
         })
    .when('/clubmanagement', {
        controller: 'ClubManagementController',
        templateUrl: '/partials/ClubManagement.html',
        url: '/clubmanagement'
    })
    .when('/seasonmanage', {
        controller: 'SeasonManagementController',
        templateUrl: '/partials/SeasonManagement.html',
        url: '/seasonmanagement'
    })
    .when('/usermanage/userpurchases', {
        controller: 'UserManagementController',
        templateUrl: '/partials/UserManagement.html'
    })
    .when('/notificationmanagement', {
        controller: 'NotificationManagementController',
        templateUrl: '/partials/NotificationManagement.html',
        url: '/notificationmanagement'
    })
    .when('/notificationmanagement/Stadiums', {
        controller: 'NotificationManagementController',
        templateUrl: '/partials/NotificationManagement.html',
        url: '/notificationmanagement'
    })
    .when('/notificationmanagement/Suites', {
        controller: 'NotificationManagementController',
        templateUrl: '/partials/NotificationManagement.html',
        url: '/notificationmanagement'
    })
    .when('/notificationmanagement/TicketsQRPool', {
        controller: 'NotificationManagementController',
        templateUrl: '/partials/NotificationManagement.html',
        url: '/notificationmanagement'
    })
    .when('/notificationmanagement/TicketsTemplates', {
        controller: 'NotificationManagementController',
        templateUrl: '/partials/NotificationManagement.html',
        url: '/notificationmanagement'
    })
    .when('/systemsettings', {
        controller: 'SystemSettingsController',
        templateUrl: '/partials/UserPurchases.html',
        url: '/systemsettings'
    })
    .when('/systemsettings/Security', {
        controller: 'SystemSettingsController',
        templateUrl: '/partials/UserPurchases.html'

    })
    .when('/systemsettings/SystemGlobalConfiguration', {
        controller: 'SystemSettingsController',
        templateUrl: '/partials/UserPurchases.html'

    })
    .when('/systemsettings/ComponentsMonitoring', {
        controller: 'SystemSettingsController',
        templateUrl: '/partials/SystemSettings.html'

    })
    .when('/systemsettings/SystemLookupsDefinition', {
        controller: 'SystemSettingsController',
        templateUrl: '/partials/UserPurchases.html'

    })
    .when('/reports', {
        controller: 'ReportsController',
        templateUrl: '/partials/Reports.html',
        url: '/reports'
    })
    .when('/reports/Stadiums', {
        controller: 'ReportsController',
        templateUrl: '/partials/Reports.html',
        url: '/reports'
    })
    .when('/reports/Suites', {
        controller: 'ReportsController',
        templateUrl: '/partials/Reports.html',
        url: '/reports'
    })
    .when('/reports/TicketsQRPool', {
        controller: 'ReportsController',
        templateUrl: '/partials/Reports.html',
        url: '/reports'
    })
    .when('/reports/TicketsTemplates', {
        controller: 'ReportsController',
        templateUrl: '/partials/Reports.html',
        url: '/reports'
    }).otherwise({
        templateUrl: '/partials/Dashboard.html'
    });

    $locationProvider.html5Mode(true);

}]);


//File upload control event handler

function fdInput() {
    return {
        scope: {
            fileNames: '=',
        },
        link: function (scope, element, attrs) {
            element.on('change', function (evt) {
                var files = evt.target.files;
                if (files && files.length > 0) {
                    scope.fileNames = files[0].name;
                    scope.$apply();
                }
            });
        }
    }
};


function flInput() {

    return {
        scope: {
            fileName: '=',
        },
        link: function (scope, element, attrs) {
            element.on('change', function (evt) {
                var files = evt.target.files;

                if (files && files.length > 0) {
                    scope.fileName = files[0].name;
                    var fileReader = new FileReader();

                    scope.$apply();
                }
            });
        }
    }
};


//Initialize Date Picker
function initDatePicker() {
    $(".dateTime-input").datetimepicker({
        changeMonth: true,
        dateFormat: "yy-mm-dd"

        //nextText: '<<', prevText: '>>',
    });

    $(".date-input").datetimepicker({
        changeMonth: true,
        dateFormat: "yy-mm-dd",
        format: 'Y/m/d',
        timepicker: false
    });
}


(function () {
    MakaniPostSaudiApp.directive("fileread", [function () {

        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                            //console.log(scope.fileread);
                        });
                    }
                    //reader.changeEvent.target.files[0].name;
                    var value = changeEvent.target.files[0].name;
                    reader.readAsDataURL(changeEvent.target.files[0]);
                    $("#txtLogo").val(value);
                    $("#txtImage").val(value);
                    $("#txtSuiteLogo").val(value);
                    $("#txtImage").val(value);
                    $("#txtStadiumPic").val(value);
                });
            }
        }
    }]);
})();

//(function () {
//    MakaniPostSaudiApp.directive("filereadLogo", [function () {

//        return {
//            scope: {
//                filereadLogo: "="
//            },
//            link: function (scope, element, attributes) {
//                element.bind("change", function (changeEvent) {
//                    var reader = new FileReader();
//                    reader.onload = function (loadEvent) {
//                        scope.$apply(function () {
//                            scope.filereadLogo = loadEvent.target.result;
//                            console.log(scope.filereadLogo);
//                        });
//                    }
//                    //reader.changeEvent.target.files[0].name;
//                    var value = changeEvent.target.files[0].name;
//                    reader.readAsDataURL(changeEvent.target.files[0]);                  
//                    $("#txtfileLogo").val(value);

//                });
//            }
//        }
//    }]);
//})();

//Required field Validation of the all pages
MakaniPostSaudiApp.directive('showErrors', function ($timeout) {
    return {
        restrict: 'A',
        require: '^form',
        link: function (scope, el, attrs, formCtrl, $invalid) {
            // find the text box element, which has the 'name' attribute
            var inputEl = el[0].querySelector("[name]");
            // convert the native text box element to an angular element
            var inputNgEl = angular.element(inputEl);
            // get the name on the text box
            var inputName = inputNgEl.attr('name');

            // only apply the has-error class after the user leaves the text box
            var blurred = false;
            inputNgEl.bind('blur', function () {
                blurred = true;
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
            });

            scope.$watch(function () {
                if (formCtrl[inputName] && formCtrl[inputName] != null) {
                    return formCtrl[inputName].$invalid
                }
            }, function (invalid) {
                if (!blurred && invalid) { return }
                el.toggleClass('has-error', invalid);
            });

            scope.$on('show-errors-check-validity', function () {
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
            });

            scope.$on('show-errors-reset', function () {
                $timeout(function () {
                    el.removeClass('has-error');
                }, 0, false);
            });
        }
    }
});



