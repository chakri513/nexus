// Detect user's location
document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            document.getElementById('user-location').textContent = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
        }, function () {
            document.getElementById('user-location').textContent = 'Unable to detect location';
        });
    } else {
        document.getElementById('user-location').textContent = 'Geolocation not supported';
    }
});

// Toggle specific schedule visibility
document.getElementById('flexible-schedule').addEventListener('change', function () {
    const specificSchedule = document.getElementById('specific-schedule');
    if (this.checked) {
        specificSchedule.style.display = 'none';
    } else {
        specificSchedule.style.display = 'block';
    }
});

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
    const moreOptions = document.getElementById('more-options');
    if (!moreOptions.contains(event.target) && event.target.id !== 'more-options-btn') {
        moreOptions.style.display = 'none';
    }
});

// Handle volunteer sign up
document.getElementById('sign-up-btn').addEventListener('click', function () {
    const skills = Array.from(document.querySelectorAll('.skills-selection input:checked')).map(input => input.value);
    const additionalSkills = document.getElementById('additional-skills').value;

    if (skills.length === 0 && additionalSkills.trim() === '') {
        alert('Please select or enter at least one skill.');
        return;
    }

    // Simulate sign-up process
    setTimeout(() => {
        // Show thank you popup
        const thankYouPopup = document.getElementById('thank-you-popup');
        thankYouPopup.querySelector('p').textContent = `We will contact you soon with more details.`;
        thankYouPopup.style.display = 'flex';
    }, 500);
});

// Close the popup and redirect to home page
document.getElementById('close-popup-btn').addEventListener('click', function () {
    document.getElementById('thank-you-popup').style.display = 'none';
    location.href = 'home.html';
});
