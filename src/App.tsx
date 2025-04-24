import { useState } from "react";

import { warehouses, testOrders } from "./data/testData";
import { assignShipments } from "./logic/assignShipments";
import { CustomerOrder, Warehouse } from "./types/index";

interface WarehouseCardProps {
  warehouse: Warehouse;
}

interface OrderCardProps {
  index: number;
  order: CustomerOrder;
  onClick: () => void;
}

const WarehouseCard = ({ warehouse }: WarehouseCardProps) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-medium mb-4">{`Warehouse ${warehouse.name}`}</h2>

    <div className="space-y-1">
      <p className="text-gray-700">Continent: {warehouse.continent}</p>

      <div className="flex items-center">
        <p className="text-gray-700">Inventory:&nbsp;</p>

        <div className="flex space-x-2 flex-wrap">
          {warehouse.items.map((item, index) => (
            <span key={index} className="text-xl">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const OrderCard = ({ index, order, onClick }: OrderCardProps) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-medium mb-4">Customer Order {index + 1}</h2>

    <div className="space-y-1">
      <p className="text-gray-700">Destination: {order.destination}</p>

      <div className="flex items-center">
        <p className="text-gray-700">Items:&nbsp;</p>

        <div className="flex space-x-2 flex-wrap">
          {order.items.map((item, index) => (
            <span key={index} className="text-xl">
              {item}
            </span>
          ))}
        </div>
      </div>

      <p className="text-gray-700">Note: {order.note}</p>

      {order.shipments.length > 0 && (
        <div className="mt-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    #
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    From
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Items
                  </th>
                </tr>
              </thead>

              <tbody>
                {order.shipments.map((shipment, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2 text-gray-700">{index + 1}</td>

                    <td className="px-4 py-2 text-gray-700">
                      {shipment.fromWarehouse.name}
                    </td>

                    <td className="px-4 py-2">
                      <div className="flex space-x-2 flex-wrap">
                        {shipment.items.map((item, itemIndex) => (
                          <span key={itemIndex} className="text-xl">
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
        onClick={onClick}
      >
        Run Program
      </button>
    </div>
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h1 className="text-3xl font-medium mb-6">{title}</h1>

    <div className="space-y-6">{children}</div>
  </section>
);

const App = () => {
  const [orders, setOrders] = useState<CustomerOrder[]>(testOrders);

  const handleClick = (index: number) => {
    setOrders(
      orders.map((order, i) =>
        i === index
          ? { ...order, shipments: assignShipments(order, warehouses) }
          : order
      )
    );
  };

  return (
    <main className="p-8 grid grid-cols-2 gap-8">
      <Section title="Warehouses">
        {warehouses.map((warehouse, index) => (
          <WarehouseCard key={index} warehouse={warehouse} />
        ))}
      </Section>

      <Section title="Orders">
        {orders.map((order, index) => (
          <OrderCard
            key={index}
            index={index}
            order={order}
            onClick={() => handleClick(index)}
          />
        ))}
      </Section>
    </main>
  );
};

export default App;
