const addToCartButtonElements = document.getElementsByClassName("addtocart");
const cartQuantitySpans = document.querySelectorAll(".nav-items .badge");
async function addToCart(event) {
  const button = event.target;
  // const productId = addToCartButtonElement.dataset.productid;
  // const csrfToken = addToCartButtonElement.dataset.csrf;
  const productId = button.dataset.productid;
  const csrfToken = button.dataset.csrf;
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


for(const addToCartButtonElement of addToCartButtonElements){
  addToCartButtonElement.addEventListener('click', addToCart);
}
