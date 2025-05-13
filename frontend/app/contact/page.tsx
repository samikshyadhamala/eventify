import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div>
    
    <div className="contact-container">
        <img src="../login.png" alt="Contact Banner" className="contact-banner" />
      
        <div className="form-wrapper">
          <h2>Send Your Message</h2>
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Description" rows={5} required></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Contact
