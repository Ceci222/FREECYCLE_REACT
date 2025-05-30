import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer__wrapper">

      <ul className="footer__social__media">

        <li className='social__media'> <FontAwesomeIcon icon={faFacebookF} />  </li>
        <li className='social__media'> <FontAwesomeIcon icon={faInstagram} />  </li>
        <li className='social__media'> <FontAwesomeIcon icon={faXTwitter} /> </li>

      </ul>
      
    </div>
  );
}

export default Footer;
