const burgerBtn = document.querySelector('.header__button')
const header = document.querySelector('.header')
const menu = document.querySelector('.header__menu')
const blockout = document.querySelectorAll('.blockout')
const logo = document.querySelector('.header__logo')

burgerBtn.addEventListener('click', () => {
    if (!menu.classList.contains('menu_moved')) {
        menu.classList.add('menu_moved')
        logo.classList.add('logo_moved')
        burgerBtn.classList.add('button_rotated')
        blockout[0].style.display = 'block'
        blockout[1].style.display = 'block'
        document.body.classList.add('stop_scroll')
    } else {
        menu.classList.remove('menu_moved')
        logo.classList.remove('logo_moved')
        burgerBtn.classList.remove('button_rotated')
        blockout[0].style.display = 'none'
        blockout[1].style.display = 'none'
        document.body.classList.remove('stop_scroll')
    }
})

const headerLink = document.querySelectorAll('.header__list-link')[1]

headerLink.addEventListener('click', () => {
    menu.classList.remove('menu_moved')
    logo.classList.remove('logo_moved')
    burgerBtn.classList.remove('button_rotated')
    blockout[0].style.display = 'none'
    blockout[1].style.display = 'none'
    document.body.classList.remove('stop_scroll')
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

import {pets} from '../../assets/pets.js'

const generateCards  = () => {
    const shufle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }
    const range = []
    for (let i = 0; i < 8; i++) range.push(i)
    const generated = []
    for (let i = 0; i < range.length; i++) {
        for (let j = 0; j < i; j++) {
            [range[i], range[j]] = [range[j], range[i]]
        }
        generated.push([...range])
    }
    return shufle(generated)
}

const slice = (arr, limit) => {
    if (limit === 3) {
        const result = []
        for (let i = 0; i < arr.length; i++) {
            if (result.length === 16) break
            for (let j = 0; j < arr.length; j++) {
                const sliced = [...arr[i].slice(j, j + 3)]
                if (sliced.length !== 3) break
                if (!result.some((element) => element.every((_, index, subarr) => subarr[index] === sliced[index]))) {
                    result.push([...sliced])
                }
            }
        }
        return result.slice(0, 16)
    } else if (limit === 6) return arr.map((element) => element.slice(0, limit))
    else return arr.slice(0, 6)
}

const renderCards = (element, cards) => {
    element.innerHTML = ''
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div')
        card.className = 'pets__card-item'
        card.innerHTML = `
            <img class="pets__card-img" src="${cards[i].img}" alt="${cards[i].name.toLowerCase()}">
            <h4 class="pets__card-title">${cards[i].name}</h4>
            <button class="pets__card-button">Learn more</button>
        `
        element.appendChild(card)
    }
}

const generatePopup = () => {
    const initPopup = (element) => {
        const pet = pets.find((pet) => pet.name === element)
        const popup = document.querySelector('.popup')
        popup.classList.add('popup_show')
        popup.querySelector('.popup__content').innerHTML = `
            <img class="popup__img" src="${pet.img}" alt="${pet.name.toLowerCase()}">

            <div class="popup__subcontent">
                <h3 class="popup__name">${pet.name}</h3>
                <h4 class="popup__type-breed">${pet.type} - ${pet.breed}</h4>
                <h5 class="popup__description">${pet.description}</h5>
                <ul class="popup__list">
                    <li class="popup__age"><b>Age:</b> ${pet.age}</li>
                    <li class="popup__inoculations"><b>Inoculations:</b> ${pet.inoculations}</li>
                    <li class="popup__diseases"><b>Diseases:</b> ${pet.diseases}</li>
                    <li class="popup__parasites"><b>Parasites:</b> ${pet.parasites}</li>
                </ul>
            </div>
        `
    }
    const learnMore = document.querySelectorAll('.pets__card-button')
    learnMore.forEach((element) => element.addEventListener('click', () => {
        blockout[0].style.display = 'block'
        blockout[1].style.display = 'block'
        blockout[0].classList.add('blockout_priority')
        blockout[1].classList.add('blockout_priority')
        document.body.classList.add('stop_scroll')
        initPopup(element.parentElement.querySelector('.pets__card-title').innerHTML)
    }))
    const cardItems = document.querySelectorAll('.pets__card-item')
    cardItems.forEach((element) => element.addEventListener('click', () => {
        blockout[0].style.display = 'block'
        blockout[1].style.display = 'block'
        blockout[0].classList.add('blockout_priority')
        blockout[1].classList.add('blockout_priority')
        document.body.classList.add('stop_scroll')
        initPopup(element.querySelector('.pets__card-title').innerHTML)
    }))
}

let getBreakpoint = function () {
	return window.getComputedStyle(document.body, ':before').content.replace(/\"/g, '');
};

let breakpoint = getBreakpoint()
const cardsCurrent = document.querySelector('.cards_current')
const cardsNext = document.querySelector('.cards_next')

let page = 0
let randomCards = generateCards()
let cards = slice(randomCards, 8)

if (breakpoint === 'large') cards = slice(randomCards, 8)
else if (breakpoint === 'medium') cards = slice(randomCards, 6)
else cards = slice(randomCards, 3)

renderCards(cardsCurrent, cards[page].map((element) => pets[element]))
generatePopup()

const startBtn = document.querySelector('.pets__start-button')
const leftBtn = document.querySelector('.pets__left-button')
const currentPageBtn = document.querySelector('.pets__current-page-button')
const rightBtn = document.querySelector('.pets__right-button')
const endBtn = document.querySelector('.pets__end-button')

const generatePageBtns = () => {
    const disactive = (element) => {
        element.classList.remove('active_button')
        element.classList.add('disactive_button')
    }
    const active = (element) => {
        element.classList.remove('disactive_button')
        element.classList.add('active_button')
    }
    if (page > 0 && page < cards.length - 1) {
        active(startBtn)
        active(leftBtn)
        active(endBtn)
        active(rightBtn)
    }

    if (page === 0) {
        disactive(startBtn)
        disactive(leftBtn)
        active(endBtn)
        active(rightBtn)
    }

    if (page === cards.length - 1) {
        disactive(endBtn)
        disactive(rightBtn)
        active(startBtn)
        active(leftBtn)
    }
}

window.addEventListener('resize', function () {
    if (breakpoint !== getBreakpoint()) {
        breakpoint = getBreakpoint()
        if (breakpoint === 'large') {
            cards = slice(randomCards, 8)
            renderCards(cardsCurrent, cards[page].map((element) => pets[element]))
            generatePopup()
            generatePageBtns()
        } else if (breakpoint === 'medium') {
            cards = slice(randomCards, 6)
            renderCards(cardsCurrent, cards[page].map((element) => pets[element]))
            generatePopup()
            generatePageBtns()
        } else {
            cards = slice(randomCards, 3)
            renderCards(cardsCurrent, cards[page].map((element) => pets[element]))
            generatePopup()
            generatePageBtns()
        }
    }
}, false);


startBtn.addEventListener('click', () => {
    if (page === 0) return
    const cardsCurrent = document.querySelector('.cards_current')
    const cardsNext = document.querySelector('.cards_next')
    renderCards(cardsNext, cards[0].map((element) => pets[element]))
    cardsCurrent.classList.remove('cards_current')
    cardsCurrent.classList.add('cards_right_moved')
    setTimeout(() => {
        cardsCurrent.classList.remove('cards_right_moved')
    }, 200)
    cardsCurrent.classList.add('cards_next')
    cardsNext.classList.remove('cards_next')
    cardsNext.classList.add('cards_left_moved')
    setTimeout(() => {
        cardsNext.classList.remove('cards_left_moved')
        cardsNext.classList.add('cards_current')
    }, 150)
    currentPageBtn.innerHTML = `${1}`
    page = 0
    generatePopup()
    generatePageBtns()
})

endBtn.addEventListener('click', () => {
    if (page === cards.length - 1) return
    const cardsCurrent = document.querySelector('.cards_current')
    const cardsNext = document.querySelector('.cards_next')
    renderCards(cardsNext, cards[cards.length - 1].map((element) => pets[element]))
    if (cardsCurrent.classList !== null) 
    cardsCurrent.classList.remove('cards_current')
    cardsCurrent.classList.add('cards_left_moved')
    setTimeout(() => {
        cardsCurrent.classList.remove('cards_left_moved')
    }, 200)
    cardsCurrent.classList.add('cards_next')
    cardsNext.classList.remove('cards_next')
    cardsNext.classList.add('cards_right_moved')
    setTimeout(() => {
        cardsNext.classList.remove('cards_right_moved')
        cardsNext.classList.add('cards_current')
    }, 150)
    currentPageBtn.innerHTML = `${cards.length}`
    page = cards.length - 1
    generatePopup()
    generatePageBtns()
})

let overclick = false

leftBtn.addEventListener('click', () => {
    if (overclick) return
    if (page - 1 < 0) return
    const cardsCurrent = document.querySelector('.cards_current')
    const cardsNext = document.querySelector('.cards_next')
    page -= 1
    renderCards(cardsNext, cards[page].map((element) => pets[element]))
    cardsCurrent.classList.remove('cards_current')
    cardsCurrent.classList.add('cards_right_moved')
    setTimeout(() => {
        cardsCurrent.classList.remove('cards_right_moved')
    }, 200)
    cardsCurrent.classList.add('cards_next')
    cardsNext.classList.remove('cards_next')
    cardsNext.classList.add('cards_left_moved')
    setTimeout(() => {
        cardsNext.classList.remove('cards_left_moved')
        cardsNext.classList.add('cards_current')
    }, 150)
    currentPageBtn.innerHTML = `${page + 1}`
    generatePopup()
    generatePageBtns()
    overclick = true
    setTimeout(() => {
        overclick = false
    }, 500)
})

rightBtn.addEventListener('click', () => {
    if (overclick) return
    if (page + 1 >= cards.length) return
    const cardsCurrent = document.querySelector('.cards_current')
    const cardsNext = document.querySelector('.cards_next')
    page += 1
    renderCards(cardsNext, cards[page].map((element) => pets[element]))
    if (cardsCurrent.classList !== null) 
    cardsCurrent.classList.remove('cards_current')
    cardsCurrent.classList.add('cards_left_moved')
    setTimeout(() => {
        cardsCurrent.classList.remove('cards_left_moved')
    }, 200)
    cardsCurrent.classList.add('cards_next')
    cardsNext.classList.remove('cards_next')
    cardsNext.classList.add('cards_right_moved')
    setTimeout(() => {
        cardsNext.classList.remove('cards_right_moved')
        cardsNext.classList.add('cards_current')
    }, 150)
    currentPageBtn.innerHTML = `${page + 1}`
    generatePopup()
    generatePageBtns()
    overclick = true
    setTimeout(() => {
        overclick = false
    }, 500)
})

const popup = document.querySelector('.popup')
const popupBtn = document.querySelector('.popup__button')

popupBtn.addEventListener('click', () => {
    popup.classList.remove('popup_show')
    blockout[0].style.display = 'none'
    blockout[1].style.display = 'none'
    blockout[0].classList.remove('blockout_priority')
    blockout[1].classList.remove('blockout_priority')
    document.body.classList.remove('stop_scroll')
})

document.body.addEventListener('click', (event) => {
    if (menu.classList.contains('menu_moved')) {
        if (event.target.classList[0] === 'blockout') {
            menu.classList.remove('menu_moved')
            logo.classList.remove('logo_moved')
            burgerBtn.classList.remove('button_rotated')
            blockout[0].style.display = 'none'
            blockout[1].style.display = 'none'
            document.body.classList.remove('stop_scroll')
        }
    }

    if (popup.classList.contains('popup_show')) {
        if (event.target.classList[0] === 'blockout') {
            popup.classList.remove('popup_show')
            blockout[0].style.display = 'none'
            blockout[1].style.display = 'none'
            blockout[0].classList.remove('blockout_priority')
            blockout[1].classList.remove('blockout_priority')
            document.body.classList.remove('stop_scroll')
        }
    }
})