const root = document.getElementById('app')

export function User(){
    const {pathname} = window.location

    const [,id] = pathname.split('users/')

    root.innerHTML = `<h1> User ${id}</h2>`
}