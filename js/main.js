const api_url = "https://api.aniapi.com/v1/anime/"

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
        data => data.data.documents
    )
}