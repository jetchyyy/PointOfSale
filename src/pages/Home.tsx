import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Icon from "../utilities/Icon";
import Button from "@mui/material/Button/Button";

export function Home() {
  return (
    <>
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
      <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <a href="/shoes">
                  <img
                    className="img-fluid d-block mx-auto"
                    src="/imgs/Shoes.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-md-3 col-sm-6">
                <a href="/shoes">
                  <img
                    className="img-fluid d-block mx-auto"
                    src="/imgs/santic.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-md-3 col-sm-6">
                <a href="/shoes">
                  <img
                    className="img-fluid d-block mx-auto"
                    src="/imgs/Shoes.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-md-3 col-sm-6">
                <a href="/shoes">
                  <img
                    className="img-fluid d-block mx-auto"
                    src="/imgs/santic.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        

        <footer className="footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                
              </div>
              <div className="col-md-4">
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#something">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
              
             
              
              
            
          </div>
        </div>  
        </footer>
      
    </Container>
    <Icon/>
    </>
  );
}