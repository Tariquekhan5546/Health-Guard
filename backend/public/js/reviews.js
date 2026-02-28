// Developed by [Tarique Khan]
// Fetch reviews from the server and display them
async function fetchReviews() {
    const response = await fetch('/api/reviews');
    const data = await response.json();
    const reviewsList = document.getElementById('reviewsList');

    if (data.reviews) {
        reviewsList.innerHTML = "";
        data.reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');
            reviewDiv.innerHTML = `
                <p><strong>${review.name}</strong> (${getStarRating(review.rating)}) - ${review.email}</p>
                <p>${review.feedback}</p>
                <p><small>Submitted on ${new Date(review.created_at).toLocaleString()}</small></p>
                <hr>
            `;
            reviewsList.appendChild(reviewDiv);
        });
    } else {
        reviewsList.innerHTML = "<p>No reviews yet.</p>";
    }
}

function getStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '&#9733;' : '&#9734;';
    }
    return stars;
}

document.getElementById('reviewForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const selectedStars = document.querySelectorAll('.star.selected');
const rating = selectedStars.length > 0 ? selectedStars[selectedStars.length - 1].dataset.value : 0;

    const feedback = document.getElementById('feedback').value;
    const recommend = document.querySelector('input[name="recommend"]:checked')?.value;

    if (!rating) {
        alert('Please select a rating!');
        return;
    }

    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, rating, feedback, recommend })
    });

    const data = await response.json();

    if (data.message) {
        alert(data.message);
        fetchReviews();
        document.getElementById('reviewForm').reset();
        document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
    } else {
        alert("Failed to submit the review.");
    }
});

document.getElementById('starRating').addEventListener('click', (event) => {
    if (event.target.classList.contains('star')) {
        const rating = event.target.dataset.value;
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.classList.toggle('selected', star.dataset.value <= rating);
        });
    }
});

fetchReviews();