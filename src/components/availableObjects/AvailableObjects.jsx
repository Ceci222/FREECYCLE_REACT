import { useContext, useState, useEffect } from "react";
import fetchData from "../../utils/fetchData.js";
import { AuthContext } from '../../context/AuthContext';
import ObjectDetail from '../objectDetail/ObjectDetail';
import "./AvailableObjects.css";

const AvailableObjects = () => {
  const { userData } = useContext(AuthContext);
  const [availableObjects, setAvailableObjects] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableObjects = async () => {
      try {
        setLoading(true);
        const response = await fetchData("/object/available");
        // Maneja respuestas inesperadas
        const data = Array.isArray(response) ? response : response.data || [];
        if (!Array.isArray(data)) {
          throw new Error("La respuesta del servidor no es una lista de objetos");
        }
        const filtered = data.filter(obj => obj.object_state === 'Disponible');
        setAvailableObjects(filtered);
      } catch (err) {
        console.error("Error al cargar objetos:", err);
        setError(err.message || "Error al cargar objetos.");
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableObjects();
  }, []);

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleAccept = async (objectId) => {
    try {
      const response = await fetchData(`/object/${objectId}/accept`, 'POST', {
        user_id: userData.user_id,
      });
      if (response.error) {
        return { error: response.error };
      }
      // Actualiza la lista de objetos disponibles
      setAvailableObjects(prev =>
        prev.map(obj =>
          obj.object_id === objectId ? { ...obj, object_state: 'Reservado', object_recipient_id: userData.user_id } : obj
        )
      );
      return { success: true };
    } catch (err) {
      return { error: err.message || "No se pudo aceptar el objeto" };
    }
  };

  const handleReject = async (objectId) => {
    try {
      const response = await fetchData(`/object/${objectId}/reject`, 'POST', {
        user_id: userData.user_id,
      });
      if (response.error) {
        return { error: response.error };
      }
      // Actualiza la lista de objetos disponibles
      setAvailableObjects(prev =>
        prev.map(obj =>
          obj.object_id === objectId ? { ...obj, object_state: 'Disponible', object_recipient_id: null } : obj
        )
      );
      return { success: true };
    } catch (err) {
      return { error: err.message || "No se pudo rechazar el objeto" };
    }
  };

  const handleDelete = async (objectId) => {
    try {
      const response = await fetchData(`/object/${objectId}`, 'DELETE', {
        user_id: userData.user_id,
      });
      if (response.error) {
        return { error: response.error };
      }
      // Elimina el objeto de la lista
      setAvailableObjects(prev => prev.filter(obj => obj.object_id !== objectId));
      return { success: true };
    } catch (err) {
      return { error: err.message || "No se pudo eliminar el objeto" };
    }
  };

  const handleBack = () => setSelectedObjectId(null);

  if (!userData) return <p className="Feedback_message">Debes iniciar sesión.</p>;
  if (loading) return <div className="loading">Cargando objetos...</div>;
  if (error) return <div className="error">{error}</div>;

  const objectsToShow = showOnlyFavorites
    ? availableObjects.filter(obj => favorites.includes(obj.object_id))
    : availableObjects;

  if (selectedObjectId) {
    return (
      <ObjectDetail
        objectId={selectedObjectId}
        onBack={handleBack}
        onAccept={handleAccept}
        onReject={handleReject}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <div className="available-objects-wrapper">
      <h1>{showOnlyFavorites ? "Mis Favoritos" : "Objetos Disponibles"}</h1>
      <button
        className="favorites-toggle-btn"
        onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
      >
        {showOnlyFavorites ? "🔙 Ver todos" : "❤️ Ver favoritos"}
      </button>

      {objectsToShow.length === 0 ? (
        <p>No hay objetos para mostrar.</p>
      ) : (
        <div className="available-objects-grid">
          {objectsToShow.map(obj => (
            <div key={obj.object_id} className="object-card">
              <h2>{obj.object_name || "Sin nombre"}</h2>
              <img
                src={obj.object_img || "https://via.placeholder.com/300x200"}
                alt={obj.object_name}
                className="object-img"
              />
              <p className="object-description">{obj.object_description || "Sin descripción"}</p>
              <p className="object-description">{obj.Pickup?.pickup_area || "Sin información disponible"}</p>
              <button
                className={`favorite-button ${favorites.includes(obj.object_id) ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(obj.object_id)}
              >
                {favorites.includes(obj.object_id) ? '❤️' : '🤍'}
              </button>
              <a
                href="#"
                className="view-more-link"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedObjectId(obj.object_id);
                }}
              >
                Ver más...
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableObjects;