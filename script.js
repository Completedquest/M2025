const spots = document.querySelectorAll('.spot');
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
  const response = await fetch('https://script.google.com/macros/s/AKfycbxEdRcBvnVeymmZKz_cWAsC-2Uxr5RP7T9uZro156kHV-OOxRMwAzDqA0_8wyo9PhG_LA/exec', {
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
