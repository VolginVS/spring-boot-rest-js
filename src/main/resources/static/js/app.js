let tr
const login = "tt"
const password = "tt"

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

const requestUrl = 'http://localhost:8080/users/'

window.onload = function() {
    document.getElementById("submitUserEdit").addEventListener("click", setEditedUser)
    document.getElementById("submitUserCreate").addEventListener("click", setCreatedUser)
//    document.getElementById("close").onclick = document.getElementById("").reset();
    document.getElementById("submitUserCreate").onclick = document.getElementById("createUser").reset();
}

// window.onload = function() {
//     document.getElementById("submitUserCreate").addEventListener("click", setCreatedUser)
// }


loginForm = "    username: 'tt',\n" +
    "    password: 'tt'"

//const loginnn = sendRequest('POST','http://localhost:8080/login', loginForm)
//    .catch(err => console.log(err))
function loginRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'text/html; charset=UTF-8',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    }

    return fetch(url, {
        method: method,
        headers: headers,
        credentials: "same-origin",
        body: (body === null) ? (null) : (body)
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

const recivedJson = sendRequest('GET', requestUrl)
        .then(data => {
            // console.log(data)
            // console.log(data[2].value)
            return(data)
        })
        .then(data => {
            const myTable = document.getElementById('userTable')
            myTable.createTHead()
            const myTableBody = myTable.createTBody()
            let myTr = document.createElement('tr')
            let myTd
            // console.log(Object.keys(data[0]))
            Object.keys(data[0]).forEach(key => {
                myTd = document.createElement('th')
                myTd.textContent = key
                myTr.appendChild(myTd)
                // console.log(key)
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
                            value.forEach((elem) => myTd.textContent += (" /"+ elem.name)) //Проверка, чтобы отыскать объекты типа Role и правильно их вывести
                        } else {
                            myTd.textContent = value
                        }
                    }
                    myTr.appendChild(myTd)
                })
                //Edit button
                myThEdit = document.createElement('td')
                const myEditButton = document.createElement('button')
                myThEdit.appendChild(myEditButton)
                myEditButton.textContent ='Edit'
                myEditButton.setAttribute('type', "button")
                myEditButton.setAttribute('class', "btn btn-info")
                myEditButton.setAttribute('data-toggle', "modal")
                myEditButton.setAttribute('data-target', "#upd")
                myThEdit.onclick = editUser
                myTr.appendChild(myThEdit)

                //Delete button
                myThDelete = document.createElement('td')
                const myDeleteButton = document.createElement('button')
                myThDelete.appendChild(myDeleteButton)
                myDeleteButton.textContent ='Delete'
                myDeleteButton.setAttribute('type', "button")
                myDeleteButton.setAttribute('class', "btn btn-danger")
                myDeleteButton.setAttribute('data-toggle', "modal")
                myDeleteButton.setAttribute('data-target', "#del")
                myThDelete.onclick = deleteUser
                myTr.appendChild(myThDelete)
                myTableBody.appendChild(myTr)
            })


            myTable.appendChild(myTableBody)
            console.log(myTable.lastElementChild.id)
            console.log(myTable.lastElementChild.lastElementChild.id)
        })
        .catch(err => console.log(err))

editUser = function(){
        let param = event.target.parentNode.parentNode.id
        tr = event.target.parentNode.parentNode
        console.log(event.target.parentNode.parentNode)
        console.log(param)
        tr.childNodes.forEach(node => {
            console.log(node.childNodes.value)
        })
        document.getElementById("editForm").reset()

        console.log(document.getElementById("idEdit"))
        document.getElementById("idEdit").setAttribute('value', tr.childNodes[0].textContent)
        document.getElementById("usernameEdit").setAttribute('value', tr.childNodes[1].textContent)
        document.getElementById("passwordEdit").setAttribute('value', tr.childNodes[2].textContent)
        document.getElementById("firstNameEdit").setAttribute('value', tr.childNodes[3].textContent)
        document.getElementById("lastNameEdit").setAttribute('value', tr.childNodes[4].textContent)
        document.getElementById("ageEdit").setAttribute('value', tr.childNodes[5].textContent)
        document.getElementById("emailEdit").setAttribute('value', tr.childNodes[6].textContent)
    }

function setEditedUser() {
        let param = document.getElementById("idEdit").value
        console.log(param)
        console.log(tr.childNodes[0])
        // tr.childNodes[1].textContent = recivedJson[param].id

        tr.childNodes[0].textContent = document.getElementById("idEdit").value
        tr.childNodes[1].textContent = document.getElementById("usernameEdit").value
        tr.childNodes[2].textContent = document.getElementById("passwordEdit").value
        tr.childNodes[3].textContent = document.getElementById("firstNameEdit").value
        tr.childNodes[4].textContent = document.getElementById("lastNameEdit").value
        tr.childNodes[5].textContent = document.getElementById("ageEdit").value
        tr.childNodes[6].textContent = document.getElementById("emailEdit").value


        const qqq = {
            id: parseInt(tr.childNodes[0].textContent),
            username: tr.childNodes[1].textContent,
            password: tr.childNodes[2].textContent,
            firstName: tr.childNodes[3].textContent,
            lastName: tr.childNodes[4].textContent,
            age: parseInt(tr.childNodes[5].textContent),
            email: tr.childNodes[6].textContent,
            rolesSet:[{id:1,name:"ROLE_USER"}]
        }
        console.log(JSON.stringify(qqq))
         // const loginnn = sendRequest('POST','http://localhost:8080/login', loginForm)
         //    .catch(err => console.log(err))


        const edit = sendRequest('PUT', requestUrl, qqq)
            .then(response => {
                //If request success, edit line with user in the table
                if (response.ok) {
                    document.getElementById("editForm").reset()
                    document.getElementById("idEdit").setAttribute('value', '')
                    document.getElementById("usernameEdit").setAttribute('value', '')
                    document.getElementById("passwordEdit").setAttribute('value', '')
                    document.getElementById("firstNameEdit").setAttribute('value', '')
                    document.getElementById("lastNameEdit").setAttribute('value', '')
                    document.getElementById("ageEdit").setAttribute('value', '')
                    document.getElementById("emailEdit").setAttribute('value', '')

                }
                return response.json().then(error => {
                    const e = new Error('Ошибка лол')
                    e.data = error
                })
            })
            .catch(err => console.log(err))
    }

    function setCreatedUser() {
        //let param = document.getElementById("idEdit").value
        //console.log(param)
        tr = document.createElement('tr')
        for(let i=0; i<10; i++){
            tr.appendChild(document.createElement('td'))
        }

        const table = document.getElementById('userTable')

        tr.childNodes[0].textContent = 1 + parseInt(table.lastElementChild.lastElementChild.id)
        tr.childNodes[1].textContent = document.getElementById("usernameCreate").value
        tr.childNodes[2].textContent = document.getElementById("passwordCreate").value
        tr.childNodes[3].textContent = document.getElementById("firstNameCreate").value
        tr.childNodes[4].textContent = document.getElementById("lastNameCreate").value
        tr.childNodes[5].textContent = document.getElementById("ageCreate").value
        tr.childNodes[6].textContent = document.getElementById("emailCreate").value
        tr.childNodes[7].textContent = 'lol'
        tr.childNodes[8].textContent = 'Edit'
        tr.childNodes[8].onclick = editUser
        tr.childNodes[9].textContent = 'Delete'
        tr.childNodes[9].onclick = deleteUser
        console.log(table.lastElementChild.id )
        table.appendChild(tr)

        // document.getElementById("createForm").reset()
        // document.getElementById("idCreate").setAttribute('value', '')
        // document.getElementById("usernameCreate").setAttribute('value', '')
        // document.getElementById("passwordCreate").setAttribute('value', '')
        // document.getElementById("firstNameCreate").setAttribute('value', '')
        // document.getElementById("lastNameCreate").setAttribute('value', '')
        // document.getElementById("ageCreate").setAttribute('value', '')
        // document.getElementById("emailCreate").setAttribute('value', '')

        const qqqq = {
            id: parseInt(tr.childNodes[0].textContent),
            username: tr.childNodes[1].textContent,
            password: tr.childNodes[2].textContent,
            firstName: tr.childNodes[3].textContent,
            lastName: tr.childNodes[4].textContent,
            age: parseInt(tr.childNodes[5].textContent),
            email: tr.childNodes[6].textContent,
            rolesSet:[{id:1,name:"ROLE_USER"}]
        }
        const uuu = sendRequest('POST', requestUrl, qqqq)
    }

    function deleteUser() {
        let param = event.target.parentNode.parentNode.id
        const del = sendRequest('DELETE', requestUrl+param)
            .then(response => {
                //If request success, delete line in the table
                if (response.ok) {

                    console.log('Delete id='+param)
                    document.getElementById(param).remove()
                }
                return response.json.then(error => {
                    const e = new Error('Ошибка лол')
                    e.data = error
                })
            })
            .catch(err => console.log(err))
    }
