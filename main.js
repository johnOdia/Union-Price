//Variables
const dropMenuBtn = document.querySelector('#dropMenuBtn')
const dropdownContent = document.querySelectorAll('.dropdown-content')
const boxContainer = document.querySelector('.box2')
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
const contentLocation = document.querySelectorAll('.content-location')
const contentType = document.querySelectorAll('.content-type')
const contentBedrooms = document.querySelectorAll('.content-bedrooms')
const contentBathrooms = document.querySelectorAll('.content-bathrooms')
const contentToilets = document.querySelectorAll('.content-toilets')
const refineResults = document.querySelector('.refine-results')
const body = document.querySelector('body')
let userSpecification = 'rent'
const inputParams = {
    Location: null,
    "House Type": null,
    Bedrooms: null,
    Bathrooms: null,
    Toilets: null
}

class UI {
    //Typewriter animation
    anim() {
        // List of sentences
        var _CONTENT = [
            "Get the worth of your next house!",
            "Make a search query for either rent or buy",
            "Select your prefered location and facilities",
            "Click on the search button",
            "Make more queries from the results screen!"
        ];

        // Current sentence being processed
        var _PART = 0;

        // Character number of the current sentence being processed 
        var _PART_INDEX = 0;

        // Holds the handle returned from setInterval
        var _INTERVAL_VAL;

        // Element that holds the text
        var _ELEMENT = document.querySelector("#text");

        // Cursor element 
        var _CURSOR = document.querySelector("#cursor");

        // Implements typing effect
        function Type() {
            // Get substring with 1 characater added
            var text = _CONTENT[_PART].substring(0, _PART_INDEX + 1);
            _ELEMENT.innerHTML = text;
            _PART_INDEX++;

            // If full sentence has been displayed then start to delete the sentence after some time
            if (text === _CONTENT[_PART]) {
                // Hide the cursor
                // _CURSOR.style.display = 'none';

                clearInterval(_INTERVAL_VAL);
                setTimeout(function () {
                    _INTERVAL_VAL = setInterval(Delete, 50);
                }, 10000);
            }
        }

        // Implements deleting effect
        function Delete() {
            // Get substring with 1 characater deleted
            var text = _CONTENT[_PART].substring(0, _PART_INDEX - 1);
            _ELEMENT.innerHTML = text;
            _PART_INDEX--;

            // If sentence has been deleted then start to display the next sentence
            if (text === '') {
                clearInterval(_INTERVAL_VAL);

                // If current sentence was last then display the first one, else move to the next
                if (_PART == (_CONTENT.length - 1))
                    _PART = 0;
                else
                    _PART++;

                _PART_INDEX = 0;

                // Start to display the next sentence after some time
                setTimeout(function () {
                    _CURSOR.style.display = 'inline-block';
                    _INTERVAL_VAL = setInterval(Type, 100);
                }, 200);
            }
        }

        // Start the typing effect on load
        _INTERVAL_VAL = setInterval(Type, 100);

    }

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
                //call a function to highlight selected content
                this.highlightSelected(event.target)

                const parent = event.target.parentNode.parentNode.children[0]
                const parameter = parent.children[0]
                inputParams[parameter.innerText] = event.target.innerText
                parent.children[2] ? parent.children[2].remove() : ''
                const newDiv = document.createElement('div')
                const css = {
                    color: 'rgb(60, 60, 189)'
                }
                parameter.style.color = 'rgb(60, 60, 189)'
                parent.children[1].style.color = 'rgb(60, 60, 189)'
                Object.assign(newDiv.style, css)
                newDiv.innerHTML = event.target.innerHTML
                parent.appendChild(newDiv)
            }
        })
    }

    //highlight dropdown content
    highlightSelected(e) {
        //get unique id to identify the dropdown content section
        const dropdownSection = e.parentNode.getAttribute('data-name')

        //pass the section to a function to unhighlight
        dropdownSection === 'content-location' ? this.unHighlightSelected(contentLocation) : ''
        dropdownSection === 'content-type' ? this.unHighlightSelected(contentType) : ''
        dropdownSection === 'content-bedrooms' ? this.unHighlightSelected(contentBedrooms) : ''
        dropdownSection === 'content-bathrooms' ? this.unHighlightSelected(contentBathrooms) : ''
        dropdownSection === 'content-toilets' ? this.unHighlightSelected(contentToilets) : ''

        //highlight the element
        const css = {
            color: '#fff',
            "background-color": '#6528FF'
        }
        Object.assign(e.style, css)
        dropdownContent.forEach(element => element.style.display = 'none')
    }

    //unhighlight previously highlighted
    unHighlightSelected(node) {
        const css = {
            color: '#605E5E',
            "background-color": 'white'
        }
        //iterate through the children of that node to unhighlight any highlighted element
        Array.from(node[0].children).forEach(el => Object.assign(el.style, css))
        Array.from(node[1].children).forEach(el => Object.assign(el.style, css))
    }

    //Add an input parameter
    inputValidation() {
        const css = { color: '#f50233' };

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
                this.renderResultsPage()
            })
        })
        // this.renderResultsPage()

    }

    //hide or display the dropdown menu in the result screen
    hideOrShowDropdown() {  
        const css1 = {
            color: '#6528FF',
            'background-color': '#fff',
            border: '2px solid #6528FF'
        } 
        const css2 = {
            'background-color': '#6528FF',
            color: '#fff'
        }   

        refineResults.addEventListener('click', () => {           
            if(boxContainer.style.display === 'none'){
                boxContainer.style.display= 'grid'  
                Object.assign(refineResults.style,css1)
            }
            else{
                boxContainer.style.display = 'none'
                Object.assign(refineResults.style,css2)
            }
        })
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
        //change bg-color of body        
        const bodyCss = {background: 'white'}
        Object.assign(body.style,bodyCss)

        //hide newsletter section
        newsletter.style.display = 'none'

        //hide dropdown menu on mobile screen
        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            boxContainer.style.display = 'none'
        }

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
    ui.anim()
    ui.hideOrShowDropdown()
})