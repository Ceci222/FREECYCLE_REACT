import { useState, useEffect, useContext } from 'react';
import fetchData from '../../utils/fetchData.js';
import './ObjectDetail.css';
import { AuthContext } from '../../context/AuthContext.jsx';

function ObjectDetail({ objectId, onBack, onAccept, onReject, onDelete }) {
  const { userData } = useContext(AuthContext);
  const [object, setObject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchObject() {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchData(`/object/${objectId}`, 'GET');
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
          throw new Error("Datos del objeto no válidos");
        }
        console.log("Datos del objeto:", data); // Depuración
        setObject(data);
      } catch (err) {
        console.error("Error al cargar el objeto:", err);
        setError(err.message || 'No se pudo cargar el objeto');
      } finally {
        setLoading(false);
      }
    }
    if (objectId) {
      fetchObject();
    }
  }, [objectId]);

  const handleAcceptClick = async () => {
    try {
      setError(null);
      const result = await onAccept(objectId);
      if (result.error) {
        setError(result.error);
        return;
      }
      // Actualiza el objeto después de aceptar
      const updatedObject = await fetchData(`/object/${objectId}`, 'GET');
      console.log("Objeto actualizado después de aceptar:", updatedObject); // Depuración
      setObject(updatedObject);
    } catch (err) {
      setError(err.message || 'Error inesperado al aceptar el objeto');
    }
  };

  const handleRejectClick = async () => {
    try {
      setError(null);
      const result = await onReject(objectId);
      if (result.error) {
        setError(result.error);
        return;
      }
      // Actualiza el objeto después de rechazar
      const updatedObject = await fetchData(`/object/${objectId}`, 'GET');
      console.log("Objeto actualizado después de rechazar:", updatedObject); // Depuración
      setObject(updatedObject);
    } catch (err) {
      setError(err.message || 'Error inesperado al rechazar el objeto');
    }
  };

  const handleDeleteClick = async () => {
    try {
      setError(null);
      const result = await onDelete(objectId);
      if (result.error) {
        setError(result.error);
        return;
      }
      onBack(); // Vuelve a la lista después de eliminar
    } catch (err) {
      setError(err.message || 'Error inesperado al eliminar el objeto');
    }
  };

  if (!userData) {
    return (
      <div className="object-detail">
        <p>Inicia sesión para ver los detalles del objeto.</p>
      </div>
    );
  }

  return (
    <div className="object-detail">
      {error && <div className="error-message">{error}</div>}
      

      {loading || !object ? (
        <p>Cargando...</p>
      ) : (
        <>
          <h2>{object.object_name || "Sin nombre"}</h2>
          <img
            src={object.object_img || "https://placehold.co/300x200/png"}
            alt={object.object_name}
            className="object__img"
          />
          <p className='object__description'><span> {object.object_description || 'No disponible'} </span></p>
          <p> <span>Área: </span>{object.Pickup?.pickup_area || 'No especificada'}</p>
          <p>
            <span>Disponible desde: </span>
            {object.Pickup?.pickup_start_date
              ? object.Pickup.pickup_start_date.split('T')[0].split('-').reverse().join('-')
              : 'No especificado'}
          </p>
          <p>
            <span>Hasta: </span>
            {object.Pickup?.pickup_end_date
              ? object.Pickup.pickup_end_date.split('T')[0].split('-').reverse().join('-')
              : 'No especificado'}
          </p>

          {/* Acciones según el rol del usuario */}
          {userData.user_id === object.object_donor_id ? (
            <button className="object__button" onClick={handleDeleteClick}>Eliminar</button>
          ) : userData.user_id === object.object_recipient_id ? (
            <button className="object__button" onClick={handleRejectClick}>Rechazar</button>
          ) : object.object_recipient_id === null && object.object_state === 'Disponible' ? (
            <button className="object__button" onClick={handleAcceptClick}>Aceptar</button>
          ) : (
            <p className='object__state'> {object.object_state === 'Reservado' ? 'Reservado' : 'Disponible'}</p>
          )}

          <a className="object__back" onClick={onBack}>Volver a la lista</a>
        </>
      )}
    </div>
  );
}

export default ObjectDetail;