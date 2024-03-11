import { Button } from "@mui/material";
import "./About.css";

export function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="row">
          <div className="col-6 p-25">
            <h1> BIKETOPIA</h1>
            <p>
              Biktopia stands as the premier distribution leader for top-notch
              action sports brands in the realms of cycling, powersports, and
              running. Guided by two generations of athletes deeply entrenched
              in transformative sports experiences, Biktopia comprehends the
              unique needs of the market. We leverage our extensive expertise in
              the sports industry, coupling it with the proficiency of our
              highly trained team to deliver unparalleled customer support for
              the brands we proudly represent. From multimedia production houses
              to concept stores, service centers, and leisure estates, Biktopia
              boasts a diverse portfolio of businesses, demonstrating our
              capability to launch a brand, cultivate its identity, and ensure
              sustained availability. Embark on your exploration of the world
              with Biktopia, where we are dedicated to assisting you on your
              journey.
            </p>
            
            <div className="about__btn" style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                href="/store"
                className="btn btn-smart"
                variant="contained"
                color="primary"
                style={{ backgroundColor: "black", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
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
  );
}

export default About;
