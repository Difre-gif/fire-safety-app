// Switch between tabs to show relevant content
document.getElementById('fire-tab').addEventListener('click', function () {
    showSection('fire-list', this);
});

document.getElementById('police-tab').addEventListener('click', function () {
    showSection('police-list', this);
});

document.getElementById('ambulance-tab').addEventListener('click', function () {
    showSection('ambulance-list', this);
});

// Function to show the relevant section and highlight the active tab
function showSection(sectionId, tab) {
    // Hide all sections
    const sections = document.querySelectorAll('.contact-list');
    sections.forEach((section) => {
        section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');

    // Reset active tab
    const tabs = document.querySelectorAll('nav a');
    tabs.forEach((link) => {
        link.classList.remove('active');
    });

    // Highlight the clicked tab
    tab.classList.add('active');
}
