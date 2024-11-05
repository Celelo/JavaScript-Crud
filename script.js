// Simplificación de los selectores
const $ = (Object) => document.querySelectorAll(Object)
const $$ = (Object) => document.getElementById(Object)

function validateForm() {
    let email = $$('inputEmail').value
    let name = $$('inputName').value
    let phone = $$('inputPhone').value

    if (email === "") {
        alert('El campo correo es requerido')
        return false
    } else if (!email.includes('@')) {
        alert('El correo no es válido')
        return false
    }

    if (name === "") {
        alert('El campo nombre es requerido')
        return false
    }

    if (phone === "") {
        alert('El campo teléfono es requerido')
        return false
    }

    return true
}

function readData() {
    let listPeople = localStorage.getItem('listPeople') ? JSON.parse(localStorage.getItem('listPeople')) : []

    let html = ""
    listPeople.forEach(function (element, index) {
        html += `<tr>
                    <td>${element.email}</td>
                    <td>${element.name}</td>
                    <td>${element.phone}</td>
                    <td>
                        <button onclick="deleteData(${index})" class="btn btn-danger">Eliminar</button>
                        <button onclick="editData(${index})" class="btn btn-warning">Editar</button>
                    </td>
                 </tr>`
    })

    document.querySelector('#tableData').innerHTML = html
}

window.onload = readData // Cargar la tabla al inicio

function addData() {
    if (validateForm()) {
        let email = $$('inputEmail').value
        let name = $$('inputName').value
        let phone = $$('inputPhone').value

        let listPeople = localStorage.getItem('listPeople') ? JSON.parse(localStorage.getItem('listPeople')) : []

        listPeople.push({ email, name, phone })
        localStorage.setItem('listPeople', JSON.stringify(listPeople))

        readData()

        $$('inputEmail').value = ""
        $$('inputName').value = ""
        $$('inputPhone').value = ""
    }
}

function deleteData(index) {
    let listPeople = localStorage.getItem('listPeople') ? JSON.parse(localStorage.getItem('listPeople')) : []

    listPeople.splice(index, 1)
    localStorage.setItem('listPeople', JSON.stringify(listPeople))

    readData()
    console.log('Se eliminó el dato')
}

function editData(index) {
    $$('btnAdd').style.display = 'none'
    $$('btnUpdate').style.display = 'block'

    let listPeople = localStorage.getItem('listPeople') ? JSON.parse(localStorage.getItem('listPeople')) : []

    $$('inputEmail').value = listPeople[index].email
    $$('inputName').value = listPeople[index].name
    $$('inputPhone').value = listPeople[index].phone

    document.querySelector('#btnUpdate').onclick = function () {
        if (validateForm()) {
            listPeople[index].email = $$('inputEmail').value
            listPeople[index].name = $$('inputName').value
            listPeople[index].phone = $$('inputPhone').value

            localStorage.setItem('listPeople', JSON.stringify(listPeople))
            readData()

            $$('inputEmail').value = ""
            $$('inputName').value = ""
            $$('inputPhone').value = ""

            $$('btnAdd').style.display = 'block'
            $$('btnUpdate').style.display = 'none'

            console.log('Se editó el dato')
        }
    }
}
