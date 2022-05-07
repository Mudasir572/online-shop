const deleteProductButtons = document.querySelectorAll(".delete");

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;
  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  )

  
  if (!response.ok) {
    alert("something went wrong!");
    return;
  }
  buttonElement.parentElement.parentElement.remove();
}

for (const deleteProductButton of deleteProductButtons) {
  deleteProductButton.addEventListener("click", deleteProduct);
}
