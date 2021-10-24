const api_url = "https://api.aniapi.com/v1/anime"

let searchBar = document.querySelector("#searchBar")
let searchBtn = document.querySelector("#searchBtn")
searchBtn.addEventListener("click",()=>{
    search()
})

// show cards when page loded
addEventListener("load",Featch(""))
function Featch(requist){
    fetch(api_url + requist).then(
        response => {
            if(response.ok)
                return response.json()
            else
                alert("something is wrong please try later")
        }
    ).then(
        data => createCard(data.data.documents)
    ).catch(error=>{
        alert("something is wrong please try later")
    })
}

// search
function search(){
    let searchValue = searchBar.value
    let regx = /\s/ig
    searchValue = searchValue.replace(regx, "%20")

    let cards = document.querySelectorAll(".card")
    cards.forEach(e=>{
        e.remove()
    })

    Featch("?title=" + searchValue)
}

// relod the page when click on header
function relodPage(){
    let cards = document.querySelectorAll(".card")
    cards.forEach(e=>{
        e.remove()
    })

    Featch("")
}

// card class
class card{
    constructor(data, title_max_length){
        this.data = data
        this.title_max_length= title_max_length;
    }
    
    createCard(){
        // card title
        this.card_title = this.data.titles.en;
        
        function clearTitel(title, max_length){
            if(title.length > max_length){
                return title.substr(0, max_length) + "..."
            }
            return title
        }

        // years
        this.start_date = this.data.start_date.substr(0, 10);
        this.end_date = this.data.end_date.substr(0, 10);

        this.banner_image = this.data.banner_image;
        this.card_img_url = this.data.cover_image;
        this.episodes_count= this.data.episodes_count;
        this.score =     this.data.score

        // card html
        let card_html = `
            <div class="img-container">
                <img class="card-img" src="${this.card_img_url}" alt="${this.card_title}">
            </div>
            <div class="card-info">
                <ul class="info-1">
                    <li class="title">${clearTitel(this.card_title, this.title_max_length)}</li>
                    <li class="episotes-num">ep: ${this.episodes_count}</li>
                </ul>   
                <ul class="info-2">
                    <li class="card-info-text">Start: ${this.start_date}</li>
                    <li class="card-info-text">End: ${this.end_date}</li>
                </ul>
            </div>`

        // creating and appending the card
        let cards_container = document.querySelector(".cards-container")
        let card = document.createElement("li")
        card.addEventListener("click", this.createMoreInfo)

        card.classList.add("card")
        card.innerHTML = card_html;

        cards_container.append(card)
        
        return card;
    }
    
    showMoreInfo(){
        this.jp_title = this.data.titles.jp
        this.episode_duration = this.data.episode_duration

        let more_info_page_code = `
        <button class="get_home_btn">Home</button>
        
        <img class="card-img" src="${this.banner_image}" alt="${this.card_title}">
        <h2>
            ${this.card_title}
        </h2>

        <div class="info">
            <ul class="info-1">
                <li class="card-info-text">
                    JP Name: ${this.jp_title}
                </li>
                
                <li class="card-info-text">
                    Start: ${this.start_date}
                </li>

                <li class="card-info-text">
                    End: ${this.end_date}
                </li>
            </ul>

            <ul class="info-2">
                <li class="card-info-text">
                    Episodes: ${this.episodes_count}
                </li>

                <li class="card-info-text">
                    Episode Duration: ${this.episode_duration}
                </li>

                <li class="card-info-text">
                    Score: ${this.score}
                </li>
            </ul>
        </div>        
        `
        console.log(this.data.trailer_url)
        if(this.data.trailer_url != undefined)
            more_info_page_code += `<iframe class="iframe" src="${this.data.trailer_url}" frameborder="0" allowfullscreen></iframe>`
        console.log(more_info_page_code)
        

        const main = document.querySelector("main")
        const more_info_page = document.createElement("section")

        const cards_container = document.querySelector(".cards-container")
        const header = document.querySelector("header")
        cards_container.style.display = "none"
        header.style.display = "none"

        more_info_page.innerHTML = more_info_page_code;
        more_info_page.classList.add("more_info_page")

        main.append(more_info_page)

        let get_home_btn = document.querySelector(".get_home_btn")
        get_home_btn.addEventListener("click",()=>{
            more_info_page.remove()
            cards_container.style.display = ""
            header.style.display = ""
        })
    }
}

// create card
function createCard(data){
    data.forEach(cardData => {
        let c = new card(cardData, 20)
        c.createCard().addEventListener("click",()=>{
            c.showMoreInfo()
        })        
    });
}