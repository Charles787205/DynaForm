let draggedElement = null;
let currentDropZone = null;
let targetBlock = null;
;

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

;	return nearestDropZone;
}

function initalizeDropzones() {
	document.querySelectorAll(".move-dropzone").forEach((dropzone) => {
		dropzone.addEventListener("dragover", (event) => {
			event.preventDefault();
			const target = event.target.closest(".input-block");
			targetBlock = target;
			console.log("dragged over at: ", target);
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


//Listeners

document.addEventListener("DOMContentLoaded", function () {
	initializeDragAndDrop();
});

document.addEventListener("htmx:afterSwap", function (e) {
	handleSwap(e);
});

