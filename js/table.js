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
                    <button class="btn-edit edit" data-index="${item.id}">Edit</button>
                </td>
                <td>
                    <button class="btn-delete delete" data-index="${item.id}">Delete</button>
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

    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            openEditDialog(index, investmentData[index - 1]); // Pass the investment object
        });
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            alert('Delete investment at index: ' + index);
        });
    });
});


function openEditDialog(index, investment) {
    const dialog = document.getElementById('addInvestmentDialog');
    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');
    const typeSelect = document.getElementById('type');
    const submitButton = document.querySelector('.btn-proceed');

    // Update dialog content
    dialog.querySelector('h2').textContent = 'Upraviť investíciu';
    submitButton.innerHTML = 'Aktualizovať';
    submitButton.classList.replace('btn-proceed', 'btn-edit')

    // Populate fields with the current investment data
    titleInput.value = investment.title;
    priceInput.value = investment.value;
    typeSelect.value = investment.type;

    dialog.showModal();

    submitButton.onclick = function() {
        // Update investment data logic here
        investment.title = titleInput.value;
        investment.value = priceInput.value;
        investment.type = typeSelect.value;

        // Save updated investment back to local storage
        saveInvestments(investmentData);

        dialog.close();
        location.reload(); // Reload the page to refresh the table
    };
}

// Function to save investments to local storage
function saveInvestments(investments) {
    localStorage.setItem('investments', JSON.stringify(investments));
}