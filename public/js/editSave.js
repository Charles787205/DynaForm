var delay;
const handler = (event) => {
   clearTimeout(delay);
    delay =  setTimeout(() => {
      console.log("Savable");
      updateForm();      
    }, 500);
};
document.addEventListener("drop", handler);
document.addEventListener("input", handler);