const productReviewsList = document.getElementById('reviews-list');
let reviewsBtnsBlock = document.getElementsByClassName('reviews-btns')[0];
const reviewForm = document.forms['review-form'];

const leaveAReviewBtn = document.getElementById('leaveAReviewBtn');
const sendReviewBtn = document.getElementById('send-review');

if(leaveAReviewBtn){
    if(sessionStorage.getItem('logged_in')){
        leaveAReviewBtn.onclick = () => {
            reviewForm.classList.toggle('d-none');
            let productEvaluationItems = [...document.getElementById('product-evaluation').children];
            addEvalution(productEvaluationItems);
        }
    } else {
        leaveAReviewBtn.onclick = () => {
            let warning = document.getElementById('warning');
            warning.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show fixed-bottom w-75" role="alert" style='margin-left: 10%;'>
                <strong>Error!</strong> You need to register to leave a review.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        }
    }
}


if(productReviewsList && [...productReviewsList.children].length > 2){
    let str = '';
    for(let i = 0 ; i < 2; i++){
        str += [...productReviewsList.children][i].innerHTML;
    }
    productReviewsList.innerHTML = str;
    let showMoreReviewsBtn = document.createElement('a');
    showMoreReviewsBtn.className = 'btn-black border border-2 border-dark';
    showMoreReviewsBtn.innerHTML = (getCookie('lang') === 'ru') ? 'Показать все отзывы' : 'Show all reviews';
    showMoreReviewsBtn.setAttribute('href', `/reviews/${productData.id}`);
    reviewsBtnsBlock.appendChild(showMoreReviewsBtn);
}
else if(productReviewsList && [...productReviewsList.children].length === 0){
    productReviewsList.innerHTML = (getCookie('lang') === 'ru') ? 'Пока нет отзывов.' : 'No reviews yet.';
}

function addEvalution(arr){
    const starClassActive = "star_active fas fa-star";
    const starClassInactive = "star far fa-star";
    let i;
    arr.map((item) => {
        item.onclick = () => {
            i = arr.indexOf(item);
            if(item.className === starClassInactive){
                for(i; i >=0; --i){
                    arr[i].className = starClassActive;
                }
            } else{
                for(i; i < arr.length; ++i){
                    arr[i].className = starClassInactive;
                }
            }
        }
    });
}

if(sendReviewBtn){
    sendReviewBtn.onclick = sendReview;
}

let reviewerName = null;
let reviewText   = null;

if(reviewForm){
    reviewerName = reviewForm.elements['user-name'];
    reviewText   = reviewForm.elements['review-text'];
}


async function sendReview(){
    let evaluationStars = [];
    let productEvaluationItems = [...document.getElementById('product-evaluation').children];
    for(let item of productEvaluationItems){
        if(item.className === 'star_active fas fa-star'){
            evaluationStars.push(productEvaluationItems[item]);
        }
    }

    let data = JSON.stringify({
        name: `${JSON.parse(sessionStorage.getItem('data')).firstName}`,
        text: reviewText.value.trim(),
        evalution: evaluationStars.length,
        good_id: productData.id
    });
    let response = await  fetch('/reviews/:id', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });
    await response.json();
}
