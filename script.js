// --- Lock Screen Logic ---
const accessCode = 'SPEC-TRE';
const lockScreen = document.getElementById('lock-screen');
const accessCodeInput = document.getElementById('access-code');
const correctMessage = document.getElementById('correct-message');
const incorrectMessage = document.getElementById('incorrect-message');

function checkCode() {
    correctMessage.classList.remove('show');
    incorrectMessage.classList.remove('show');

    if (accessCodeInput.value.toUpperCase() === accessCode) {
        correctMessage.classList.add('show');
        // Store the unlock status in local storage so it persists across reloads
        localStorage.setItem('isUnlocked', 'true');
        setTimeout(() => {
            lockScreen.style.opacity = '0';
            setTimeout(() => {
                lockScreen.style.display = 'none';
            }, 500);
        }, 1000);
    } else {
        incorrectMessage.classList.add('show');
        setTimeout(() => {
            incorrectMessage.classList.remove('show');
        }, 3000);
    }
}

function checkAccess() {
    // Check local storage on every page load to see if the user is already unlocked
    if (localStorage.getItem('isUnlocked') === 'true') {
        lockScreen.style.display = 'none';
    } else {
        lockScreen.style.display = 'flex';
    }
}

// --- CORE LOGIC ---
const gradients = [
    { text: 'linear-gradient(135deg, #FF6F00, #F06292)', button: 'linear-gradient(145deg, #FF6F00, #F06292)', shadow: '0 4px 15px rgba(255, 111, 0, 0.4)', hoverShadow: '0 6px 20px rgba(255, 111, 0, 0.6)' },
    { text: 'linear-gradient(135deg, #00ffff, #8A2BE2)', button: 'linear-gradient(145deg, #00ffff, #8A2BE2)', shadow: '0 4px 15px rgba(0, 255, 255, 0.4)', hoverShadow: '0 6px 20px rgba(0, 255, 255, 0.6)' },
    { text: 'linear-gradient(135deg, #FF6B6B, #556270)', button: 'linear-gradient(145deg, #FF6B6B, #556270)', shadow: '0 4px 15px rgba(255, 107, 107, 0.4)', hoverShadow: '0 6px 20px rgba(255, 107, 107, 0.6)' },
    { text: 'linear-gradient(135deg, #FDBB2D, #22C1C3)', button: 'linear-gradient(145deg, #FDBB2D, #22C1C3)', shadow: '0 4px 15px rgba(253, 187, 45, 0.4)', hoverShadow: '0 6px 20px rgba(253, 187, 45, 0.6)' },
    { text: 'linear-gradient(135deg, #00C9FF, #92FE9D)', button: 'linear-gradient(145deg, #00C9FF, #92FE9D)', shadow: '0 4px 15px rgba(0, 201, 255, 0.4)', hoverShadow: '0 6px 20px rgba(0, 201, 255, 0.6)' },
    { text: 'linear-gradient(135deg, #e53935, #a80f2d)', button: 'linear-gradient(145deg, #e53935, #a80f2d)', shadow: '0 4px 15px rgba(229, 57, 53, 0.4)', hoverShadow: '0 6-px 20px rgba(229, 57, 53, 0.6)' },
    { text: 'linear-gradient(135deg, #4CAF50, #2196F3)', button: 'linear-gradient(145deg, #4CAF50, #2196F3)', shadow: '0 4px 15px rgba(76, 175, 80, 0.4)', hoverShadow: '0 6px 20px rgba(76, 175, 80, 0.6)' },
    { text: 'linear-gradient(135deg, #1A2980, #26D0CE)', button: 'linear-gradient(145deg, #1A2980, #26D0CE)', shadow: '0 4px 15px rgba(26, 41, 128, 0.4)', hoverShadow: '0 6px 20px rgba(26, 41, 128, 0.6)' }
];

const prompts = {
    normal: {
        1: "Subject: Urgent Appeal for Banned WhatsApp Account - Compromised Account\n\nDear WhatsApp Support Team,\n\nI hope this message finds you well. I am writing to urgently appeal for the unbanning of my WhatsApp number, as it appears to have been compromised.\n\nI recently discovered that my WhatsApp account has been banned, and I am unable to access or use the application. This ban has come as a complete surprise to me, as I have always used WhatsApp responsibly and have not engaged in any activities that violate the platform's terms of service or community guidelines.\n\nI suspect that my account may have been hacked or used without my knowledge, leading to the ban. I take the security of my account very seriously and have taken all necessary precautions to protect it. However, it seems that unauthorized activity has occurred, resulting in the ban.\n\nWhatsApp plays a crucial role in my personal and professional life, allowing me to stay connected with loved ones, colleagues, and clients. Its ban has caused significant distress and inconvenience, hindering my ability to communicate effectively.\n\nI kindly request your immediate attention and assistance in investigating this matter further. I am more than willing to provide any additional information or evidence that may help resolve this issue. I understand the importance of maintaining a safe and secure platform for all users, and I am committed to cooperating fully to rectify this situation.\n\nPlease consider lifting the ban on my WhatsApp number as soon as possible, allowing me to regain access to my account and resume normal usage. I assure you that I will take all necessary steps to prevent any future unauthorized access and will adhere to WhatsApp's policies and guidelines.\n\nI appreciate your understanding and prompt action in resolving this matter. WhatsApp has been an integral part of my daily life, and I sincerely hope to regain access to my account soon.\n\nThank you for your attention and support.\n\nMy number: NUMBER_HERE\n\nDevice Type: DEVICE_HERE\nEmail Address: EMAIL_HERE",
        2: "Subject: Appeal to Unban My WhatsApp Account\n\nDear WhatsApp Support Team,\n\nI recently found out that my WhatsApp account has been banned. I think it might be because I sent many messages. I understand this may have triggered WhatsApp’s spam filters.\n\nI’m sorry for any trouble caused. My actions were not meant to break WhatsApp’s rules. I’ll be more careful with my messaging in the future. Please review my account and consider unbanning it.\n\nThank you for your understanding.\nBest regards,\n[Your Phone Number]\n\nDevice Type: DEVICE_HERE\nEmail Address: EMAIL_HERE",
        3: "My number NUMBER_HERE got banned but I have not violated any terms. Please reinstate access.\n\nDevice Type: DEVICE_HERE\nEmail Address: EMAIL_HERE",
        4: "Subject: Urgent Review Requested for Permanently Banned Account\n\nHello WhatsApp Team,\n\nI am writing to request a review regarding my WhatsApp account that has been permanently blocked due to alleged activities violating WhatsApp’s Terms of Service. I would like to emphasize that I have never committed any violations nor infringed upon other users.\n\nI have always made every effort to comply with WhatsApp’s Terms of Service as stated on the official website. Therefore, I believe the blocking of my account is a misunderstanding.\n\nI kindly ask the WhatsApp team to review my account again and restore it as soon as possible, as I really need this account for communication.\nMy WhatsApp number: NUMBER_HERE\n\nThank you for the attention and assistance from the WhatsApp team.\n\nDevice Type: DEVICE_HERE\nEmail Address: EMAIL_HERE",
        5: "Subject: Banned Account Appeal - Review Requested\n\nDear WhatsApp Support Team,\n\nMy account with the number NUMBER_HERE has been banned. I believe this is a mistake, as I have always used WhatsApp responsibly and in accordance with your policies. I kindly request a thorough review of my account to reinstate my access as soon as possible.\n\nThank you for your time and consideration.\n\nBest regards,\n\nDevice Type: DEVICE_HERE\nEmail Address: EMAIL_HERE"
    },
    permanent: {
        1: "Dear WhatsApp Support, I humbly request a second chance for my number NUMBER_HERE. I understand the policies and promise to follow all rules henceforth.\n\nDevice Type: DEVICE_HERE\nEmail Address: EMAIL_HERE",
        2: "My number NUMBER_HERE is permanently banned. I deeply regret any violation. Kindly give me one more opportunity.\n\nDevice Type: DEVICE_HERE\nEmail Address: EMAIL_HERE",
        3: "This is a request to reconsider the permanent ban on my number NUMBER_HERE. I assure compliance in the future.\n\nDevice Type: DEVICE_HERE\nEmail Address: EMAIL_HERE",
        4: "Subject: Urgent Review Requested for Permanently Banned Account\n\nHello WhatsApp Team,\n\nI am writing to request a review regarding my WhatsApp account that has been permanently blocked due to alleged activities violating WhatsApp’s Terms of Service. I would like to emphasize that I have never committed any violations nor infringed upon other users.\n\nI have always made every effort to comply with WhatsApp’s Terms of Service as stated on the official website. Therefore, I believe the blocking of my account is a misunderstanding.\n\nI kindly ask the WhatsApp team to review my account again and restore it as soon as possible, as I really need this account for communication.\nMy WhatsApp number: NUMBER_HERE\n\nThank you for the attention and assistance from the WhatsApp team.\n\nDevice Type: DEVICE_HERE\nEmail Address: EMAIL_HERE"
    }
};

const emailMap = {
    'regular': 'support@support.whatsapp.com',
    'android_support': 'android-support@support.whatsapp.com',
    'whatsapp_business': 'smb_support@support.whatsapp.com',
    'accessibility': 'Accessibility@support.whatsapp.com'
};

function validateInputs(number, email) {
    if (!number.startsWith('+') || number.length < 7) {
        alert('Please enter a valid number like +923xxxxxxxx.');
        return false;
    }

    if (email === '' || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return false;
    }
    return true;
}

// Handle file selection and display file name
function handleFileSelect() {
    const fileName = this.files.length > 0 ? this.files[0].name : '';
    document.getElementById('file-name').textContent = fileName;
}

function sendRequestViaEmail() {
    const number = document.getElementById('number').value.trim();
    const email = document.getElementById('email').value.trim();
    const deviceType = document.getElementById('deviceType').value.trim();
    const promptId = document.getElementById('prompt').value;
    const banType = document.getElementById('banType').value;
    const whatsappType = document.getElementById('whatsappType').value;
    const file = document.getElementById('file-input').files[0];

    if (!validateInputs(number, email)) return;

    if (file) {
        alert("Please manually attach the image to the email before sending. Your email client will now open.");
    }

    let message = prompts[banType] && prompts[banType][promptId];

    if (!message) {
        alert("Could not find the selected prompt. Please try again.");
        return;
    }

    message = message.replaceAll('NUMBER_HERE', number)
                     .replaceAll('DEVICE_HERE', deviceType)
                     .replaceAll('EMAIL_HERE', email);

    const recipientEmail = emailMap[whatsappType];
    const finalSubject = message.split('\n')[0].includes('Subject:') ? message.split('\n')[0].replace('Subject: ', '') : 'Unban Request';
    const finalBody = message;

    const mailto = `mailto:${recipientEmail}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalBody)}`;
    window.location.href = mailto;
}

// Function to update prompts based on ban type
function updatePrompts() {
    const banType = document.getElementById('banType').value;
    const promptSelect = document.getElementById('prompt');
    promptSelect.innerHTML = ''; // Clear existing options

    const currentPrompts = prompts[banType];
    const sortedKeys = Object.keys(currentPrompts).sort((a, b) => a - b);

    sortedKeys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        const promptText = currentPrompts[key].match(/Subject: [^\n]+/)?.[0] || `PROMPT ${key}`;
        option.textContent = promptText;
        promptSelect.appendChild(option);
    });
}

// Ensure all event listeners are set up after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the unlock button
    const unlockButton = document.querySelector('.unlock-button');
    if (unlockButton) {
        unlockButton.addEventListener('click', checkCode);
    }
    accessCodeInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkCode();
        }
    });

    // Event listener for the main button
    const mainButton = document.querySelector('.main-button');
    if (mainButton) {
        mainButton.addEventListener('click', sendRequestViaEmail);
    }

    // Event listeners for select boxes and file input
    document.getElementById('banType').addEventListener('change', updatePrompts);
    document.getElementById('file-input').addEventListener('change', handleFileSelect);

    // Initial calls on page load
    setRandomGradients();
    displayLocalTime();
    displayBatteryStatus();
    checkAccess();
    updatePrompts();
});

// Helper functions for dynamic UI
function setRandomGradients() {
    // Select a random gradient from the array
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    // Apply the gradient values to the CSS variables
    document.documentElement.style.setProperty('--text-gradient', randomGradient.text);
    document.documentElement.style.setProperty('--button-gradient', randomGradient.button);
    document.documentElement.style.setProperty('--button-shadow', randomGradient.shadow);
    document.documentElement.style.setProperty('--button-shadow-hover', randomGradient.hoverShadow);
}

function displayLocalTime() {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short' };
    const timeString = new Date().toLocaleTimeString(undefined, options);
    const localTimeElement = document.getElementById('localTime');
    if (localTimeElement) {
        localTimeElement.innerHTML = `<i class="far fa-clock"></i> Current time: ${timeString}`;
    }
}
setInterval(displayLocalTime, 1000);

function displayBatteryStatus() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            function updateBatteryStatus() {
                const level = battery.level;
                const percentage = Math.floor(level * 100);
                const chargingStatus = battery.charging ? ' <i class="fas fa-bolt"></i> (Charging)' : '';
                const batteryStatusElement = document.getElementById('batteryStatus');
                if (batteryStatusElement) {
                    batteryStatusElement.innerHTML = `<i class="fas fa-battery-${getBatteryIcon(level)}"></i> Battery: ${percentage}%${chargingStatus}`;
                }
            }
            function getBatteryIcon(level) {
                if (level >= 0.9) return 'full';
                if (level >= 0.6) return 'three-quarters';
                if (level >= 0.4) return 'half';
                if (level >= 0.1) return 'quarter';
                return 'empty';
            }
            updateBatteryStatus();
            battery.addEventListener('levelchange', updateBatteryStatus);
            battery.addEventListener('chargingchange', updateBatteryStatus);
        });
    } else {
        const batteryStatusElement = document.getElementById('batteryStatus');
        if (batteryStatusElement) {
            batteryStatusElement.innerHTML = '<i class="fas fa-battery-slash"></i> Battery status not supported.';
        }
    }
}

// Expose checkCode and sendRequestViaEmail to the global scope for the HTML onclick attributes
window.checkCode = checkCode;
window.sendRequestViaEmail = sendRequestViaEmail;
window.handleFileSelect = handleFileSelect;
