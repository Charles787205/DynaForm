// document.addEventListener("htmx:confirm", function (event) {
// 	event.preventDefault();

// 	Swal.fire({
// 		title: "Are you sure?",
// 		text: "You won't be able to revert this!",
// 		icon: "warning",
// 		showCancelButton: true,
// 		confirmButtonColor: "#3085d6",
// 		cancelButtonColor: "#d33",
// 		confirmButtonText: "Yes, delete it!",
// 	}).then((result) => {
// 		if (result.isConfirmed) {
// 			Swal.fire({
// 				title: "Deleted!",
// 				text: "Your file has been deleted.",
// 				icon: "success",
// 			});
// 		}
// 	});
// });

function shareModal(component, message = "This action is irreversible.", title = "Are you sure?"){
	const wrapper = document.createElement('div');
	wrapper.innerHTML = "";

	Swal.fire({
		title: title,
		text: message,
		content: content,
	}).then((result) => {
		if (result.isConfirmed) {
			htmx.trigger(component, 'confirmed'); 
			
			Swal.fire({
				title: "Deleted!",
				text: "Your file has been deleted.",
				icon: "success",
			});
			return result;
		}
	});
}


function confirmDelete(component, message = "This action is irreversible.", title = "Are you sure?"){
	 Swal.fire({
		title: title,
		text: message,
		icon: "warning",
		allowEscapeKey:true,
		showConfirmButton: true,
		customClass: {
			confirmButton: 'delete-modal-btn'
		},
		showCancelButton: true,
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.isConfirmed) {
			htmx.trigger(component, 'confirmed'); 
			Swal.fire({
				title: 'Deleted!',
				text: 'Form is deleted!',
				icon: 'success',
				showConfirmButton: false,
				timer: 1000
				});
			return result;
		}
	});
}