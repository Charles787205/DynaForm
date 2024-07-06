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

let draggedElement = null;
let currentDropZone = null;
let targetBlock = null;

function initializeDragAndDrop() {
  document.addEventListener("dragstart", (event) => {
    if (event.target.classList.contains("input-block")) {
      draggedElement = event.target;
      event.dataTransfer.setData("text/plain", null);
      event.target.style.opacity = 0.5;
    }
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
      console.log(target);

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
    const parentInputBlock = dropZone.closest(".input-block");
    const targetIsEmpty = targetBlock.textContent.trim() == "";

    if (position === "left" || position === "right") {
      const wrapper = document.createElement("div");
      wrapper.classList.add("input-block-flex");
      wrapper.classList.add("grid-cols-2");

      if (targetIsEmpty) {
        parentInputBlock.insertAdjacentElement("beforebegin", draggedElement);
        console.log("empty: should swap");
        return;
      }

      if (position === "left") {
        parentInputBlock.parentNode.insertBefore(wrapper, parentInputBlock);
        wrapper.appendChild(draggedElement);
        wrapper.appendChild(parentInputBlock);
      } else if (position === "right") {
        parentInputBlock.parentNode.insertBefore(wrapper, parentInputBlock);
        wrapper.appendChild(parentInputBlock);
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

document.addEventListener("DOMContentLoaded", function () {
  initializeDragAndDrop();
});

let index = 0;

document.addEventListener("htmx:afterSwap", function (e) {
  let element = e.target;
  if (!element.classList.contains("actions") && element.closest("#form")) {
    initalizeDropzones();
    let newElement = element.nextElementSibling;
    if (!element.id) {
      element.setAttribute("id", "element_" + index);
    } else if (element.id && newElement) {
      newElement.setAttribute("id", "element_" + index);
    }

    index++;
  }
});
