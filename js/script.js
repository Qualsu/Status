let allServersStatus = 'ok';
let downServers = 0;
let warningServers = 0;
let offlineServers = 0;

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

async function serverStatus(url, id) {
    const startTime = Date.now();
    const progressElement = document.querySelector(`${id} .progress`);

    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'no-cors'
        });
        const timeTaken = Date.now() - startTime;

        const statusImage = document.querySelector(`${id} img`);
        const statusText = document.querySelector(`${id} p`);

        console.log(`${url}: ${response.status}: ${timeTaken}`)
        
        if (timeTaken < 4999 && response.status === 200) {
            allServersStatus = 'ok';
            statusImage.src = 'img/ok.svg';
            statusText.textContent = 'online';
            progressElement.style.backgroundColor = '#22c55e';
        } else if (response.status === 404 || response.status === 500) {
            allServersStatus = 'down';
            downServers++
            statusImage.src = 'img/down.svg';
            statusText.textContent = 'down';
            progressElement.style.backgroundColor = '#FF6D6D';
        } else if (timeTaken >= 4999) {
            warningServers++
            allServersStatus = 'warning';
            statusImage.src = 'img/warning.svg';
            statusText.textContent = 'warning';
            progressElement.style.backgroundColor = '#FFF36D';
        }
    } catch (error) {
        allServersStatus = 'offline';
        offlineServers++
        console.log(`Error fetching ${url}:`, error)
        document.querySelector(`${id} img`).src = 'img/offline.svg';
        document.querySelector(`${id} p`).textContent = 'offline';
        progressElement.style.backgroundColor = '#52525b';
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
        statusText.textContent = `${warningServers} server warn of delay`;
        favicon.href = 'img/warning.svg';
    } else if (allServersStatus === 'down') {
        statusImage.src = 'img/down.svg';
        statusText.textContent = `${downServers} Server is down`;
        favicon.href = 'img/dowm.svg';
    } else if (allServersStatus === 'offline') {
        statusImage.src = 'img/offline.svg';
        statusText.textContent = `${offlineServers} Server is offline`;
        favicon.href = 'img/offline.svg';
    }
}

async function main() {
    const loadingElement = document.getElementById('loading');
    const contentElement = document.getElementById('content');

    loadingElement.style.display = 'flex';
    contentElement.style.display = 'none';

    await Promise.all([
        serverStatus('https://qual.su', '.website'),
        serverStatus('https://notable-anemone-34.accounts.dev/sign-in', '.qsuid'),
        serverStatus('https://keny.cloud', '.kenycloud'),
        serverStatus('https://notter.tech', '.notter')
    ]);

    loadingElement.style.display = 'none';
    contentElement.style.display = 'block';

    updateLastUpdateTime();
}

document.addEventListener("DOMContentLoaded", () => {
    main()
});
