const spots = document.querySelectorAll('.spot');
const modal = document.getElementById('form-modal');
const form = document.getElementById('booking-form');
const spotIdInput = document.getElementById('spotId');
const closeBtn = document.getElementById('close');
let selectedSpot = null;

const scriptURL = 'https://script.google.com/macros/s/AKfycbz6ck6hnYiPOyef1WQaAKibBoP-oPs6hJ5quJjAZIYUlCVaeMovQQmymG9m38Xt2GdC3Q/exec';

// 🔄 Fetch booked spots on load
fetch(scriptURL)
  .then(res => res.json())
  .then(bookedSpots => {
    bookedSpots.forEach(spotId => {
      const spot = document.getElementById(spotId);
      if (spot) {
        spot.classList.add('booked'); // Grey it out
      }
    });
  })
  .catch(err => console.error('Failed to load booked spots', err));

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
