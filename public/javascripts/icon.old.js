"use strict";

var hash = {
    _border: "",
    _waves: "",
    _dot: "",
    get border() {
        return hash._border;
    },
    set border(val) {
        hash._border = val;
        hash.updateLocation();
    },
    get waves() {
        return hash._waves;
    },
    set waves(val) {
        hash._waves = val;
        hash.updateLocation();
    },
    get dot() {
        return hash._dot;
    },
    set dot(val) {
        hash._dot = val;
        hash.updateLocation();
    },
    updateLocation: function() {
        location.hash = hash.border + '/' + hash.waves + '/' + hash.dot;
    }
}

if(document.forms['Symbol.iterator']) {
    for(var form of document.forms) {
        for(var control of form) {
            addEvents(form, control, true);
        }
    }
} else {
    for(var i = 0; i < document.forms.length; i++) {
        var form = document.forms[i];
        for(var j = 0; j < form.length; j++) {
            var control = form[j];
            addEvents(form, control, false);
        }
    }
}

function addEvents(form, control, forOf) {
    var shape = document.querySelector('#' + form.name);
    control.parentElement.addEventListener('click', (function(className) {
        return function(e) {
            shape.previousClassName = shape.attributes.getNamedItem('class').value;
            if(shape.previousClassName != '')
                shape.classList.remove(shape.previousClassName);
            shape.classList.add(className);
            if(forOf)
                for(var input of form)
                    input.parentElement.classList.remove('checked');
            else
                for(var i = 0; i < form.length; i++)
                    form[i].parentElement.classList.remove('checked');
            control.parentElement.classList.add('checked');
            hash[form.name] = className;
        }
    })(control.parentElement.className));
}


if(location.hash != "") {
    location.hash.substr(1).split('/').forEach(function (str, index) {
        switch (index) {
        case 0:
            document.forms['border'].querySelector('.'+str).click();
            break;
        case 1:
            document.forms['waves'].querySelector('.'+str).click();
            break;
        case 2:
            document.forms['dot'].querySelector('.'+str).click();
            break;
        }
    });
}