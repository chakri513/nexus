document.addEventListener('DOMContentLoaded', () => {
    const moreOptionsBtn = document.getElementById('more-options-btn');
    const moreOptions = document.getElementById('more-options');
    const sosBtn = document.querySelector('.sos-btn');
    const categoryButtons = document.querySelectorAll('.category-button');
    const quantityInput = document.getElementById('quantity');
    const urgencySelect = document.getElementById('urgency');
    const shareLocationCheckbox = document.getElementById('shareLocation');
    const submitButton = document.querySelector('.submit-button');
    let selectedCategory = null;

    moreOptionsBtn.addEventListener('click', () => {
        moreOptions.style.display = moreOptions.style.display === 'block' ? 'none' : 'block';
    });

    function validateForm() {
        if (selectedCategory && quantityInput.value && urgencySelect.value && shareLocationCheckbox.checked) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedCategory = button.querySelector('p').innerText;
            validateForm();
        });
    });

    quantityInput.addEventListener('input', validateForm);
    urgencySelect.addEventListener('change', validateForm);
    shareLocationCheckbox.addEventListener('change', validateForm);

    submitButton.addEventListener('click', () => {
        const quantity = quantityInput.value;
        const urgency = urgencySelect.value;
        const shareLocation = shareLocationCheckbox.checked;

        let requestSummary = `Category: ${selectedCategory}\nQuantity: ${quantity}\nUrgency: ${urgency}\nLocation Sharing: ${shareLocation ? 'Enabled' : 'Disabled'}`;
        alert(`Request Submitted:\n${requestSummary}`);
    });
});
document.getElementById('home').addEventListener('click', () => {
    window.location.href = 'home.html';
});