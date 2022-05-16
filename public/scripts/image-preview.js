const imagePreviewInput = document.querySelector("#image-upload-control input");
const imagePreviewImage = document.querySelector("#image-upload-control img");

function showImagePreview(){
const files = imagePreviewInput.files;

if(!files || files.length === 0){
    imagePreviewImage.style.display = 'none';
    return;
}
const pickedFile = files[0];
const imageUrl = URL.createObjectURL(pickedFile);
imagePreviewImage.src = imageUrl;
imagePreviewImage.style.display = 'block';


}

imagePreviewInput.addEventListener("change",showImagePreview);