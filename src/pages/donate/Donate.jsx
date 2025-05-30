import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import fetchData from '../../utils/fetchData.js';
import './Donate.css';

function Donate() {
  const [form, setForm] = useState({
    object_name: '',
    object_description: '',
    pickup_area: '',
    pickup_start_date: '',
    pickup_end_date: '',
    object_img: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [cloudinaryConfig, setCloudinaryConfig] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { userData } = useContext(AuthContext);
  const inputFileRef = useRef(null);

  useEffect(() => {
    async function fetchCloudinaryConfig() {
      try {
        const data = await fetchData('/cloudinary/config', 'GET');
        setCloudinaryConfig(data);
      } catch {
        setError('Error al cargar configuración');
      }
    }
    fetchCloudinaryConfig();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'object_img') {
      setImageFile(null);
      setImagePreview(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setForm((prev) => ({ ...prev, object_img: '' }));
      setImagePreview(URL.createObjectURL(file));
    }
  };       

  const uploadImageToCloudinary = async () => {
    if (!cloudinaryConfig || !imageFile) return null;

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', cloudinaryConfig.upload_preset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      return data.secure_url;
    } catch {
      setError('Error al subir la imagen');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { object_name, object_description, pickup_area, pickup_start_date, pickup_end_date, object_img } = form;

    if (!object_name || !object_description || !pickup_area || !pickup_start_date || !pickup_end_date) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!userData) {
      setError('Debes iniciar sesión para donar');
      return;
    }

    let finalImageUrl = object_img;

    if (imageFile) {
      const uploadedUrl = await uploadImageToCloudinary();
      if (!uploadedUrl) return;
      finalImageUrl = uploadedUrl;
    }

    try {
      const result = await fetchData('/object', 'POST', {
        object_name,
        object_description,
        pickup_area,
        pickup_start_date,
        pickup_end_date,
        object_img: finalImageUrl,
        object_donor_id: userData.user_id,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('¡Objeto donado con éxito!');
        setForm({
          object_name: '',
          object_description: '',
          pickup_area: '',
          pickup_start_date: '',
          pickup_end_date: '',
          object_img: '',
        });
        setImageFile(null);
        setImagePreview('');
        if (inputFileRef.current) inputFileRef.current.value = '';
      }
    } catch (err) {
      setError('Error al donar: ' + err.message);
    }
  };

  return (
    <div className="donate-wrapper">
      <h1>Donar un Objeto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="object_name"
          value={form.object_name}
          onChange={handleInputChange}
          placeholder="Nombre del objeto"
          required
        />
        <textarea
          name="object_description"
          value={form.object_description}
          onChange={handleInputChange}
          placeholder="Descripción"
          required
        />
        <input
          type="text"
          name="pickup_area"
          value={form.pickup_area}
          onChange={handleInputChange}
          placeholder="Área de recogida"
          required
        />
        <input
          type="date"
          name="pickup_start_date"
          value={form.pickup_start_date}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="pickup_end_date"
          value={form.pickup_end_date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="object_img"
          value={form.object_img}
          onChange={handleInputChange}
          placeholder="URL de imagen (opcional)"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={inputFileRef}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Vista previa no disponible"
            className="preview-img"
          />
        )}
        <button type="submit">Donar</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default Donate;
