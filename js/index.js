const homeTextEnd = "./displayPage.sh";

$(document).ready(function () {
    var textObject = document.querySelector('.typing');
    setTimeout(function() {
        startTyping1(0, textObject)
    }, 1500);
});

function startTyping1(i, obj) {
    if (obj.innerHTML.length < homeTextEnd.length) {
        obj.innerHTML = obj.innerHTML + homeTextEnd.charAt(i);
        setTimeout(function() {
            startTyping1(i+1, obj)
        }, 100);
    }
    else {
        
        obj.style.borderRight = ".15em solid black";
        setTimeout(function() {
            obj.style.animation = "none";
        }, 750);
        endTyping1();
    }
}

function endTyping1() {
    var pipewarpText = $('.anim2');
    var pipewarpText2 = $('.anim3');

    setTimeout(function() {
        pipewarpText.fadeIn(2000);
        pipewarpText2.slideDown(3000);
        pipewarpText2.fadeIn(5000);

    }, 1500);
}

