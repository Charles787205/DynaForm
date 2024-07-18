export function submitResponse(event) {
  /**
   * jsonobject =
   * responses = [
   *  {
   *  component_id: "123",
   * value: "value"
   * }
   * ]
   */
  event.preventDefault();
  const formData = new FormData(event.target);
  const responses = [];
  for (const [key, value] of formData.entries()) {
    responses.push({ component_id: key, value });
  }
  fetch(`/response/${event.target.dataset.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responses),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
