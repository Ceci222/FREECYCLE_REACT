import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./DonatedObjects.css";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5.5,
    partialVisibilityGutter: 50,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4.5,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2.5,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1.5,
    partialVisibilityGutter: 30,
  },
};

const DonatedObjects = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const route = "/object";
        const response = await fetchData(route);
        if (response.error) {
          throw new Error(response.error);
        }
        setObjects(response.data || response || []);
      } catch (error) {
        console.error("Error fetching objects:", error);
        setError("No es posible cargar los objetos donados.");
      } finally {
        setLoading(false);
      }
    };
    fetchObjects();
  }, []);

  if (loading) return <div>Cargando objetos...</div>;
  if (error) return <div>{error}</div>;
  if (objects.length === 0) {
    return (
      <div className="objects__container">
        <h1>Objetos Donados</h1>
        <p>No hay objetos donados disponibles.</p>
      </div>
    );
  }

  return (
    <div className="objects__container">
      <h1>Objetos Donados</h1>
        <Carousel
            responsive={responsive} //los q se definan en la variable
            showDots={true} //puntitos de navegación para indicar en que parte de la navegación estoy
            partialVisible={true} //para q se vea parte del elemento siguiente
            containerClass="carousel-container"
/*         itemClass="carousel-item-padding"*/      
        >
            {objects.map((object) => (
            <div key={object.object_id} className="object__card">

                <h2>{object.object_name || "Nombre no disponible"}</h2>

                <img
                src={object.object_img || "https://placehold.co/300x200/png"}
                alt={object.object_name || "Objeto"}
                className="object__img"
                />

                <p className="object__description">
                {object.object_description || "Sin descripción"}
                </p>

                <p className="object__description">
                    <span className="Object__label">Estado:</span> {object.object_state || "Sin información disponible"}
                </p>

                {object.Pickup && (
                <div className="pickup__info">
                    <p className="object__description"> 
                        <span className="Object__label">Área:</span> {object.Pickup.pickup_area || "Área no esecificada, contacte con el usuario"}
                    </p>

                    <p className="object__description">
                    <span className="Object__label">Inicio:</span>{" "}
                    {object.Pickup.pickup_start_date?.split("T")[0] || "Sin fecha de inicio"}
                    </p>

                    <p>
                    <span className="Object__label">Fin:</span> {object.Pickup.pickup_end_date?.split("T")[0] || "Sin fecha de fin"}
                    </p>
                    
                </div>
                )}
            </div>
            ))}
        </Carousel>
    </div>
  );
};

export default DonatedObjects;