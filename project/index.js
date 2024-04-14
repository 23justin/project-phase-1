

// THIS CODE ABOVE IS AN UPADATE PROVIDED BY CHATGPT FROM MY ORIGINAL CODE





document.addEventListener("DOMContentLoaded", () => {
  const countryListElement = document.getElementById('country-list');
  const errorMessageElement = document.getElementById('error-message');

  // Function to fetch and display country information
  function fetchAndDisplayAllCountries() {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch country information');
        }
        return response.json();
      })
      .then(data => {
        // Display countries
        displayCountries(data);
        errorMessageElement.style.display = 'none';
      })
      .catch(error => {
        console.error('Error:', error);
        errorMessageElement.innerText = error.message;
        errorMessageElement.style.display = 'block'; // Display error message
      });
  }

  // Function to display countries
  function displayCountries(countries) {
    countryListElement.innerHTML = ''; // Clear previous results
    countries.forEach(country => {
      const population = country.population ? country.population.toLocaleString() : 'N/A';
      const capital = country.capital ? country.capital : 'N/A';
      const majorCities = country.cities ? country.cities.slice(0, 3).join(', ') : 'N/A'; // Display up to 3 major cities
      const languages = country.languages ? Object.keys(country.languages).join(', ') : 'N/A';

      const countryInfoHTML = `
        <div>
          <h2>${country.name.common}</h2>
          <p><strong>Population:</strong> ${population}</p>
          <p><strong>Capital City:</strong> ${capital}</p>
          <p><strong>Other Major Cities:</strong> ${majorCities}</p>
          <p><strong>Major Language(s) Spoken:</strong> ${languages}</p>
        </div>
      `;
      countryListElement.innerHTML += countryInfoHTML;
    });
  }

  // Fetch and display information for all countries
  fetchAndDisplayAllCountries();

  // Event listener for the filter button
  document.getElementById('filter-button').addEventListener('click', () => {
    const filterValue = document.getElementById('country-filter').value.trim().toLowerCase();
    const countryElements = countryListElement.querySelectorAll('div');

    countryElements.forEach(element => {
      const countryName = element.querySelector('h2').textContent.toLowerCase();
      if (countryName.includes(filterValue)) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  });

  // Event listener for the reset button
  document.getElementById('reset-button').addEventListener('click', () => {
    const countryElements = countryListElement.querySelectorAll('div');
    countryElements.forEach(element => {
      element.style.display = 'block';
    });
    document.getElementById('country-filter').value = ''; // Reset filter input
  });

  // Event listener for the sort button
  document.getElementById('sort-button').addEventListener('click', () => {
    const countryElements = Array.from(countryListElement.querySelectorAll('div'));
    const sortedCountries = countryElements.sort((a, b) => {
      const countryA = a.querySelector('h2').textContent.toLowerCase();
      const countryB = b.querySelector('h2').textContent.toLowerCase();
      return countryA.localeCompare(countryB);
    });
    countryListElement.innerHTML = ''; // Clear country list
    sortedCountries.forEach(element => {
      countryListElement.appendChild(element); // Append sorted countries to country list
    });
  });
});
