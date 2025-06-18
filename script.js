const form = document.getElementById('booking-form');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
let selectedSpot = null;

const scriptURL = 'https://script.google.com/macros/s/AKfycbwxIOVmtgNTaJ3zZSvbd4Ic4hr4xwQv3v7aLkM7ZIdbET2Ig4xSUvKvebisfAqB3MOnpQ/exec';

// 🔄 Fetch booked spots on load
fetch(scriptURL)
  .then(res => res.json())
  .then(bookedSpots => {
    bookedSpots.forEach(spotId => {
      const spot = document.getElementById(spotId);
      if (spot) {
        spot.classList.add('booked'); // Grey it out
        spot.onclick = null; // Disable clicking
      }
    });
  })
  .catch(err => console.error('Failed to load booked spots', err));
