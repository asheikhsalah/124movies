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
        Movie.cardSection.innerHTML += this.format()
    }

    format() {
        return `
        <div class="card">
        <img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.image}" alt="image" style="width:100%">
            <div class="container">
                <h4><b>${this.title}</b></h4>
                <p>${this.description}</p>
                <p>rating: ${this.rating}</p>
            </div>
        </div>`
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




//upon pressing any key on the keyboard
queryField.addEventListener("keydown", async (e) => {
    let search = queryField.value;
    let myQuery = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${page}&include_adult=${adultBool}`;
  
    // fetch(...).then(() => {...}).catch(() => {...});
    try {
        const response = await fetch(myQuery);
        const responseJson = await response.json(); // read JSON response

        // code to execute once JSON response is available

        let results = []
        const noOfTitles = Object.keys(responseJson.results).length
        
        //creates an object for each movie
        for(let i = 0; i < noOfTitles; i++) {
            results.push(new Movie(responseJson.results[i]))
        }

        //list of the top 3 results
        for(let i = 0; i < noOfTitles && i < 3; i++) {
            console.log(results[i].title)
        }
        // logs a line to distinguish between results
        console.log('---------------')

    } catch (error) {
        console.error(error);
    }
  });

//upon pressing submit
submitButton.addEventListener("click", async (e) => {
    let search = queryField.value;
    let myQuery = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${page}&include_adult=${adultBool}`;
  
    // fetch(...).then(() => {...}).catch(() => {...});
    try {
        Movie.clearCards()
        const response = await fetch(myQuery);
        const responseJson = await response.json(); // read JSON response

        // code to execute once JSON response is available

        let results = []
        const noOfTitles = Object.keys(responseJson.results).length

        //creates an object for each movie
        for(let i = 0; i < noOfTitles; i++) {
            results.push(new Movie(responseJson.results[i]))
        }

        //list of the top 3 results
        for(let i = 0; i < noOfTitles && i < 3; i++) {
            results[i].createCard()
        }
        // logs a line to distinguish between results
        console.log('---------------')
        
    } catch (error) {
        console.error(error);
    }
});
