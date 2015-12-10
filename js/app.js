var cloudinaryId = 'dyymh1gnj';

var app = angular.module('App', [
    'ngRoute',
    'bootstrapLightbox'
]);

app.config(function($routeProvider, LightboxProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'tpl/main.html'
        })
        .when('/products/:categoryAlias', {
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

    LightboxProvider.getImageUrl = function (image) {
        return 'http://res.cloudinary.com/' + cloudinaryId + '/image/upload/c_scale,q_90,w_800/' + image.Url;
    };

    LightboxProvider.getImageCaption = function (image) {
        return image.Name;
    };
});

app.controller('MenuController', function($scope, $location, DataService) {
    $scope.Categories = DataService.getCategories();
    $scope.isCurrent = function(page) {
        var currentPage = $location.path().substring(1);
        return currentPage === page;
    };
});

app.controller('MainController', function ($scope, DataService) {
    $scope.Products = DataService.getProducts();
});

app.controller('ProductsController', function ($scope, $routeParams, DataService) {
    $scope.Products = DataService.getProductsInCategory($routeParams.categoryAlias);
});

app.controller('ProductController', function ($scope, $routeParams, DataService) {
    $scope.Product = DataService.getProduct($routeParams.alias);
});

app.service('DataService', function() {
    var APPLICATION_ID = 'D221EEFF-546D-24A4-FF33-0E860B470B00',
        SECRET_KEY = '063A649E-2096-8CF5-FF1B-28BEC2294D00',
        VERSION = 'v1';
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

    var products = Backendless.Persistence.getView('Products').data;
    var categories = _.uniq(_.pluck(products, 'Category'), function(category) {
        return category.Alias
    });

    this.getProducts = function() {
        return products;
    };

    this.getProduct = function(alias) {
        return _.find(products, function(product) {
            return product.Alias === alias
        });
    };

    this.getProductsInCategory = function(alias) {
        return _.filter(products, function(product) {
            return product.Category.Alias === alias
        })
    };

    this.getCategories = function() {
        return categories;
    };
});

app.directive('productImage', function (Lightbox) {
    var sizes = {
        'small': 320,
        'medium': 640,
        'big': 800
    };
    return {
        restrict: 'E',
        replace: true,
        scope: {
            model: '=',
            size: '@',
            lightBox: '@'
        },
        link: function ($scope) {
            $scope.width = sizes[$scope.size];
            $scope.cloudinaryId = cloudinaryId;
            if ($scope.lightBox === 'true' || $scope.lightBox === 'yes') {
                $scope.clickHandler = function () {
                    Lightbox.openModal([$scope.model], 0);
                };
            }
        },
        template: function($element, $attr) {
            var html ='<img ng-src="http://res.cloudinary.com/{{cloudinaryId}}/image/upload/c_scale,q_90,w_{{width}}/{{model.Url}}" title={{model.Name}}';
            if ($attr.lightBox === 'true' || $attr.lightBox === 'yes') {
                html += ' ng-click="clickHandler()"';
            }
            html += '>';
            return html;
        }
    };
});
