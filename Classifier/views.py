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



def read_file(request):
        f = open('classification_report.txt', 'r')
        file_content = f.read()
        f.close()
        return HttpResponse(file_content, content_type="text/plain")



def article(request):
    if request.method == "GET":
        return render(request, "classifier/article.html")
    else:
        return HttpResponse("method is not allowed", status=405)


def delete(request):
    if request.method == "GET":
        return render(request, "classifier/delete.html")
    else:
        return HttpResponse("method is not allowed", status=405)


def contact(request):
    if request.method == "GET":
        return render(request, "classifier/contact.html")
    else:
        return HttpResponse("method is not allowed", status=405)
    return None


def infoclassifier(request):
    if request.method == "GET":
        f = open('classification_report.txt', 'r')
        file_content = f.read()
        f.close()
        return HttpResponse(file_content, content_type="text/plain")
    else:
        return HttpResponse("method is not allowed", status=405)
    return None