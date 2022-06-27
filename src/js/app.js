const API_KEY = "api_key=ed498ca290df926e6f0df100a7e58dde";

const BASE_URL = "https://api.themoviedb.org/3";

const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY; // url of themoviedb show most popular movies    

const IMG_URl = "https://image.tmdb.org/t/p/w500"

const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY; // url for search function sort by popularity 
 
const genreList = {
    "genres":[
       {
          "id":28,
          "name":"Action"
       },
       {
          "id":12,
          "name":"Adventure"
       },
       {
          "id":16,
          "name":"Animation"
       },
       {
          "id":35,
          "name":"Comedy"
       },
       {
          "id":80,
          "name":"Crime"
       },
       {
          "id":99,
          "name":"Documentary"
       },
       {
          "id":18,
          "name":"Drama"
       },
       {
          "id":10751,
          "name":"Family"
       },
       {
          "id":14,
          "name":"Fantasy"
       },
       {
          "id":36,
          "name":"History"
       },
       {
          "id":27,
          "name":"Horror"
       },
       {
          "id":10402,
          "name":"Music"
       },
       {
          "id":9648,
          "name":"Mystery"
       },
       {
          "id":10749,
          "name":"Romance"
       },
       {
          "id":878,
          "name":"Science Fiction"
       },
       {
          "id":10770,
          "name":"TV Movie"
       },
       {
          "id":53,
          "name":"Thriller"
       },
       {
          "id":10752,
          "name":"War"
       },
       {
          "id":37,
          "name":"Western"
       }
    ]
 }
;
const main = document.getElementById('main')

const form = document.getElementById('form')

const search = document.getElementById('_search')

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
       
        showMovies(data.results)
    })
}

getMovies(API_URL)

function showMovies(data) {

    main.innerHTML = ''
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src=" ${IMG_URl + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        

       `
        main.appendChild(movieEl)
        }
    )
}

function getColor(popularity) {
    if (popularity >= 8 ){
        return "green"
    }else if (popularity >= 5 ){
        return "orange"
    }else{
        return "red"

    }     
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCH_URL + "&query=" + searchTerm)
    }else{
        getMovies(API_URL)
    }
})