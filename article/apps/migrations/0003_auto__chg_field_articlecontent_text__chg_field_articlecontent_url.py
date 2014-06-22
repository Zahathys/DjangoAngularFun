# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'ArticleContent.text'
        db.alter_column('apps_articlecontent', 'text', self.gf('django.db.models.fields.TextField')(null=True))

        # Changing field 'ArticleContent.url'
        db.alter_column('apps_articlecontent', 'url', self.gf('django.db.models.fields.URLField')(null=True, max_length=200))

    def backwards(self, orm):

        # Changing field 'ArticleContent.text'
        db.alter_column('apps_articlecontent', 'text', self.gf('django.db.models.fields.TextField')(default=''))

        # Changing field 'ArticleContent.url'
        db.alter_column('apps_articlecontent', 'url', self.gf('django.db.models.fields.URLField')(default='', max_length=200))

    models = {
        'apps.article': {
            'Meta': {'object_name': 'Article'},
            'author': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '256'})
        },
        'apps.articlecontent': {
            'Meta': {'object_name': 'ArticleContent'},
            'article': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['apps.Article']", 'related_name': "'content'"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'order': ('django.db.models.fields.IntegerField', [], {}),
            'text': ('django.db.models.fields.TextField', [], {'blank': 'True', 'null': 'True'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'url': ('django.db.models.fields.URLField', [], {'blank': 'True', 'null': 'True', 'max_length': '200'})
        }
    }

    complete_apps = ['apps']