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
from Classifier import Controller
from Classifier import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^collection$', views.collection),
    url(r'^addarticle$', views.addarticle,name='add-article'),
    url(r'^articles/[0-9]+', views.article),
    url(r'^deletearticles/[0-9]+', views.deleterticle),
    url(r'^api/updatedb$', Controller.updateDB),
    url(r'^api/articles/(?P<articleId>[0-9]+)$', Controller.articleOperations),
    url(r'^api/articles$', Controller.articlesAdd),
    url(r'^api/articles/filter$', Controller.articlesFilterOperation),
    url(r'^api/classifier/fit$', Controller.classifierFit),
    url(r'^api/classifier$', Controller.classifierCore),
    url(r'^api/info-classifier$', views.read_file, name='info-classifier')
]
