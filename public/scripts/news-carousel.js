const newsCarousel = document.getElementById('news-carousel');

if(news.length <= 3){
    for(let i = 0; i < news.length; i++){
        newsCarousel.parentNode.innerHTML += `
                <article class='col-md-4 news-elem'>
                    <img src=${news[i].image} class='news-elem__content news-elem__img' alt='image for the news article: ${news[i].title}'>
                    <h3 class='smaller-title news__elem-content'>${news[i].title}</h3>
                    <p class='small-text news__elem-content news-card__text'>${news[i].text.slice(0, 200)}...</p>
                    <a class='btn-white rounded-0 news-elem__content news-elem__btn d-inline-block w-100 border border-2 border-dark' href='/news/${news[i].id}'>READ</a>
                </article>
            `;
    }
}

if(window.screen.width <= 600){
    createMobileNewsSliderElements();
} else {
    createDesctopNewsSliderElements();
}

function createDesctopNewsSliderElements(){
    let arr = createGroups(news, 3);
    for(let i = 0; i < arr.length; i++){
        if(arr[i].length !== 0){
            if(i === 0){
                let rowContent = '';
                let activeItem = document.createElement('div');
                let row = document.createElement('div');
                row.classList.add('row');
                activeItem.append(row);
                activeItem.classList.add('active');
                activeItem.classList.add('carousel-item');
                newsCarousel.append(activeItem);
                for(let j = 0; j < arr[i].length; j++){
                    rowContent += `
                <article class='col-md-4 news-elem'>
                    <img src=${news[j].image} class='news-elem__content news-elem__img' alt='image for the news article: ${news[j].title}'>
                    <h3 class='smaller-title news__elem-content'>${news[j].title}</h3>
                    <p class='small-text news__elem-content news-card__text'>${news[j].text.slice(0, 200)}...</p>
                    <a class='btn-white rounded-0 news-elem__content news-elem__btn d-inline-block w-100 border border-2 border-dark' href='/news/${news[j].id}'>READ</a>
                </article>`;
                }
                row.innerHTML = rowContent;
            } else {
                let rowContent = '';
                let inactiveItem = document.createElement('div');
                let row = document.createElement('div');
                row.classList.add('row');
                inactiveItem.append(row);
                inactiveItem.classList.add('carousel-item');
                newsCarousel.append(inactiveItem);
                for(let j = 0; j < arr[i].length; j++){
                    rowContent += `
                <article class='col-md-4 news-elem'>
                    <img src=${news[j].image} class='news-elem__content news-elem__img' alt='image for the news article: ${news[j].title}'>
                    <h3 class='smaller-title news__elem-content'>${news[j].title}</h3>
                    <p class='small-text news__elem-content news-card__text'>${news[j].text.slice(0, 200)}...</p>
                    <a class='btn-white rounded-0 news-elem__content news-elem__btn d-inline-block w-100 border border-2 border-dark' href='/news/${news[j].id}'>READ</a>
                </article>`;
                }
                row.innerHTML = rowContent;
            }
        }
    }
}
function createMobileNewsSliderElements(){
    for(let i = 0; i < news.length; i++){
        if(i === 0){
            newsCarousel.innerHTML += `
            <div class='carousel-item active p-2'>
                <article>
                   <img src=${news[i].image} class='news-elem__content news-elem__img' alt='image for the news article: ${news[i].title}'>
                   <h3 class='smaller-title news__elem-content'>${news[i].title}</h3>
                   <p class='small-text news__elem-content news-card__text'>${news[i].text.slice(0, 200)}</p>
                   <a class='btn-white rounded-0 news-elem__content news-elem__btn d-inline-block w-100 border border-2 border-dark' href='/news/${news[i].id}'>READ</a>
                </article>
            </div>`;
        }
        newsCarousel.innerHTML += `
            <div class='carousel-item p-2'>
                <article>
                   <img src=${news[i].image} class='news-elem__content news-elem__img' alt='image for the news article: ${news[i].title}'>
                   <h3 class='smaller-title news__elem-content'>${news[i].title}</h3>
                   <p class='small-text news__elem-content news-card__text'>${news[i].text.slice(0, 200)}</p>
                   <a class='btn-white rounded-0 news-elem__content news-elem__btn d-inline-block w-100 border border-2 border-dark' href='/news/${news[i].id}'>READ</a>
                </article>
            </div>`;
    }
}