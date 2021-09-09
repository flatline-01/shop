const en = document.getElementById('en');
const ru = document.getElementById('ru');

if(getCookie('lang') === 'en' || getCookie('lang') == undefined){
    en.classList.add('selected_language');
} 
if(getCookie('lang') === 'ru'){
    ru.classList.add('selected_language');
}

en.addEventListener('click', function() {
    langue(en, ru);
    setCookie('lang', en.innerHTML.toLowerCase());
    window.location.reload();
}, false);

ru.addEventListener('click', function() {
    langue(ru, en);
    setCookie('lang', ru.innerHTML.toLowerCase());
    window.location.reload();
}, false);

function langue(langueOn, langueOff){
    if (!langueOn.classList.contains('selected_language')){
        langueOn.classList.toggle('selected_language');
        langueOff.classList.toggle('selected_language');
    } 
    if(langueOn.classList.contains('selected_language')){
        setCookie('lang', langueOn.innerHTML.toLowerCase());
    } else {
        setCookie('lang', langueOff.innerHTML.toLowerCase());
    }
}
