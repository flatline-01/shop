const searchField = document.querySelector('.search-form__input');
const searchResults = document.querySelector('.search_results');

function changeSearchStyles(x) {
    if (x.matches) {
        searchField.parentNode.onclick = () => {
            searchField.parentNode.parentNode.nextSibling.classList.remove('col-7');
            searchField.parentNode.parentNode.nextSibling.classList.add('col-10');
            searchField.parentNode.parentNode.classList.remove('col-2');
            searchField.parentNode.parentNode.classList.add('col-10');
            searchField.parentNode.firstChild.style.left = '1%';
        }
    }
}

const mediaQuery = window.matchMedia('(max-width: 750px)')
changeSearchStyles(mediaQuery);
mediaQuery.addListener(changeSearchStyles);


searchField.onkeyup = async () => {
    searchResults.style.display = 'block';
    searchField.style.borderRadius = '10px 10px 0 0';
    if(searchField.value !== ''){
        searchResults.innerHTML = '';

        let data = JSON.stringify({
            search_aim: searchField.value.trim().toLowerCase()
        });
        let response = await  fetch('/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        });
        let result = await response.json();

        if(result.categories.length === 0 && result.goods.length === 0 && result.news.length === 0){
            searchField.style.boxShadow = 'none';
            searchResults.innerHTML = 'no results';
        }

        for(let item in result){

            if(result[item].length !== 0 ){
                result[item].forEach((elem) => {
                    if(result[item] === result.categories){
                        searchResults.innerHTML += `
                    <li class='px-2'>
                        <a href='/category/${elem['id']}'>
                            <p>category: <b>${elem.name.toUpperCase()}</b></p>
                        </a>
                    </li>
                   `;
                    }
                    if(result[item] === result.goods ){
                        searchResults.innerHTML += `
                    <li class='px-2'>
                        <a href='/product/${elem['id']}' class='row'>
                            <img src='/images/icons/bike.png' class='col-3'>
                            <p class='col-8 text'><b>${elem.name.toUpperCase()}</b><br> ${elem.cost}$ </p>
                        </a>
                    </li>
                   `;
                    }
                    if(result[item] === result.news ){
                        searchResults.innerHTML += `
                    <li class='px-2'>
                        <a href='/news/${elem['id']}'>
                            <p>news: <b>${elem.title}</b></p>
                        </a>
                    </li>
                   `;
                    }
                });
            }
        }
    }
}

searchField.onblur = () => {
    setTimeout(()=>{
        searchResults.style.display = 'none';
        searchField.style.borderRadius = '30px';
        searchField.value = '';
    }, 300)
}