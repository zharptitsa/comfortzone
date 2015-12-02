var app = angular.module('App', [
    'ngRoute'
]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'tpl/main.html'
        })
        .when('/products', {
            templateUrl : 'tpl/products.html'
        })
        .when('/contacts', {
            templateUrl : 'tpl/contacts.html'
        })
        .when('/about', {
            templateUrl : 'tpl/about.html'
        })
        .when('/product/:alias', {
            templateUrl : 'tpl/product.html'
        });
});

app.controller("MenuController", function($scope, $location) {
    $scope.isCurrent = function(page) {
        var currentPage = $location.path().substring(1);
        return currentPage === page;
    };
});
