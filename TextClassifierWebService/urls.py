"""
Definition of urls for ClassifierProject.
"""

from django.conf.urls import include, url
from Classifier import entryPoints
from Classifier import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^collection$', views.collection),
    url(r'^articles/[0-9]+', views.article),
    url(r'^add_article$', views.addarticle),
    url(r'^info_classifier$', views.infoclassifier),
    url(r'^api/articles/(?P<articleId>[0-9]+)$', entryPoints.articleOperations),
    url(r'^api/articles$', entryPoints.articlesAdd),
    url(r'^api/articles/filter$', entryPoints.articlesFilterOperation),
    url(r'^api/classifier$', entryPoints.classifierEntryPoint),
    url(r'^api/update_model$', entryPoints.update_model)
]

handler404 = "Classifier.views.page_not_found_view"
handler403 = "Classifier.views.forbidden_method"
