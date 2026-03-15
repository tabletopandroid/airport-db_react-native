export type Airport = {
  id: string;
  type: string;
  attributes: {
    name: string;
    code: string;
    type: string;
    latitude: string;
    longitude: string;
    elevation: number;
    gps_code: string;
    icao_code: string;
    iata_code: string;
    local_code: string;
  };
};
