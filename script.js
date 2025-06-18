const spots = document.querySelectorAll('.spot');More actions
const modal = document.getElementById('form-modal');
const form = document.getElementById('booking-form');
const spotIdInput = document.getElementById('spotId');

// Attach click events to each spot

spots.forEach(spot => {
  spot.addEventListener('click', () => {
    if (spot.classList.contains('booked')) {
      alert('This spot is already booked.');
      return;
    }
    spotIdInput.value = spot.id;
    modal.classList.add('show');
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const response = await fetch('https://script.google.com/macros/s/AKfycbxQfgJi9S73WdgNccAJp6lrpePfo3qiNKUIISptrZrV8W3dcs0q-2QrCO7xhLVaZ5XZTA/exec', {
    method: 'POST',
    body: data
  });

  if (response.ok) {
    alert('Booking successful!');
    document.getElementById(data.get('spotId')).classList.add('booked');
    closeModal();
  } else {
    alert('Error with booking. Please try again.');
  }
});

function closeModal() {
  modal.classList.remove('show');
}

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
