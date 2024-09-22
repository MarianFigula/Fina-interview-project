document.addEventListener('DOMContentLoaded', () => {
    // Your data from localStorage or elsewhere
    const localStorageData = localStorage.getItem('investments');
    let investmentData = [];

    if (localStorageData) {
        investmentData = JSON.parse(localStorageData);
    }

    // Populate the table dynamically with investment data
    const tableBody = document.querySelector('#investmentTable tbody');
    investmentData.forEach((item) => {
        const row = `
            <tr>
                <td>${item.title}</td>
                <td>${item.value}</td>
                <td>${item.percentage}%</td>
                <td>${item.type}</td>
                <td>
                    <button class="edit-btn" data-index="${item.id}">Edit</button>
                </td>
                <td>
                    <button class="delete-btn" data-index="${item.id}">Delete</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Initialize DataTables with the new columns for Edit and Delete buttons
    new DataTable('#investmentTable', {
        paging: true,
        pageLength: 5,
        lengthMenu: [5, 10, 25],
        ordering: true,
        order: [[1, 'desc']],
        searching: true,
        responsive: true,
        columnDefs: [
            { targets: [1, 2, 3, 4, 5], className: 'dt-center' },
            { targets: [4, 5], orderable: false }  // Make the last two columns (Edit/Delete) non-orderable
        ],
    });

    // Event listeners for Edit and Delete buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            // Implement your edit functionality here
            alert('Edit investment at index: ' + index);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            // Implement your delete functionality here
            alert('Delete investment at index: ' + index);
        });
    });
});
