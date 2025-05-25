import { useContext, useState, useEffect } from "react";
import fetchData from "../../utils/fetchData.js";
import "./AvailableObjects.css";    
import { AuthContext } from '../../context/AuthContext';
const AvailableObjects = () => {

/*     const { user } = useContext(AuthContext);

    if (!user) {
        return <p className="Feedback_message">Debes iniciar sesión para ver los objetos disponibles.</p>;
    } */
    
    const [availableObjects, setAvailableObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAvailableObjects = async () => {
            try {
                const route = "/object/available";
                const response = await fetchData(route);
                if (response.error) {
                    throw new Error(response.error);
                }
                console.log("Objetos recibidos:", response);

                setAvailableObjects(response || []);
            } catch (error) {
                console.error("Error al recibir los objetos:", error);
                setError("No es posible cargar los objetos disponibles.");
            } finally {
                setLoading(false);
            }
        };
        fetchAvailableObjects();
    }, []);

    if (loading) return <div>Cargando objetos...</div>;
    if (error) return <div>{error}</div>;
    if (availableObjects.length === 0) {
        return (
        <div className="objects-container">
            <h1>Objetos Donados</h1>
            <p>No hay objetos donados disponibles.</p>
        </div>
        );
    }

    return (
        <div className="available__objects__wrapper">
        <h1>Objetos Disponibles</h1>
        <div className="available__objects__grid">
            {availableObjects.map((object) => (
            <div key={object.object_id} className="object__card">
                <h2>{object.object_name || "Sin nombre"}</h2>
                <img
                src={object.object_img || "https://placehold.co/300x200/png"}
                alt={object.object_name}
                className="object__img"
                />
                <p className="object__description">
                {object.object_description || "Sin descripción"}
                </p>
                <p className="object__description">
                <span className="object__label">Estado:</span>{" "}
                {object.object_state}
                </p>
                {object.Pickup && (
                <div className="pickup__info">
                    <p>
                    <span className="object__label">Área:</span>{" "}
                    {object.Pickup.pickup_area}
                    </p>
                    <p>
                    <span className="object__label">Inicio:</span>{" "}
                    {object.Pickup.pickup_start_date}
                    </p>
                    <p>
                    <span className="object__label">Fin:</span>{" "}
                    {object.Pickup.pickup_end_date}
                    </p>
                </div>
                )}
            </div>
            ))}
        </div>
        </div>
  );
}

export default AvailableObjects;