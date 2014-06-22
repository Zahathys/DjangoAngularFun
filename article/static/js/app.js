'use strict';

var articleModule = angular.module('articleModule', ['ngResource']);

var app = angular.module('article', [
    'ngRoute',
    'articleModule',
    'ui.bootstrap',
    'ui.sortable',
    'ngSanitize']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider.when('/home', {
        templateUrl: 'static/js/articleModule/homePartial.html',
        controller: 'HomeController'
    });
    $routeProvider.when('/admin', {
        templateUrl: 'static/js/articleModule/adminPartial.html',
        controller: 'AdminController'
    });
    $routeProvider.when('/admin/article/:articleId?', {
        templateUrl: 'static/js/articleModule/articlePartial.html',
        controller: 'ArticleEditController'
    });
    $routeProvider.otherwise({ redirectTo: '/home' });

	
}]);
