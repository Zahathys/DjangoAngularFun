from django.conf.urls import patterns, include, url

from article.apps.restapi import router


urlpatterns = patterns('',
    url(r'^$', 'article.apps.views.home', name='home'),
    url(r'^restapi/', include(router.urls)),
)
