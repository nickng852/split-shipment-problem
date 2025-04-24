// Type definitions

export type Continent =
  | "Asia"
  | "Africa"
  | "North America"
  | "South America"
  | "Antarctica"
  | "Europe"
  | "Oceania";

export type Country = // alpha-2 code

    | "HK"
    | "US"
    | "DE"
    | "IN"
    | "BR"
    | "CA"
    | "CN"
    | "FR"
    | "JP"
    | "MX"
    | "RU"
    | "ZA"
    | "NG"
    | "AR"
    | "ES"
    | "IT";

export type Item = string; // fruit emoji

export interface Warehouse {
  name: Country;
  continent: Continent;
  items: Item[];
}

export interface Shipment {
  fromWarehouse: Warehouse;
  items: Item[];
}

export interface CustomerOrder {
  destination: Country;
  items: Item[];
  shipments: Shipment[];
  note: string;
}
