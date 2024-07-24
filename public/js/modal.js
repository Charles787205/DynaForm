let listenersAttached = false;

function setupModalListeners(modal) {
	const response = modal.querySelector('#response-wrapper');
	const editor = modal.querySelector('#editor-wrapper');
	let prev = response;

	modal.querySelector("#editor-btn").addEventListener("click", function () {
		SetActiveDiv(editor);
	});

	modal.querySelector("#response-btn").addEventListener("click", function () {
		SetActiveDiv(response);
	});

	function SetActiveDiv(el) {
		if (prev) prev.classList.toggle("active");
		el.classList.toggle("active");
		console.log("triggered");
		prev = el;
	}
}

document.body.addEventListener('htmx:afterSwap', function(event) {
		let modal = event.detail.target.querySelector('#modal')
		if (modal) {
			setupModalListeners(modal);
		}
	});
					