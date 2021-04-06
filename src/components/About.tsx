import './About.css';
import { Plugins } from '@capacitor/core';
const { Geolocation, Device } = Plugins;

const About: React.FC = () => {
  return (
    <div className="container">
      <strong></strong>
      <div className='center text'>
      <h3>About</h3>
      <p>Passwordy is password generating application. This applications creates <strong>uniqely tailored</strong> passwords based on you as a person in this specific moment in time.</p><br/>
      <h3>Generation</h3>
      <p>Passwords are generated in the following manner. We extract all sorts of data about you exactly such as your exact coordinates, and very device specific info. This information can be seen on generation page. This infromation is used as a seed for our top end enctyption creation. We take each letter form those strings as a character which can be converted to integer value. That integer value is added or devided or subtracted or multiplied or executed via modulus operand on total. This total is then devided by 100 until we get a number under a 1000 which is then converted to base64 encoding. This is your new password.</p><br/>
      <h3>Disclaimer</h3>
      <p>This technology is very safe and cool for a school project but should not be used for real applications due to it's werid nature if you lose a password, you could  also lose moment in time when you created it, where you created it and on which exact device was it created. These could possibly be reverse engineered, but for a common man which will never find out about this application, it should be much safer  than "solarwinds123".</p><br/>
      </div>
    </div>
  );
};

export default About;
