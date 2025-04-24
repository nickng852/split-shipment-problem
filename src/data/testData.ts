import type { Warehouse, CustomerOrder } from "../types";

export const warehouses: Warehouse[] = [
  {
    name: "HK",
    continent: "Asia",
    items: ["🍎", "🍎", "🍐"],
  },
  {
    name: "JP",
    continent: "Asia",
    items: ["🍇"],
  },
  {
    name: "US",
    continent: "North America",
    items: ["🍇", "🍎", "🍐"],
  },
];

export const testOrders: CustomerOrder[] = [
  // Below are the test orders provided
  {
    destination: "HK",
    items: ["🍎", "🍎"],
    shipments: [],
    note: "Expect 1 shipment from HK, because all requested items are available in HK.",
  },
  {
    destination: "CN",
    items: ["🍇"],
    shipments: [],
    note: "Expect 1 shipment from JP, because it is the closest warehouse compare to US. (In the same continent.)",
  },
  {
    destination: "HK",
    items: ["🍇", "🍎"],
    shipments: [],
    note: "Expect 1 shipment from HK and 1 shipment from JP, although all requested items are available in US, the shipping cost will be higher than splitting orders from HK and JP.",
  },
  // End of test orders provided
  {
    destination: "BR",
    items: ["🍐", "🍐", "🍐"],
    shipments: [],
    note: "Expect 1 shipment from US and 1 shipment from HK to fulfill the order.",
  },
  {
    destination: "ZA",
    items: ["🍎", "🍇", "🍐"],
    shipments: [],
    note: "Expect 1 shipment from HK and 1 shipment from JP to fulfill the order.",
  },
  // Same continent with all order items available in one warehouse
  {
    destination: "CA",
    items: ["🍇", "🍎"],
    shipments: [],
    note: "Expect 1 shipment from US, because it's the warehouse in same continent with both items.",
  },
  // Different continent with all order items available in one warehouse
  {
    destination: "DE",
    items: ["🍎", "🍐"],
    shipments: [],
    note: "Expect 1 shipment from HK, because it's the closest warehouse with both items.",
  },
  // Edge case: Order with items that don't exist in any warehouse
  {
    destination: "IT",
    items: ["🍊", "🍊", "🍎"],
    shipments: [],
    note: "Expect 1 shipment from HK as it's the closest warehouse with the item.",
  },
  // Edge case: Order quantity exceeds total warehouse capacity (only 3 apples available across all warehouses)
  {
    destination: "MX",
    items: ["🍎", "🍎", "🍎", "🍎", "🍎", "🍎"],
    shipments: [],
    note: "Expect 1 shipment from HK and 1 shipment from US to fulfill the order.",
  },
];
