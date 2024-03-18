const axios = require('axios');

async function createInvestmentAccount(name, email, rollNumber, phone) {
    try {
        const response = await axios.post('https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/createAccount', {
            name: name,
            email: email,
            rollNumber: rollNumber,
            phone: phone
        });
        if (response.status === 200) {
            const accountNumber = response.data.accountNumber;
            console.log('Investment account created successfully. Account Number:', accountNumber);
            return accountNumber;
        } else {
            console.log('Failed to create investment account. Status code:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error creating investment account:', error.message);
        return null;
    }
}


function getCurrentStockPrice() {
    
    return 5000; 
}


async function buyStocks(company, currentPrice, accountNumber, githubRepoLink, rollNumber) {
    try {
        const response = await axios.post('https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/buyStocks', {
            company: company,
            currentPrice: currentPrice,
            accountNumber: accountNumber,
            githubRepoLink: githubRepoLink
        }, {
            headers: {
                'Content-Type': 'application/json',
                'bfhl-auth': rollNumber
            }
        });
        if (response.status === 200) {
            console.log('Stocks purchased successfully.');
        } else {
            console.log('Failed to purchase stocks. Status code:', response.status);
        }
    } catch (error) {
        console.error('Error buying stocks:', error.message);
    }
}

async function main() {
    
    const name = 'Akanksha';
    const email = 'akansha1015.be21@chitkarauniversity.edu.in';
    const rollNumber = '2111981015'; // Your roll number
    const phone = '7876662089'; // Your phone number
    const company = 'Bajaj Finserv';
    const githubRepoLink = 'https://github.com/akankshathakur15/bajaj-stock-app.git';

  
    const accountNumber = await createInvestmentAccount(name, email, rollNumber, phone);
    if (!accountNumber) return;

   
    const currentPrice = getCurrentStockPrice();

   
    await buyStocks(company, currentPrice, accountNumber, githubRepoLink, rollNumber);
}

main();
