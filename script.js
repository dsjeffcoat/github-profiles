const API_URL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


// Fetch calls 
async function getUser(username) {
    try {
        const res = await axios(API_URL + username)
        createUserProfile(res.data)
        getRepos(username)
    } catch (err) {
        if(err.response.status == 404) {
            createErrorCard('No profile found with this username')
        }
    }
}

async function getRepos(username) {
    try {
        const res = await axios(API_URL + username + '/repos?sort=created')
        createRepoList(res.data)
    } catch (err) {
        createErrorCard('Problem fetching repositories')
    }
}

// getUser('dsjeffcoat')

// Card functionality

function createUserProfile(user) {
    const cardHTML = `
    <div class="card">
        <div>
          <img src="${user.avatar_url}" alt="" class="avatar">
        </div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <h4>${user.login}</h4>
          <p>${user.bio}</p>

          <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repositories</strong></li>
          </ul>

          <div id="repos"></div>
        </div>
      </div>
    `

    main.innerHTML = cardHTML;
}

function createErrorCard(message) {
    const cardHTML = `
        <div class="card">
            <h1>${message}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

function createRepoList(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 5)
        .forEach(repo => {
        const repoURL = document.createElement('a')
        repoURL.classList.add('repo')
        repoURL.href = repo.html_url
        repoURL.target = '_blank'
        repoURL.innerText = repo.name
        

        reposEl.appendChild(repoURL)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value
    
    if(user) {
       getUser(user)
       
       search.value = ''
    }
})