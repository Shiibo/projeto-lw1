const openModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "flex"
}

const closeModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "none"
}

const handleModalClose = (event) => {
    if (event.target.className === "modal") {
        event.target.style.display = "none"
    }
}

const addPokemon = async (event) => {
    event.preventDefault()
    const pokemon = event.target.input.value

    const tickerWasFound = tickersList.find((input) => {
        return input.name === pokemon
    })

    if (tickerWasFound) {
        alert("Pokemon já adicionado!")
        return
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) // faz a requisição na API

        if (response.status == 200) {
            const data = await response.json();
            const newCard = {
                name: data.name, id: data.id, pkmImage: data['sprites']['versions']['generation-v']
                ['black-white']['animated']['front_shiny']
            }
            tickersList.push(newCard)
            closeModal('#add-stock')
            renderCards()
            return data;
        } else {
            alert(`Pokemon não encontrado!`)
        }
    } catch (error) {
        alert(error)
    }
}

const handleTickerMouseEnter = (event) => {
    const input = event.target
    const btnClose = input.querySelector(".btn-close")
    btnClose.style.display = "block"
}

const addTickersEvents = () => {
    const tickers = document.querySelectorAll(".input")
    tickers.forEach((input) => {
        input.addEventListener("mouseenter", handleTickerMouseEnter)
        input.addEventListener("mouseleave", handleTickerMouseLeave)
    })
}

const handleTickerMouseLeave = (event) => {
    const input = event.target
    const btnClose = input.querySelector(".btn-close")
    btnClose.style.display = "none"
}


const removeTicker = (event) => {
    const btnClose = event.target
    const input = btnClose.closest('.input')
    const h2Ticker = input.querySelector('.pkm_name')
    const tickerName = h2Ticker.textContent
    newTickerList = tickersList.filter((input) => {
        return input.name !== tickerName
    })
    tickersList = newTickerList
    renderCards()
}

const modal = document.querySelector(".modal")
modal.addEventListener("click", handleModalClose)

addTickersEvents()

const renderCards = () => {
    const divTickersList = document.querySelector("#tickers-list")
    divTickersList.innerHTML = ''
    tickersList.forEach((input) => {
        const newCard =
            `<div class="input">
            <button class="btn-close" onclick="removeTicker(event)">x</button>
            <h1 class="pkm_data">
                <span class="pkm_number">${input.id}</span> -
                <span class="pkm_name">${input.name}</span>
            </h1>
  
            <img src="${input.pkmImage}" alt="pokemon" class="pkm_image">
            

            <img src="./img/pokedex.png" alt="pokedex" class="pokedex">
        </div>
            `
        divTickersList.innerHTML += newCard
    })
    addTickersEvents()
}

let tickersList = [{ name: 'Bulbasaur', id: 1, pkmImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/1.gif' }, { name: 'Ivysaur', id: 2, pkmImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/2.gif' }]
renderCards()
