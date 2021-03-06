async function addArticle()
{
    let elemSource = document.getElementById("sourceAdd");
    let elemCategory = document.getElementById("categoryAdd");
    let elemDatetime = document.getElementById("datetimeAdd");
    let elemTitle = document.getElementById("titleAdd");
    let elemDescription = document.getElementById("descriptionAdd");
    let elemText = document.getElementById("textAdd");
    let elemTags = document.getElementById("tagsAdd");

    let elemSourceError = document.getElementById("sourceAddError");
    let elemCategoryError = document.getElementById("categoryAddError");
    let elemDatetimeError = document.getElementById("datetimeAddError");
    let elemTitleError = document.getElementById("titleAddError");
    let elemDescriptionError = document.getElementById("descriptionAddError");
    let elemTextError = document.getElementById("textAddError");
    let elemTagsError = document.getElementById("tagsAddError");

    let elemResultAdd = document.getElementById("resultAdd");
    elemResultAdd.textContent = "";

    elemSourceError.hidden = true;
    elemCategoryError.hidden = true;
    elemDatetimeError.hidden = true;
    elemTitleError.hidden = true;
    elemDescriptionError.hidden = true;
    elemTextError.hidden = true;
    elemTagsError.hidden = true;

    let source = elemSource.value;
    let category = elemCategory.value;
    let datetime = elemDatetime.value;
    let title = elemTitle.value;
    let description = elemDescription.value;
    let text = elemText.value;
    let tags = elemTags.value;

    let flagSuccess = true;

    if (source.trim() !== '')
    {
        if (source.length <= 200)
        {
            let regExpSource = /^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=\~\/-]*)?(?:#[^ \'\"&<>]*)?$/i;
            if (!regExpSource.test(source))
            {
                elemSourceError.hidden = false;
                elemSourceError.textContent = "?????? ???? ????????????";
                flagSuccess = false;
            }
        }
        else
        {
            elemSourceError.hidden = false;
            elemSourceError.textContent = "???????? ??????????????????????. ???????? ??????-???? ???????????????? - 200";
            flagSuccess = false;
        }
    }
    else
    {
        elemSourceError.hidden = false;
        elemSourceError.textContent = "?????? ???????? ???????????????? ????????????????????????";
        flagSuccess = false;
    }

    if (datetime.trim() != '')
    {
        let regExpForDatetime = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}$/i;
        if (regExpForDatetime.test(datetime))
        {
            let dateObject = new Date(datetime);
            let dateStrNew = dateObject.getFullYear() + '-' + ('0' + (dateObject.getMonth() + 1)).slice(-2) + '-' + ('0' + dateObject.getDate()).slice(-2) + " " + ('0' + dateObject.getHours()).slice(-2) + ":" + ('0' + dateObject.getMinutes()).slice(-2);
            if (dateStrNew != datetime)
            {
                elemDatetimeError.hidden = false;
                elemDatetimeError.textContent = "???????? ??????????????????????";
                flagSuccess = false;
            }
        }
        else
        {
            elemDatetimeError.hidden = false;
            elemDatetimeError.textContent = "???????????? ???????? ??????????????????????";
            flagSuccess = false;
        }
    }
    else
    {
        elemDatetimeError.hidden = false;
        elemDatetimeError.textContent = "?????? ???????? ???????????????? ????????????????????????";
        flagSuccess = false;
    }

    if (title.trim() != '')
    {
        if (title.length > 500)
        {
            elemTitleError.hidden = false;
            elemTitleError.textContent = "???????? ??????????????????????. ???????? ??????-???? ???????????????? - 500";
            flagSuccess = false;
        }
    }
    else
    {
        elemTitleError.hidden = false;
        elemTitleError.textContent = "?????? ???????? ???????????????? ????????????????????????";
        flagSuccess = false;
    }

    if (text.trim() != '')
    {
        if (text.length > 10000)
        {
            elemTextError.hidden = false;
            elemTextError.textContent = "???????? ??????????????????????. ???????? ??????-???? ???????????????? - 10000";
            flagSuccess = false;
        }
    }
    else
    {
        elemTextError.hidden = false;
        elemTextError.textContent = "?????? ???????? ???????????????? ????????????????????????";
        flagSuccess = false;
    }

    if (description.trim() != '') {
        if (description.length > 1000) {
            elemDescriptionError.hidden = false;
            elemDescriptionError.textContent = "???????? ??????????????????????. ???????? ??????-???? ???????????????? - 1000";
            flagSuccess = false;
        }
    }
    else {
        elemDescriptionError.hidden = false;
        elemDescriptionError.textContent = "?????? ???????? ???????????????? ????????????????????????";
        flagSuccess = false;
    }

    if (tags.trim() != '')
    {
        let tagsList = tags.split(',');
        let flagEmptyTag = false;
        let flagMaxChTag = false;

        if (tagsList.length <= 8)
        {
            for (let i = 0; i < tagsList.length; i++)
            {
                tagsList[i] = tagsList[i].trim();
                if (tagsList[i] != '')
                {
                    if (tagsList[i].length > 50)
                    {
                        flagMaxChTag = true;
                    }
                }
                else
                {
                    flagEmptyTag = true;
                }
            }

            if (flagEmptyTag)
            {
                elemTagsError.hidden = false;
                elemTagsError.textContent = "???????????? ??????";
                flagSuccess = false;
            }
            else
            {
                if (flagMaxChTag)
                {
                    elemTagsError.hidden = false;
                    elemTagsError.textContent = "?????? ?????????????? ??????????????. ???????? ??????-???? ???????????????? - 50";
                    flagSuccess = false;
                }
                else
                {
                    tags = tagsList;
                }
            }
        }
        else
        {
            elemTagsError.hidden = false;
            elemTagsError.textContent = "?????????????? ?????????? ??????????. ???????? ??????-???? ?????????? - 8";
            flagSuccess = false;
        }
    }
    else
    {
        elemTagsError.hidden = false;
        elemTagsError.textContent = "?????? ???????? ???????????????? ????????????????????????";
        flagSuccess = false;
    }

    if (flagSuccess)
    {
        let data = {
            source: source,
            category: category,
            datetime: datetime,
            title: title,
            description: description,
            text: text,
            tags: tags
        };

        let response = await fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok)
        {
            elemResultAdd.textContent = "?????????????????? ???????????? ??????????????????";
        }
        else
        {
            elemResultAdd.textContent = "?????????????????? ???????????? ???? ????????????????????. ???????????????????? ?????? ??????";
        }
    }
}

function generatePageElementStr(page, text, data)
{
    let elemStr = "<button type=\"button\" class=\"btn btn-outline-primary\" style='margin-left: 20px' onclick='showArticlesOnPage(" + page.toString() + "," + JSON.stringify(data) + ")'>" + text + "</button>";
    return elemStr;
}

function generatePagesButton(page, pageLimit, countArticles, data)
{
    let elemDivPages = document.getElementById("pagesElements");

    let lastPage = Math.ceil(countArticles / pageLimit);

    let firtsPageElemStr = generatePageElementStr(1, '1', data);
    let lastPageElemStr = generatePageElementStr(lastPage, lastPage.toString(), data);
    let prevPageElemStr = generatePageElementStr(page - 1, '????????????????????', data);
    let nextPageElemStr = generatePageElementStr(page + 1, '??????????????????', data);

    let buttonsStr = "";

    if (page != 1)
    {
        buttonsStr = buttonsStr + firtsPageElemStr + prevPageElemStr;
    }

    if (page != lastPage)
    {
        buttonsStr = buttonsStr + nextPageElemStr + lastPageElemStr;
    }

    elemDivPages.innerHTML = buttonsStr;
}

async function showArticlesOnPage(page, data)
{
    let category;
    let dateStart;
    let dateEnd;
    let sort;
    let sortType;
    let pageLimit;

    let dataSave;

    if (data === null)
    {
        dataSave = false;
    }
    else
    {
        dataSave = true;
    }

    if (!dataSave)
    {
        category = document.getElementById("categoryFilter").value;
        dateStart = document.getElementById("dateStartFilter").value;
        dateEnd = document.getElementById("dateEndFilter").value;
        sort = document.getElementById("sortFilter").value;
        sortType = document.getElementById("sortTypeFilter").value;
        pageLimit = document.getElementById("pageLimitFilter").value;

        elemGetResult = document.getElementById("articlesPreview");
        elemLenResult = document.getElementById("countElements");
        elemPagination = document.getElementById("pagesElements");

        elemGetResult.textContent = "";
        elemLenResult.textContent = "";
        elemPagination.textContent = "";

        elemDateStartError = document.getElementById("dateStartFilterError");
        elemDateEndError = document.getElementById("dateEndFilterError");
        elemSortError = document.getElementById("sortFilterError");
        elemSortTypeError = document.getElementById("sortTypeFilterError");

        elemDateStartError.hidden = true;
        elemDateEndError.hidden = true;
        elemSortError.hidden = true;
        elemSortTypeError.hidden = true;

        let flagSuccess = true;

        if (category == '')
        {
            category = null;
        }

        if (dateStart != '')
        {
            if ((new Date(dateStart)).getTime() > (new Date("9999-12-29")).getTime() || (new Date(dateStart)).getTime() < (new Date("0001-01-01")).getTime())
            {
                elemDateStartError.hidden = false;
                elemDateStartError.textContent = "???????? ?????????? ???? ?????????????????????? ??????????????????";
                flagSuccess = false;
            }
        }

        if (dateEnd != '')
        {
            if ((new Date(dateEnd)).getTime() > (new Date("9999-12-29")).getTime() || (new Date(dateEnd)).getTime() < (new Date("0001-01-01")).getTime())
            {
                elemDateEndError.hidden = false;
                elemDateEndError.textContent = "???????? ?????????? ???? ?????????????????????? ??????????????????";
                flagSuccess = false;
            }
        }

        if (dateStart != '' && dateEnd == '')
        {
            dateEnd = '9999-12-29';
        }

        if (dateStart == '' && dateEnd != '')
        {
            dateStart = '0001-01-01';
        }

        if (dateStart != '' && dateEnd != '')
        {
            if ((new Date(dateStart)).getTime() > (new Date(dateEnd)).getTime())
            {
                elemDateStartError.hidden = false;
                elemDateEndError.hidden = false;
                elemDateStartError.textContent = "???????????????????????? ???????????????? ??????";
                elemDateEndError.textContent = "???????????????????????? ???????????????? ??????";
                flagSuccess = false;
            }
        }

        if (dateStart == '' && dateEnd == '')
        {
            dateStart = null;
            dateEnd = null;
        }

        if (sort != '' && sortType == '')
        {
            elemSortTypeError.hidden = false;
            elemSortTypeError.textContent = "???????????????????? ?????????????? ?????????????????????? ????????????????????";
            flagSuccess = false;
        }

        if (sort == '' && sortType != '')
        {
            elemSortError.hidden = false;
            elemSortError.textContent = "???????????????????? ?????????????? ???????? ?????? ????????????????????";
            flagSuccess = false;
        }

        if (sort == '' && sortType == '')
        {
            sort = null;
            sortType = null;
        }

        if (sort != '' && sortType != '')
        {
            if (sort == '?????????? ????????????????????')
            {
                sort = "datetime";
            }
            else
            {
                if (sort == '??????????????????')
                {
                    sort = "category";
                }
            }

            if (sortType == '???? ??????????????????????')
            {
                sortType = "asc";
            }
            else
            {
                if (sortType == '???? ????????????????')
                {
                    sortType = "desc";
                }
            }
        }

        if (flagSuccess)
        {
            let dataForFetch = {
                category: category,
                dateStart: dateStart,
                dateEnd: dateEnd,
                sort: sort,
                sortType: sortType,
                page: page,
                pageLimit: parseInt(pageLimit)
            };

            let dataForPagination = {
                category: category,
                dateStart: dateStart,
                dateEnd: dateEnd,
                sort: sort,
                sortType: sortType,
                pageLimit: parseInt(pageLimit)
            };

            let response = await fetch('/api/articles/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForFetch)
            });

            if (response.ok)
            {
                let articlesInformation = await response.json();
                showArticlesPreview(articlesInformation, elemLenResult, elemGetResult);
                generatePagesButton(page, parseInt(pageLimit), articlesInformation.len, dataForPagination);
            }
            else
            {
                elemGetResult.textContent = "???? ?????????????? ???????????????? ?????????????????? ????????????. ???????????????????? ?????? ??????";
            }
        }

    }
    else
    {
        elemGetResult = document.getElementById("articlesPreview");
        elemLenResult = document.getElementById("countElements");
        elemPagination = document.getElementById("pagesElements");

        elemGetResult.textContent = "";
        elemLenResult.textContent = "";
        elemPagination.textContent = "";

        elemDateStartError = document.getElementById("dateStartFilterError");
        elemDateEndError = document.getElementById("dateEndFilterError");
        elemSortError = document.getElementById("sortFilterError");
        elemSortTypeError = document.getElementById("sortTypeFilterError");

        elemDateStartError.hidden = true;
        elemDateEndError.hidden = true;
        elemSortError.hidden = true;
        elemSortTypeError.hidden = true;

        let saveDataFromPagination = data;
        let saveDataForFetch = {
            category: saveDataFromPagination.category,
            dateStart: saveDataFromPagination.dateStart,
            dateEnd: saveDataFromPagination.dateEnd,
            sort: saveDataFromPagination.sort,
            sortType: saveDataFromPagination.sortType,
            page: page,
            pageLimit: saveDataFromPagination.pageLimit
        };

        let response = await fetch('/api/articles/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saveDataForFetch)
        });

        if (response.ok)
        {
            let articlesInformation = await response.json();
            showArticlesPreview(articlesInformation, elemLenResult, elemGetResult);
            generatePagesButton(page, saveDataFromPagination.pageLimit, articlesInformation.len, saveDataFromPagination);
        }
        else
        {
            elemGetResult.textContent = "???? ?????????????? ???????????????? ?????????????????? ????????????. ???????????????????? ?????? ??????";
        }
    }
}

function showArticlesPreview(articlesInformation, elemLen, elemArticles)
{
    elemLen.textContent = "???????????????????? ???????????? ???? ??????????????: " + articlesInformation.len.toString();
    let articlesStr = "";

    for (let i = 0; i < articlesInformation.articles.length; i++)
    {
        articlesStr = articlesStr + "<div style='margin-bottom: 10px;border-radius: 13px; background-color: #F0F8FF;' class=\"border border-5\" class=\"border border-primary\"'><a style='margin-left: 10px;font-size: 17px' href='/articles/" + articlesInformation.articles[i]["id"].toString() + "'>?????????????????? ???????????? ???" + articlesInformation.articles[i]["id"].toString() + "</a>";
        articlesStr = articlesStr + "<h6 style='margin-left: 10px'>??????????????????: " + articlesInformation.articles[i]["title"] + "</h6>";
        articlesStr = articlesStr + "<p style='margin-left: 10px'>???????? ????????????????????: " + articlesInformation.articles[i]["datetime"] + "</p>";
        if (articlesInformation.articles[i]["description"] !== 'None')
        {
            articlesStr = articlesStr + "<p>????????????????: " + articlesInformation.articles[i]["description"] + "</p>";
        }
        if (articlesInformation.articles[i]["tags"].length != 0)
        {
            articlesStr = articlesStr + "<p>????????: ";
            for (let j = 0; j < articlesInformation.articles[i]["tags"].length; j++)
            {
                articlesStr = articlesStr + articlesInformation.articles[i]["tags"][j];
                if (j != articlesInformation.articles[i]["tags"].length - 1)
                {
                    articlesStr = articlesStr + ",";
                }
            }
        }
        articlesStr = articlesStr + "</div>";
    }

    elemArticles.innerHTML = articlesStr;
}