const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex); //do not use JSON.stringify

    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedSeatsCount = selectedSeats.length; //number of nodes in collection

    //Copy selected seats into arr
    //Map through array
    //Return a new array indexes

    //const seatIndex = [...selectedSeats]; //copy elements in array

    // const seatIndex = [...selectedSeats].map(function(seat) {
    //     return [..seats].indexOf(seat);
    // });

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount; //add in count
    total.innerText = selectedSeatsCount * ticketPrice; //add in total
}

//Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    //save movie
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        movieSelect.selectIndex = selectedMovieIndex;
    }
}

//Movie select event
movieSelect.addEventListener('change', e => {
   ticketPrice = e.target.value;

   // Save in local storage
   setMovieData(e.target.selectedIndex, e.target.value);//add function
   //

   updateSelectedCount(); //add function
});

//Seat click event
container.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount(); //add function
    }
});

//Initial count and total set
updateSelectedCount();