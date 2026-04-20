let students = [];
let filterType = 'all';
let selectedStudent = null;
let showLowAttendance = false;
let sortAscending = true;

const studentListElement = document.getElementById('studentList');
const loadingElement = document.getElementById('loadingMessage');
const emptyElement = document.getElementById('emptyMessage');
const filterButtons = document.querySelectorAll('.filter-btn');
const lowAttendanceToggle = document.getElementById('lowAttendanceToggle');
const studentDetails = document.getElementById('studentDetails');
const detailsContent = document.getElementById('detailsContent');
const sortBtn = document.getElementById('sortBtn');

function generateRandomAttendance() {
    return Math.floor(Math.random() * 40) + 60;
}

function getStatusFromAttendance(attendance) {
    return attendance >= 75 ? 'present' : 'absent';
}

function fetchStudents() {
    loadingElement.style.display = 'block';
    studentListElement.innerHTML = '';
    emptyElement.style.display = 'none';

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            students = data.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                company: user.company.name,
                attendance: generateRandomAttendance()
            }));
            
            loadingElement.style.display = 'none';
            renderStudents();
        })
        .catch(error => {
            console.error('Error fetching students:', error);
            loadingElement.style.display = 'none';
            emptyElement.style.display = 'block';
            emptyElement.textContent = 'Failed to load students';
        });
}

function filterStudents() {
    let filtered = [...students];

    if (filterType === 'present') {
        filtered = filtered.filter(s => s.attendance >= 75);
    } else if (filterType === 'absent') {
        filtered = filtered.filter(s => s.attendance < 75);
    }

    if (showLowAttendance) {
        filtered = filtered.filter(s => s.attendance < 75);
    }

    return filtered;
}

function renderStudents() {
    const filtered = filterStudents();
    
    if (filtered.length === 0) {
        studentListElement.innerHTML = '';
        emptyElement.style.display = 'block';
        return;
    }

    emptyElement.style.display = 'none';
    studentListElement.innerHTML = '';

    filtered.forEach(student => {
        const card = createStudentCard(student);
        studentListElement.appendChild(card);
    });
}

function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';
    
    if (selectedStudent && selectedStudent.id === student.id) {
        card.classList.add('selected');
    }

    const status = getStatusFromAttendance(student.attendance);
    const attendanceClass = student.attendance >= 75 ? 'high' : 'low';

    card.innerHTML = `
        <div class="student-info">
            <div class="student-name">${student.name}</div>
            <div class="student-email">${student.email}</div>
        </div>
        <div class="attendance-info">
            <div class="attendance-percent ${attendanceClass}">${student.attendance}%</div>
            <div class="status-badge ${status}">${status}</div>
        </div>
    `;

    card.addEventListener('click', () => selectStudent(student));

    return card;
}

function selectStudent(student) {
    selectedStudent = student;
    renderStudents();
    showStudentDetails(student);
}

function showStudentDetails(student) {
    studentDetails.style.display = 'block';
    const status = getStatusFromAttendance(student.attendance);
    
    detailsContent.innerHTML = `
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Phone:</strong> ${student.phone}</p>
        <p><strong>Company:</strong> ${student.company}</p>
        <p><strong>Attendance:</strong> ${student.attendance}%</p>
        <p><strong>Status:</strong> ${status.toUpperCase()}</p>
    `;
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterType = button.dataset.filter;
        renderStudents();
    });
});

lowAttendanceToggle.addEventListener('change', (e) => {
    showLowAttendance = e.target.checked;
    renderStudents();
});

sortBtn.addEventListener('click', () => {
    if (sortAscending) {
        students.sort((a, b) => a.attendance - b.attendance);
        sortBtn.textContent = 'Sort by Attendance % (High to Low)';
    } else {
        students.sort((a, b) => b.attendance - a.attendance);
        sortBtn.textContent = 'Sort by Attendance % (Low to High)';
    }
    sortAscending = !sortAscending;
    renderStudents();
});

window.addEventListener('DOMContentLoaded', () => {
    fetchStudents();
});