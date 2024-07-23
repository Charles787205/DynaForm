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


function confirmDelete(message = "This action is irreversible and will completely remove the item.", title = "Are you sure?"){
	Swal.fire({
		title: this.title,
		text: this.message,
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				title: "Deleted!",
				text: "Your file has been deleted.",
				icon: "success",
			});
			return result;
		}
	});
}