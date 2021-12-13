async function getInformationClassifier()
{
    let response = await fetch('/api/classifier', {
        method: 'GET'
    });

    let fitInformation = "Error";

    if (response.ok)
    {
        fitInformation = await response.json();
    }

    return fitInformation;
}



async function classify()
{
    let elemTextForClassifierError = document.getElementById("textForClassifierError");
    let elemResult = document.getElementById("resultOfClassifier");
    let elemTextForClassifier = document.getElementById("textForClassifier");
    let textForClassifier = elemTextForClassifier.value;

    elemTextForClassifierError.hidden = true;
    elemResult.textContent = "";

    if (textForClassifier.trim() != '')
    {
        if (textForClassifier.length <= 30000)
        {
            let data = {
                text: textForClassifier
            };

            let response = await fetch('/api/classifier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok)
            {
                let resultClassifier = await response.json();
                elemResult.textContent = resultClassifier.category;
            }
            else
            {
                elemResult.textContent = "Ошибка запроса. Пожалуйста, убедитест в правльном заполнении данных.";
            }
        }
        else
        {
            elemTextForClassifierError.hidden = false;
            elemTextForClassifierError.textContent = "Текст слишком большой. Максимум 30000 символов";
        }
    }
    else
    {
        elemTextForClassifierError.hidden = false;
        elemTextForClassifierError.textContent = "Пустое поле. Введите свой текст.";
    }
}
