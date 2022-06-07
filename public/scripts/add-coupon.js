
  const TotalPriceCartElement = document.querySelector("#cart-total-price");
  const addCouponFormElement = document.querySelector("#coupon-form");
  
  
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
      alert("Something went wrong!");
      return;
    }
  
    if (!response.ok) {
      alert("Something went wrong!");
      return;
    }
  
    const responseData = await response.json();
  
    TotalPriceCartElement.textContent = responseData.totalPrice;
   
  }

  addCouponFormElement.addEventListener("submit",applyCoupon);
  
  