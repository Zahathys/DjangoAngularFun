'use strict';

angular.module('articleModule').controller('AdminController', function ($scope, ArticleFactory){

    $scope.articleList = ArticleFactory.getArticles();

    $scope.saveArticle = function () {
        ArticleFactory.createArticle($scope.article, function(){
            $scope.articleList = ArticleFactory.getArticles();
        });
    };

    $scope.deleteArticle = function (index) {
        var articleToDelete = $scope.articleList[index];
        ArticleFactory.deleteArticle(articleToDelete, function(){
            $scope.articleList = ArticleFactory.getArticles();
        });
    };

});