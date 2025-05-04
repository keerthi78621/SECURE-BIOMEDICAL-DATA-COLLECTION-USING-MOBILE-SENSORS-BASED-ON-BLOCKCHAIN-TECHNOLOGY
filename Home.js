import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="banner mb-5" style={styles.banner}>
        <div className="banner-content text-white" style={styles.bannerContent}>
          <h2 style={styles.bannerTitle}>Your Health, Our Commitment</h2>
          <p style={styles.bannerText}>
            Experience seamless healthcare management with our secure, cloud-based solutions.
          </p>
          <a href="/services" className="btn btn-primary" style={styles.bannerButton}>
            Explore Services
          </a>
        </div>
      </div>

      {/* Cards Section: Medical Services */}
      <div className="row">
        {/* Card 1 */}
        <div className="col-md-3 mb-4">
          <div className="card" style={styles.card}>
            <img
              src="https://i.pinimg.com/originals/d4/55/e3/d455e3be112235e6f70ce41be9ffd6d2.gif"
              className="card-img-top"
              alt="Medical Service 1"
              style={styles.cardImage}
            />
            <div className="card-body">
              <h5 className="card-title">Book your Appointments</h5>
              <p className="card-text">Easily book and manage your medical appointments securely.</p>
              <a href="/patient" className="btn btn-primary" style={styles.cardButton}>Book Appointment</a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-3 mb-4">
          <div className="card" style={styles.card}>
            <img
              src="https://i.pinimg.com/originals/28/fb/5e/28fb5ead4414328a8287aca6bf1f9cf3.gif"
              className="card-img-top"
              alt="Medical Service 2"
              style={styles.cardImage}
            />
            <div className="card-body">
              <h5 className="card-title">Patient Records</h5>
              <p className="card-text">Secure and access your medical records from anywhere, anytime.</p>
              <a href="/login" className="btn btn-primary" style={styles.cardButton}>Learn More</a>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-3 mb-4">
          <div className="card" style={styles.card}>
            <img
              src="https://i.pinimg.com/originals/2a/c2/2c/2ac22c37e3b1b63259e830e1e00d9184.gif"
              className="card-img-top"
              alt="Medical Service 3"
              style={styles.cardImage}
            />
            <div className="card-body">
              <h5 className="card-title">Cloud Data Storage</h5>
              <p className="card-text">Store your medical data Public on the cloud for easy access and sharing.</p>
              <a href="/patient/register" className="btn btn-primary" style={styles.cardButton}>Cloud Store</a>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-md-3 mb-4">
          <div className="card" style={styles.card}>
            <img
              src="https://i.pinimg.com/originals/fd/84/34/fd843403aa27aca3b6a7a8c199f8e416.gif"
              className="card-img-top"
              alt="Medical Service 4"
              style={styles.cardImage}
            />
            <div className="card-body">
              <h5 className="card-title">Healthcare Check Reports</h5>
              <p className="card-text">Get your health reports digitally and analyze them in real-time.</p>
              <a href="/dashboard" className="btn btn-primary" style={styles.cardButton}>Learn More</a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section with Cards */}
      <section className="my-5">
        <h2 style={styles.sectionHeader}>About Us</h2>
        <div className="row">
          {/* About Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/originals/ff/69/81/ff69814638d7fcf4affd36afa37ec361.gif"
                className="card-img-top"
                alt="About Us 1"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Our Mission</h5>
                <p className="card-text">
                  We aim to revolutionize healthcare by providing secure, cloud-based solutions that empower patients
                  and healthcare providers alike.
                </p>
              </div>
            </div>
          </div>

          {/* About Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/originals/45/00/7a/45007aae18af68200ec3f8c460e79d99.gif"
                className="card-img-top"
                alt="About Us 2"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Our Vision</h5>
                <p className="card-text">
                  To create a world where healthcare data is seamlessly accessible, secure, and interoperable across
                  all platforms.
                </p>
              </div>
            </div>
          </div>

          {/* About Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/originals/b3/25/a8/b325a899266b6697cd8293b4e5a018da.gif"
                className="card-img-top"
                alt="About Us 3"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Our Values</h5>
                <p className="card-text">
                  We prioritize security, innovation, and patient-centric care in everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud-Based Services Section with Cards */}
      <section className="my-5">
        <h2 style={styles.sectionHeader}>Cloud-Based Services</h2>
        <div className="row">
          {/* Cloud Service Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/736x/dd/9e/80/dd9e8019afe5c9fe9f934933618ff6cb.jpg"
                className="card-img-top"
                alt="Cloud Service 1"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Secure Data Storage</h5>
                <p className="card-text">
                  All your medical data is encrypted and stored securely in the cloud, ensuring privacy and compliance
                  with global standards.
                </p>
              </div>
            </div>
          </div>

          {/* Cloud Service Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/originals/05/ec/48/05ec4876e7d36fe31716557ddc2bd7ee.gif"
                className="card-img-top"
                alt="Cloud Service 2"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Real-Time Access</h5>
                <p className="card-text">
                  Access your medical records and reports from anywhere, at any time, with just a few clicks.
                </p>
              </div>
            </div>
          </div>

          {/* Cloud Service Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/736x/b0/87/ed/b087ed9f43ee10c598aac0638e58ca1d.jpg"
                className="card-img-top"
                alt="Cloud Service 3"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Scalable Solutions</h5>
                <p className="card-text">
                  Our platform is designed to grow with your needs, ensuring you always have the resources you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Doctors Section */}
      <section className="my-5">
        <h2 style={styles.sectionHeader}>Available Doctors</h2>
        <div className="row">
          {/* Doctor Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/736x/9b/6d/05/9b6d05b19da4a382d59b372adb0e3cca.jpg"
                className="card-img-top"
                alt="Doctor 1"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Dr. John Doe</h5>
                <p className="card-text"><strong>Specialty:</strong> Cardiologist</p>
                <p className="card-text">
                  Dr. John Doe is a highly experienced cardiologist with over 15 years of experience in treating heart-related conditions.
                </p>
                <a href="/doctors/john-doe" className="btn btn-primary" style={styles.cardButton}>View Profile</a>
              </div>
            </div>
          </div>

          {/* Doctor Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/736x/91/73/4f/91734fed094b9261fa922ca11d93afc9.jpg"
                className="card-img-top"
                alt="Doctor 2"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Dr. Jane Smith</h5>
                <p className="card-text"><strong>Specialty:</strong> Pediatrician</p>
                <p className="card-text">
                  Dr. Jane Smith specializes in pediatric care and has a passion for helping children lead healthy lives.
                </p>
                <a href="/doctors/jane-smith" className="btn btn-primary" style={styles.cardButton}>View Profile</a>
              </div>
            </div>
          </div>

          {/* Doctor Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/736x/74/d4/d0/74d4d0eb6de1ae388fa73e6ee84d31cf.jpg"
                className="card-img-top"
                alt="Doctor 3"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Dr. Emily Brown</h5>
                <p className="card-text"><strong>Specialty:</strong> Dermatologist</p>
                <p className="card-text">
                  Dr. Emily Brown is a renowned dermatologist with expertise in treating skin conditions and cosmetic procedures.
                </p>
                <a href="/doctors/emily-brown" className="btn btn-primary" style={styles.cardButton}>View Profile</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Facilities Section */}
      <section className="my-5">
        <h2 style={styles.sectionHeader}>Medical Facilities</h2>
        <div className="row">
          {/* Facility Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/originals/ea/7f/2d/ea7f2dd47969349da148ea0b4ec56815.gif"
                className="card-img-top"
                alt="Facility 1"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">City General Hospital</h5>
                <p className="card-text"><strong>Location:</strong> New York, USA</p>
                <p className="card-text">
                  A state-of-the-art hospital offering a wide range of medical services, including emergency care, surgery, and diagnostics.
                </p>
                <a href="/facilities/city-general" className="btn btn-primary" style={styles.cardButton}>Learn More</a>
              </div>
            </div>
          </div>

          {/* Facility Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/originals/fa/9d/51/fa9d5127e871a0f79f0543c0cd73f45d.gif"
                className="card-img-top"
                alt="Facility 2"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Green Valley Clinic</h5>
                <p className="card-text"><strong>Location:</strong> California, USA</p>
                <p className="card-text">
                  A modern clinic specializing in primary care, preventive health, and wellness programs.
                </p>
                <a href="/facilities/green-valley" className="btn btn-primary" style={styles.cardButton}>Learn More</a>
              </div>
            </div>
          </div>

          {/* Facility Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/originals/30/7d/ab/307dabe6626ae2a02de49a774f020761.gif"
                className="card-img-top"
                alt="Facility 3"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Sunrise Diagnostic Center</h5>
                <p className="card-text"><strong>Location:</strong> Texas, USA</p>
                <p className="card-text">
                  A leading diagnostic center offering advanced imaging, lab tests, and health screenings.
                </p>
                <a href="/facilities/sunrise-diagnostic" className="btn btn-primary" style={styles.cardButton}>Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="my-5">
        <h2 style={styles.sectionHeader}>Latest Blog Posts</h2>
        <div className="row">
          {/* Blog Post 1 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/736x/ce/bc/f0/cebcf0b47749da763a274714eada34a1.jpg"
                className="card-img-top"
                alt="Blog Post 1"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">The Future of Healthcare: Cloud-Based Solutions</h5>
                <p className="card-text">Discover how cloud-based solutions are transforming the healthcare industry.</p>
                <a href="/blog/future-of-healthcare" className="btn btn-primary" style={styles.cardButton}>Read More</a>
              </div>
            </div>
          </div>

          {/* Blog Post 2 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/736x/69/b6/8f/69b68f488cdc468bc5733fa756cdcdce.jpg"
                className="card-img-top"
                alt="Blog Post 2"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">Ensuring Data Security in Healthcare</h5>
                <p className="card-text">Learn about the importance of data security in healthcare and how we ensure it.</p>
                <a href="/blog/data-security" className="btn btn-primary" style={styles.cardButton}>Read More</a>
              </div>
            </div>
          </div>

          {/* Blog Post 3 */}
          <div className="col-md-4 mb-4">
            <div className="card" style={styles.card}>
              <img
                src="https://i.pinimg.com/736x/0d/1d/d1/0d1dd10a4a6193de98b7476b681722ae.jpg"
                className="card-img-top"
                alt="Blog Post 3"
                style={styles.cardImage}
              />
              <div className="card-body">
                <h5 className="card-title">The Benefits of Digital Health Reports</h5>
                <p className="card-text">Explore the advantages of digital health reports and how they can improve patient care.</p>
                <a href="/blog/digital-health-reports" className="btn btn-primary" style={styles.cardButton}>Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p>&copy; 2025 Secure Cloud Healthcare. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

// Inline styles for the page components
const styles = {
  header: {
    fontSize: '2.5rem',
    color: '#007bff',
    marginBottom: '20px',
  },
  sectionHeader: {
    fontSize: '2rem',
    color: '#007bff',
    marginBottom: '20px',
  },
  card: {
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  cardImage: {
    borderRadius: '10px 10px 0 0',
    height: '200px',
    objectFit: 'cover',
  },
  cardButton: {
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
  },
  footer: {
    marginTop: '50px',
    padding: '20px 0',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
  },
  banner: {
    backgroundImage: 'url(https://i.pinimg.com/736x/81/d2/ac/81d2ace5b867843c8f76a9af96a2940d.jpg)', // Replace with your banner image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
    padding: '100px 20px',
    textAlign: 'center',
    color: 'white',
  },
  bannerContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    padding: '20px',
    borderRadius: '10px',
  },
  bannerTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  bannerText: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  bannerButton: {
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    padding: '10px 20px',
    textDecoration: 'none',
  },
};

export default Home;