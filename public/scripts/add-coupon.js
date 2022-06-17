  const totalPriceCartElement = document.querySelector("#cart-total-price");
  const addCouponFormElement = document.querySelector("#coupon-form");
  const showErrorMessageElement = document.querySelector(".error-message");
  const showSuccessMessageElement = document.querySelector(".success-message");
  const discountDetails = document.querySelector("#discount-detailsss")

  async function applyCoupon(event) {
    event.preventDefault();
    const form = event.target;
    
    const csrfToken = form.dataset.csrf;
    const code =  form.firstElementChild.value;
    let response;
  
    try {
      response = await fetch("/coupon", {
        method: "POST",
        body: JSON.stringify({
          code: code,
          _csrf: csrfToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
        showErrorMessageElement.style.display = 'block';
      return;
    }
  
    if (!response.ok) {
      showErrorMessageElement.style.display = 'block';
     return;
    }
  
    const responseData = await response.json();
  
    if(responseData.message){
      showErrorMessageElement.textContent = "Coupon already applied!";
      showErrorMessageElement.style.display = 'block';
      return;
    }
    totalPriceCartElement.textContent = responseData.totalPrice.toFixed(2);

    
    showSuccessMessageElement.style.display = 'block';
    showErrorMessageElement.style.display = 'none';
    if(responseData.coupon.type === 'persentage'){
      discountDetails.textContent = `Coupon Discount: ${responseData.coupon.discount}%`
}else{
      discountDetails.textContent = `Coupon Discount: $${responseData.coupon.discount}`
}
    discountDetails.style.display = 'block';
  }

  addCouponFormElement.addEventListener("submit",applyCoupon);
  
  