const spots = document.querySelectorAll('.spot');
const modal = document.getElementById('form-modal');
const form = document.getElementById('booking-form');
const spotIdInput = document.getElementById('spotId');
const closeBtn = document.getElementById('close');
const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

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
  .catch(err => console.error('Failed to load booked spots', err));

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
  const response = await fetch(scriptURL, {
    method: 'POST',
    body: data
  });

  if (response.ok) {
    alert('Booking successful!');
    document.getElementById(data.get('spotId')).classList.add('booked');
    modal.classList.remove('show');
  } else {
    alert('Error with booking. Please try again.');
  }
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});