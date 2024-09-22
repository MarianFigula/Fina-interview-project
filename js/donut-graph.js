document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the investment data from localStorage
    const storedInvestments = JSON.parse(localStorage.getItem('investments'));

    // Extract the labels and percentages
    const labels = storedInvestments.map(investment => investment.title);
    const percentages = storedInvestments.map(investment => investment.percentage);

    const ctx = document.getElementById('investmentDonutChart').getContext('2d');

    const investmentData = {
        labels: labels,  // Use labels from localStorage
        datasets: [{
            label: 'Investment Portfolio',
            data: percentages,  // Use percentages from localStorage
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'doughnut',
        data: investmentData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    fullSize: true
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    };

    const investmentDonutChart = new Chart(ctx, config);
});