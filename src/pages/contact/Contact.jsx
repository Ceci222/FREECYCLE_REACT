import { useState } from 'react';
import './Contact.css';


const FORMSPREE = import.meta.env.VITE_FORMSPREE_URL;
function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(FORMSPREE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });
            if (response.ok) {
                setStatus('Mensaje enviado con éxito');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('Error al enviar el mensaje');
            }
        } catch (error) {
            setStatus('Error al enviar el mensaje');
        }
    };

    return (
        <div className="contact__wrapper">
            <h1>Contacto</h1>
            <form onSubmit={handleSubmit}>
                <input className='contact__input'
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    required 
                />
                <input className='contact__input'
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo"
                    required 
                    oninvalid="this.setCustomValidity('Por favor, introduce un correo válido')"
                    oninput="this.setCustomValidity('')"
                />
                <textarea className='contact__textarea'
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mensaje"
                    required
                />
                <button className="contact__button" type="submit">Enviar</button>
                {status && <p>{status}</p>}
            </form>
        </div>
    );
}

export default Contact;