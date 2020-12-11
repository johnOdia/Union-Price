//Variables
const dropMenuBtn = document.querySelector('#dropMenuBtn')
const dropdownContent = document.querySelectorAll('.dropdown-content')
const boxContainer = document.querySelector('#box')
const searchBtn = document.querySelectorAll('.span')
const dropBtn = document.querySelectorAll('#dropbtn')
const error = document.querySelectorAll('.error')
const userSelection = document.querySelector('.list-item')
const specify = document.querySelectorAll('.specify')
const main = document.querySelector('main')
const homeScreen = document.getElementById('home-screen')
const resultsScreen = document.getElementById('results-screen')
const newsletter = document.querySelector('.newsletter')
const resultLoader = document.getElementById('result-loader')
const displayResult = document.getElementById('result-display')
let userSpecification = 'rent'
const inputParams = {
    Location: null,
    "House Type": null,
    Bedrooms: null,
    Bathrooms: null,
    Toilets: null
}


class UI {
    //display dropdown menu
    displayContent() {
        main.addEventListener('click', event => {
            const dropdown = event.target.parentNode.parentNode.children[1]
            if (event.target.getAttribute('data-name') === 'btn' && dropdown.style.display === 'block') {
                return dropdown.style.display = 'none'
            }
            if (event.target.getAttribute('data-name') === 'btn') {
                dropdownContent.forEach(element => element.style.display = 'none')
                dropdown.style.display = 'block'
                error.forEach(err => err.innerText = '')
            }
            if (event.target.parentNode.getAttribute('data-content') === 'content') {
                const parent = event.target.parentNode.parentNode.children[0]
                const parameter = parent.children[0]
                inputParams[parameter.innerText] = event.target.innerText
                parent.children[2] ? parent.children[2].remove() : ''
                const newDiv = document.createElement('div')
                const css = {
                    color: 'rgb(60, 60, 189)',
                    'margin-top': '10px',
                    'font-size': '18px'
                }
                parameter.style.color = 'rgb(60, 60, 189)'
                parent.children[1].style.color = 'rgb(60, 60, 189)'
                Object.assign(newDiv.style, css)
                newDiv.innerHTML = event.target.innerHTML
                parent.appendChild(newDiv)
            }
        })
    }

    //Add an input parameter
    inputValidation() {
        const css = { color: 'rgb(247, 41, 41)' };

        searchBtn.forEach(button => {
            button.addEventListener('click', () => {
                dropdownContent.forEach(element => element.style.display = 'none')
                let nullInputs = []
                for (let input in inputParams) {
                    if (inputParams[input] === null) {
                        nullInputs.push(input)
                    }
                }
                if (nullInputs.length !== 0) {
                    nullInputs.forEach(val => {
                        val === 'Location' ? (Object.assign(dropBtn[0].style, css), Object.assign(dropBtn[5].style, css)) : ''
                        val === 'House Type' ? (Object.assign(dropBtn[1].style, css), Object.assign(dropBtn[6].style, css)) : ''
                        val === 'Bedrooms' ? (Object.assign(dropBtn[2].style, css), Object.assign(dropBtn[7].style, css)) : ''
                        val === 'Bathrooms' ? (Object.assign(dropBtn[3].style, css), Object.assign(dropBtn[8].style, css)) : ''
                        val === 'Toilets' ? (Object.assign(dropBtn[4].style, css), Object.assign(dropBtn[9].style, css)) : ''
                    })
                    error.forEach(err => err.innerText = 'Please select input for all fields!')
                    return
                }
                console.log('validated');

                this.renderResultsPage()
            })
        })
        // this.renderResultsPage()

    }

    //check if the user selects rent or buy
    rentOrBuy() {
        userSelection.addEventListener('click', e => {

            if (e.target.getAttribute('data-selection') === 'rent') {
                specify.forEach(el => el.style.textDecoration = 'none')
                e.target.style.textDecoration = 'underline'
                return userSpecification = 'rent'
            }

            if (e.target.getAttribute('data-selection') === 'buy') {
                specify.forEach(el => el.style.textDecoration = 'none')
                e.target.style.textDecoration = 'underline'
                return userSpecification = 'buy'
            }

        })
    }

    renderResultsPage() {
        //hide newsletter section
        newsletter.style.display = 'none'

        //change the input parameter values to default
        dropBtn.forEach(el => el.style.color = 'rgb(85, 82, 82)')

        //hide homescreen
        homeScreen.style.display = 'none'

        //change all input params to null when a user transits from homescreen to results screen
        if (resultsScreen.style.display === '') {
            for (let key in inputParams) {
                inputParams[key] = null
            }
        }

        //display result screen
        resultsScreen.style.display = 'grid'

        //check if we are on results page then reset values to default in order to enable screen loader 
        if (displayResult.style.display === 'block') {
            displayResult.style.display = 'none'
            resultLoader.classList.remove('hide')
        }

        //hide screen loader and display result
        setTimeout(() => {
            resultLoader.classList.add('hide')
            displayResult.style.display = 'block'
        }, 3000)
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI()
    ui.displayContent()
    ui.inputValidation()
    ui.rentOrBuy()
})