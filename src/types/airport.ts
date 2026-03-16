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
  relationships: {
    country: {
      data: {
        type: string;
        id: string;
      };
    };
    region: {
      data: {
        type: string;
        id: string;
      };
    };
  };
  links: {
    self: {
      href: string;
      rel: string;
      describedby: string;
      title: string;
      type: string;
      hreflang: string;
      meta: {};
    };
  };
};
