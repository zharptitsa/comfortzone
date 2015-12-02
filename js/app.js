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
/*
app.controller('ProductsController', function ($scope) {
    Parse.initialize("ccdu6yYl2PmUCyYzErO6DMX6lhDZ4fTUHU5F4j9u", "WSlFuOFST7E8HCY8ZNndvNa7d3jFNqfHxE92HTPc");
    var query = new Parse.Query('Products');
    query.limit(1000).find().done(function(list){
        //list[0].get('images')
    });
    //debugger;
});
*/