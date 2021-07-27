const productReviewsList = document.getElementById('reviews-list');
let reviewsBtnsBlock = document.getElementsByClassName('reviews-btns')[0];
const reviewForm = document.forms['review-form'];

const leaveAReviewBtn = document.getElementById('leaveAReviewBtn');
const sendReviewBtn = document.getElementById('send-review');

leaveAReviewBtn.onclick = () => {
    reviewForm.classList.toggle('d-none');
    let productEvaluationItems = [...document.getElementById('product-evaluation').children];
    addEvalution(productEvaluationItems);
}


if(productReviewsList && [...productReviewsList.children].length > 2){
    let str = '';
    for(let i = 0 ; i < 2; i++){
        str += [...productReviewsList.children][i].innerHTML;
    }
    productReviewsList.innerHTML = str;
    let showMoreReviewsBtn = document.createElement('a');
    showMoreReviewsBtn.className = 'btn-black border border-2 border-dark';
    showMoreReviewsBtn.innerHTML = 'Show more?';
    showMoreReviewsBtn.setAttribute('href', `/reviews/${productData.id}`);
    reviewsBtnsBlock.appendChild(showMoreReviewsBtn);
}
else if(productReviewsList && [...productReviewsList.children].length === 0){
    productReviewsList.innerHTML = 'no reviews yet';
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


sendReviewBtn.onclick = sendReview;

const reviewerName = reviewForm.elements['user-name'];
const reviewText = reviewForm.elements['review-text'];

async function sendReview(){
    let evaluationStars = [];
    let productEvaluationItems = [...document.getElementById('product-evaluation').children];
    for(let item of productEvaluationItems){
        if(item.className === 'star_active fas fa-star'){
            evaluationStars.push(productEvaluationItems[item]);
        }
    }

    let data = JSON.stringify({
        name: reviewerName.value.trim(),
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
