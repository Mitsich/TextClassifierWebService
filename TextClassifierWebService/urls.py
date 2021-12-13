"""TextClassifierWebService URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from Classifier import entryPoints
from Classifier import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^contact$',views.contact),
    url(r'^collection$', views.collection),
    url(r'^articles/[0-9]+', views.article),
    url(r'^collection/add_article$', views.addarticle),
    url(r'^api/articles/(?P<articleId>[0-9]+)$', entryPoints.articleOperations),
    url(r'^api/articles$', entryPoints.articlesAdd),
    url(r'^delete$', views.delete),
    url(r'^api/articles/filter$', entryPoints.articlesFilterOperation),
    url(r'^api/classifier$', entryPoints.classifierEntryPoint),
    url(r'^api/info-classifier$',views.infoclassifier)
]
