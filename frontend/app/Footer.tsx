import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <>      
    <footer>
        <div className="footer-content">
            <div className="footer-section">
                <p className="Footer-About">
                    We worried for the job seeker and employer that is why we are here.
                    We feel how difficult it is to get right candidate for employers and
                    difficult to find job for candidate for companies. We serve for
                    small business to large business and fresher to highly skilled.
                </p>
            </div>
            <div className="footer-nav">
                <div className="footer-contact">
                    <h3>User</h3>
                    <div>
                        <p><a href="#">User SignIn</a></p>
                        <p><a href="#">User Login</a></p>
                    </div>
                </div>
                
                <div className="footer-contact">
                    <h3>Club</h3>
                    <div>
                        <p><a href="Club Sign In.html">Club SignIn</a></p>
                        <p><a href="#">Club Login</a></p>
                        <p><a href="#">Create Event</a></p>
                    </div>
                </div>
            </div>
            
            <div className="footer-contact">
                <h3>Contact Us</h3>
                <p>Mobile Number: 9800000000</p>
                <p>Email: <a href="mailto:eventify@gmail.com">eventify@gmail.com</a></p>
                <p>Address: Matidevi, Kathmandu, Nepal</p>
            </div>
        </div>
        <div className="footer1">
            <div className="social-icons">
                <a href="#" className="social-icon facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                </a>
                <a href="#" className="social-icon linkedin">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                </a>
                <a href="#" className="social-icon tiktok">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                    </svg>
                </a>
                <i className="fa-brands fa-square-instagram" id="instagram"></i>
                <i className="fa-brands fa-youtube" id="youtube"></i>
                <a href="#" className="social-icon twitter">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                </a>
                <a href="#" className="social-icon gmail">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path>
                    </svg>
                </a>
            </div>
        </div>
        
        <div className="footer2">
            <div className="footer-down">
                <ul className='pl-0'>
                    <li>Copyright © 2023, Eventify</li>
                    <li>Terms of Services,Privacy Policy</li>
                </ul>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer
