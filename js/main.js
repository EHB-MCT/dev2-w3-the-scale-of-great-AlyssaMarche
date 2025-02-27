import { getAdjectives } from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
	//TODO: 1 data ophalen via getAdjectives (JSON)
	//TODO: 2 data converteren naar JS object
	//TODO: 3 call render functie
	//TODO: 4 call addSortEvents
	adjectives = getAdjectives();
	let data = JSON.parse(adjectives);
    render(data);
}

function addSortEvents() {}

function addVoteEvents() {}

function sort() {}

function render(data) {
	//TODO: 3.1 Create empty string variable
	//TODO: 3.2 Add HTML string for each adjective in adjectives
	//TODO: 3.3 Add HTML string to #container
    let html = ""
    
}

function upVote(target) {}

function downVote(target) {}

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
