'use strict';

angular.module('articleModule').factory('ArticleFactory', function ($resource){
    var articleFactory = {};

    var Article = $resource('restapi/article/:articleId', { articleId: '@id' }, { update: { method: 'PUT' } });
    var ArticleWithContent = $resource('restapi/fullArticle/:articleId', { articleId: '@id' }, { update: { method: 'PUT' } });

    articleFactory.createArticle = function (article, afterSave) {
        var newArticle = new Article();
        newArticle.title = article.title;
        newArticle.author = article.author;
        return newArticle.$save(afterSave);
    };

    articleFactory.getArticles = function () {
        return Article.query();
    };

    articleFactory.getArticle = function (articleId) {
        return Article.get({ articleId: articleId });
    };

    articleFactory.deleteArticle = function (article, afterDelete) {
        return article.$delete(afterDelete);
    };

    articleFactory.getArticleWithContent = function (articleId) {
        return ArticleWithContent.get({ articleId: articleId });
    };

    articleFactory.saveArticle = function (article, afterSave) {
        var newArticle = new ArticleWithContent();
        newArticle.id = article.id;
        newArticle.title = article.title;
        newArticle.author = article.author;
        newArticle.content = article.content;
        return newArticle.$update(afterSave);
    };

    return articleFactory;
});