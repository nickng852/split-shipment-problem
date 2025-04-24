import { continentMap, proximityMap } from "../constants/continentMap";
import {
  Continent,
  Country,
  Item,
  Warehouse,
  Shipment,
  CustomerOrder,
} from "../types";

const getContinent = (country: Country): Continent => continentMap[country];

// Helper to get list of order items with quantity
const getOrderList = (items: Item[]): Map<Item, number> => {
  const counts = new Map<Item, number>();
  items.forEach((item: Item) => {
    counts.set(item, (counts.get(item) || 0) + 1);
  });
  return counts;
};

// Helper to get continent proximity score (lower is better)
const getContinentProximity = (from: Continent, to: Continent): number => {
  return proximityMap[from][to];
};

// Helper to assign items from a warehouse
const assignItemsFromWarehouse = (
  warehouse: Warehouse,
  item: Item,
  count: number,
  assignedItems: Map<Warehouse, Item[]>
): number => {
  // Get available items and calculate how many we can take
  const availableItems = warehouse.items.filter((i) => i === item);
  const itemsToTake = Math.min(count, availableItems.length);

  // No available items
  if (itemsToTake === 0) return count;

  // Initialize warehouse array if needed
  if (!assignedItems.has(warehouse)) {
    assignedItems.set(warehouse, []);
  }

  for (let i = 0; i < itemsToTake; i++) {
    // Add item to assigned items
    assignedItems.get(warehouse)?.push(item);

    // Remove item from warehouse
    const index = warehouse.items.indexOf(item);
    if (index !== -1) {
      warehouse.items.splice(index, 1);
    }
  }

  return count - itemsToTake;
};

export const assignShipments = (
  order: CustomerOrder,
  warehouses: Warehouse[]
): Shipment[] => {
  const shipments: Shipment[] = [];
  const destinationContinent = getContinent(order.destination);
  const orderList = getOrderList(order.items);

  // Sort warehouses by proximity to destination continent
  const sortedWarehouses = [...warehouses].sort(
    (a, b) =>
      getContinentProximity(destinationContinent, a.continent) -
      getContinentProximity(destinationContinent, b.continent)
  );

  // Map of warehouse to items assigned
  const assignedItems = new Map<Warehouse, Item[]>();

  for (const [item, count] of orderList) {
    let remainingCount = count;
    for (const warehouse of sortedWarehouses) {
      if (remainingCount <= 0) break;
      remainingCount = assignItemsFromWarehouse(
        warehouse,
        item,
        remainingCount,
        assignedItems
      );
    }
  }

  // Create shipments
  assignedItems.forEach((pickFromWarehouse, warehouse) => {
    shipments.push({ fromWarehouse: warehouse, items: [...pickFromWarehouse] });
  });

  // Return an array of shipment object
  return shipments;
};
