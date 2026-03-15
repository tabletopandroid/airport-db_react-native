const apiUrl = 'https://airportsapi.com/api';

const getAirportByName = async (name: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/airports?filter%5Bname%5D=${encodeURIComponent(name)}`,
    );
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

export { getAirportByName };
