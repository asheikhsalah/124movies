console.log('script running!')

const apiKey = 'cda101b027e0a6085e107b36f6767b3d'

const submitButton = document.querySelector("#submit");
const queryField = document.querySelector("#search")

let page = 1
let adultBool = false

let genres = {
    28:'Action',
    12:'Adventure',
    16:'Animation',
    35:'Comedy',
    80:'Crime',
    99:'Documentary',
    18:'Drama',
    10751:'Family',
    14:'Fantasy',
    36:'History',
    27:'Horror',
    10402:'Music',
    9648:'Mystery',
    10749:'Romance',
    878:'Science Fiction',
    10770:'TV Movie',
    53:'Thriller',
    10752:'War',
    37:'Western'
}


queryField.addEventListener('keydown', () => {
    if(queryField.value.length > 1) {
        queryField.style.width = '200px'
        queryField.style.height = 'auto'
    } else {
        queryField.removeAttribute('style')
    }
})


class Movie {
    constructor(jsonResult) {
        this.title = jsonResult.title
        this.description = jsonResult.overview
        this.releaseDate = jsonResult.release_date
        this.rating = jsonResult.vote_average
        this.image = jsonResult.poster_path
        this.genre = Movie.findGenre(jsonResult.genre_ids)
    }
    
        
    
    createCard() {
        
        const cardSection = document.getElementById("cardContainer");
        const card = document.createElement("section")
        const imgContainer = document.createElement("div")
        const img = document.createElement("img")
        const titleContainer = document.createElement("div")
        const title = document.createElement("p")
        const overlay = document.createElement("div")
        const description = document.createElement("p")
        
        img.src = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.image}`
        title.innerText = `${this.title}`
        description.innerText = `${this.description}`

        img.classList.add("img")
        titleContainer.classList.add("title-container")
        title.classList.add("title")
        card.classList.add("card")
        overlay.classList.add("overlay")
        imgContainer.classList.add("img-container")
        description.classList.add("description")
        
        overlay.append(description)
        card.append(imgContainer)
        imgContainer.append(overlay)
        imgContainer.append(img)
        titleContainer.append(title)
        card.append(titleContainer)
        cardSection.append(card)
    }

    static cardSection = document.getElementById("cardContainer");

    static genres = {
        28:'Action',
        12:'Adventure',
        16:'Animation',
        35:'Comedy',
        80:'Crime',
        99:'Documentary',
        18:'Drama',
        10751:'Family',
        14:'Fantasy',
        36:'History',
        27:'Horror',
        10402:'Music',
        9648:'Mystery',
        10749:'Romance',
        878:'Science Fiction',
        10770:'TV Movie',
        53:'Thriller',
        10752:'War',
        37:'Western'
    }

    static clearCards() {
        Movie.cardSection.innerHTML = ''
    }

    static findGenre (ids) {
        let returnArray = []
        ids.forEach(element => {
            returnArray.push(Movie.genres[element])
        })
        return returnArray
    }
}

/**
 * Filters through an array of movie objects and returns a filtered version of that array
 * @param {string} type
 * Filters using either date, genre or rating
 * @param {number} upperBound
 * Defines the upper bound for the filter
 * @param {number} lowerBound
 * Defines the lower bound for the filter (for the rating, )
 * @param {array} data
 * The data (movie objects array) being filtered through
*/ 


function filterRating(lowerBound,upperBound,data) {
    let endArray = []
    data.forEach(movie => {
        if (lowerBound < movie.rating && movie.rating < upperBound) {
            endArray.push(movie)
        }
    })
    return endArray
}

/**
 * Filters through an array of movie objects and returns a filtered version of that array
 * @param {string} type
 * Filters using either date, genre or rating
 * @param {array} genres
 * an array of the genres being checked against
 * @param {array} data
 * The data (movie objects array) being filtered through
*/ 

function filterGenre(genres,data) {
    let endArray = []
    data.forEach(movie => {
        genres.forEach(genre => {
            movie.genre.forEach(movieGenre => {
                if(genre == movieGenre) {
                    endArray.push(movie)
                }
            })
        })
    });
    return endArray
};

/**
 * Displays the cards either on the screen or 'suggestions'
 * @param {object} element
 * The element to be appended to
 * @param {string} inputType
 * The type of input
 * @param {number} number
 * The number of elements to be looped through
*/ 


 function displayObject(element, inputType, number) {
    element.addEventListener(`${inputType}`, async (e) => {
        let search = queryField.value;
        let myQuery = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${page}&include_adult=${adultBool}`;
      
        
        // fetch(...).then(() => {...}).catch(() => {...});
        try {
            if(inputType == 'click') {Movie.clearCards()}
            const response = await fetch(myQuery);
            const responseJson = await response.json(); // read JSON response
    
            // code to execute once JSON response is available
    
            let results = []
            const noOfTitles = Object.keys(responseJson.results).length
    
        
            //creates an object for each movie
            for(let i = 0; i < noOfTitles; i++) {
                // console.log(responseJson.results[i])
                if(!(responseJson.results[i].poster_path === null || responseJson.results[i].overview === "")){
                    results.push(new Movie(responseJson.results[i]))
                }
            }
    
            //list of the top 3 results
            if(inputType == 'click') {
                for(let i = 0; i < noOfTitles; i++) {
                    results[i].createCard()
                }

            } else {
                for(let i = 0; i < number; i++) {
                    console.log(results[i].title)
                }
            }
            //logs a line to distinguish between results
            console.log('---------------')
    
        } catch (error) {
            console.error(error);
        }
    });
 }

 displayObject(submitButton, "click", 25)
 displayObject(queryField, "keydown", 3)