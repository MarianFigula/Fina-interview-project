document.addEventListener('DOMContentLoaded', async () => {

    const investmentData = await getInvestments()

    const tableBody = document.querySelector('#investmentTable tbody');
    investmentData.forEach((item) => {
        const row = `
            <tr>
                <td>${item.title}</td>
                <td>${item.value} €</td>
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
        pageLength: 10,
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
                await deleteInvestment(id)
            }
        });
    });


    function openEditDialog(index, investment) {
        const dialog = document.getElementById('addInvestmentDialog');
        const titleInput = document.getElementById('title');
        const priceInput = document.getElementById('price');
        const typeSelect = document.getElementById('type');
        const submitButton = document.getElementById('submit-button');
        const totalPortfolio = updateTotalInvestment()

        dialog.querySelector('h2').textContent = 'Upraviť investíciu';
        submitButton.innerHTML = 'Aktualizovať';
        submitButton.classList.replace('btn-proceed', 'btn-edit')

        titleInput.value = investment.title;
        priceInput.value = investment.value;
        typeSelect.value = investment.type;

        console.log("ID", investment.id)

        dialog.showModal();

        submitButton.onclick = async function(event) {
            event.preventDefault();

            if (!validateForm()) {
                return;
            }

            const updatedInvestment = {
                id: investment.id,
                title: titleInput.value,
                value: priceInput.value,
                type: typeSelect.value,
                percentage: ((priceInput.value / totalPortfolio) * 100).toFixed(2)
            };

            await updateInvestment(updatedInvestment);

            dialog.close();
            location.reload();
        };
    }

});