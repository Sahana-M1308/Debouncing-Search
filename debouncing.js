function debounce(func, delay) {
    let timeout;
    
    // This is the function that replaces your original event handler
    return function(...args) {
        const context = this;
        
        // Clear the previous timeout every time the function is called again
        clearTimeout(timeout);
        
        // Set a new timeout
        timeout = setTimeout(() => {
            // Execute the original function (func) after the delay
            func.apply(context, args);
        }, delay);
    };
}


// ======================================================
// 5. Elastic Search-style Flow: Integration
// ======================================================

// Assuming these variables are defined globally or within scope:
// const searchInput = document.getElementById('searchInput');
// const statusFilter = document.getElementById('statusFilter');
// const priorityFilter = document.getElementById('priorityFilter');
// let tasks = [...]; // Your array of tasks

function applyFiltersAndSearch() {
    // This function contains your core filtering logic (from the previous answer)
    // and only runs AFTER the debounce delay has passed since the last keypress.

    console.log("Running filters/search..."); // Helps visualize when debounce triggers

    let filteredTasks = [...tasks]; 

    const searchTerm = searchInput.value.toLowerCase().trim();
    const currentStatusFilter = statusFilter.value;
    const currentPriorityFilter = priorityFilter.value;

    // Apply Search (Case-insensitive partial substring match on title/description)
    if (searchTerm) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm)
        );
    }

    // Apply Status Filter
    if (currentStatusFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.status === currentStatusFilter);
    }

    // Apply Priority Filter
    if (currentPriorityFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.status === currentStatusFilter);
    }

    renderTasks(filteredTasks);
}

// ======================================================
// Attaching the Debounced Handler to the Input Field
// ======================================================

// Attach an event listener to the 'input' event (fires on every keypress)
// We wrap our main logic (applyFiltersAndSearch) with the debounce function,
// setting a delay (e.g., 300 milliseconds).
searchInput.addEventListener('input', debounce(applyFiltersAndSearch, 300));


// Non-debounced listeners remain the same:
statusFilter.addEventListener('change', applyFiltersAndSearch);
priorityFilter.addEventListener('change', applyFiltersAndSearch);
