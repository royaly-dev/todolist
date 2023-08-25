console.log("chargement terminé")

const loader = document.querySelector('#todo-container')
const aFaire = document.querySelector('#aFaire')
const tous = document.querySelector('#tous')
const fait = document.querySelector('#fait')
const newTodoAdd = document.querySelector('form')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>`
/*
system de suprétion
*/

  function deleteTodo() {

    const buttons = document.querySelectorAll('#todo-container button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {

        const row = button.parentNode
        row.remove()
        })
    })}

/*
system t'ajout
*/

newTodoAdd.addEventListener('submit', (e) => {
    e.preventDefault()
    form = e.currentTarget
    console.log(newTodoAdd['todo'].value)
    const todoValue = newTodoAdd['todo'].value
    if (todoValue === '') {
        console.log('erreur : pas de champ compléter')
    } else {
        addNewTodo(todoValue)
        form.reset()
    }
})

function addNewTodo(title) {
    newTodo = document.createElement('div')
    newTodo.className = 'todo'
    newTodo.innerHTML = `
        <input class="check-box" type="checkbox">
        <h3>${title}</h3>
        <button>${svg}</button>
    `
    loader.append(newTodo)
    deleteTodo()
}

/*
system de tri de la todo
*/
function removeChildren() {
    return new Promise((resolve) => {
      while (loader.firstChild) {
        loader.firstChild.remove();
      }
      resolve();
    });
  }

tous.addEventListener('click', (e) => {
    removeChildren()
    load()
    deleteTodo()
})

fait.addEventListener('click', async (e) => {
    await removeChildren()
    const r = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        headers: {
            Accept: 'application/json'
        }
    })

    if (r.ok) {
        const result = await r.json()
        for (let post of result) {
            loader.append(verifcheck(post, true))
        }
        deleteTodo()
    }
})

aFaire.addEventListener('click', async (e) => {
    await removeChildren()
    const r = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        headers: {
            Accept: 'application/json'
        }
    })

    if (r.ok) {
        const result = await r.json()
        for (let post of result) {
            loader.append(verifcheck(post, false))
        }
        deleteTodo()
    }
})

function verifcheck(Todo, option) {
    if (Todo.completed == option) {
        if (Todo.completed == true) {
            input = 'checked'
        } else {
            input = ''
        }
        const verif = document.createElement('div')
        verif.className = 'todo'
        verif.innerHTML = `
        <input class="check-box" type="checkbox" ${input}>
        <h3>${Todo.title}</h3>
        <button>${svg}</button>`
        return verif
    } return ''

}


function createNewTodo(Todo) {
    if (Todo.completed == true) {
        input = 'checked'
    } else {
        input = ''
    }

    const newTodo = document.createElement('div')
    newTodo.className = 'todo'
    newTodo.innerHTML = `
        <input class="check-box" type="checkbox" ${input}>
        <h3>${Todo.title}</h3>
        <button>${svg}</button>
    `

    return newTodo
}

async function load() {
    const r = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        headers: {
            Accept: 'application/json'
        }
    })

    if (r.ok) {
        const result = await r.json()
        for (let post of result) {
            loader.append(createNewTodo(post))
        }
        deleteTodo()
    }
}

load()