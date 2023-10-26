document.addEventListener('DOMContentLoaded', function() {
    const numberInput = document.getElementById('numberInput');
    const getFactsButton = document.getElementById('getFacts');
    const factDiv = document.getElementById('fact');
    
    let facts = [];
    
    getFactsButton.addEventListener('click', function() {
        const number = numberInput.value;

        if (!number) {
            alert('Please enter a valid number.');
            return;
        }

        getFactAboutNumber(number)
            .then(fact => {
                facts.push(fact);
                if (facts.length < 4) {
                    getFactsButton.click(); 
                } else {
                    factDiv.textContent = 'Facts:';
                    facts.forEach((fact, index) => {
                        factDiv.innerHTML += `<p>Fact ${index + 1}: ${fact}</p>`;
                    });
                }
            })
            .catch(error => {
                factDiv.textContent = 'Error: Unable to fetch facts.';
                console.error(error);
            });
    });

    
    function getFactAboutNumber(number) {
        return fetch(`http://numbersapi.com/${number}/trivia?json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then(data => data.text)
            .catch(error => {
                throw error; 
            });
    }
});
