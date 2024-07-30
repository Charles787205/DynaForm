function triggerHxLoad() {
  document.querySelectorAll('[hx-trigger="load"]').forEach((element) => {
    // Manually trigger the load event for HTMX
    htmx.trigger(element, "load");
  });
}

function check() {
  if (typeof Storage !== "undefined") {
    localStorage.setItem("saveform", JSON.stringify(getFormData()));
    console.log("Local saved:", localStorage.getItem("saveform"));
  } else {
    console.log("Not saved.");
  }
}

async function submitForm(from = "create") {
  /**
   * Published Button on navbar
   */
  const formData = getFormData() ?? [];

  const userInput = await Swal.fire({
    title: "Are you sure?",
    text: "This form will be publish!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#008000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, publish it!",
  });
  if (userInput.isConfirmed) {
    createForm((from = from));
  }
}


//create form is used to create a new form and save it to database
async function createForm(from = "list", data) {
  //** when creating a new form */
  const formData = data ? data : getFormData();
  const response = await fetch("/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromPage: from,
      formData: formData,
    }),
  });
  if (response.ok) {
    const res = await response.json();
    if (from == "list") {
      return window.open(`/form/${res.formId}/edit`, "_self");
    } else {
      console.log("Form created");
      Swal.fire({
        title: "Publish Success!",
        text: "Your forms has been published.",
        icon: "success",
      });
    }
  } else {
    if (response.status == 401) {
      localStorage.setItem("saveform", JSON.stringify(getFormData()));
      window.open("/auth/google", "_self");
    }
  }
}

function getFormData(isCopied = false) {
  if (!document.getElementById("form")) {
    return getDefaultFormData();
  }
  const form = document.getElementById("form");
  const formName = isCopied
    ? ""
    : document.getElementById("form-title").value || "defaultFormName";
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
    const content = contentContainer.textContent.replaceAll("/n", "");
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

function getDefaultFormData() {
  return (FormData = {
    formName: "Untitled Form",
    formDescription: "defaultDescription",
    formComponents: [
      {
        id: "7e6d9889-e71c-4bfa-9ef5-9a3163c47232",
        name: "title_7e6d9889-e71c-4bfa-9ef5-9a3163c47232",
        type: "title",
        placeholder: "Add a title",
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

function updateForm() {
  const formData = getFormData();
  const form = document.getElementById("formID");
  if (!form || !form.textContent) {
    localStorage.setItem("saveform", JSON.stringify(getFormData()));
    return;
  }
  fetch(`/form/${form.textContent}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((response) => {
    if (!response.ok) {
      localStorage.setItem("saveform", JSON.stringify(getFormData()));
    }
  });
}

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
  showTooltip(element);
}

function submitResponse(event) {

  event.preventDefault();

  const { responses } = getFormResponse(event.target);

  console.log("RESPONSES BEFORE: ", responses);


  fetch(`/response/f/${event.target.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responses),
  }).then(async (response) => {
    if (!response.ok) {
      Swal.fire({
        title: "Oops! Something has occured.",
        text: "Your response has not been submitted. Please try again later.",
        icon: "Warning",
        showConfirmButton: true,
      });

      throw new Error("Failed adding to database:");
    } else if (response.status == 401) {
      window.open("/auth/google", "_self");
    } else if (response.status == 200) {
      const { response_id } = await response.json();

      window.open(`/response/feedback/${response_id}`, "_self");
    }
  });
}

function getFormResponse(form) {
  console.log("FORM ", form);
  const responses = [];
  const inputBlocks = form.querySelectorAll(".input-block");
  inputBlocks.forEach((block) => {
    const input = block.querySelector("input");
    const select = block.querySelector("select");
    const textarea = block.querySelector("textarea");
    const response = {};

    if (input || select || textarea) {
      if (input) {
        response.component_id = input.id;

        if (input.type == "checkbox" || input.type == "radio") {
          response.value = input.checked;
        } else {
          (response.component_id = input.id), (response.value = input.value);
        }
      } else if (select) {
        response.component_id = select.id;

        response.value = select.value;
      } else if (textarea) {
        response.component_id = textarea.id;

        response.value = textarea.value;
      }
      responses.push(response);
    }
  });

  return { responses };
}

async function copyForm(id) {
  //copy form json to clipboard
  console.log(`/form/${id}/copy`);
  fetch(`/form/${id}/getformjson`, {
    method: "POST",
    body: JSON.stringify({method: "copy"}), 
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (response.ok) {
      //copy response to clipboard

      const res = await response.json();

      navigator.clipboard.writeText(JSON.stringify(res));
      Swal.fire({
        title: "Form Copied!",
        text: "Your form has been copied to clipboard.",
        icon: "success",
      });
    }
  });
}

async function downloadForm(id) {
  //download form json
  fetch(`/form/${id}/getformjson`, {
    method: "POST",
    body: JSON.stringify({method: "download"}),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (response.ok) {
      const res = await response.json();
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(res)], { type: "application/json" });
      element.href = URL.createObjectURL(file);
      element.download = "form.json";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  });
}

async function getDataFromPaste(event) {
  if (event.target.getAttribute("contenteditable")) {
    return;
  }
  event.preventDefault();
  let pasteData = (event.clipboardData || window.clipboardData).getData("text");

  try {
    const { components } = JSON.parse(pasteData);

    if (components) {
      const existingElements = document.getElementsByClassName("input-block");
      Array.from(existingElements).map((el) => {
        el.remove();
      });

      for (let index = 0; index < components.length; index++) {
        const component = components[index];

        
        if (component.type == "dropdown") {
          if (component.options) {
            const options = [];
            component.options.forEach((option) => {
              const newComponent = {
                component_type: component.component_type,
                id: component.id,
                type: component.type,
                content: option,
              };
              options.push(newComponent);
            });
            components.splice(index, 1, ...options);
          }
        }
      }
      addCopiedElements(components);
    }
  } catch (err) {
    
    return;
  }
}
function addCopiedElements(components) {
  const form = document.createElement("form");
  const formElement = document.getElementsByTagName("form")[0];
  const button = formElement.querySelector("#submit-button");

  for (let i = 0; i < components.length; i++) {
    const tempDiv = document.createElement("div");
    form.appendChild(tempDiv);
  }
  form.appendChild(button);
  components.forEach((element, index) => {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `/components/fields/${element.type}`);
    xhttp.setRequestHeader("Content-type", "application/json", "HX-Request");
    xhttp.send(JSON.stringify(element));

    xhttp.onreadystatechange = function () {
  
      if (this.readyState == 4 && this.status == 200) {
     
        const range = document.createRange();

        const fragment = range.createContextualFragment(xhttp.response);
        form.replaceChild(fragment, form.children[index]);
      }
    };
  });
  //document.body.replaceChild(form, formElement);
  form.className = formElement.className;
  formElement.replaceWith(form);
}
