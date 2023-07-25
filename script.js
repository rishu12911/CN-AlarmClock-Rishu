// Function to update the clock
function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const amPm = now.getHours() >= 12 ? 'PM' : 'AM';
  const timeString = `${hours}:${minutes}:${seconds} ${amPm}`;
  document.getElementById('clock-face').innerText = timeString;
}

// Function to set an alarm
function setAlarm() {
  // Get input values
  const hoursInput = document.getElementById('alarm-hours');
  const minutesInput = document.getElementById('alarm-minutes');
  const secondsInput = document.getElementById('alarm-seconds');

  // Convert input values to integers
  const hours = parseInt(hoursInput.value, 10);
  const minutes = parseInt(minutesInput.value, 10);
  const seconds = parseInt(secondsInput.value, 10);
  const amPm = document.getElementById('alarm-am-pm').value;

  // Check if any input fields are empty
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    alert('Please enter valid time values in all the input fields.');
    return;
  }

  // Check if hours, minutes, and seconds are within range
  if (hours > 12 || minutes > 59 || seconds > 59) {
    alert('Invalid time values. Please enter valid time.');
    return;
  }

  // Create a new Date object for the alarm time
  const alarmTime = new Date();

  // This logic for AM/PM and set the alarm time
  if (amPm === 'PM' && hours !== 12) {
    alarmTime.setHours(hours + 12);
  } else if (amPm === 'AM' && hours === 12) {
    alarmTime.setHours(0);
  } else {
    alarmTime.setHours(hours);
  }

  alarmTime.setMinutes(minutes);
  alarmTime.setSeconds(seconds);
  

  // Create a new list item for the alarm in the alarms list
  const alarmsList = document.getElementById('alarms-ul');
  const newAlarm = document.createElement('li');
  newAlarm.className = 'list-group-item';

  // Display the alarm time and add a delete button
  const alarmTimeSpan = document.createElement('span');
  alarmTimeSpan.innerText = alarmTime.toLocaleTimeString();
  newAlarm.appendChild(alarmTimeSpan);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-danger delete-button';
  deleteButton.innerHTML = '<img src="recycle-bin-icon.png" alt="Delete">'; /*adding delete icon*/
  deleteButton.onclick = function () {
    alarmsList.removeChild(newAlarm);
  };
  newAlarm.appendChild(deleteButton);

  // Add the new alarm to the alarms list
  alarmsList.appendChild(newAlarm);

  // Check if the alarm is in the future and schedule the alert
  const currentTime = new Date();
  if (alarmTime > currentTime) {
    const timeUntilAlarm = alarmTime - currentTime;
    setTimeout(function () {
      alert('Alarm! Time to wake up!');
    }, timeUntilAlarm);
  }

  // Clear input fields after setting the alarm
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
}

// Update the clock every second
setInterval(updateClock, 1000);

// Run the initial clock update
updateClock();
