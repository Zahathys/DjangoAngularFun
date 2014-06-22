from rest_framework import viewsets, serializers, routers


from article.apps.models import Article, ArticleContent


class ArticleContentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ArticleContent
        fields = ('id', 'type', 'text', 'url', 'order')


class ArticleSerializer(serializers.ModelSerializer):

    content = ArticleContentSerializer(many=True, required=False, allow_add_remove=True, read_only=False)

    class Meta:
        model = Article
        fields = ('id', 'title', 'author', 'content')


class ArticleViewSet(viewsets.ModelViewSet):
    model = Article


class FullArticleViewSet(viewsets.ModelViewSet):
    model = Article
    serializer_class = ArticleSerializer


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'article', ArticleViewSet)
router.register(r'fullArticle', FullArticleViewSet)