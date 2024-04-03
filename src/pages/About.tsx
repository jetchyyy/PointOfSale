import { Button, Card, Typography } from "@mui/material";
import "./About.css";
import Icon from "../utilities/Icon";
import "./About.css";
import Container from "react-bootstrap/esm/Container";

export function About() {
  return (
    <>
      <div className="about">
        <div className="container">
          <div className="row">
            <div className="col-6 p-25">
              <h1> BIKETOPIA</h1>
              <Card
                sx={{
                  maxWidth: 500,
                  padding: "5px",
                  margin: "5px",
                  backgroundColor: "#DCFFB7",
                }}
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontcolor: "#607274",
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "#333",
                  }}
                >
                  Biktopia stands as the premier distribution leader for
                  top-notch action sports brands in the realms of cycling,
                  powersports, and running. Guided by two generations of
                  athletes deeply entrenched in transformative sports
                  experiences, Biktopia comprehends the unique needs of the
                  market. We leverage our extensive expertise in the sports
                  industry, coupling it with the proficiency of our highly
                  trained team to deliver unparalleled customer support for the
                  brands we proudly represent. From multimedia production houses
                  to concept stores, service centers, and leisure estates,
                  Biktopia boasts a diverse portfolio of businesses,
                  demonstrating our capability to launch a brand, cultivate its
                  identity, and ensure sustained availability. Embark on your
                  exploration of the world with Biktopia, where we are dedicated
                  to assisting you on your journey.
                </Typography>
              </Card>
              <div className="store-hours">
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    color: "black",
                    marginTop: "10px",
                  }}
                >
                  Store Hours: Tuesday-Sunday 9:00AM to 6:00PM
                </Typography>
              </div>
              <div
                className="about__btn"
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                <Button
                  href="/store"
                  className="btn btn-smart"
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "black",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  CHECK OUR PRODUCTS
                </Button>
              </div>
            </div>
            <div className="col-6 about__img-container">
              <video
                autoPlay
                loop
                muted
                className="about__img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  margin: "auto",
                }}
              >
                <source src="/public/imgs/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div style={{ position: "relative", marginTop: "100px" }}>
          <img
            src="/imgs/mission.jpg"
            alt="Biketopia Logo"
            style={{
              position: "absolute",
              top: 0,
              left: 0,  
              
              height: "400px",
              width: "550px",
              objectFit: "cover",
              marginBottom: "50px",
              marginRight: "500px",
              zIndex: -1, // Set z-index to position the image behind other content
            }}
          />
          <div style={{ marginLeft: "600px" }}>
            <h2 style={{ marginLeft: "355px", fontWeight: "bold" }}>MISSION</h2>
            <Card
              sx={{
                maxWidth: 500,
                padding: "5px",
                margin: "5px",
                backgroundColor: "#DCFFB7",
                marginTop: "20px",
              }}
            >
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontcolor: "#607274",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#333",
                }}
              >
                At Biketopia, we are driven by a passion for cycling and a
                commitment to fostering a community of riders. Our mission is to
                provide exceptional bicycles, accessories, and services that
                inspire individuals to embrace the joy of cycling and lead
                active, fulfilling lifestyles. We strive to create an inclusive
                and welcoming environment where cyclists of all levels can find
                support, guidance, and camaraderie. Through our dedication to
                quality, integrity, and sustainability, we aim to be more than
                just a bike shop – we aspire to be a hub for the cycling
                community, promoting health, happiness, and environmental
                stewardship one pedal stroke at a time.
              </Typography>
            </Card>
          </div>
        </div>

        <section
          className="page-section"
          id="about"
          style={{ marginTop: "100px" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <ul className="timeline">
                <li>
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="/imgs/Bikelogo.png"
                      alt=""
                    />
                  </div>

                  <div class="card bg-light">
                    <div class="card-body">
                      <div class="timeline-panel text-center">
                        <h4>2020-2024</h4>
                        <h4 class="subheading">Our Humble Beginnings</h4>
                      </div>
                      <div class="timeline-body">
                        <p class="text-muted">
                          From the dusty corners of a garage to the vibrant
                          heart of our community, our journey at Biketopia began
                          with a shared love for the freedom of two wheels.
                          Fuelled by passion and fueled by the desire to spread
                          the joy of cycling, we started small, dreaming big.
                          Every wrench turned, every tire inflated, marked a
                          step forward in our quest to create something special.
                          Our beginnings may have been humble, but they laid the
                          foundation for a thriving community hub, where
                          cyclists of all stripes find camaraderie, support, and
                          inspiration. As we grow, we carry with us the spirit
                          of those early days, the determination to innovate, to
                          connect, and to make every ride an adventure. Our
                          humble origins remind us that the greatest journeys
                          start with a single pedal stroke.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Container>
      <Icon />
    </>
  );
}

export default About;
