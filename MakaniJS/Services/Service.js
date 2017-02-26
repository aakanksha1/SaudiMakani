//$Http Services
MakaniPostSaudiApp.factory('Service',
    ["$http",
        function ($http) {
            return {
                get: function (url) {
                    var promise = $http.get(url)
                    .success(function (data, status, headers, config) {
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        return { "status": false };
                    });
                    //$scope.isLoading = false;
                    return promise;
                },
                getById: function (url, object) {
                    var promise = $http({
                        method: "POST",
                        url: url,
                        data: object
                    })
                        .success(function (data, status, headers, config) {
                            return data;
                        })
                        .error(function (data, status, headers, config) {
                            return { "status": false };
                        });
                    return promise;
                },
                add: function (url, object) {
                    var promise = $http({
                        method: "POST",
                        url: url,
                        data: object
                    })
                        .success(function (data, status, headers, config) {
                            return data;
                        })
                        .error(function (data, status, headers, config) {
                            return { "status": false };
                        });
                    return promise;
                },
                edit: function (url, object) {
                    var promise = $http({
                        method: "POST",
                        url: url,
                        data: object
                    })
                        .success(function (data, status, headers, config) {
                            return data;
                        })
                        .error(function (data, status, headers, config) {
                            return { "status": false };
                        });
                    return promise;
                },
                del: function (url, object) {
                    var promise = $http({
                        method: "POST",
                        url: url,
                        data: object
                    })
                        .success(function (data, status, headers, config) {
                            return data;
                        })
                        .error(function (data, status, headers, config) {
                            return { "status": false };
                        });
                    return promise;
                }
            }
            
        }]);