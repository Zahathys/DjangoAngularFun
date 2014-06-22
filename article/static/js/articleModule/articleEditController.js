'use strict';

angular.module('articleModule').controller('ArticleEditController', function ($scope, $routeParams, $modal, $sce, ArticleFactory){

    $scope.article = ArticleFactory.getArticleWithContent($routeParams.articleId);

    $scope.openContentEdit = function (content) {

        var modalInstance = $modal.open({
            templateUrl: 'static/js/articleModule/contentPartial.html',
            controller: ContentController,
            resolve: {
                title: function(){
                    return $scope.article.title;
                },
                contentSelected: function(){
                    if(content){
                        return content;
                    } else {
                        return {};
                    }
                }
            }
        });

        modalInstance.result.then(function (content) {
            if(!content.order && content.order !== 0){
                var newOrder;
                if($scope.article.content.length === 0){
                    newOrder = 0;
                } else {
                    var values = $scope.article.content.map(function (someContent) {
                        return someContent.order;
                    });
                    newOrder = Math.max.apply(Math, values) + 1;
                }
                content.order = newOrder;
                $scope.article.content.push(content);
            }
        });
    };

    $scope.saveArticle = function (){
        ArticleFactory.saveArticle($scope.article);
    };

    $scope.changeOrder = {
        stop: function(event, ui) {
            $scope.$apply(function(){
                var index = ui.item.sortable.index;
                var dropIndex = ui.item.sortable.dropindex;
                angular.forEach($scope.article.content, function(content) {
                    var currentIndex = content.order;
                    if(currentIndex === index){
                        content.order = dropIndex;
                    } else if(currentIndex >= dropIndex && currentIndex < index) {
                        content.order = content.order  + 1;
                    } else if(currentIndex > index && currentIndex <= dropIndex) {
                        content.order = content.order  - 1;
                    }
                });
            });
        },
        cursor: "move"
    };

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    $scope.deleteContent = function(contentId){
        var content = _.find($scope.article.content, function(someContent){ return someContent.id === contentId });
        var index = _.indexOf($scope.article.content, content)
        $scope.article.content.splice(index, 1);
    };

});

var ContentController = function($scope, $modalInstance, title, contentSelected){

    $scope.title = title;
    $scope.content = contentSelected;
    $scope.contentTypes = ['Text', 'Image', 'Video'];

    $scope.ok = function () {
        $modalInstance.close($scope.content);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.$watch(function(){
        return $scope.content.type;
    }, function(data){
        if(data === 'Text'){
            $scope.showText = true;
            $scope.showUrl = false;
            $scope.alertVideo = false;
        } else if (data === 'Image' || data === 'Video'){
            $scope.showText = false;
            $scope.showUrl = true;
            $scope.alertVideo = false;
            if(data === 'Video'){
                $scope.alertVideo = true;
            }
        }
    });

};