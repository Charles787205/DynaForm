var delay;
function handler (event) {
  const loader = document.getElementById("change-indicator");
  const loader_text = document.getElementById("change-text");
  const indicator = document.getElementById("change"); 
  loader.style.display = "fleYYZZZx";
  loader_text.innerHTML = "Saving";
  indicator.style.display = "flex";

  clearTimeout(delay);
    delay =  setTimeout(() => {

      console.log("Saved");
      updateForm();      
      loader_text.innerHTML = "All changes saved.";
      loader.style.display = "none";
    }, 500);
    
};
document.getElementById("form").addEventListener("drop", handler);
document.getElementById("form").addEventListener("click", handler);
document.getElementById("form").addEventListener("change", handler);
document.getElementById("form").addEventListener("input", handler);