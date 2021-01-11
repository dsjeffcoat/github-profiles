const API_URL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
    try {
        const res = await axios(API_URL + username)
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

// getUser('dsjeffcoat')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value
    
    if(user) {
       getUser(user)
       
       search.value = ''
    }
})