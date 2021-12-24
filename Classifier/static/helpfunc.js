function footer() {
    const
        main = document.getElementsByTagName('main')[0],
        footer = document.getElementsByTagName('footer')[0]

    main.style.paddingBottom = footer.clientHeight + 'px'
}

window.addEventListener('load', footer);
window.addEventListener('resize', footer);


function updateMe() {
    var source = document.getElementById('source');
    var category = document.getElementById('category');
    var datetime = document.getElementById('datetime');
    var title = document.getElementById('title');
    var description = document.getElementById('description');
    var text = document.getElementById('text')
    var tags = document.getElementById('tags');
    var updatebutton = document.getElementById('updatebutton');
    var first = document.getElementById('first');

updatebutton.style.visibility = 'visible';
source.disabled = 'False';
category.disabled = 'false';
datetime.disabled = 'false';
title.disabled = 'false';
description.disabled = 'false';
tags.disabled = 'false';
text.disabled = 'false'
first.disabled = 'true';
}

function hideMe() {
var loading = document.getElementById("myButton");
var loading2 = document.getElementById("button");
var loading3= document.getElementById("button3")
loading2.style.visibility = 'visible';
loading.disabled = 'true';
loading3.style.visibility = 'visible';
}

function hideMe2(){
var loading = document.getElementById("button");
var loading3= document.getElementById("button3");
var loading2 = document.getElementById("myButton");
loading.style.visibility = 'hidden';
loading3.style.visibility = 'hidden';
loading2.disabled = 'false';
location.reload()
}
