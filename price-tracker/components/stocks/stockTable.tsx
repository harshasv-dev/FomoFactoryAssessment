// components/StockTable.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const StockTable: React.FC = () => {
  const { selectedStock, currentStockData, historicalcurrentStockData } = useSelector((state: RootState) => state.stockPrice);

  const currentStock = currentStockData.find(data => data.stock === selectedStock);
  
  const combinedData = [
    ...(currentStock ? [currentStock] : []),
    ...historicalcurrentStockData
  ].slice(0, 20);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price (USD)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {combinedData.map((entry, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(entry.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${entry.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;