const addToCartButtonElement = document.querySelector(".product-details button");
const cartQuantitySpans = document.querySelectorAll(".nav-items .badge");
async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;
  let response;
  try {
    response = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify({
          productId: productId,
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

  const newTotalQuantity = responseData.newTotalItems;
  for (const cartQuantitySpan of cartQuantitySpans) {
    cartQuantitySpan.textContent = newTotalQuantity;
  }
}

addToCartButtonElement.addEventListener('click', addToCart);
