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
    var pipewarpText3 = $('.anim4');
    var pipewarpText4 = $('.anim5');
    var pipewarpText5 = $('.anim6');

    setTimeout(function() {
        pipewarpText.fadeIn(2000);
        pipewarpText2.fadeIn(200);
        pipewarpText3.fadeIn(400);
        pipewarpText4.fadeIn(800);
        pipewarpText5.fadeIn(1000);
    }, 1500);
}

