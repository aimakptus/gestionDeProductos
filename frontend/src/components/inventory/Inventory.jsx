import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";

const Inventory = ({ onProductSelect, refreshKey }) => { // Recibimos onProductSelect y refreshKey como props
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");  // Estado para la búsqueda
    const [filteredProducts, setFilteredProducts] = useState([]);  // Estado para los productos filtrados
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("authToken");

                if (!token) {
                    setError("No estás autenticado");
                    return;
                }

                const response = await axios.get("http://localhost:5000/api/products", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Enviar el token de autenticación
                    }
                });

                setProducts(response.data);
                setFilteredProducts(response.data);  // Inicializamos los productos filtrados
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Error al cargar los productos");
            }
        };

        fetchProducts();
    }, [refreshKey]); // Agregamos refreshKey como dependencia para que se ejecute cuando cambie

    // Filtrar productos en tiempo real
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProducts(products);  // Si no hay búsqueda, mostramos todos los productos
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);  // Actualizamos los productos filtrados
        }
    }, [searchTerm, products]);  // Se ejecuta cada vez que searchTerm o products cambian

    return (
        <div className="inventory">
            {error && <p className="error">{error}</p>}
            <section className="searchBar">
                <input
                    type="text"
                    name="searchBar"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}  // Actualiza el término de búsqueda en tiempo real
                />
            </section>
            <section className="table">
                <table className="tableHeader">
                    <thead>
                        <tr className="trHead">
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr 
                                key={product._id} 
                                className="trDB"
                                onClick={() => onProductSelect(product)} // Manejador de clic para seleccionar un producto
                            >
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Inventory;