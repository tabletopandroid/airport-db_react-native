import { Airport } from '../types/airport';

const apiUrl = 'https://airportsapi.com/api';

const getAirportByName = async (name: string) =>
  fetchApi(`${apiUrl}/airports?filter%5Bname%5D=${encodeURIComponent(name)}`);

const getAirportByCode = async (code: string) => {
  const airportData = await fetchApi(`${apiUrl}/airports/${code}`);
  return airportData.data as Airport;
};

const getAirportListByCode = async (codes: string[]) => {
  const airportList = await Promise.all(
    codes.map(code => getAirportByCode(code)),
  );
  return airportList;
};

// shared API method
const fetchApi = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching airport data:', error);
    throw error;
  }
};

export { getAirportByName, getAirportByCode, getAirportListByCode };
