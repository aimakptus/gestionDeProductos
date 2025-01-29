import React, { useState } from "react";
import "./InventoryPage.css";
import Inventory from "../inventory/Inventory";
import EditProduct from "../editProduct/EditProduct";

const InventoryPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleProductUpdated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="inventoryPage">
      <Inventory onProductSelect={handleProductSelect} refreshKey={refreshKey} />
      <EditProduct 
        selectedProduct={selectedProduct} 
        onProductUpdated={handleProductUpdated} 
      />
    </div>
  );
};

export default InventoryPage;