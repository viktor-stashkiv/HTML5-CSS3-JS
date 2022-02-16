import {Feed} from './pages/feed.js'
import {NotFound} from './pages/notFound.js'
import {Tweet} from './pages/tweet.js'
import {User} from './pages/user.js'

const root = document.getElementById('app')

const routes = [
    {
        match: (url) => {
            return url === '/'
        },
        renderRoute: Feed,
    },
    {
        match: (url) => {
            return url.includes('/users/')
        },
        renderRoute: User,
    },
    {
        match: (url) => {
            return url.includes('/tweets/')
        },
        renderRoute: Tweet,
    },
    {
        match: () => true,
        renderRoute: NotFound,
    },
]

class Router {
    constructor(routes){
        this._routes = routes
        this.reroute()

        window.history.pushState = (data,title,url) => { // костиль який дозволяє переходити між сторінками беж перезавантаження
            History.prototype.pushState.apply(window.history,[data,title,url])
            this.reroute()
        
        }

        window.onpopstate = () => {
            this.reroute()
        }
    }

    reroute(){
        const matchedRoute = this._routes.find((route)=>{
            const mached = route.match(window.location.pathname)
        
            return mached;
        })

        matchedRoute.renderRoute()

    }
}

const router = new Router(routes)

