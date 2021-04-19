// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   document.getElementById("missionTarget").innerHTML=
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
   if (!testInput) {
       return "Empty";
   } else if (isNaN(testInput)) {
    return "Not a Number";
   } else if (!isNaN(testInput)) {
    return "Is a Number";
   }
    return "";
}
let alert = '';

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty'
    || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
       alert("All fields are required!");
       list.childNodes[1].childNodes[1].textContent = "Pilot Ready";
       list.childNodes[1].childNodes[3].textContent = "Co-pilot Ready";
       list.childNodes[1].childNodes[5].textContent = "Fuel level high enough for launch";
       list.childNodes[1].childNodes[7].textContent = "Cargo mass low enough for launch";
       list.style.visibility = "hidden";
       list.parentNode.childNodes[1].style.color = "black";
       list.parentNode.childNodes[1].textContent = "Awaiting Information Before Launch";
    }
    else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number'
    || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
       alert("Make sure to enter valid information for each field!");
       list.childNodes[1].childNodes[1].textContent = "Pilot Ready";
       list.childNodes[1].childNodes[3].textContent = "Co-pilot Ready";
       list.childNodes[1].childNodes[5].textContent = "Fuel level high enough for launch";
       list.childNodes[1].childNodes[7].textContent = "Cargo mass low enough for launch";
       list.style.visibility = "hidden";
       list.parentNode.childNodes[1].style.color = "black";
       list.parentNode.childNodes[1].textContent = "Awaiting Information Before Launch";
    } else {
        list.style.visibility = "visible";
        list.childNodes[1].childNodes[1].textContent = `Pilot ${pilot} is ready for launch`;
        list.childNodes[1].childNodes[3].textContent = `Co-pilot ${copilot} is ready for launch`;
        list.childNodes[1].childNodes[5].textContent = `Fuel level ${Number(fuelLevel) < 10000 ? "too low" : "high enough"} for launch`;
        list.childNodes[1].childNodes[7].textContent = `Cargo mass ${Number(cargoLevel) > 10000 ? "too heavy" : "low enough"} for launch`;
        if(Number(fuelLevel) < 10000 || Number(cargoLevel) > 10000) {
            list.parentNode.childNodes[1].style.color = "rgb(199, 37, 78)";
            list.parentNode.childNodes[1].textContent = "Shuttle Not Ready for Launch";
        } else {
            list.parentNode.childNodes[1].style.color = "rgb(65, 159, 106)";
           list.parentNode.childNodes[1].textContent = "Shuttle is Ready for Launch";
        }
    }
}


async function myFetch() {
    let planetsReturned;
    await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
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
