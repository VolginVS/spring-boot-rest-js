const requestUrl = 'http://localhost:8080/'
let tr
let roles
let users

// const login = "tt"
// const password = "tt"

function sendRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': '*/*',
        //'Authorization': (login + ':' + password),
        // 'Authorization': "Basic " + btoa(login + ':' + password),
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

function createAndAppendRoleCheckboxesToForm(formId, formIdOld){
    const rolesChecksEdit = document.getElementById(formIdOld)
    roles.forEach(role => {
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
        input.setAttribute('id', formId + role.id) // Take role 'id'
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

function populateRoleCheckboxesInForm(formPrefix, userId) {
    let userRolesIds = users
        .find(user => user.id === parseInt(userId))
        .rolesSet.map(role=>role.id)

    roles.forEach(role =>{
        const checkbox = document.getElementById('roleEdit' + role.id)
        if(userRolesIds.includes(role.id)) {
            checkbox.setAttribute('checked', 'checked')
        } else {
            checkbox.removeAttribute('checked')
        }
    })
}

function giveRolesArrayFromForm(formId){
    let userRoles = []
    roles.forEach(role =>{
        const checkbox = document.getElementById(formId + role.id)
        if(checkbox.hasAttribute('checked')) {
            userRoles.push(role)
        }
    })
    return userRoles
}

window.onload = function() {
    document.getElementById("submitUserEdit").addEventListener("click", setEditedUser)
    document.getElementById("submitUserCreate").addEventListener("click", function(){
        setCreatedUser()

        // Redirect on All users tab from New user tab, when click on button 'Create user'
        document.getElementById("home-tab").setAttribute('class', "nav-link active")
        document.getElementById("home-tab").setAttribute('aria-selected', "true")
        document.getElementById("profile-tab").setAttribute('class', "nav-link")
        document.getElementById("profile-tab").setAttribute('aria-selected', "false")
        document.getElementById("newUser").setAttribute('class', "tab-pane fade")
        document.getElementById("allUsers").setAttribute('class', "tab-pane fade active show")
        //Reset New user form
        document.getElementById("createUser").reset();
        dropCheckboxes()
    })
}

const recivedRolesJson = sendRequest('GET', requestUrl + 'roles/')
        .then(data => {
            roles = data
            createAndAppendRoleCheckboxesToForm('roleEdit', "rolesCheckEdit")
            createAndAppendRoleCheckboxesToForm('roleCreate', "rolesCheckCreate")
            // const rolesChecksEdit = document.getElementById("rolesCheckEdit")
            // roles.forEach(role => {
            //     const li = document.createElement('li')
            //     const div = document.createElement('div')
            //     const label = document.createElement('label')
            //     const input = document.createElement('input')
            //     input.addEventListener('change', function(){
            //         if(input.hasAttribute('checked')){
            //             input.removeAttribute('checked')
            //         } else {
            //             input.setAttribute('checked', 'checked')
            //         }
            //     })
            //
            //     input.setAttribute('class', 'form-check-input')
            //     input.setAttribute('type', 'checkbox')
            //     input.setAttribute('value', 'on')
            //     input.setAttribute('id', 'roleEdit'+role.id) // Take role 'id'
            //     label.setAttribute('class', '')
            //     label.textContent = Object.values(role)[1] // Take role 'name'
            //     div.appendChild(input)
            //     div.appendChild(label)
            //     li.appendChild(div)
            //     rolesChecksEdit.appendChild(li)
            // })

            // const rolesChecksCreate = document.getElementById("rolesCheckCreate")
            //
            // roles.forEach(role => {
            //     const li = document.createElement('li')
            //     const div = document.createElement('div')
            //     const label = document.createElement('label')
            //     const input = document.createElement('input')
            //     input.addEventListener('change', function(){
            //         if(input.hasAttribute('checked')){
            //             input.removeAttribute('checked')
            //         } else {
            //             input.setAttribute('checked', 'checked')
            //         }
            //     })
            //
            //     input.setAttribute('class', 'form-check-input')
            //     input.setAttribute('type', 'checkbox')
            //     input.setAttribute('value', 'on')
            //     input.setAttribute('id', 'roleCreate'+Object.values(role)[0]) // Take role 'id'
            //     console.log(Object.values(role)[1])
            //     console.log(Object.values(role))
            //     label.setAttribute('class', '')
            //     label.textContent = Object.values(role)[1] // Take role 'name'
            //     div.appendChild(input)
            //     div.appendChild(label)
            //     li.appendChild(div)
            //     rolesChecksCreate.appendChild(li)
            // })

        })
         .catch(err => console.log(err))

const recivedUsersJson = sendRequest('GET', requestUrl + 'users/')
        .then(data => {
            // console.log(data)
            // console.log(data[2].value)
            users = data
            return(data)
        })
        .then(data => {
            const myTable = document.getElementById('usersTable')
            myTable.createTHead()
            const myTableBody = myTable.createTBody()
            myTableBody.setAttribute('id', 'usersTableBody')
            let myTr = document.createElement('tr')
            let myTd
            Object.keys(data[0]).forEach(key => {
                myTd = document.createElement('th')
                myTd.textContent = key
                myTr.appendChild(myTd)
            })
            let myThEdit = document.createElement('th')
            myThEdit.textContent ='Edit'
            myTr.appendChild(myThEdit)
            let myThDelete = document.createElement('th')
            myThDelete.textContent ='Delete'
            myTr.appendChild(myThDelete)

            myTable.tHead.appendChild(myTr)

            data.forEach(elem => {
                myTr = document.createElement('tr')
                myTr.setAttribute('id', elem.id)

                Object.values(elem).forEach(value => {
                    const myTd = document.createElement('td')
                    if(value != null) {
                        if(typeof(value) === 'object') {
                            value.forEach((parts) => myTd.textContent += (" /"+ parts.name)) //Проверка, чтобы отыскать объекты типа Role и правильно их вывести
                        } else {
                            myTd.textContent = value
                        }
                    }
                    myTr.appendChild(myTd)
                })
                //Edit button
                myThEdit = document.createElement('td')
                const myEditButton = createEditButton()
                myThEdit.appendChild(myEditButton)
                myTr.appendChild(myThEdit)

                //Delete button
                myThDelete = document.createElement('td')
                const myDeleteButton = createDeleteButton()
                myThDelete.appendChild(myDeleteButton)
                myTr.appendChild(myThDelete)

                myTableBody.appendChild(myTr)
            })

            myTable.appendChild(myTableBody)
            console.log(myTable.lastElementChild.id)
            console.log(myTable.lastElementChild.lastElementChild.id)
        })
        .catch(err => console.log(err))

openEditUserForm = function(){
    let param = event.target.parentNode.parentNode.id
    tr = event.target.parentNode.parentNode

    document.getElementById("editForm").reset()
    dropCheckboxes()

    document.getElementById("idEdit").setAttribute('value', tr.childNodes[0].textContent)
    document.getElementById("usernameEdit").setAttribute('value', tr.childNodes[1].textContent)
    document.getElementById("passwordEdit").setAttribute('value', tr.childNodes[2].textContent)
    document.getElementById("firstNameEdit").setAttribute('value', tr.childNodes[3].textContent)
    document.getElementById("lastNameEdit").setAttribute('value', tr.childNodes[4].textContent)
    document.getElementById("ageEdit").setAttribute('value', tr.childNodes[5].textContent)
    document.getElementById("emailEdit").setAttribute('value', tr.childNodes[6].textContent)

    populateRoleCheckboxesInForm('roleEdit', param)
}

function setEditedUser() {
    let param = document.getElementById("idEdit").value
    const qqqRoles = giveRolesArrayFromForm('roleEdit')

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
    const table = document.getElementById('usersTable')
    const tableBody = document.getElementById('usersTableBody')
    const param = (1 + parseInt(table.lastElementChild.lastElementChild.id)).toString()
    //console.log(param)
    tr = document.createElement('tr')
    for(let i=0; i<10; i++){
        tr.appendChild(document.createElement('td'))
    }

    const qqqqRoles = giveRolesArrayFromForm('roleCreate')

    tr.setAttribute('id', param)
    tr.childNodes[0].textContent = param
    tr.childNodes[1].textContent = document.getElementById("usernameCreate").value
    tr.childNodes[2].textContent = document.getElementById("passwordCreate").value
    tr.childNodes[3].textContent = document.getElementById("firstNameCreate").value
    tr.childNodes[4].textContent = document.getElementById("lastNameCreate").value
    tr.childNodes[5].textContent = document.getElementById("ageCreate").value
    tr.childNodes[6].textContent = document.getElementById("emailCreate").value
    qqqqRoles.forEach((parts) => tr.childNodes[7].textContent += (" /"+ parts.name))

    const myEditButton = createEditButton()
    tr.childNodes[8].appendChild(myEditButton)

    const myDeleteButton = createDeleteButton()
    tr.childNodes[9].appendChild(myDeleteButton)
    tableBody.appendChild(tr)

    const qqqq = {
        id: parseInt(tr.childNodes[0].textContent),
        username: tr.childNodes[1].textContent,
        password: tr.childNodes[2].textContent,
        firstName: tr.childNodes[3].textContent,
        lastName: tr.childNodes[4].textContent,
        age: parseInt(tr.childNodes[5].textContent),
        email: tr.childNodes[6].textContent,
        rolesSet: qqqqRoles
    }
    const uuu = sendRequest('POST', requestUrl + 'users/', qqqq)
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
