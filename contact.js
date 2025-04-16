document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const today = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    function renderCalendar() {
        const calendarDays = document.getElementById('calendar-days');
        const timeSelection = document.getElementById('time-selection');
        const confirmation = document.getElementById('confirmation');
        const bookingForm = document.getElementById('booking-form');
        
        calendarDays.innerHTML = '';
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        document.getElementById('current-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
        
        for (let i = 0; i < adjustedFirstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDays.appendChild(emptyDay);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            if (date.getDay() === 0 || date.getDay() === 6) {
                dayElement.classList.add('weekend');
                dayElement.style.pointerEvents = 'none';
            } else if ((day === 17) && currentMonth === 3 && currentYear === 2025) {
                dayElement.classList.add('active');
            }
            
            dayElement.addEventListener('click', function() {
                if (!dayElement.classList.contains('weekend')) {
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                    const formattedDate = `${dayName}<br>${monthNames[currentMonth]} ${day}, ${currentYear}`;
                    timeSelection.innerHTML = `
                        <h3>${formattedDate}</h3>
                        <p><i>India Standard Time (2:29pm) ~</i></p>
                        <h4>Select a Time</h4>
                        <p>Duration: 30 min</p>
                        <div class="time-option" data-time="3:00pm">3:00pm</div>
                        <div class="time-option" data-time="3:30pm">3:30pm</div>
                        <div class="time-option" data-time="4:00pm">4:00pm</div>
                    `;
                    timeSelection.classList.add('active');
                    confirmation.classList.remove('active');
                    bookingForm.classList.remove('active');
                    calendarDays.style.display = 'none';
                    dayElement.classList.add('active');
                }
            });
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    document.getElementById('prev-month').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    document.getElementById('next-month').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    document.getElementById('time-selection').addEventListener('click', function(e) {
        if (e.target.classList.contains('time-option')) {
            const selectedTime = e.target.getAttribute('data-time');
            const selectedDate = document.getElementById('time-selection').querySelector('h3').textContent.split('<br>')[1];
            const endTime = new Date(`2025-04-17 ${selectedTime.replace('pm', '')}`).getTime() + 30 * 60000;
            document.getElementById('confirmation-time').textContent = `${selectedTime} - ${new Date(endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}pm, ${selectedDate}`;
            document.getElementById('time-selection').classList.remove('active');
            document.getElementById('confirmation').classList.add('active');
            document.getElementById('booking-form').classList.add('active');
        }
    });
    
    document.getElementById('schedule-meeting').addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const websiteType = document.querySelector('input[name="website-type"]:checked')?.value;
        const admiredSites = document.getElementById('admired-sites').value;
        const platform = document.querySelector('input[name="platform"]:checked')?.value;
        const timeline = document.querySelector('input[name="timeline"]:checked')?.value;
        const budget = document.getElementById('budget').value;
        const additionalInfo = document.getElementById('additional-info').value;
        const contactNumber = document.getElementById('contact-number').value;

        const subject = `Meeting Request from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nWebsite Type: ${websiteType || 'Not specified'}\nAdmired Sites: ${admiredSites}\nPreferred Platform: ${platform || 'Not specified'}\nTimeline: ${timeline || 'Not specified'}\nBudget: ${budget}\nAdditional Info: ${additionalInfo}\nContact Number: ${contactNumber}`;
        const mailtoLink = `mailto:example@quixita.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    });
    
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submitted! We will contact you shortly.');
        this.reset();
    });
    
    renderCalendar();
});