document.addEventListener('DOMContentLoaded', () => {
    const moreOptionsBtn = document.getElementById('more-options-btn');
    const moreOptions = document.getElementById('more-options');
    const sosBtn = document.querySelector('.sos-btn');

    
    moreOptionsBtn.addEventListener('click', () => {
        moreOptions.style.display = moreOptions.style.display === 'block' ? 'none' : 'block';
    });


    sosBtn.addEventListener('click', () => {
        startSOSRecording();
    });

    document.getElementById('requestResources').addEventListener('click', () => {
        window.location.href = 'request_resources.html';
    });

    document.getElementById('realTimeMap').addEventListener('click', () => {
        window.location.href = 'real_time_map.html';
    });

    document.getElementById('home').addEventListener('click', () => {
        window.location.href = 'home.html';
    });

    document.getElementById('chat').addEventListener('click', () => {
        window.location.href = 'group_chat.html';
    });

    window.addEventListener('load', () => {
        const resources = ['Food', 'Water', 'Bed', 'Medical Aid'];

        resources.forEach(resource => {
            const currentSupplies = JSON.parse(localStorage.getItem(resource)) || 100;
            updateResourceTile(resource, currentSupplies);
        });
    });
});

function startSOSRecording() {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                const chunks = [];

                mediaRecorder.ondataavailable = e => chunks.push(e.data);
                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    const formData = new FormData();
                    formData.append('video', blob);
                    formData.append('latitude', latitude);
                    formData.append('longitude', longitude);

                    fetch('/sos', {  // Replace with your backend endpoint
                        method: 'POST',
                        body: formData
                    }).then(response => response.json())
                      .then(data => console.log('SOS sent successfully:', data))
                      .catch(error => console.error('Error sending SOS:', error));
                };

                mediaRecorder.start();
                setTimeout(() => {
                    mediaRecorder.stop();
                    stream.getTracks().forEach(track => track.stop());
                }, 120000);  // Stop recording after 2 minutes
            })
            .catch(error => console.error('Error accessing media devices:', error));
    }, error => console.error('Error getting location:', error));
}

function updateResourceTile(resource, newSupplies) {
    const resourceTile = document.querySelector(`.resource-tile[data-resource="${resource.toLowerCase()}"]`);
    const progressBar = resourceTile.querySelector('.progress');
    const progressText = resourceTile.querySelector('.resource-info p');

    let progressColor;
    let progressWidth = (newSupplies / 100) * 100;

    if (newSupplies >= 51) {
        progressColor = 'green';
    } else if (newSupplies >= 21) {
        progressColor = 'orange';
    } else {
        progressColor = 'red';
    }

    progressBar.style.width = `${progressWidth}%`;
    progressBar.style.backgroundColor = progressColor;
    progressText.textContent = `${newSupplies} ${resource} Available`;
}
