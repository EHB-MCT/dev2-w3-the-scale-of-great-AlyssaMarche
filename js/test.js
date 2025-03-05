import {
    getAdjectives
} from "./data.js";
 
let adjectives;
let sortDirection = "up";
 
function init() {
    // TODO 1: JSON inladen
    const adjObject = getAdjectives();
    // TODO 2: JSON object maken
    // We maken het in een object
    adjectives = JSON.parse(adjObject);
    console.log(adjectives);
    // TODO 3: Call render
    render(adjectives);
    // TODO 4: Call addSortEvents
    addSortEvents(adjectives);
 
}
 
function addSortEvents() {
    document.querySelector('#sort-up').addEventListener('click', function () {
        console.log("hi");
        sortDirection = "up";
        // TODO 5: Call sort
        // We roepen sort(); hier nog eens om individueel up of down te sorteren
        sort(adjectives);
        // console.log(adjectives);
    });
 
    document.querySelector('#sort-down').addEventListener('click', function () {
        console.log("bye");
        sortDirection = "down";
        // TODO 5: Call sort
        // We roepen sort(); hier nog eens om individueel up of down te sorteren
        sort(adjectives);
        // console.log(adjectives);
    });
}
 
function addVoteEvents() {
    const upVoteButtons = document.querySelectorAll('.upvote-button');
    upVoteButtons.forEach(function (button) {
        // event nodig om te weten op welk woord er wordt geklikt
        button.addEventListener('click', function (event) {
            // We gebruiken event target zodat we weten op welk woord we klikken
            console.log(event.target.value);
            // We doen 0.1 omdat we upvote doen
            // We roepen de updateScore(); op om onze score te berekenen
            updateScore(event.target.value, 0.1);
            upVote();
        });
    });
 
    const downVoteButtons = document.querySelectorAll('.downvote-button');
    downVoteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            // We gebruiken event target zodat we weten op welk woord we klikken
            console.log(event.target.value);
            // We doen -0.1 omdat we downvote doen
            // We roepen de updateScore(); op om onze score te berekenen
            updateScore(event.target.value, -0.1);
            downVote();
        });
    });
}
 
function sort() {
    // TODO: check active sort (default: up)
    // We gebruiken een if else om zo de scores te kunnen sorteren
    // Dit doen we door sortDirection te vergelijken met "up" en "down"
    if (sortDirection == "up") {
        adjectives = adjectives.sort(function (a, b) {
            // TODO: sort
            // < -> voor sort up
            if (a.score < b.score) {
                return 1
            } else {
                return -1
            }
        })
    } else if (sortDirection == "down") {
        adjectives = adjectives.sort(function (a, b) {
            // TODO: sort
            // > -> voor sort down
            if (a.score > b.score) {
                return 1
            } else {
                return -1
            }
        })
    }
    // TODO: render
    // We zetten dit beneden zodat de scores ook gesorteerd worden
    render();
}
 
function render() {
    // TODO 3.1: add HTML to HTML string forEach adjective in adjectives
    const sjabloon = document.querySelector('#container');
    sjabloon.innerHTML = "";
    let HTML = "";
 
    // bv staat voor bijvoeglijk naamwoord hier
    adjectives.forEach(function (bv) {
 
        // TODO 3.2: add class based on score (>= 6 is 'good')
        let classScore = "";
        // Alle woorden die 6 of hoger zijn dan 6 zijn "good". De rest is "bad"
        if (bv.score >= 6) {
            classScore = "good";
        } else {
            classScore = "bad";
        }
 
        HTML += `
         <div class="word-item">
            <span class="word-score ${classScore}">${bv.score}</span>
            <span>${bv.word}</span>
            <div class="vote-buttons">
                <button value=${bv.word} class="upvote-button">👍</button>
                <button value=${bv.word} class="downvote-button">👎</button>
            </div>
        </div>
        `
    });
    // TODO 3.3: HTML string toevoegen aan container
    // Data in string verwerken
    HTML += "</div>"
    sjabloon.innerHTML = HTML;
 
    // We zetten addVoteEvents hier, omdat we eerst nog alles moeten renderen
    addVoteEvents();
}
 
function upVote(target) {
    // TODO: past de score door met 0.1 te verhogen
    // Dit wordt pas zichtbaar na opnieuw renderen
    // Zorg ervoor dat na opnieuw renderen alles nog steeds gesorteerd is
}
 
 
function downVote(target) {
    // TODO: past de score door met 0.1 te verlagen
    // Dit wordt pas zichtbaar na opnieuw renderen
    // Zorg ervoor dat na opnieuw renderen alles nog steeds gesorteerd is
}
 
function updateScore(word, scoreChange) {
    // Wat is findIndex? retourneert de index (positie) van het eerste element dat een test doorstaat
    const foundIndex = adjectives.findIndex(function (item, index) {
        // item.word == word -> als we het woord terugvinden dan returnen we true
        if (item.word == word) {
            return true
        }
    });
 
    // we vergelijken foundIndex met null (null is leeg)
    if (foundIndex != null) {
        let newScore = adjectives[foundIndex]['score'] + scoreChange;
        adjectives[foundIndex]['score'] = Math.round(newScore * 100) / 100;
    }
 
    // We roepen render(); op om de score nog eens te updaten en zo de juiste update te weergeven
    render();
}
 
init();