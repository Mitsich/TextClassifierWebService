from django.http import HttpResponse
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import SGDClassifier
from sklearn.metrics import classification_report, accuracy_score
from sklearn.model_selection import train_test_split
import pandas as pd
import string
import re
from nltk import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
from pymystem3 import Mystem
from TextClassifierWebService import settings
from Classifier import apps as fileClassifier
import pickle

mystem = Mystem()
stemmer = SnowballStemmer("russian")  # Инициализация стеммера
russian_stopwords = stopwords.words("russian")  # даталист русских стоп-слов
russian_stopwords.extend(['…', '«', '»', '...', 'т.д.', 'т', 'д'])
###Классы нашего классификатора###
category = ['Спорт', 'Культура', 'Интернет и СМИ', 'Наука и техника', 'Экономика']


def remove_punctuation(text):
    return "".join([ch if ch not in string.punctuation else ' ' for ch in text])

# Убираем цифры
def remove_numbers(text):
    return ''.join([i if not i.isdigit() else ' ' for i in text])

# Убираем множественные пробелы
def remove_multiple_spaces(text):
    return re.sub(r'\s+', ' ', text, flags=re.I)

# Убираем стоп-слова
def remove_stop_words(text):
    tokens = word_tokenize(text)
    tokens = [token for token in tokens if token not in russian_stopwords and token != ' ']
    return " ".join(tokens)

#Обработка текста после предобработки
# лемматизация текста
def lemmatize_text(text,mystem):
    text_lem = mystem.lemmatize(text)
    tokens = [token for token in text_lem if token != ' ' and token not in russian_stopwords]
    return " ".join(tokens)

# стемминг текста
def stemming_text(text):
    tokens = word_tokenize(text)
    stemmed_tokens = [stemmer.stem(token) for token in tokens if token not in russian_stopwords]
    return " ".join(stemmed_tokens)


def classifierFit():
    data = pd.read_csv('data.csv')
    # Читаем текст и категории из файла
    X = data['text_stem']
    y = data['topic']
    # Разделение датасета
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Запускаем конвеер
    sgd = Pipeline([('vect', CountVectorizer()),
                    ('tfidf', TfidfTransformer()),
                    ('clf',
                     SGDClassifier(loss='hinge', penalty='l2', alpha=1e-3, random_state=42, max_iter=5, tol=None)),
                    ])


    sgd.fit(X_train, y_train)

    with open('model/model.pkl', 'wb') as f:
        pickle.dump(sgd, f)

        # Запускаем предсказание на тестовой выборке
    y_pred = sgd.predict(X_test)
    print("Точность работы классификатора загружена в файл: classification_report.txt")
    accuracy = accuracy_score(y_pred, y_test)
    report = classification_report(y_test, y_pred, target_names=category)
    f1 = open("classification_report.txt", 'w', encoding='utf-8')
    f1.write('***Данные по классификатору***\n')
    f1.write('Точность работы классификатора: %s \n' % accuracy)
    f1.write(report)


def getClassifierInformation():
    f = open('classification_report.txt', 'r')
    file_content = f.read()
    f.close()
    return HttpResponse(file_content, content_type="text/plain")

def classifyArticle(text):
    classifierResult = {}
    numberOfCategory = fileClassifier.fileDestination.predict([remove_numbers
                                                               (remove_punctuation
                                                                (remove_multiple_spaces
                                                                 (remove_stop_words(stemming_text(text)))))])[0]
    classifierResult["category"] = numberOfCategory

    return classifierResult
