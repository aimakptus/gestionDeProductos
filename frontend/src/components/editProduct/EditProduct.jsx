import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Importar toast para las notificaciones
import "./EditProduct.css";

const EditProduct = ({ selectedProduct, onProductUpdated }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  // Sincronizar el estado con el producto seleccionado
  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        name: selectedProduct.name,
        description: selectedProduct.description,
        category: selectedProduct.category,
        price: selectedProduct.price.toString(),
        stock: selectedProduct.stock.toString(),
      });
    } else {
      setProduct({ name: "", description: "", category: "", price: "", stock: "" });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    // Validar que todos los campos estén completos
    if (
      !product.name ||
      !product.description ||
      !product.category ||
      !product.price ||
      !product.stock
    ) {
      toast.error("Please fill all the fields"); // Mostrar error si hay campos vacíos
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You are not authenticated.");
        return;
      }

      // Crear el producto directamente
      const responseCreate = await axios.post(
        "http://localhost:5000/api/products",
        product,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Successfully created product.");
      setProduct({ name: "", description: "", category: "", price: "", stock: "" }); // Limpiar formulario
      onProductUpdated(); // Actualizar la lista de productos
    } catch (error) {
      // Verifica si el error es por producto ya existente
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Product already exist."
      ) {
        toast.error("Product already exists"); // Mostrar error específico
      } else {
        console.error("Error creating the product:", error);
        toast.error("There was a problem creating the product");
      }
    }
  };

  const handleUpdate = async () => {
    if (!selectedProduct) {
      toast.error("No product selected");
      return;
    }

    // Validar que todos los campos estén completos
    if (
      !product.name ||
      !product.description ||
      !product.category ||
      !product.price ||
      !product.stock
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You are not authenticated.");
        return;
      }

      // Actualizar el producto
      const updatedProduct = {
        ...product,
        price: parseFloat(product.price), // Convertir a número
        stock: parseInt(product.stock, 10), // Convertir a número
      };

      await axios.put(
        `http://localhost:5000/api/products/${selectedProduct._id}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Successfully updated product.");
      onProductUpdated(); // Actualizar la lista de productos
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("There was a problem updating the product.");
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) {
      toast.error("No product selected");
      return;
    }

    // Confirmar eliminación
    if (!window.confirm("Are you sure you want to remove this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You are not authenticated.");
        return;
      }

      // Eliminar el producto
      await axios.delete(
        `http://localhost:5000/api/products/${selectedProduct._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Porduct deleted");
      setProduct({ name: "", description: "", category: "", price: "", stock: "" }); // Limpiar formulario
      onProductUpdated(); // Actualizar la lista de productos
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("There was a problem deleting the product.");
    }
  };

  return (
    <div className="editProductFull">
      <section className="editProduct">
        <form className="infoProductMain">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={product.name}
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Product description"
            rows={6}
            value={product.description}
            onChange={handleChange}
          ></textarea>
        </form>

        <form className="infoProductExtra">
          <div>
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Product category"
              value={product.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Product price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Product stock"
              value={product.stock}
              onChange={handleChange}
            />
          </div>
        </form>
      </section>

      <section className="updateDelete">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </section>
    </div>
  );
};

export default EditProduct;