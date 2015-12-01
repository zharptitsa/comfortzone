var app = angular.module('App', [
    'ngRoute'
]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'tpl/main.html'
        })
        .when('/gallery', {
            templateUrl : 'tpl/gallery.html'
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
