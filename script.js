console.log('script running!')

class Movie {
    constructor(jsonResult) {
        this.title = jsonResult.title
        this.description = jsonResult.overview
        this.releaseDate = jsonResult.release_date
        this.rating = jsonResult.vote_average
        this.image = jsonResult.poster_path
    }

    // createCard() {
    //     let cardSection = document.getElementById("cardContainer");
    //     cardSection.innerHTML += this.format()
    //     console.log(this.image)
        
    // }

//     format() {
//         return `
//         <div class="card">
//          <img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.image}" alt="image">
//         <div class="card__body">
//             <h4 class="title"><b>${this.title}</b></h4>
//             <p class="description">${this.description}</p>
//             <p class="rating">rating: ${this.rating}</p>
//         </div>  
//         <div class="card__footer">
//         footer
//         </div>
//         </div> 
// `
//     }

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
}
function changestyle (){
    var a = document.getElementsByClassName("card")
    a.style.width = "10px"
}

const apiKey = 'cda101b027e0a6085e107b36f6767b3d'

const submitButton = document.querySelector("#submit");
const queryField = document.querySelector("#search")

let page = 1
let adultBool = false

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
            console.log(responseJson.results[i].title)
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
        for(let i = 0; i < noOfTitles; i++) {
            results[i].createCard()
        }
        //logs a line to distinguish between results
        console.log('---------------')

    } catch (error) {
        console.error(error);
    }
});
