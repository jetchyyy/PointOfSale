import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

export function Home() {
  return (
    <Container>
      <div className="container mt-5 hover">
        <h1 className="display-4">Welcome to Biketopia</h1>
        <p className="lead">
          Where every bike has the best quality yet affordable price
        </p>  

        <div className="row">
          <div className="col-md-4 hover enlarge">
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
              <img
                src="/public/imgs/Promo.jpg"
                className="card-img-top"
                alt="Placeholder"
              />
              <div className="card-body">
                <h5 className="card-title">Christmas Promo</h5>
                <p className="card-text">
                  Buy any bike and win amazing gift prizes.
                </p>
                <a
                  href="/store"
                  className="btn btn-primary position-absolute bottom-0 start-50 translate-middle-x"
                  style={{
                    backgroundColor: "black",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 hover enlarge">
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
              <img
                src="/public/imgs/bike6.jpg"
                className="card-img-top"
                alt="Placeholder"
              />
              <div className="card-body">
                <h5 className="card-title">Japanese Bike</h5>
                <p className="card-text">Buy this bike for only $263</p>
                <a
                  href="/store"
                  className="btn btn-primary position-absolute bottom-0 start-50 translate-middle-x"
                  style={{
                    backgroundColor: "black",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 hover enlarge">
            <div className="card" style={{ width: "18rem", height: "25rem" }}>
              <img
                src="/public/imgs/bike5.jpg"
                className="card-img-top"
                alt="Placeholder"
              />
              <div className="card-body">
                <h5 className="card-title">Bouquet</h5>
                <p className="card-text">
                  Avail our Valentine's Promo and get 50% Off
                </p>
                <a
                  href="/store"
                  className="btn btn-primary position-absolute bottom-0 start-50 translate-middle-x"
                  style={{
                    backgroundColor: "black",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
