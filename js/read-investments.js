const getInvestments = async () => {
    let investmentData = JSON.parse(localStorage.getItem('investments'));

    if (!investmentData || investmentData.length === 0) {
        try {
            const response = await fetch('/api/read.php');

            if (!response.ok) console.log("Server side error")

            investmentData = await response.json();
            localStorage.setItem('investments', JSON.stringify(investmentData));
        } catch (error) {
            console.error('Error fetching investments:', error);
        }
    }

    return investmentData;
};