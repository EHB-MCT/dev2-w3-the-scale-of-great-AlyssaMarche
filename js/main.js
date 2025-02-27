import { getAdjectives } from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
	//TODO: 1 data ophalen via getAdjectives (JSON)
	let data = getAdjectives();
	//console.log(JSON.parse(data));
	//TODO: 2 data converteren naar JS object
	adjectives = JSON.parse(data);
	//TODO: 3 call render functie
	render();
	//TODO: 4 call addSortEvents
	addSortEvents();
}

function addSortEvents() {
	document.querySelector("#sort-up").addEventListener("click", function () {
		sortDirection = "up";
	});
	document.querySelector("#sort-down").addEventListener("click", function () {
		sortDirection = "down";
		console.log("down!");
	});
	sort();
}

function addVoteEvents() {
	//TODO: add eventListener to all upVote and downVote buttons
	const upVoteButtons = document.querySelectorAll(".upvote-button");
    upVoteButtons.forEach(function(button){
        button.addEventListener('click', function(){
            console.log(this.value);
            upVote(this.value);
        })
    })
    
}

function sort() {
	// TODO: welke richting?
	if (sortDirection == "up") {
		adjectives.sort(function (a, b) {
			if (a.score < b.score) {
				return 1;
			} else {
				return -1;
			}
		});
	} else {
		adjectives.sort(function (a, b) {
			if (a.score > b.score) {
				return 1;
			} else {
				return -1;
			}
		});
	}
	// TODO: sorteren
	// TODO: Render / update html

	render();
}

function render(data) {
	//console.log("rendering!")
	//TODO: 3.1 Create empty string variable
	let htmlString = "";
	//TODO: 3.2 Add HTML string for each adjective in adjectives
	adjectives.forEach(function (adjective) {
		//console.log(adjective.word, adjective.score);
		htmlString += `<div class="word-item">
            <span class="word-score bad">${adjective.score}</span>
            <span>${adjective.word}</span>
            <div class="vote-buttons">
                <button value="${adjective.word}" class="upvote-button">👍</button>
                <button value="${adjective.word}" class="downvote-button">👎</button>
            </div>
        </div>`;
	});
	//TODO: 3.3 Add HTML string to #container
	document.querySelector("#container").innerHTML = htmlString;
	addVoteEvents();
}

function upVote(value) {
    updateScore(value, 0.1);
}

function downVote(value) {}

function updateScore(word, scoreChange) {
	const foundIndex = adjectives.findIndex(function (item, index) {
		if (item.word == word) {
			return true;
		}
	});

	if (foundIndex != null) {
		let newScore = adjectives[foundIndex]["score"] + scoreChange;
		adjectives[foundIndex]["score"] = Math.round(newScore * 100) / 100;
	}
}

init();
