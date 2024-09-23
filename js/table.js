document.addEventListener('DOMContentLoaded', async () => {

    const investmentData = await getInvestments()

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
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-index');
            if (confirm('Are you sure you want to delete this investment?')) {
                try {
                    const response = await fetch('/php/api/investment/delete.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id }),
                    });

                    if (!response.ok) console.log("Server side error")
                    const result = await response.json();

                    if (!result.success) {
                        alert('Error deleting investment: ' + result.message);
                        return
                    }

                    alert('Investment deleted successfully');
                    localStorage.setItem('investments', JSON.stringify(result.investments));
                    location.reload();
                } catch (error) {
                    console.error('Error:', error);
                }
            }
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

        titleInput.value = investment.title;
        priceInput.value = investment.value;
        typeSelect.value = investment.type;

        dialog.showModal();

        // TODO: treba aj idecko a je to upate cize najst ten predosly a vymenit
        //  mu data podla idecka ale to skor asi na backende az


        submitButton.onclick = function() {
            validateForm()
            investment.title = titleInput.value;
            investment.value = priceInput.value;
            investment.type = typeSelect.value;

            saveInvestments(investmentData);

            dialog.close();
            location.reload();
        };
    }

    function saveInvestments(investments) {
        // poslat na backend
    }
});
