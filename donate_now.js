// Toggle the More Options menu
document.getElementById('more-options-btn').addEventListener('click', function () {
    const moreOptions = document.getElementById('more-options');
    if (moreOptions.style.display === 'block') {
        moreOptions.style.display = 'none';
    } else {
        moreOptions.style.display = 'block';
    }
});

// Close the More Options menu when clicking outside of it
document.addEventListener('click', function (event) {
    var moreOptions = document.getElementById('more-options');
    if (!moreOptions.contains(event.target) && event.target.id !== 'more-options-btn') {
        moreOptions.style.display = 'none';
    }
});

// Handle donation amount selection
document.querySelectorAll('.amount-btn').forEach(button => {
    button.addEventListener('click', function () {
        document.getElementById('custom-amount').value = this.getAttribute('data-amount');
    });
});

// Handle donation submission
document.getElementById('donate-btn').addEventListener('click', function () {
    submitDonation();
});

function submitDonation() {
    const amount = document.getElementById('custom-amount').value;
    const designation = document.getElementById('designation').value;
    const frequency = document.querySelector('input[name="frequency"]:checked').value;

    if (!amount || amount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
    }

    // Simulate donation submission
    setTimeout(() => {
        // Show thank you popup
        const thankYouPopup = document.getElementById('thank-you-popup');
        thankYouPopup.querySelector('p').textContent = `You've successfully donated $${amount}. Your generous contribution helps us provide crucial resources to those in need.`;
        thankYouPopup.style.display = 'flex';
    }, 500);
}

// Close the popup and redirect to home page
document.getElementById('close-popup-btn').addEventListener('click', function () {
    document.getElementById('thank-you-popup').style.display = 'none';
    location.href = 'home.html';
});
