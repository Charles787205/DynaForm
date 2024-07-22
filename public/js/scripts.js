// import { submitResponse } from "./responseScript";
// import FormData from "../src/models/form";

function check() {
  if (typeof Storage !== "undefined") {
    localStorage.setItem("saveform", getFormData());
    console.log("Local saved:", localStorage.getItem("saveform"));
  } else {
    console.log("Not saved.");
  }
}

function submitForm(from = "create") {
  const formData = getFormData() ?? [];
  console.log("FORM FROM SCRIPT", formData);
  fetch("/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromPage: from,
      formData: formData,
    }),
  }).then((response) => {
    if (response.ok) {
      if (from == "list") {
        response.json().then((data) => {
          window.open(`/form/${data.formId}/edit`, "_self");
        });
      }
    } else {
      if (!response.ok) {
        throw new Error("Failed adding to database:");
      } else if (response.status == 401) {
        localStorage.setItem("saveform", JSON.stringify(getFormData()));
        window.open("/auth/google", "_self");
      }
    }
  });
}

function getFormData() {
  if (!document.getElementById("form")) {
    return (FormData = {
      formName: "Untitled Form",
      formDescription: "defaultDescription",
      formComponents: [
        {
          id: "7e6d9889-e71c-4bfa-9ef5-9a3163c47246",
          name: "heading_7e6d9889-e71c-4bfa-9ef5-9a3163c47246",
          type: "heading",
          placeholder: "Add a heading",
        },
        {
          id: "67a46c3c-d4e7-4032-ac0a-2277b9d90741",
          name: "textfield_67a46c3c-d4e7-4032-ac0a-2277b9d90741",
          type: "textfield",
          focus: "true",
          placeholder: "Start typing text or add a block.",
        },
        {
          id: "b1e09f10-cbe2-4a1f-b3a5-c5e99b3f49c8",
          name: "textfield_b1e09f10-cbe2-4a1f-b3a5-c5e99b3f49c8",
          type: "textfield",
          placeholder: "Start typing text or add a block.",
        },
        {
          id: "c7e99cb7-ae17-43f9-b0e4-a193ff48fbcf",
          name: "textfield_c7e99cb7-ae17-43f9-b0e4-a193ff48fbcf",
          type: "textfield",
          placeholder: "Start typing text or add a block.",
        },
      ],
    });
  }
  const form = document.getElementById("form");
  const formName =
    document.getElementById("form-title").value || "defaultFormName";
  const formDescription =
    form.getAttribute("data-form-description") || "defaultDescription";

  const inputBlock = form.querySelectorAll(".input-block");
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

      if (content) {
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

function updateForm() {
  const formData = getFormData();
  const form = document.getElementById("formID");

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

// function updateForm() {
//   const formData = getFormData();
//   const form = document.getElementById("formID");
//   console.log(formData);

//   fetch(`/form/${form.textContent}/edit`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   }).then((response) => {
//     if (!response.ok) {
//       throw new Error("Failed adding to database:");
//     } else if (response.status == 401) {
//       window.open("/auth/google", "_self");
//     }
//   });
// }

/**
 * Retrieves form data from the DOM and returns it as an object.
 * @returns {Object} The form data object.
 */

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

function submitResponse(event) {
  event.preventDefault();
  console.log(event.target.id);
  const { form_id, responses } = getFormResponse();
  fetch(`/response/${event.target.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responses),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed adding to database:");
    } else if (response.status == 401) {
      window.open("/auth/google", "_self");
    }
  });
}

function getFormResponse() {
  const form = document.getElementById("form");

  const responses = [];
  const inputBlocks = form.querySelectorAll(".input-block");
  inputBlocks.forEach((block) => {
    const input = block.querySelector("input");
    const select = block.querySelector("select");
    const textarea = block.querySelector("textarea");
    const response = { component_id: block.id };
    if (input || select || textarea) {
      if (input) {
        if (input.type == "checkbox" || input.type == "radio") {
          response.value = input.checked;
        } else {
          (response.component_id = input.id), (response.value = input.value);
        }
      } else if (select) {
        response.value = select.value;
      } else if (textarea) {
        response.value = textarea.value;
      }
      responses.push(response);
    }
  });

  return { responses };
}

//Listeners

document.addEventListener("DOMContentLoaded", function () {
  initializeDragAndDrop();
});

document.addEventListener("htmx:afterSwap", function (e) {
  handleSwap(e);
});
