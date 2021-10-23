const api_url = "https://api.aniapi.com/v1/anime/"

// show cards when page loded
addEventListener("load",pageLoded)
function pageLoded(){
    fetch(api_url).then(
        response => {
            if(response.ok)
                return response.json()
            else
                alert("something is wrong please try later")
        }
    ).then(
        data => createCard(data.data.documents)
    )
}

class card{
    constructor(data, title_max_length){
        this.data = data
        this.title_max_length = title_max_length;
    }
    
    createCard(){
        // card title
        let card_title = this.data.titles.en;
        if(card_title.length > this.title_max_length){
            card_title = card_title.substr(0, this.title_max_length)
            card_title = card_title + "..."
        }

        // years
        let start_date = this.data.start_date.substr(0, 10) ;        
        let end_date = this.data.end_date.substr(0, 10);

        let card_img_url = this.data.cover_image;
        let episodes_count= this.data.episodes_count;
        let score = this.data.score

        // card html
        let card_html = `
            <div class="img-container">
                <img class="img-card" src="${card_img_url}" alt="${card_title}">
            </div>
            <div class="card-info">
                <ul class="info-1">
                    <li class="title">${card_title}</li>
                    <li class="episotes-num">episotes: ${episodes_count}</li>
                </ul>   
                <ul class="info-2">
                    <li class="card-info-text">Name: ${card_title}</li>
                    <li class="card-info-text">Start: ${start_date}</li>
                    <li class="card-info-text">End: ${end_date}</li>
                </ul>
            </div>`

        // creating and appending the card
        let cards_container = document.querySelector(".cards-container")
        let card = document.createElement("li")

        card.classList.add("card")
        card.innerHTML = card_html;

        cards_container.append(card)
    }
}

let cards = []
function createCard(data){
    data.forEach(cardData => {
        let c = new card(cardData, 20)
        c.createCard()
        cards.push(c)
    });
}