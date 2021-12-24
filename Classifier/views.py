from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    if request.method == "GET":
        return render(request, "classifier/index.html")
    else:
        return HttpResponse("method is not allowed", status=405)

def collection(request):
    if request.method == "GET":
        return render(request, "classifier/collection.html")
    else:
        return HttpResponse("method is not allowed", status=405)

def addarticle(request):
    if request.method == "GET":
        return render(request, "classifier/add_article.html")
    else:
        return HttpResponse("method is not allowed", status=405)


def article(request):
    if request.method == "GET":
        return render(request, "classifier/article.html")
    else:
        return HttpResponse("method is not allowed", status=405)

#
# def delete(request):
#     if request.method == "GET":
#         return render(request, "classifier/delete.html")
#     else:
#         return HttpResponse("method is not allowed", status=405)


def contact(request):
    if request.method == "GET":
        return render(request, "classifier/contact.html")
    else:
        return HttpResponse("method is not allowed", status=405)



def infoclassifier(request):
    if request.method == "GET":
        f = open("classificationReport/classification_report.txt", 'r', encoding = 'UTF-8')
        file_content = f.read()
        f.close()
        return HttpResponse(file_content, content_type="text/plain",charset= 'cp1251')
    else:
        return HttpResponse("method is not allowed", status=405)

#Переопределение страниц с ошибками
def forbidden_method(request, exception):
    return render(request, 'classifier/403.html', status=404)

def page_not_found_view(request, exception):
    return render(request, 'classifier/404.html', status=404)