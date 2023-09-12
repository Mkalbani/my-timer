// Define variables
let timer;
let startTime;
let notifyTime = 0;

// Function to start the timer
function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timer);
    notifyTime = 0;
    startTime = Date.now();
    document.getElementById('display').textContent = '00:00:00';
}

// Function to update the timer
function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    document.getElementById('display').textContent = formattedTime;

    if (notifyTime > 0 && seconds >= notifyTime * 60) {
        alert(`Time's up! ${notifyTime} minutes have passed.`);
        clearInterval(timer); // Stop the timer
        startTime = Date.now(); // Reset the startTime
        document.getElementById('display').textContent = '00:00:00';
    }
}

// Event listeners for buttons
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

// Event listener for setting notification time
document.getElementById('set-notify').addEventListener('click', function () {
    const inputTime = parseInt(document.getElementById('notify-time').value);
    if (!isNaN(inputTime) && inputTime >= 1) {
        notifyTime = inputTime;
        startTime = Date.now(); // Start the timer from zero
        alert(`Notification set for ${notifyTime} minutes.`);
        startTimer(); // Start the timer
    } else {
        alert('Invalid notification time. Please enter a positive integer.');
    }
});

// Event listener for clearing notification time
document.getElementById('clear-notify').addEventListener('click', function () {
    notifyTime = 0;
    clearInterval(timer); // Stop the timer
    startTime = Date.now(); // Reset the startTime
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('notify-time').value = '0'; // Reset the input field to 0
    alert('Notification cleared.');
});
