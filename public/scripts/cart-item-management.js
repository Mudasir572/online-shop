const updateCartFormElements = document.querySelectorAll(
  ".cart-item-management"
);

const cartTotalPriceElement = document.querySelector("#cart-total-price");
const cartQuantityBadges = document.querySelectorAll(".nav-items .badge");
const cartItemUpdateStatus = document.getElementById('cart-item-update-status')

async function updateCart(event) {
  event.preventDefault();
  const form = event.target;
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;
  let response;

  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
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

if(responseData.errorMessage){
  cartItemUpdateStatus.textContent = "Quantity limit is 4";
cartItemUpdateStatus.style.display = 'block';
return;
}

  if(responseData.updatedCartData.newTotalQuantity === 0){
    location.reload();
  }
  
  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');
    cartItemTotalPriceElement.textContent =
    responseData.updatedCartData.updatedItemPrice.toFixed(2);
    
  }

  cartTotalPriceElement.textContent =
    responseData.updatedCartData.newTotalPrice.toFixed(2);

  for (const badgeElement of cartQuantityBadges) {
    badgeElement.textContent = responseData.updatedCartData.newTotalQuantity;
  }
  if(responseData.couponApplied === true){
    location.reload();
  }

}

for (const formElement of updateCartFormElements) {
  formElement.addEventListener("submit", updateCart);
}
