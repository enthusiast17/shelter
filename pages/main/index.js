const burgerBtn = document.querySelector('.header__button')
const menu = document.querySelector('.header__menu')
const blockout = document.querySelector('.blockout')
const logo = document.querySelector('.header__logo')

burgerBtn.addEventListener('click', () => {
    if (!menu.classList.contains('menu_moved')) {
        menu.classList.add('menu_moved')
        logo.classList.add('logo_moved')
        burgerBtn.classList.add('button_rotated')
        blockout.style.display = 'block'
        document.body.classList.add('stop_scroll')
    } else {
        menu.classList.remove('menu_moved')
        logo.classList.remove('logo_moved')
        burgerBtn.classList.remove('button_rotated')
        document.body.removeAttribute('class')
        blockout.style.display = 'none'
        document.body.classList.remove('stop_scroll')
    }
})

const headerLink = document.querySelector('.header__list-link')

headerLink.addEventListener('click', () => {
    menu.classList.remove('menu_moved')
    logo.classList.remove('logo_moved')
    burgerBtn.classList.remove('button_rotated')
    blockout.style.display = 'none'
    document.body.classList.remove('stop_scroll')
    window.scrollTo(0, 0);
})

import {pets} from '../../assets/pets.js'

const generateNextCards = (current) => {
    const randoms = []
    while (randoms.length < current.length) {
        const random =  Math.floor(Math.random() * (7 - 0) + 0)
        if (!current.includes(random) && !randoms.includes(random)) randoms.push(random)
    }
    return randoms
}

const renderCards = (element, cards) => {
    element.innerHTML = ''
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div')
        card.className = 'pets__card-item'
        card.innerHTML = `
            <img class="pets__card-item-img" src="${cards[i].img}" alt="${cards[i].name.toLowerCase()}">
            <h4 class="pets__card-item-title">${cards[i].name}</h4>
            <button class="pets__card-item-button">Learn more</button>
        `
        element.appendChild(card)
    }
}

const popup = document.querySelector('.popup')
const popupBtn = document.querySelector('.popup__button')

const generatePopup = () => {
    const initPopup = (element) => {
        const pet = pets.find((pet) => pet.name === element)
        popup.classList.add('popup_show')
        blockout.style.display = 'block'
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
    const learnMore = document.querySelectorAll('.pets__card-item-button')
    learnMore.forEach((element) => element.addEventListener('click', () => {
        document.body.classList.add('stop_scroll')
        initPopup(element.parentElement.querySelector('.pets__card-item-title').innerHTML)
    }))
    const cardItems = document.querySelectorAll('.pets__card-item')
    cardItems.forEach((element) => element.addEventListener('click', () => {
        document.body.classList.add('stop_scroll')
        initPopup(element.querySelector('.pets__card-item-title').innerHTML)
    }))
}

const cards = document.querySelector('.cards_current')
const cardsNext = document.querySelector('.cards_next')

let current = [4, 0, 2]
let next = generateNextCards(current)
renderCards(cards, current.map((element) => pets[element]))
renderCards(cardsNext, next.map((element) => pets[element]))
generatePopup()

let leftArrowBtns = document.querySelectorAll('.pets__left-arrow-button')
let rightArrowBtns = document.querySelectorAll('.pets__right-arrow-button')

let overclick = false

const leftBtnAction = () => {
    if (overclick) return
    const cards = document.querySelector('.cards_current')
    const cardsNext = document.querySelector('.cards_next')
    cards.classList.remove('cards_current')
    cards.classList.add('cards_right_moved')
    setTimeout(() => {
        cards.classList.remove('cards_right_moved')
    }, 200)
    cards.classList.add('cards_next')
    cardsNext.classList.remove('cards_next')
    cardsNext.classList.add('cards_left_moved')
    setTimeout(() => {
        cardsNext.classList.remove('cards_left_moved')
        cardsNext.classList.add('cards_current')
    }, 150)
    renderCards(cardsNext, next.map((element) => pets[element]))
    current = next
    next = generateNextCards(current)
    generatePopup()
    overclick = true
    setTimeout(() => {
        overclick = false
    }, 500)
}

const rightBtnAction = () => {
    if (overclick) return
    const cards = document.querySelector('.cards_current')
    const cardsNext = document.querySelector('.cards_next')
    cards.classList.remove('cards_current')
    cards.classList.add('cards_left_moved')
    setTimeout(() => {
        cards.classList.remove('cards_left_moved')
    }, 200)
    cards.classList.add('cards_next')
    cardsNext.classList.remove('cards_next')
    cardsNext.classList.add('cards_right_moved')
    setTimeout(() => {
        cardsNext.classList.remove('cards_right_moved')
        cardsNext.classList.add('cards_current')
    }, 150)
    renderCards(cardsNext, next.map((element) => pets[element]))
    current = next
    next = generateNextCards(current)
    generatePopup()
    overclick = true
    setTimeout(() => {
        overclick = false
    }, 500)
}

leftArrowBtns[0].addEventListener('click', leftBtnAction)
leftArrowBtns[1].addEventListener('click', leftBtnAction)

rightArrowBtns[0].addEventListener('click', rightBtnAction)
rightArrowBtns[1].addEventListener('click', rightBtnAction)

popupBtn.addEventListener('click', () => {
    popup.classList.remove('popup_show')
    blockout.style.display = 'none'
})

document.body.addEventListener('click', (event) => {
    if (menu.classList.contains('menu_moved')) {
        if (event.target.classList[0] === 'blockout') {
            menu.classList.remove('menu_moved')
            logo.classList.remove('logo_moved')
            burgerBtn.classList.remove('button_rotated')
            blockout.style.display = 'none'
            document.body.classList.remove('stop_scroll')
        }
    }

    if (popup.classList.contains('popup_show')) {
        if (event.target.classList[0] === 'blockout') {
            popup.classList.remove('popup_show')
            blockout.style.display = 'none'
            document.body.classList.remove('stop_scroll')
        }
    }
})
