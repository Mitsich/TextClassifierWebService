from django.apps import AppConfig
import pickle
from numpy.lib._datasource import open
from TextClassifierWebService import settings

#Загрузка модели классификатора при старте системы
nameFile = "model.pkl"
directory = "\\model\\"
file = open(settings.BASE_DIR + directory + nameFile, "rb")
fileDestination = pickle.load(file)


class ClassifierConfig(AppConfig):
    name = 'Classifier'

