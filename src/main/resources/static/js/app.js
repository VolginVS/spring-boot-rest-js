const requestUrl = 'http://localhost:8080/'
let tr
let rolesBuff
let usersBuff

window.onload = function() {
    document.getElementById("submitUserEdit").addEventListener("click", setEditedUser)
    document.getElementById("submitUserCreate").addEventListener("click", function(){
        setCreatedUser()

        // Redirect on All users tab from New user tab, when click on button 'Create user'
        document.getElementById("home-tab").setAttribute('class', "nav-link active")
        document.getElementById("home-tab").setAttribute('aria-selected', "true")
        document.getElementById("profile-tab").setAttribute('class', "nav-link")
        document.getElementById("profile-tab").setAttribute('aria-selected', "false")
        document.getElementById("new-user").setAttribute('class', "tab-pane fade")
        document.getElementById("all-users").setAttribute('class', "tab-pane fade active show")
        //Reset New user form
        document.getElementById("create-user-form").reset();
        dropCheckboxes()
    })
}

const recivedRolesJson = sendRequest('GET', requestUrl + 'roles/')
        .then(data => {
            rolesBuff = data
            createAndAppendRoleCheckboxesToForm('edit-user-form-checkbox')
            createAndAppendRoleCheckboxesToForm('create-user-form-checkbox')
            rolesBuff.forEach(role => console.log(role.name))

        })
         .catch(err => console.log(err))

const recivedUsersJson = sendRequest('GET', requestUrl + 'users/')
        .then(data => populateUsersTable(data))
        .catch(err => console.log(err))

// Functions
function sendRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    }
    return fetch(url, {
        method: method,
        headers: headers,
        credentials: "same-origin",
        body: (body === null) ? (null) : (JSON.stringify(body))
    }).then(response =>{
        if (response.ok) {
            return response.json()
        }
        return response.json().then(error => {
            const e = new Error('Ошибка лол')
            e.data = error
        })
    })
}

function createEditButton(){
    const newEditButton = document.createElement('button')
    newEditButton.textContent ='Edit'
    newEditButton.setAttribute('type', "button")
    newEditButton.setAttribute('class', "btn btn-info")
    newEditButton.setAttribute('data-toggle', "modal")
    newEditButton.setAttribute('data-target', "#upd")
    newEditButton.onclick = openEditUserForm
    return newEditButton
}

function createDeleteButton(){
    const newDeleteButton = document.createElement('button')
    newDeleteButton.textContent ='Delete'
    newDeleteButton.setAttribute('type', "button")
    newDeleteButton.setAttribute('class', "btn btn-danger")
    newDeleteButton.setAttribute('data-toggle', "modal")
    newDeleteButton.setAttribute('data-target', "#del")
    newDeleteButton.onclick = deleteUser
    return newDeleteButton
}

function createAndAppendRoleCheckboxesToForm(formCheckboxId){
    const rolesChecksEdit = document.getElementById(formCheckboxId)
    rolesBuff.forEach(role => {
        const li = document.createElement('li')
        const div = document.createElement('div')
        const label = document.createElement('label')
        const input = document.createElement('input')
        input.addEventListener('change', function(){
            if(input.hasAttribute('checked')){
                input.removeAttribute('checked')
            } else {
                input.setAttribute('checked', 'checked')
            }
        })

        input.setAttribute('class', 'form-check-input')
        input.setAttribute('type', 'checkbox')
        input.setAttribute('value', 'on')
        input.setAttribute('id', formCheckboxId + role.id) // Take role 'id'
        label.setAttribute('class', '')
        label.textContent = Object.values(role)[1] // Take role 'name'
        div.appendChild(input)
        div.appendChild(label)
        li.appendChild(div)
        rolesChecksEdit.appendChild(li)
    })
}

function dropCheckboxes(){
    const array = document.getElementsByClassName('form-check-input')
    for(let i=0; i<array.length; i++){
        console.log(array[i])
        array[i].removeAttribute('checked')
    }
}

function populateUsersTable(data){
    usersBuff = data

    const table = document.getElementById('users-table')
    const tableHead = table.createTHead()
    const tableBody = table.createTBody()
    tableBody.setAttribute('id', 'users-table-body')

    //Populate table head
    let tr = document.createElement('tr')
    let td
    Object.keys(data[0]).forEach(key => {
        td = document.createElement('th')
        td.textContent = key
        tr.appendChild(td)
    })
    let tdEdit = document.createElement('th')
    tdEdit.textContent ='Edit'
    tr.appendChild(tdEdit)
    let tdDelete = document.createElement('th')
    tdDelete.textContent ='Delete'
    tr.appendChild(tdDelete)
    tableHead.appendChild(tr)

    //Populate table body
    data.forEach(elem => {
        tr = document.createElement('tr')
        tr.setAttribute('id', elem.id)

        Object.values(elem).forEach(value => {
            const td = document.createElement('td')
            //Проверка, чтобы отыскать объекты типа Role и правильно их вывести
            if(value != null) {
                if(typeof(value) === 'object') {
                    value.forEach((parts) => td.textContent += (" /"+ parts.name))
                } else {
                    td.textContent = value
                }
            }
            tr.appendChild(td)
        })
        //Edit button
        tdEdit = document.createElement('td')
        const editButton = createEditButton()
        tdEdit.appendChild(editButton)
        tr.appendChild(tdEdit)

        //Delete button
        tdDelete = document.createElement('td')
        const deleteButton = createDeleteButton()
        tdDelete.appendChild(deleteButton)
        tr.appendChild(tdDelete)

        tableBody.appendChild(tr)
    })
}

function populateRoleCheckboxesInForm(formPrefix, userId) {
    let userRolesIds = usersBuff
        .find(user => user.id === parseInt(userId))
        .rolesSet.map(role=>role.id)

    rolesBuff.forEach(role =>{
        const checkbox = document.getElementById('edit-user-form-checkbox' + role.id)
        if(userRolesIds.includes(role.id)) {
            checkbox.setAttribute('checked', 'checked')
        } else {
            checkbox.removeAttribute('checked')
        }
    })
}

function giveRolesArrayFromForm(formId){
    let userRoles = []
    rolesBuff.forEach(role =>{
        const checkbox = document.getElementById(formId + role.id)
        if(checkbox.hasAttribute('checked')) {
            userRoles.push(role)
        }
    })
    return userRoles
}

function openEditUserForm(){
    let param = event.target.parentNode.parentNode.id
    tr = event.target.parentNode.parentNode

    document.getElementById("edit-user-form").reset()
    dropCheckboxes()

    document.getElementById("idEdit").setAttribute('value', tr.childNodes[0].textContent)
    document.getElementById("usernameEdit").setAttribute('value', tr.childNodes[1].textContent)
    document.getElementById("passwordEdit").setAttribute('value', tr.childNodes[2].textContent)
    document.getElementById("firstNameEdit").setAttribute('value', tr.childNodes[3].textContent)
    document.getElementById("lastNameEdit").setAttribute('value', tr.childNodes[4].textContent)
    document.getElementById("ageEdit").setAttribute('value', tr.childNodes[5].textContent)
    document.getElementById("emailEdit").setAttribute('value', tr.childNodes[6].textContent)

    populateRoleCheckboxesInForm('edit-user-form-checkbox', param)
}

function setEditedUser() {
    let param = document.getElementById("idEdit").value
    const qqqRoles = giveRolesArrayFromForm('edit-user-form-checkbox')

    tr.childNodes[0].textContent = document.getElementById("idEdit").value
    tr.childNodes[1].textContent = document.getElementById("usernameEdit").value
    tr.childNodes[2].textContent = document.getElementById("passwordEdit").value
    tr.childNodes[3].textContent = document.getElementById("firstNameEdit").value
    tr.childNodes[4].textContent = document.getElementById("lastNameEdit").value
    tr.childNodes[5].textContent = document.getElementById("ageEdit").value
    tr.childNodes[6].textContent = document.getElementById("emailEdit").value
    tr.childNodes[7].textContent = ""
    qqqRoles.forEach((parts) => tr.childNodes[7].textContent += (" /"+ parts.name))
    console.log(qqqRoles)
    const qqq = {
        id: parseInt(tr.childNodes[0].textContent),
        username: tr.childNodes[1].textContent,
        password: tr.childNodes[2].textContent,
        firstName: tr.childNodes[3].textContent,
        lastName: tr.childNodes[4].textContent,
        age: parseInt(tr.childNodes[5].textContent),
        email: tr.childNodes[6].textContent,
        rolesSet: qqqRoles
    }

    const edit = sendRequest('PUT', requestUrl + 'users/', qqq)
        .then(response => {
            return response.json().then(error => {
                const e = new Error('Ошибка лол')
                e.data = error
            })
        })
        .catch(err => console.log(err))
}


function setCreatedUser() {
    const tableBody = document.getElementById('users-table-body')
    const newId = (1 + parseInt(tableBody.lastElementChild.id)).toString()
    const newUser = {
        id: newId,
        username: document.getElementById("usernameCreate").value,
        password: document.getElementById("passwordCreate").value,
        firstName: document.getElementById("firstNameCreate").value,
        lastName: document.getElementById("lastNameCreate").value,
        age: document.getElementById("ageCreate").value,
        email: document.getElementById("emailCreate").value,
        rolesSet: giveRolesArrayFromForm('create-user-form-checkbox')
    }
    const uuu = sendRequest('POST', requestUrl + 'users/', newUser)

    tr = document.createElement('tr')
    tr.setAttribute('id', newId)

    for(let i=0; i<10; i++){
        tr.appendChild(document.createElement('td'))
    }

    tr.childNodes[0].textContent = newId
    tr.childNodes[1].textContent = document.getElementById("usernameCreate").value
    tr.childNodes[2].textContent = document.getElementById("passwordCreate").value
    tr.childNodes[3].textContent = document.getElementById("firstNameCreate").value
    tr.childNodes[4].textContent = document.getElementById("lastNameCreate").value
    tr.childNodes[5].textContent = document.getElementById("ageCreate").value
    tr.childNodes[6].textContent = document.getElementById("emailCreate").value
    const roles = giveRolesArrayFromForm('create-user-form-checkbox')
    giveRolesArrayFromForm('create-user-form-checkbox').forEach((elem) => tr.childNodes[7].textContent += (" /"+ elem.name))

    const editButton = createEditButton()
    tr.childNodes[8].appendChild(editButton)

    const deleteButton = createDeleteButton()
    tr.childNodes[9].appendChild(deleteButton)
    tableBody.appendChild(tr)
}

function deleteUser() {
    let param = event.target.parentNode.parentNode.id
    console.log(param)
    const del = sendRequest('DELETE', requestUrl + 'users/' + param)
        .then(response => {
            //If request success, delete line in the table
        })
        .catch(err => console.log(err))
    document.getElementById(param).remove()
}