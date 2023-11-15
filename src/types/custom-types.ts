export interface GooglePlace {
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: Array<string>;
  }>;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
  html_attributions: Array<string>;
}
