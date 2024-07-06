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

// Get resource type from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const resourceType = urlParams.get('resource');
document.getElementById('resource-category').textContent = `${resourceType} Request`;

// Submit request functionality
document.getElementById('submit-btn').addEventListener('click', function () {
    submitRequest();
});

function submitRequest() {
    const resourceCategory = document.getElementById('resource-category').textContent.replace(' Request', '');
    const location = document.getElementById('location').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const additionalInfo = document.getElementById('additional-info').value;
    const priority = document.getElementById('priority').value;

    if (!location || !quantity) {
        document.getElementById('confirmation-message').textContent = 'Please provide all required information.';
        return;
    }

    // Simulate request submission and update home page supplies
    setTimeout(() => {
        const currentSupplies = JSON.parse(localStorage.getItem(resourceCategory)) || 100;
        const newSupplies = currentSupplies - quantity;

        localStorage.setItem(resourceCategory, JSON.stringify(newSupplies));
        updateHomePageSupplies(resourceCategory, newSupplies);

        showPopupMessage(resourceCategory, quantity);
    }, 500);
}

function updateHomePageSupplies(resource, newSupplies) {
    // This function is intended to update the home page supplies
    // For simplicity, this example does not implement the actual home page update
    // In a real application, you might need to communicate with the home page using shared state or events
    console.log(`${resource} updated to ${newSupplies}`);
}

function showPopupMessage(resourceCategory, quantity) {
    const popupScreen = document.getElementById('popup-screen');
    const popupMessage = document.getElementById('popup-message');
    const popupImage = document.createElement('img');

    popupImage.src = 'popup_image.jpg'; // Replace with your image URL
    popupImage.className = 'popup-image';

    popupMessage.innerHTML = `Request Submitted!<br>You've successfully requested ${resourceCategory} (Quantity: ${quantity}). Your location has been recorded.<br><br>We expect to deliver your supplies within approximately 10 mins. This is an estimate and may vary depending on resource availability and current conditions.`;
    popupScreen.style.display = 'flex';
    popupScreen.querySelector('.popup-content').prepend(popupImage);

    document.getElementById('close-popup-btn').addEventListener('click', function () {
        popupScreen.style.display = 'none';
        location.href = 'home.html';
    });
}
