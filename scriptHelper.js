// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   document.querySelector("#missionTarget").innerHTML=
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`;
   
}

function validateInput(testInput) {
   if (!testImput) {
       return "Empty";
   } else if (isNaN(testImput)) {
    return "Not a Number";
   } else if (!isNaN(testImput)) {
    return "Is a Number";
   }
    return "";
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   
    let pilotStatus = document.querySelector("#pilotStatus");
    pilotStatus.textContent = `${pilotName} Ready`;

    let copilotStatus = document.querySelector("#copilotStatus");
    copilotStatus.textContent = `${copilotName} Ready`;
   
    let launchStatus = document.querySelector("#launchStatus");
    if (validateInput(fuelLevel.textContent) < 10000) {
        faultyItems.visibilty = true;
        faultyItems.textContent = "There is not enough fuel for the journey."
        launchStatus.textContent = "Shuttle not ready for launch.";
        launchStatus.class = red;
    } if (validateInput(cargoMass.textContent) > 10000) {
        faultyItems.visibility = true;
        faultyItems.textContent = "There is too much mass for the shuttle to take off.";
        launchStatus.textContent = "Shuttle not ready for launch.";
        launchStatus.class = red;
    } else {
        faultyItems.visibility = false;
        launchStatus.textContent = "Shuttle is ready for launch.";
        launchStatus.class = green;
    }

}

async function myFetch() {
    let planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        planetsReturned = response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let num = (Math.ceil(Math.random()*5));
    return planets[num];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
