import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiData = () => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('https://launchersmart.com/api/PLX/PHP/get_review_ads.php', {
            auth: {
              username: 'buy&sell_express',
              password: 'D3xS2#%1!@24fag3@$^3D',
            },
          });
          setApiData(response.data._get_results);
        } catch (error) {
          setError('Error fetching API data');
          console.error('Error fetching API:', error);
        } finally {
          setIsLoading(false);
        }
      };
      

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h1>API Data</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {apiData.length === 0 ? (
            <p>No data available</p>
          ) : (
            apiData.map(item => (
              <li key={item.id}>
                <p>ID: {item.id}</p>
                <p>Title: {item.ad_title}</p>
                <p>Description: {item.ad_desc}</p>
                <p>Price: {item.price}</p>
                {/* Add more fields as needed */}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ApiData;


