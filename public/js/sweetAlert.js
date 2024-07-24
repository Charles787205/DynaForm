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

function greet(component, message = "Thank you for submitting! Your response has been saved.", title = "Form Submitted"){
	const wrapper = document.createElement('div');

	Swal.fire({
		title: title,
		text: message,
		icon: 'success',
		showConfirmButton: false,
		timer: 1000
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

function confirmClose(component, message = "This will closes the form and will not accept any response.", title = "Are you sure?"){
	 Swal.fire({
		title: title,
		text: message,
		icon: "question",
		allowEscapeKey:true,
		showConfirmButton: true,
		showCancelButton: true,
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Close Form'
	}).then((result) => {
		if (result.isConfirmed) {
			htmx.trigger(component, 'confirmed'); 
			Swal.fire({
				title: 'Closed!',
				text: 'Form is closed!',
				icon: 'success',
				showConfirmButton: false,
				timer: 1000
				});
			return result;
		}
	});
}

function confirmOpen(component, message = "This will open the form and will accept agian any response.", title = "Are you sure?"){
	 Swal.fire({
		title: title,
		text: message,
		icon: "question",
		allowEscapeKey:true,
		showConfirmButton: true,
		showCancelButton: true,
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Open Form'
	}).then((result) => {
		if (result.isConfirmed) {
			htmx.trigger(component, 'confirmed'); 
			Swal.fire({
				title: 'Closed!',
				text: 'Form is Open!',
				icon: 'success',
				showConfirmButton: false,
				timer: 1000
				});
			return result;
		}
	});
}
