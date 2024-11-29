

let data = [];
const url = 'https://script.google.com/macros/s/AKfycbygGl5fLN13dq_OnVRWicp_9lffWiRj7RNq8aRBmeH_9dfizT6-qg2kaQumWHInnAzR/exec'; 
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error fetching stories');
    }
    return response.json();
  })
  .then(jsonData => {
    data = jsonData; // Assign the fetched data to the global 'data' variable
    populateTable(); // Call populateTable after data is fetched
  })
  .catch(error => {
    console.error('Error with the fetch operation:', error);
  });

// Function to populate the table
function populateTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-categories', item.categories.join(',')); // Store categories as a comma-separated string

        const nameCell = document.createElement('td');
        // Create an <a> element
        const nameLink = document.createElement('a');
        nameLink.textContent = item.name;
        nameLink.href = item.url;  // Set the href attribute to the item's URL
        nameLink.target = "_blank"; // Optional: Opens the link in a new tab
        nameLink.classList.add("tableurl");
        nameCell.appendChild(nameLink);
        row.appendChild(nameCell);

        const categoryCell = document.createElement('td');
        item.categories.forEach(category => {
            const categorySpan = document.createElement('span');
            categorySpan.textContent = category;
            const sanitizedCategory = category.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with dashes
            categorySpan.classList.add('category-default');
            categorySpan.classList.add('category-' + sanitizedCategory);
            categorySpan.style.padding = "3px 8px"; // Add some padding for better appearance
            categorySpan.style.borderRadius = "4px"; // Round the corners
            categorySpan.style.marginRight = "4px"; // Add some margin between categories
            categoryCell.appendChild(categorySpan);
        });

        row.appendChild(categoryCell);

        const publicationCell = document.createElement('td');
        publicationCell.textContent = item.publication;
        row.appendChild(publicationCell);

        tableBody.appendChild(row);
    });
}

// Function to filter the table
function filterTable(category) {
    document.querySelectorAll('tbody tr').forEach(row => {
        const categories = row.getAttribute('data-categories').split(',');
        if (category === 'all' || categories.includes(category)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Add event listeners to tags
document.querySelectorAll('.tag').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterTable(category);
    });
});

// Populate table on page load
populateTable();


// Function to search and filter the table
function searchStories(query) {
  const lowerCaseQuery = query.toLowerCase();
  document.querySelectorAll('tbody tr').forEach(row => {
      const rowText = row.textContent.toLowerCase();
      if (rowText.includes(lowerCaseQuery)) {
          row.style.display = ''; // Show rows that match
      } else {
          row.style.display = 'none'; // Hide rows that don't match
      }
  });
}

// Add an event listener to the search bar
document.getElementById('search-bar').addEventListener('input', (event) => {
  searchStories(event.target.value);
});
