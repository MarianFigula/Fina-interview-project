document.addEventListener('DOMContentLoaded', () => {

    const investmentData = getInvestments()

    const tableBody = document.querySelector('#investmentTable tbody');
    investmentData.forEach((item) => {
        const row = `
            <tr>
                <td>${item.title}</td>
                <td>${item.value}</td>
                <td>${item.percentage}%</td>
                <td>${item.type}</td>
                <td>
                    <button class="edit-btn edit" data-index="${item.id}">Edit</button>
                </td>
                <td>
                    <button class="delete-btn delete" data-index="${item.id}">Delete</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

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
            { targets: [4, 5], orderable: false }
        ],
    });

    // Event listeners for Edit and Delete buttons
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            // Implement your edit functionality here
            alert('Edit investment at index: ' + index);
        });
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            alert('Delete investment at index: ' + index);
        });
    });
});
