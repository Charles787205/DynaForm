

async function importFormJsonFile(){
    const {value: file } = await Swal.fire({
        title: "Import Form JSON File",
        input: "file",
        inputAttributes: {
            "accept": ".json",
            "aria-label": "Upload your JSON file"
        }
    })
    console.log(file);
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result)
            console.log(data)
            const form = {
                formName: "Imported Form",
                formDescription: "Imported Form Description",
                formComponents : data.components
            }
            createForm("list", form)    
            
        }
        reader.readAsText(file)
        


    }
}