// Variables globales
const calendarElement = document.getElementById('calendar');
let selectedDate = new Date();

// Función para generar el calendario
function generateCalendar(year, month) {
    calendarElement.innerHTML = '';

    // Header del calendario
    const header = document.createElement('div');
    header.classList.add('calendar-header');

    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.addEventListener('click', () => changeMonth(-1));

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.addEventListener('click', () => changeMonth(1));

    const title = document.createElement('span');
    title.textContent = `${monthNames[month]} ${year}`;

    header.appendChild(prevButton);
    header.appendChild(title);
    header.appendChild(nextButton);
    calendarElement.appendChild(header);

    // Días de la semana
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const daysOfWeekContainer = document.createElement('div');
    daysOfWeekContainer.classList.add('calendar-days');
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        daysOfWeekContainer.appendChild(dayElement);
    });
    calendarElement.appendChild(daysOfWeekContainer);

    // Días del mes
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysContainer = document.createElement('div');
    daysContainer.classList.add('calendar-days');

    // Rellenar los días en blanco del mes anterior
    for (let i = 0; i < firstDay; i++) {
        const blankDay = document.createElement('div');
        blankDay.classList.add('calendar-day');
        daysContainer.appendChild(blankDay);
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        dayElement.addEventListener('click', () => selectDate(day, month, year));
        daysContainer.appendChild(dayElement);
    }

    calendarElement.appendChild(daysContainer);
}

// Cambiar de mes
function changeMonth(offset) {
    selectedDate.setMonth(selectedDate.getMonth() + offset);
    generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
}

// Seleccionar una fecha
function selectDate(day, month, year) {
    selectedDate = new Date(year, month, day);
    const selectedElements = document.querySelectorAll('.calendar-day.selected');
    selectedElements.forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
}

// Inicializar el calendario
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth());

// Calendario y Horarios
document.querySelectorAll('.calendar-day').forEach(day => {
    day.addEventListener('click', () => {
        document.querySelector('.time-slots').classList.add('visible');
    });
});

// Botón de scroll hacia arriba
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scroll-top');

    // Mostrar/ocultar botón según posición del scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll suave hacia arriba al hacer clic
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});