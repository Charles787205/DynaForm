const onSubmit = (event) => {
  console.log("hesdfds");
  event.preventDefault();
  const form = event.target;
  console.log(form);
};

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
  showTooltip(element);
}

function generateName() {
  const form = document.getElementById("form");
  const inputs = form.querySelectorAll("input, textarea, radio, select");
  return `input${inputs.length + 1}`;
}

function showTooltip(element) {
  const rect = element.getBoundingClientRect();
  const tooltip = document.getElementById("tooltip");
  tooltip.classList.remove("hidden");
  tooltip.style.top =
    rect.bottom - 25 + window.scrollY - element.offsetHeight / 2 + "px";
  tooltip.style.left = rect.left - 250 + "px";
  tooltip.setAttribute("hx-target", "#" + element.id);
}

let index = 0;
document.addEventListener("htmx:afterSwap", function (e) {
  let element = e.target;
  if (element.id != "tooltip" && element.closest("#form")) {
    let newElement = element.nextElementSibling;
    if (!element.id) {
      element.setAttribute("id", "element_" + index);
    } else if (element.id && newElement) {
      newElement.setAttribute("id", "element_" + index);
    }
    index++;
    element.addEventListener("focus", function () {
      showTooltip(element);
    });
    element.addEventListener("mouseenter", function () {
      showTooltip(element);
    });
    if (newElement) {
      newElement.addEventListener("focus", function () {
        showTooltip(newElement);
      });
      newElement.addEventListener("mouseenter", function () {
        showTooltip(newElement);
      });
    }
  }
});
