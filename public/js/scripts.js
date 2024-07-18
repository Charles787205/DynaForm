function check() {
  if (typeof Storage !== "undefined") {
    console.log("Naa storage:", getFormData());
    localStorage.setItem("saveform", getFormData());
    console.log("Local saved:", localStorage.getItem("saveform"));
  } else {
    console.log("ALA");
  }
}

function submitForm() {
  const formData = getFormData();
  console.log(formData);
  fetch("/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed adding to database:");
    } else if (response.status == 401) {
      window.open("/auth/google", "_self");
    }
  });
}

function updateForm() {
  const formData = getFormData();
  const form = document.getElementById("formID");
  console.log(formData);

  fetch(`/form/${form.textContent}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed adding to database:");
    } else if (response.status == 401) {
      window.open("/auth/google", "_self");
    }
  });
}

function updateForm() {
  const formData = getFormData();
  const form = document.getElementById("formID");
  console.log(formData);

  fetch(`/form/${form.textContent}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed adding to database:");
    } else if (response.status == 401) {
      window.open("/auth/google", "_self");
    }
  });
}

/**
 * Retrieves form data from the DOM and returns it as an object.
 * @returns {Object} The form data object.
 */
function getFormData() {
  const form = document.getElementById("form");
  const formName =
    document.getElementById("form-title").value || "defaultFormName";
  const formDescription =
    form.getAttribute("data-form-description") || "defaultDescription";

  console.log("sadifhbasdifbhasdkljfbadsklfbasdlfkj");

  /**
   *
   * dropdown = {
   * id: "dropdown1",
   * name: "dropdown",
   * type: "dropdown",
   *
   *  options = []
   *
   * }
   */
  const inputBlock = form.querySelectorAll(".input-block");
  console.log(inputBlock);
  const arr = [];
  let tempName = "";
  let dropDownOptions = [];
  const formComponents = [];

  for (let i = 0; i < inputBlock.length; i++) {
    const block = inputBlock[i];

    const contentContainer = block.querySelector(".content-container");
    const id = block.id;
    const name = contentContainer.getAttribute("data-name");
    const type = contentContainer.getAttribute("data-type");
    const forAttr = contentContainer.getAttribute("data-for");
    const required = contentContainer.getAttribute("required");
    var placeholder = contentContainer.getAttribute("placeholder");
    const content = contentContainer.textContent;
    const checked = contentContainer.getAttribute("checked");
    const focus = contentContainer.hasAttribute("autofocus");

    //initialize the component with the id
    const component = { id };
    if (type == "dropdown") {
      if (!tempName) {
        tempName = name;
      } else {
        if (tempName != name) {
          component.content = arr;
          tempName = "";
        }
      }

      dropDownOptions.push(content);
      if (i == inputBlock.length - 1) {
        const dropdown = {
          name: tempName,
          type: "dropdown",
          options: dropDownOptions,
        };
        formComponents.push(dropdown);
        dropDownOptions = [];
        tempName = null;
      }
    } else {
      //check if its different dropdown
      if (tempName && tempName != name) {
        const dropdown = {
          name: tempName,
          type: "dropdown",
          options: dropDownOptions,
        };
        formComponents.push(dropdown);
        dropDownOptions = [];
        tempName = null;
      } 

      if(content){
        component.content = content;
      }

      if (forAttr) {
        component.forAttr = forAttr;
      }
      if (name) {
        component.name = name;
      }
      if (type) {
        component.type = type;
      }
      if (checked) {
        component.checked = checked;
      }
      if (type == "inputfield") {
        placeholder = contentContainer.innerHTML;
      }
      if (focus) {
        component.focus = focus;
      }
      if (required) {
        component.required = required;
      }
      if (placeholder) {
        component.placeholder = placeholder;
      }
      formComponents.push(component);
    }
  }
  return (formData = {
    formName,
    formDescription,
    formComponents,
  });
  //component is new not dropdown
}

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
  showTooltip(element);
}

let draggedElement = null;
let currentDropZone = null;
let targetBlock = null;

function initializeDragAndDrop() {
  document.addEventListener("dragstart", (event) => {
    draggedElement = event.target;
    event.dataTransfer.setData("text/plain", null);
    event.target.style.opacity = 0.5;
    console.log("dragged", draggedElement);
  });

  document.addEventListener("dragend", (event) => {
    if (event.target.classList.contains("input-block")) {
      event.target.style.opacity = "";
      if (currentDropZone) {
        currentDropZone.classList.remove("drag-over");
        currentDropZone = null;
      }
    }
  });
}

function findNearestDropZone(inputBlock, x, y) {
  const dropZones = inputBlock.querySelectorAll(".move-dropzone");
  let nearestDropZone = null;
  let minDistance = Infinity;

  dropZones.forEach((dropZone) => {
    const rect = dropZone.getBoundingClientRect();
    const dx = x - (rect.left + rect.width / 2);
    const dy = y - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      minDistance = distance;
      nearestDropZone = dropZone;
    }
  });

  return nearestDropZone;
}

function initalizeDropzones() {
  document.querySelectorAll(".move-dropzone").forEach((dropzone) => {
    dropzone.addEventListener("dragover", (event) => {
      event.preventDefault();

      const target = event.target.closest(".input-block");

      targetBlock = target;
      if (target && target !== draggedElement) {
        const nearestDropZone = findNearestDropZone(
          target,
          event.clientX,
          event.clientY
        );
        if (nearestDropZone !== currentDropZone) {
          if (currentDropZone) {
            currentDropZone.classList.remove("drag-over");
          }
          nearestDropZone.classList.add("drag-over");
          currentDropZone = nearestDropZone;
        }
      }
    });

    document.addEventListener("dragleave", (event) => {
      if (
        currentDropZone &&
        event.relatedTarget &&
        !event.relatedTarget.closest(".input-block")
      ) {
        currentDropZone.classList.remove("drag-over");
        currentDropZone = null;
      }
    });

    document.addEventListener("drop", (event) => {
      event.preventDefault();
      if (currentDropZone) {
        currentDropZone.classList.remove("drag-over");
        handleDrop(currentDropZone);
        currentDropZone = null;
        console.log("dropped at: ", event.target);
      }
    });
  });
}
function handleDrop(dropZone) {
  if (draggedElement) {
    const position = dropZone.getAttribute("data-position");
    let parentInputBlock = dropZone.closest(".input-block");
    const targetIsEmpty = targetBlock.textContent.trim() == "";
    let inputFlexContainer = null;
    if (draggedElement.getAttribute("data-type") == "label") {
      inputFlexContainer = draggedElement
        .closest(".input-block")
        .querySelector(".input-flex");

      parentInputBlock = inputFlexContainer;
      console.log("dropped to parent: ", inputFlexContainer);
    }

    if (position === "left" || position === "right") {
      const wrapper = document.createElement("div");
      wrapper.classList.add("input-block-flex");
      wrapper.classList.add("grid-cols-2");

      if (targetIsEmpty) {
        parentInputBlock.insertAdjacentElement("beforebegin", draggedElement);
        return;
      }

      if (position === "left") {
        parentInputBlock.parentNode.insertBefore(wrapper, parentInputBlock);
        wrapper.appendChild(draggedElement);
        wrapper.appendChild(inputFlexContainer ?? parentInputBlock);
      } else if (position === "right") {
        parentInputBlock.parentNode.insertBefore(wrapper, parentInputBlock);
        wrapper.appendChild(inputFlexContainer ?? parentInputBlock);
        wrapper.appendChild(draggedElement);
      }
    } else {
      switch (position) {
        case "below":
          parentInputBlock.insertAdjacentElement("afterend", draggedElement);
          break;
        case "top":
          parentInputBlock.insertAdjacentElement("beforebegin", draggedElement);
          break;
        default:
          break;
      }
    }
  }
}

let labelled = [];
function handleClick(element) {
  element.classList.add("hidden");

  const inputBlock = element.closest(".input-block");
  if (inputBlock) {
    inputBlock.setAttribute("data-labelled", "true");

    labelled.push(inputBlock.getAttribute("id"));
  }
}

function handleSwap(e) {
  const element = e.target;

  if (element.closest("#form")) {
    initalizeDropzones();
  }

  if (element.classList.contains("actions")) {
    element.querySelector(".delete").addEventListener("click", function () {
      var inputblocks = document.querySelectorAll(".input-block");
      inputblocks.forEach((block) => {
        if (labelled.includes(block.id)) {
          block.querySelector(".option").classList.remove("hidden");
        }
      });

      element.closest(".input-block").remove();
    });
  }
}
//Listeners

document.addEventListener("DOMContentLoaded", function () {
  initializeDragAndDrop();
});

document.addEventListener("htmx:afterSwap", function (e) {
  handleSwap(e);
});
