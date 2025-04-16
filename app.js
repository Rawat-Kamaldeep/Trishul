document.addEventListener('DOMContentLoaded', function() {
    // Get carousel elements
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    
    // Calculate total number of slides
    const slideCount = slides.length;
    
    // Set initial position
    let currentSlide = 0;
    
    // Function to update carousel position
    function updatePosition() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Event listener for previous button
    prevButton.addEventListener('click', function() {
      if (currentSlide > 0) {
        currentSlide--;
      } else {
        // Loop to the last slide if at the beginning
        currentSlide = slideCount - 1;
      }
      updatePosition();
    });
    
    // Event listener for next button
    nextButton.addEventListener('click', function() {
      if (currentSlide < slideCount - 1) {
        currentSlide++;
      } else {
        // Loop to the first slide if at the end
        currentSlide = 0;
      }
      updatePosition();
    });
    
    // Optional: Auto-rotation (uncomment to enable)
    /*
    let intervalId = setInterval(function() {
      if (currentSlide < slideCount - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updatePosition();
    }, 5000); // Change slide every 5 seconds
    
    // Pause auto-rotation on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    sliderContainer.addEventListener('mouseenter', function() {
      clearInterval(intervalId);
    });
    
    sliderContainer.addEventListener('mouseleave', function() {
      intervalId = setInterval(function() {
        if (currentSlide < slideCount - 1) {
          currentSlide++;
        } else {
          currentSlide = 0;
        }
        updatePosition();
      }, 5000);
    });
    */
  });

  document.addEventListener('DOMContentLoaded', function() {
// Get calendar elements
const calendarDaysContainer = document.querySelector('.calendar-days');
const prevMonth = document.querySelector('.prev-month');
const nextMonth = document.querySelector('.next-month');
const calendarNav = document.querySelector('.calendar-nav');

// Setup month navigation
const months = [
'January', 'February', 'March', 'April', 'May', 'June', 
'July', 'August', 'September', 'October', 'November', 'December'
];

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Get current date for comparison
const today = new Date();
const currentDay = today.getDate();
const currentRealMonth = today.getMonth(); // 0-indexed
const currentRealYear = today.getFullYear();

// Set initial calendar view
let currentMonth = 2; // March (0-indexed)
let currentYear = 2025;
let selectedDate = 26; // Default selected date

// Function to check if a year is a leap year
function isLeapYear(year) {
return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

// Function to get the number of days in a month
function getDaysInMonth(month, year) {
if (month === 1 && isLeapYear(year)) {
return 29; // February in a leap year
}
return daysInMonth[month];
}

// Function to get the first day of the month (0 = Monday, 6 = Sunday)
function getFirstDayOfMonth(month, year) {
// Create a Date object for the first day of the month
const firstDay = new Date(year, month, 1);
// Convert from JS Sunday=0 to Monday=0 format
let day = firstDay.getDay() - 1;
if (day === -1) day = 6; // Sunday becomes 6
return day;
}

// Function to check if a day is a weekday (Mon-Fri)
function isWeekday(dayOfWeek) {
// dayOfWeek: 0=Monday, 1=Tuesday, 2=Wednesday, 3=Thursday, 4=Friday, 5=Saturday, 6=Sunday
return dayOfWeek >= 0 && dayOfWeek <= 4;
}

// Function to check if a date is in the future or today
function isFutureOrToday(day, month, year) {
// If year is in the future
if (year > currentRealYear) {
return true;
}
// If same year but month is in the future
if (year === currentRealYear && month > currentRealMonth) {
return true;
}
// If same year and same month but day is today or future
if (year === currentRealYear && month === currentRealMonth && day >= currentDay) {
return true;
}
// Otherwise it's in the past
return false;
}

// Function to generate calendar days
function generateCalendarDays() {
// Clear existing days
calendarDaysContainer.innerHTML = '';

// Get first day of the month and total days
const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
const totalDays = getDaysInMonth(currentMonth, currentYear);

// Add empty cells for days before the start of the month
for (let i = 0; i < firstDay; i++) {
const emptyDay = document.createElement('div');
emptyDay.className = 'calendar-day';
calendarDaysContainer.appendChild(emptyDay);
}

// Add the days of the month
for (let day = 1; day <= totalDays; day++) {
const dayElement = document.createElement('div');
dayElement.className = 'calendar-day';
dayElement.textContent = day;

// Calculate the day of week for this day (0=Monday, 6=Sunday)
const dayOfWeek = (firstDay + day - 1) % 7;

// Check if this date is in the future or today
const isFuture = isFutureOrToday(day, currentMonth, currentYear);

// Add highlighted class for weekdays (Monday-Friday) that are in the future
if (isWeekday(dayOfWeek) && isFuture) {
  dayElement.classList.add('highlighted');
  // Make sure past dates are clickable
  dayElement.style.cursor = 'pointer';
} else {
  // Make past dates and weekends non-clickable
  dayElement.style.cursor = 'default';
  // Add a visual indication that the date is in the past or a weekend
  if (!isFuture) {
    dayElement.style.color = '#ccc';
  }
}

// Add selected class if it matches the selected date
if (day === selectedDate && currentMonth === 2 && currentYear === 2025) {
  dayElement.classList.add('selected');
}

// Add click event only for future weekdays
if (isWeekday(dayOfWeek) && isFuture) {
  dayElement.addEventListener('click', function() {
    // Remove selected class from all days
    document.querySelectorAll('.calendar-days .calendar-day').forEach(d => {
      d.classList.remove('selected');
    });
    
    // Add selected class to clicked day
    this.classList.add('selected');
    selectedDate = parseInt(this.textContent);
  });
}

calendarDaysContainer.appendChild(dayElement);
}
}

// Function to update calendar header
function updateCalendarHeader() {
calendarNav.textContent = `${months[currentMonth]} ${currentYear}`;
}

// Function to update the entire calendar
function updateCalendar() {
updateCalendarHeader();
generateCalendarDays();
}

// Initialize the calendar
updateCalendar();

// Setup month navigation events
prevMonth.addEventListener('click', function() {
currentMonth--;
if (currentMonth < 0) {
currentMonth = 11;
currentYear--;
}
// Reset selected date when changing months
selectedDate = null;
updateCalendar();
});

nextMonth.addEventListener('click', function() {
currentMonth++;
if (currentMonth > 11) {
currentMonth = 0;
currentYear++;
}
// Reset selected date when changing months
selectedDate = null;
updateCalendar();
});
});