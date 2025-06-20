import React from 'react'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import './About.css';



const page = () => {
  return (
    <>
    <Header placeholder={true}></Header>
          {/* <!-- Hero Section --> */}
    <section className="hero">
        <div className="container">
            <h1>About Eventify</h1>
            <p>Bridging the gap between Rotaract Clubs and communities through innovative event management solutions that promote collaboration, accessibility, and sustainable development.</p>
            <a href="#mission" className="cta-button">Discover Our Mission</a>
        </div>
    </section>

    {/* <!-- Main Content --> */}
    <main className="main-content">
        <div className="container">
            {/* <!-- Our Team Section --> */}
            <section className="section" id="team">
                <h2>Our Team</h2>
                <p className="text-align: center; margin-bottom: 50px; font-size: 1.1rem; color: #666;">
                    Meet the passionate individuals behind Eventify, working together to revolutionize event management
                </p>
                <div className="team-grid">
                    <div className="team-card">
                        <div className="team-image">
                            <img src="/images/unikapp.jpg" alt="Unika Ghimire " />
                        </div>
                        <div className="team-info">
                            <h3>Unika Ghimire </h3>
                            <p className="team-role">Backend Developer & Team Lead</p>
                            <div className="team-contact">
                                <p> +977-9842525351</p>
                                <a href="https://www.linkedin.com/in/unika-ghimire/" target="_blank" className="linkedin-link">
                                     LinkedIn Profile
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="team-card">
                        <div className="team-image">
                            <img src="/images/Sushantpp.jpg" alt="Sushant Shrestha" />
                        </div>
                        <div className="team-info">
                            <h3>Sushant Shrestha</h3>
                            <p className="team-role">Frontend Developer in React.js & UI/UX Designer  </p>
                            <div className="team-contact">
                                <p> +977-9865062620</p>
                                <a href="https://www.linkedin.com/in/sushant-shrest/" target="_blank" className="linkedin-link">
                                     LinkedIn Profile
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="team-card">
                        <div className="team-image">
                            <img src="/images/samikshyapp.jpg" alt="Samikshya Dhamala" />
                        </div>
                        <div className="team-info">
                            <h3>Samikshya Dhamala</h3>
                            <p className="team-role">Backend Developer & Database Administrator</p>
                            <div className="team-contact">
                                <p> +977-9848867688</p>
                                <a href="https://www.linkedin.com/in/samikshyadhamala/" target="_blank" className="linkedin-link">
                                     LinkedIn Profile
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="team-card">
                        <div className="team-image">
                            <img src="/images/samyampp.jpg" alt="Samyam Chapagain" />
                        </div>
                        <div className="team-info">
                            <h3>Samyam Chapagain</h3>
                            <p className="team-role">UI/UX Designer & Video Editor</p>
                            <div className="team-contact">
                                <p> +977-9762278111</p>
                                <a href="https://www.linkedin.com/in/chapagain-samyam/" target="_blank" className="linkedin-link">
                                     LinkedIn Profile
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Mission Section --> */}
            <section className="section" id="mission">
                <h2>Our Mission</h2>
                <div className="problem-solution">
                    <div className="card">
                        <h3> The Challenge</h3>
                        <p>Event management for Rotaract Clubs and community organizations has been fragmented, with poor communication channels, limited accessibility, and lack of systematic organization. This creates barriers between event organizers and potential participants, reducing community engagement and impact.</p>
                    </div>
                    <div className="card">
                        <h3> Our Solution</h3>
                        <p>Eventify provides a comprehensive event management system with real-time updates, seamless registration, intelligent filtering, and user-friendly interfaces. We're creating a unified platform that connects Rotaract Clubs with their communities, making events more accessible and impactful.</p>
                    </div>
                </div>
            </section>

            {/* <!-- SDG Goals --> */}
            <section className="section">
                <h2>UN Sustainable Development Goals</h2>
                <p className="text-align: center; margin-bottom: 30px; font-size: 1.1rem; color: #666;">
                    Eventify is committed to advancing multiple UN SDGs through technology and community engagement
                </p>
                <div className="sdg-goals">
                    <div className="sdg-card">
                        <h4> Goal 9: Industry, Innovation & Infrastructure</h4>
                        <p>Promoting digitalization of event management and improving accessibility through innovative technology solutions.</p>
                    </div>
                    <div className="sdg-card">
                        <h4> Goal 4: Quality Education</h4>
                        <p>Facilitating educational workshops, seminars, and webinars to increase access to lifelong learning opportunities.</p>
                    </div>
                    <div className="sdg-card">
                        <h4> Goal 8: Decent Work & Economic Growth</h4>
                        <p>Supporting event organizers, entrepreneurs, and local economies by providing platforms for promotion and collaboration.</p>
                    </div>
                    <div className="sdg-card">
                        <h4> Goal 11: Sustainable Cities & Communities</h4>
                        <p>Promoting cultural and community events that foster inclusive and sustainable communities in urban and rural areas.</p>
                    </div>
                    <div className="sdg-card">
                        <h4> Goal 17: Partnerships for the Goals</h4>
                        <p>Serving as a hub for collaborations between NGOs, educational institutions, and businesses on SDG initiatives.</p>
                    </div>
                </div>
            </section>

            {/* <!-- Technology Stack --> */}
            <section className="section">
                <h2>Our Technology Stack</h2>
                <p className="text-align: center; margin-bottom: 30px; font-size: 1.1rem; color: #666;">
                    Built with modern, scalable technologies to ensure the best user experience
                </p>
                <div className="tech-grid">
                    <div className="tech-category">
                        <h4>Frontend Development</h4>
                        <ul className="tech-list">
                            <li><strong>React.js</strong> - Dynamic user interfaces</li>
                            <li><strong>Next.js</strong> - Server-side rendering & optimization</li>
                            <li><strong>Tailwind CSS</strong> - Responsive design system</li>
                            <li><strong>JavaScript</strong> - Interactive functionality</li>
                            <li><strong>HTML5</strong> - Semantic markup</li>
                        </ul>
                    </div>
                    <div className="tech-category">
                        <h4>Backend Development</h4>
                        <ul className="tech-list">
                            <li><strong>Flask</strong> - Python web framework</li>
                            <li><strong>Python</strong> - Server-side logic</li>
                            <li><strong>RESTful APIs</strong> - Data communication</li>
                        </ul>
                    </div>
                    <div className="tech-category">
                        <h4>Database & Hosting</h4>
                        <ul className="tech-list">
                            <li><strong>Postgres SQL</strong> - Hosted on supabase</li>
                            <li><strong>AWS/Google Cloud</strong> - Scalable hosting</li>
                            <li><strong>Cloud Infrastructure</strong> - Reliable deployment</li>
                        </ul>
                    </div>
                    <div className="tech-category">
                        <h4>Development Tools</h4>
                        <ul className="tech-list">
                            <li><strong>GitHub</strong> - Version control & collaboration</li>
                            <li><strong>Figma</strong> - UI/UX design</li>
                            <li><strong>Agile Methodology</strong> - Project management</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* <!-- Features --> */}
            <section className="section">
                <h2>Key Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h4>Smart Ticketing System</h4>
                        <p>Seamless registration and ticketing with secure payment gateways and confirmation systems.</p>
                    </div>
                    <div className="feature-card">
                        <h4>Real-time Updates</h4>
                        <p>Live event information, and dynamic content updates for all users.</p>
                    </div>
                    <div className="feature-card">
                        <h4>Advanced Filtering</h4>
                        <p>Intelligent event discovery with category filters, location-based search, and personalized recommendations.</p>
                    </div>
                    <div className="feature-card">
                        <h4>Mobile-First Design</h4>
                        <p>Responsive, accessible interface optimized for all devices and screen sizes.</p>
                    </div>
                    <div className="feature-card">
                        <h4>Secure & Reliable</h4>
                        <p>Enterprise-grade security with data encryption, secure authentication, and robust infrastructure.</p>
                    </div>
                    <div className="feature-card">
                        <h4>Community Building</h4>
                        <p>Connecting Rotaract Clubs with communities to foster collaboration and sustainable development.</p>
                    </div>
                </div>
            </section>

            {/* <!-- Impact Section --> */}
            <section className="section">
                <h2>Our Impact Vision</h2>
                <div className="problem-solution">
                    <div className="card">
                        <h3> Market Innovation</h3>
                        <p>Eventify fills a crucial gap in the Nepal event management ecosystem by providing a dedicated platform for Rotaract Clubs and community organizations. Our focus on sustainability, accessibility, and collaboration sets us apart from generic event platforms.</p>
                    </div>
                    <div className="card">
                        <h3> Future Goals</h3>
                        <p>We envision expanding beyond Rotaract Clubs to serve the entire NGO ecosystem in Nepal and beyond. Our platform will become the go-to solution for community-driven events that advance sustainable development goals.</p>
                    </div>
                </div>
            </section>
        <section className='section'>
            <h3>Video</h3>
            <p>Video of Eventify</p>
            <a href="https://drive.google.com/file/d/1kNj7-4PWZMeAJhe0bep1gxqeeEx4H-5l/view?usp=sharing">Lnik for the video</a>
        </section>
        {/* Links */}
            <section className='section'>
                <h2>Videos and Report Links</h2>
                <div className="problem-solution">
                    <div className="card">
                        <h3>Eventigy Report</h3>
                        <a href="https://docs.google.com/document/d/1IfCmrHf6pqqbjzkVKYu3twiA97zUZEUmRUyNuawa8F4/edit?usp=sharing">Final Report</a>
                        <a href="https://docs.google.com/document/d/14i5e0O1tl1jwJeflOQ2p7-wtZPYGI4VIrWwFUrAxB1U/edit?tab=t.0#heading=h.7rnmizbxkbbq">Report</a>
                        <a href="https://docs.google.com/document/d/1QGOaIHvjaEj6BTVe_jDHGhQh4cLT9-pzlphpX6Wmjpg/edit?usp=sharing"> Opportunistic plan</a>
                    </div>
                    <div className="card">
                        <h3>Eventify Video</h3>
                        <a href="https://drive.google.com/file/d/1kNj7-4PWZMeAJhe0bep1gxqeeEx4H-5l/view?usp=sharing">Watch Video</a>
                    </div>
                </div>
      </section>
        </div>
    </main>
    <div className="h-full">
        <Footer />
    </div>
    </>
  )
}

export default page