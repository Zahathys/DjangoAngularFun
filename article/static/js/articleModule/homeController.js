'use strict';

angular.module('articleModule').controller('HomeController', function ($scope, $sce, ArticleFactory){

    $scope.articleList = ArticleFactory.getArticles();

    $scope.$watchCollection(function(){
        return $scope.articleList;
    }, function(data){
        if(data.length > 0) {
            $scope.selectArticle(data[0].id);
        }
    });

    $scope.selectArticle = function(articleId){
        $scope.selectedArticleId = articleId;
        $scope.articleToDisplay = ArticleFactory.getArticleWithContent(articleId);
    };

    $scope.activeClass = function(articleId){
        if($scope.selectedArticleId === articleId){
            return 'active';
        }
    };

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

});