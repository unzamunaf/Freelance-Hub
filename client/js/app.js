let allServices = [];
let filteredServices = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchServices();
    loadDashboard();
});

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(`${sectionId}-section`).style.display = 'block';
    
    if (sectionId === 'dashboard') loadDashboard();
}

async function fetchServices() {
    try {
        const response = await fetch('/api/services');
        allServices = await response.json();
        filteredServices = [...allServices];
        renderServices();
    } catch (error) {
        console.error('Error fetching services:', error);
    }
}

function renderServices() {
    const grid = document.getElementById('services-grid');
    grid.innerHTML = filteredServices.map(service => `
        <div class="service-card" draggable="true" ondragstart="drag(event, ${service.id})" onclick="openDetails(${service.id})">
            <img src="${service.image}" alt="${service.title}" class="card-img">
            <div class="card-content">
                <span class="card-tag">${service.category}</span>
                <h3>${service.title}</h3>
                <p style="color: var(--text-muted); font-size: 0.85rem;">by ${service.seller}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                    <span class="card-price">$${service.price}</span>
                    <span style="color: #fbbf24;">★ ${service.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function handleFilter() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const sort = document.getElementById('sort-filter').value;

    filteredServices = allServices.filter(s => {
        const matchesSearch = s.title.toLowerCase().includes(searchTerm);
        const matchesCategory = category === '' || s.category === category;
        return matchesSearch && matchesCategory;
    });

    if (sort === 'price-low') filteredServices.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filteredServices.sort((a, b) => b.price - a.price);
    if (sort === 'rating') filteredServices.sort((a, b) => b.rating - a.rating);

    renderServices();
}

async function openDetails(id) {
    const response = await fetch(`/api/services/${id}`);
    const service = await response.json();
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img src="${service.image}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 1rem; margin-bottom: 1.5rem;">
        <h2>${service.title}</h2>
        <p style="margin: 1rem 0;">${service.description}</p>
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <button class="btn btn-primary" onclick="actionService(${service.id}, 'hire')">Hire Now - $${service.price}</button>
            <button class="btn btn-outline" onclick="actionService(${service.id}, 'save')">Save for Later</button>
        </div>
    `;
    document.getElementById('service-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('service-modal').style.display = 'none';
}

async function actionService(id, type) {
    try {
        const response = await fetch(`/api/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ serviceId: id })
        });
        const data = await response.json();
        
        if (response.ok) {
            alert(data.message);
            closeModal();
            loadDashboard();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Action failed');
    }
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.target.classList.add('active');
}

function drag(ev, id) {
    ev.dataTransfer.setData("serviceId", id);
}

async function drop(ev, type) {
    ev.preventDefault();
    ev.target.classList.remove('active');
    const id = ev.dataTransfer.getData("serviceId");
    actionService(parseInt(id), type);
}

async function loadDashboard() {
    try {
        const [savedRes, hiredRes] = await Promise.all([
            fetch('/api/saved'),
            fetch('/api/hired')
        ]);
        
        const saved = await savedRes.json();
        const hired = await hiredRes.json();

        renderList('saved-list', saved);
        renderList('hired-list', hired);
    } catch (error) {
        console.error('Error loading dashboard');
    }
}

function renderList(elementId, data) {
    const list = document.getElementById(elementId);
    if (data.length === 0) {
        list.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No items yet.</p>';
        return;
    }
    list.innerHTML = data.map(s => `
        <div class="service-card" style="cursor: default; transform: none;">
            <div class="card-content" style="display: flex; align-items: center; gap: 1rem;">
                <img src="${s.image}" style="width: 60px; height: 60px; border-radius: 0.5rem; object-fit: cover;">
                <div>
                    <h4 style="margin: 0;">${s.title}</h4>
                    <p style="color: var(--secondary); font-weight: 700;">$${s.price}</p>
                </div>
            </div>
        </div>
    `).join('');
}
