console.log("chargement terminé")

const loader = document.querySelector('#todo-container')
const aFaire = document.querySelector('#aFaire')
const tous = document.querySelector('#tous')
const fait = document.querySelector('#fait')
const newTodoAdd = document.querySelector('form')

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
        <input type="checkbox">
        <h3>${title}</h3>
        <button>delete</button>
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
        <input type="checkbox" ${input}>
        <h3>${Todo.title}</h3>
        <button>delete</button>`
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
        <input type="checkbox" ${input}>
        <h3>${Todo.title}</h3>
        <button>delete</button>
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