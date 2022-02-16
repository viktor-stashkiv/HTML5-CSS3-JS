const root = document.getElementById('app')

export function Feed(){
    const layout = `
        <header>
        <form id="new-tweet-form" class="column">
            <textarea 
            name="text" 
            id="input" 
            placeholder="What's happening?"
            ></textarea>
            <div class="row justify">
            <div class="characters-counter">
                <span class="count">0</span>/280
            </div>
            <button
                disabled
                type="submit"
                class="submit"
            >
                Tweet
            </button>
            </div>
        </form>
        </header>

        <main>
        <ul id="list">
        </ul>
        <main>
    `;

    root.innerHTML = layout


    const form = document.querySelector('#new-tweet-form')
    const list = document.querySelector('#list')
    const textarea = document.querySelector('textarea')
    const button = document.querySelector('button')
    const counter = document.querySelector('.characters-counter')
    const countElement = document.querySelector('.count')

    const USER_ID = 1

    textarea.addEventListener('input',evt =>{
        const count = evt.target.value.length

        countElement.textContent = count

        if(count === 0 || count > 280){
            button.setAttribute('disabled',true)

            countElement.style.color = 'red'
        } else {
            button.removeAttribute('disabled')

            countElement.style.color = 'black'
        }
    });


    form.addEventListener('submit',(evt) =>{
        evt.preventDefault()

        const data = new FormData(evt.target)

        addTweet({text:data.get('text'),username: "@igor27",isLiked:false})
    });

    list.addEventListener('click',(evt)=>{
        evt.preventDefault()

        const tweet = evt.target.closest('li')

        const buttonElement = evt.target.closest('a.like-button')

        if(buttonElement !== null){
            buttonElement.classList.toggle('like')

            if(Number(tweet.dataset.userId) === USER_ID){
                alert('Liked own tweet');
            }
            return
        }

        const usernameElement = evt.target.closest('p.username')

        if(usernameElement !== null){
            console.log(tweet.dataset.userId);
            console.log('Navigate to',usernameElement.textContent)

            window.history.pushState(null,null,`/users/${tweet.dataset.userId}`)
        
            return
        }

        window.history.pushState(null,null,`/tweets/${tweet.dataset.tweetId}`)
    })

    function addTweet({text,username,isLiked}){
        const tweetObj = {userId:USER_ID,text,username,isLiked}
        const tweet = createTweet(tweetObj)

        list.prepend(tweet)

        textarea.value = ''
        button.setAttribute('disabled',true)

        saveTweet(tweetObj)
    }

    function createTweet({tweetId,userId,text,username,isLiked}){
        const tweet = document.createElement('li')

        tweet.dataset.userId = userId
        tweet.dataset.tweetId = tweetId

        tweet.innerHTML = `
            <p class="username">${username}</p>
            <p class="text">${text}</p>

            <div class="buttons">
                <a href="#" class="like-button ${isLiked? "like":""}">
                    <i class="fas fa-heart"></i>
                </a>
            </div>
        `

        return tweet
    }

    function getTweets(){
        const tweets = [
            {
                tweetId: 1,
                userId: USER_ID,
                username: '@igor',
                text: "Text Igor",
                isLiked: true,
            },
            {
                tweetId: 1,
                userId: 2,
                username: '@viktor',
                text: "Text Viktor",
                isLiked: false,
            },
        ]

        const localTweets = window.localStorage.getItem('tweets');

        if(localTweets === null){
            return tweets
        }

        return JSON.parse(localTweets)

    }

    function saveTweet(tweet){
        const tweets = getTweets()

        tweets.unshift(tweet)

        window.localStorage.setItem('tweets',JSON.stringify(tweets))


    }

    function renderApp(){
        const tweets = getTweets()

        tweets.forEach(tweet =>{
            const tweetElement = createTweet(tweet)

            list.append(tweetElement)
        })
    }

renderApp();
}