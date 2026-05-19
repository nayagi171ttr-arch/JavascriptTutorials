let currentUser = null; 
let currentView = 'month';
let today = new Date();
let db = JSON.parse(localStorage.getItem('cal_tasks_v3')) || {};

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (pass === "123" && (user === "admin" || user === "user")) {
        currentUser = user;
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('calendar-page').classList.remove('hidden');
        setupCalendar();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}


function setupCalendar() {
    const badge = document.getElementById('role-badge');
    badge.innerText = currentUser.toUpperCase();
    badge.style.background = currentUser === 'admin' ? '#6c5ce7' : '#00b894';

    const picker = document.getElementById('month-picker');
    months.forEach((m, i) => {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = m;
        if(i === today.getMonth()) 
        opt.selected = true;
        picker.appendChild(opt);
    });
    render();
}

function render() {
    const grid = document.getElementById('calendar-grid');
    const header = document.getElementById('wd-header');
    const mIndex = parseInt(document.getElementById('month-picker').value);
    grid.innerHTML = '';

    if (currentView === 'month') {
        header.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        let firstDay = new Date(today.getFullYear(), mIndex, 1).getDay();
        let days = new Date(today.getFullYear(), mIndex + 1, 0).getDate();

        for(let i=0; i<firstDay; i++) 
            grid.innerHTML += `<div class="day-cell" style="background:#f9f9f9"></div>`;
        for(let d=1; d<=days; d++) {
            createCell(d, `${today.getFullYear()}-${mIndex+1}-${d}`, grid);
        }
    } else if (currentView === 'week') {
        header.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        let start = new Date(today); 
        start.setDate(today.getDate() - today.getDay());
        for(let i=0; i<7; i++) {
            let d = new Date(start); 
            d.setDate(start.getDate() + i);
            createCell(d.toDateString(), `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`, grid);
        }
    } else {
        header.style.display = 'none';
        grid.style.gridTemplateColumns = '1fr';
        createCell(today.toDateString(), `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`, grid);
    }
}

function createCell(label, key, grid) {
    let cell = document.createElement('div');
    cell.className = 'day-cell';
    let content = db[key] ? `<div class="desc-tag">${db[key]}</div>` : '';
    cell.innerHTML = `<strong>${label}</strong>${content}`;
    cell.onclick = () => openModal(key);
    grid.appendChild(cell);
}


function openModal(key) {
    activeKey = key;
    const input = document.getElementById('desc-input');
    const msg = document.getElementById('perm-msg');
    const saveBtn = document.getElementById('save-btn');
    const delBtn = document.getElementById('del-btn');

    document.getElementById('modal-title').innerText = key;
    input.value = db[key] || '';

    if (currentUser === 'admin') {
        input.readOnly = false;
        msg.innerText = "Admin Access Granted.";
        saveBtn.classList.remove('hidden');
        delBtn.classList.remove('hidden');
    } else {
        input.readOnly = true;
        msg.innerText = "Read Only: You do not have edit permissions.";
        saveBtn.classList.add('hidden');
        delBtn.classList.add('hidden');
    }
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
     document.getElementById('modal').style.display = 'none';
     }

function saveTask() {
    if(currentUser !== 'admin') return;
    db[activeKey] = document.getElementById('desc-input').value;
    localStorage.setItem('cal_tasks_v3', JSON.stringify(db));
    closeModal(); 
    render();
}

function deleteTask() {
    if(currentUser !== 'admin') return;
    delete db[activeKey];
    localStorage.setItem('cal_tasks_v3', JSON.stringify(db));
    closeModal(); 
    render();
}

function changeView(v) { 
    currentView = v;
     render(); 
    }