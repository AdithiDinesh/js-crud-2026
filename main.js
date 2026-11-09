let contact = []
const contactName = document.getElementById("contactName")
const contactNumber = document.getElementById("contactNumber")
const contactEmail = document.getElementById("contactEmail")
const contactForm = document.getElementById("contactForm")
const editStatus = document.getElementById("editStatus")
const tableBody = document.getElementById("tableBody")
const searchContact = document.getElementById("searchContact")


if (sessionStorage.getItem("contact")) {
    contact = JSON.parse(sessionStorage.getItem("contact"))
    displayUserList()
}

// add update
contactForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const contactNameInput = contactName.value
    const contactNumberInput = contactNumber.value
    const contactEmailInput = contactEmail.value
    if (contactNameInput && contactNumberInput && contactEmailInput) {
        const editIndex = editStatus.value
        if (editIndex == "") {
            contact.push({
                name: contactNameInput,
                number: contactNumberInput,
                email: contactEmailInput
            })
        } else
             {
            contact[editIndex] = {
                name: contactNameInput,
                number: contactNumberInput,
                email: contactEmailInput
            }
        }
        sessionStorage.setItem("contact", JSON.stringify(contact))
        contactForm.reset()
        editStatus.value = ""
        displayUserList()
    } else 
        {
        alert("Please fill the form completely")
    }
})

// display
function displayUserList() {
    tableBody.innerHTML = ""
    contact.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.number}</td>
                <td>${item.email}</td>
                <td>
                    <button onclick="editUser(${index})"class="btn btn-warning">Edit</button>
                    <button onclick="deleteUser(${index})"class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `
    })
}

//edit
function editUser(userIndex) {
    const contactDetails = contact[userIndex]
    contactName.value = contactDetails.name
    contactNumber.value = contactDetails.number
    contactEmail.value = contactDetails.email
    editStatus.value = userIndex
}
//delete
function deleteUser(userIndex) {
    if (confirm("Are you sure you want to delete this contact?")) {
        contact.splice(userIndex, 1)
        sessionStorage.setItem("contact", JSON.stringify(contact))
        displayUserList()
    }
}

//search
searchContact.addEventListener("input", function () {
    let search = searchContact.value.toLowerCase()
    tableBody.innerHTML = ""
    contact.forEach((item, index) => {
        if (item.name.toLowerCase().includes(search)) {
            tableBody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.number}</td>
                    <td>${item.email}</td>
                    <td>
                        <button onclick="editUser(${index})"class="btn btn-warning">Edit </button>
                        <button onclick="deleteUser(${index})"class="btn btn-danger">Delete</button>
                    </td>
                </tr>
            `
        }
    })
})