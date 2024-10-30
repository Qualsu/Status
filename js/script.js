let allServersStatus = 'ok';

function updateLastUpdateTime() {
    const timeElement = document.querySelector('.time');
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[now.getMonth()];
    const date = now.getDate();
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const isPM = hours >= 12;
    hours = hours % 12 || 12;
    const ampm = isPM ? 'pm' : 'am';
    const timezone = 'MSK';
    const formattedTime = `Last updated on ${month} ${date} at ${hours}:${minutes}${ampm} ${timezone}`;
    
    if (timeElement) {
        timeElement.textContent = formattedTime;
    }
}

async function serverStatus(url, statusImageId, statusTextId, progressId) {
    const startTime = Date.now();
    const progressElement = document.querySelector(progressId);

    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'no-cors'
        });
        const timeTaken = Date.now() - startTime;

        const statusImage = document.querySelector(statusImageId);
        const statusText = document.querySelector(statusTextId);

        console.log(`${url}: ${response.status}: ${timeTaken}`)
        
        if (timeTaken < 1000 && response.status === 200) {
            allServersStatus = 'ok';
            statusImage.src = 'img/ok.svg';
            statusText.textContent = 'online';
            progressElement.style.backgroundColor = '#22c55e';
        } else if (response.status === 404 || response.status === 500) {
            allServersStatus = 'down';
            statusImage.src = 'img/down.svg';
            statusText.textContent = 'down';
            progressElement.style.backgroundColor = '#FF6D6D';
        } else if (timeTaken >= 1000) {
            allServersStatus = 'warning';
            statusImage.src = 'img/warning.svg';
            statusText.textContent = 'warning';
            progressElement.style.backgroundColor = '#FFF36D';
        }
    } catch (error) {
        allServersStatus = 'error';
        console.log(`Error fetching ${url}:`, error)
        document.querySelector(statusImageId).src = 'img/error.svg';
        document.querySelector(statusTextId).textContent = 'error';
        progressElement.style.backgroundColor = '#FF6D6D';
    }

    updateOverallStatus();
}

function updateOverallStatus() {
    const statusImage = document.querySelector('.status-img');
    const statusText = document.querySelector('.status-text');
    const favicon = document.querySelector('.link');

    if (allServersStatus === 'ok') {
        statusImage.src = 'img/ok.svg';
        statusText.textContent = 'All server is work';
        favicon.href = 'img/ok.svg';
    } else if (allServersStatus === 'warning') {
        statusImage.src = 'img/warning.svg';
        statusText.textContent = 'Delay warnings';
        favicon.href = 'img/warning.svg';
    } else if (allServersStatus === 'down') {
        statusImage.src = 'img/down.svg';
        statusText.textContent = 'Server is down';
        favicon.href = 'img/dowm.svg';
    } else if (allServersStatus === 'error') {
        statusImage.src = 'img/error.svg';
        statusText.textContent = 'Error getting status';
        favicon.href = 'img/error.svg';
    }
}

async function main() {
    const loadingElement = document.getElementById('loading');
    const contentElement = document.getElementById('content');

    loadingElement.style.display = 'flex';
    contentElement.style.display = 'none';

    await Promise.all([
        serverStatus('https://qual.su', '.website img', '.website p', '.website .progress'),
        serverStatus('https://notable-anemone-34.accounts.dev/sign-in', '.qsuid img', '.qsuid p', '.qsuid .progress'),
        serverStatus('https://keny.cloud', '.kenycloud img', '.kenycloud p', '.kenycloud .progress'),
        serverStatus('https://sandstone.fun', '.sandstone img', '.sandstone p', '.sandstone .progress')
    ]);

    loadingElement.style.display = 'none';
    contentElement.style.display = 'block';

    updateLastUpdateTime();
}

document.addEventListener("DOMContentLoaded", () => {
    main()
});
