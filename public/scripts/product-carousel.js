const productImages = document.getElementById('product-images');
let productColorsList = document.getElementById('colors-list');
const productColorName = document.getElementById('product-color-name');
const productImagesInCategory = document.getElementsByClassName('product-images');
let productCarouselIndicators = document.getElementsByClassName('carousel-indicators');

let carouselItems = [];

if(productImagesInCategory &&  categoryGoods !== null && productCarouselIndicators){
    productCarouselIndicators = [...productCarouselIndicators];
    for(let i = 0; i < categoryGoods.length; i++){
        let carouselItem = '';
        for(let j = 0; j < categoryGoods[i].images.length; j++){
            if(j === 0){
                carouselItem += `
                        <div class='carousel-item active'>
                            <img src='/images/bikes/${categoryGoods[i].images[j].images.split(',')[0]}' class='d-block product-img__bike w-100' alt='bike'>
                        </div>`;
                productCarouselIndicators[i].innerHTML += `<button type='button' data-bs-target='#product-images${categoryGoods[i].id}' data-bs-slide-to='${j}' class='active' aria-current='true' aria-label='Slide ${j}'></button>`;
            }
            else{
                carouselItem += `
                        <div class='carousel-item'>
                            <img src='/images/bikes/${categoryGoods[i].images[j].images.split(',')[0]}' class='d-block product-img__bike w-100' alt='bike'>
                        </div>`;
                productCarouselIndicators[i].innerHTML += `<button type='button' data-bs-target='#product-images${categoryGoods[i].id}' data-bs-slide-to='${j}' aria-label='Slide ${j}'></button>`;
            }
        }
        carouselItems.push(carouselItem);
    }
    for(let i = 0; i < productImagesInCategory.length; i++){
        productImagesInCategory[i].innerHTML = carouselItems[i];
    }
}

if(productColorsList){
    productColorsList = [...productColorsList.children];
    findSelectedColorAndAddListener(productColorsList);
}

function findSelectedColorAndAddListener(arr){
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if(item.classList.contains('product-info__elem-color_selected')){
            createCarousel(item.style.background);
        }
        item.addEventListener('click', changeActiveClass);
    }
}

function changeActiveClass(e){
    for (let i = 0; i <  productColorsList.length; i++) {
        const item =  productColorsList[i];
        item.classList.remove('product-info__elem-color_selected');
    }
    e.target.classList.add('product-info__elem-color_selected');

    createCarousel(e.target.style.background);
}

function createCarousel(color){
    for(let item of productData.images){
        let indicators = '';
        if(item.color === color){
            productColorName.innerHTML = `<b>Color:</b> ${color}<br>`;
            let images = item.images.split(',');
            if(images.length < 2){
                productImages.innerHTML = `<img src='/images/bikes/${images[0]}' class='d-block product-img__bike w-100' alt='bike'>`;
            }
            else{
                for(let i = 0; i < images.length; i++){
                    if(i === 0){
                        carouselItems = `
                        <div class='carousel-item active px-3'>
                            <img src='/images/bikes/${images[i].trim()}' class='d-block product-img__bike w-100' alt='bike'>
                        </div>`;
                        indicators += `<button type='button' data-bs-target='#product-images' data-bs-slide-to='${i}' class='active' aria-current='true' aria-label='Slide ${i}'></button>`;
                    }
                    else{
                        carouselItems += `
                        <div class='carousel-item px-3'>
                            <img src='/images/bikes/${images[i].trim()}' class='d-block product-img__bike w-100' alt='bike'>
                        </div>`;
                        indicators += `<button type='button' data-bs-target='#product-images' data-bs-slide-to='${i}' aria-label='Slide ${i}'></button>`;
                    }
                }
                productImages.innerHTML = `
                 <div class='carousel-indicators'>${indicators}</div>
                 <div class='carousel-inner' id='product-images-carousel' xmlns='http://www.w3.org/1999/html'>${carouselItems}</div>
                  <button class='carousel-control-prev' type='button' data-bs-target='#product-images' data-bs-slide='prev'>
                        <span class='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span class='visually-hidden'> Previous </span>
                  </button>
                   <button class='carousel-control-next' type='button' data-bs-target='#product-images' data-bs-slide='next'>
                        <span class='carousel-control-next-icon' aria-hidden='true'></span>
                        <span class='visually-hidden'>Next</span> 
                   </button>`;
            }
        }
    }
}
