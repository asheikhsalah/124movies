@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900;1000&family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap');
*{
    font-family: 'Cairo', sans-serif;
    color:white;
}   
body {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    width: 100%;
    background: rgb(160,97,255);
background: linear-gradient(120deg, rgba(160,97,255,1) 14%, rgba(182,52,182,1) 49%, rgba(255,0,26,1) 100%);
    
    
}
header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* From https://css.glass */
background: rgba(255, 255, 255, 0.2);

box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(255, 255, 255, 0.3);

    
    
}
h1 {
    color: white;
    font-weight: 700;
    font-size: 40px;
    margin: 0;
    
    text-shadow: 2px 2px #f6f6f6;
    
}
#submit {
    width: 20px;
    filter:invert(100%) sepia(100%) saturate(1%) hue-rotate(315deg) brightness(105%) contrast(101%);
    padding: 10px;
}
.search-container {
    
    background: rgba(255, 255, 255, 0.16);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.2px);
    -webkit-backdrop-filter: blur(9.2px);
    border: 1px solid rgba(255, 255, 255, 0.35);
display: flex;
transition: ease-in-out 0.5s;
border-radius: 60px;
    
    width: auto;
    margin-bottom: 20px;
}
.icon-container {
    display: flex;
    background-color: none;
    

}
#search {
    width: 0px;
    height: 0px;
    background: transparent;
    border: none;
    user-select: none;
    caret-color: white;
    color: white;
    margin-right: 0px
    
}

.search-container:hover > #search {
    display: block;
    width: 200px;
    transition: ease-in 0.5s;
    transition: ease-out 0.5s;
    height: auto;
    margin-right: 10px
}

input:focus {outline:none;}

.hidden {
    display: none;
}
#cardContainer {
    display: flex;
    /* float: left;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem; */
    flex-wrap: wrap;
    max-width: 1200px;
    margin-block: 2rem;
    gap: 2rem;
  }

img {
    max-width: 100%;
    max-height: 50%;
    display: flex;
    flex-wrap: wrap;
    object-fit: cover;
  }
  
  .card {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 600px;
    overflow: hidden;
    box-shadow: 0 .1rem 1rem rgba(221, 58, 58, 0.3);
    border-radius: 2em;
    background: #363035;
    /* background: linear-gradient(to right, #070606, #ECE9E6); */
   
    
  }

  .card__body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
  
  .card__footer {
    display: flex;
    padding: 1rem;
    margin-top: auto;
  }

footer {
    margin: 0;
    padding: 5px;
    text-align: center;
    /* From https://css.glass */
background: rgba(255, 255, 255, 0.2);

box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(255, 255, 255, 0.3);

}

@media (min-width : 600px) {
    header {
        display: flex;
        flex-direction: row;
       justify-content: space-around;
    }
    header h1 {
        font-size: 50px;
    }
    .search-container{
        margin-bottom: 0px;
    }
}
