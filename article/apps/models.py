from django.db import models


class Article(models.Model):

    title = models.CharField(max_length=256)
    author = models.CharField(max_length=256)

    def __unicode__(self):
        return self.title


class ArticleContent(models.Model):

    article = models.ForeignKey(Article, related_name='content')
    type = models.CharField(max_length=100)
    text = models.TextField(null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    order = models.IntegerField()