const root = document.getElementById('app')

export function Tweet(){

    const {pathname} = window.location

    const [,id] = pathname.split('tweets/')

    root.innerHTML = `<h1>Tweet ${id}</h2>`

}