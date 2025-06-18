const spots = document.querySelectorAll('.spot');
const modal = document.getElementById('form-modal');
const form = document.getElementById('booking-form');
const spotIdInput = document.getElementById('spotId');
const closeBtn = document.getElementById('close');
let selectedSpot = null;

// ✅ Use the SAME URL for both GET and POST
const scriptURL = 'https://script.google.com/macros/s/AKfycbz6ck6hnYiPOyef1WQaAKibBoP-oPs6hJ5quJjAZIYUlCVaeMovQQmymG9m38Xt2GdC3Q/exec';

// 🔄 Fetch booked spots on page load
fetch(scriptURL)
  .then(res => res.json())
  .then(bookedSpots => {
    bookedSpots.forEach(spotId => {
      const spot = document.getElementById(spotId);
      if (spot) {
        spot.classList.add('booked');
      }
    });
  })
  .catch(err => console.error('Failed to load booked spots:', err));

// 📌 Handle spot click
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

// 📤 Submit booking form
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: data
    });

    const text = await response.text();

    if (text.includes('Already booked')) {
      alert('That spot was just taken by someone else!');
    } else if (response.ok) {
      alert('Booking successful!');
      document.getElementById(data.get('spotId')).classList.add('booked');
      closeModal();
    } else {
      throw new Error('Unexpected response');
    }
  } catch (err) {
    console.error(err);
    alert('Error with booking. Please try again.');
  }
});

function closeModal() {
  modal.classList.remove('show');
}

// Optional: Close modal on "X" button
closeBtn.addEventListener('click', closeModal);
