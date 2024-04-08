import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Carousel } from "react-bootstrap";
import Icon from "../utilities/Icon";
import Button from "@mui/material/Button/Button";
import { Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
export function Home() {
  return (
    <>
      <Container>
        <div className="container mt-5 hover">
          <h1 className="display-4">Welcome to Biketopia</h1>
          <p className="lead">
            Where every bike has the best quality yet affordable price
          </p>

          <div className="d-flex justify-content-between">
            <Carousel
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "100%",
                padding: "5px",
                marginBottom: "30px",
                border: "5px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/imgs/Bike6.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/imgs/bike.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              {/* Add more Carousel.Item components for additional images */}
            </Carousel>
            <div className="container mt-5 hover">
              <div className="d-flex justify-content-between">
                <Carousel
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "100%",
                    padding: "5px",
                    marginBottom: "30px",
                    border: "5px solid #ccc",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/imgs/Bike7.jpg"
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/imgs/santic.jpg"
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  {/* Add more Carousel.Item components for additional images */}
                </Carousel>
                <Carousel
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "100%",
                    padding: "5px",
                    marginBottom: "30px",
                    border: "5px solid #ccc",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    marginLeft: "50px",
                  }}
                >
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/imgs/Bike7.jpg"
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/imgs/sale.jpg"
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  {/* Add more Carousel.Item components for additional images */}
                </Carousel>
              </div>

              <div className="text-center">
                <Link to="/store" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#31363F",
                    }}
                    startIcon={<ShoppingCartIcon style={{ color: "white" }} />}
                  >
                    Check Our Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>

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
                  <Link to="/store" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "black",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                        marginLeft: "50px",
                        marginTop: "45px",
                      }}
                      startIcon={
                        <ShoppingCartIcon style={{ color: "white" }} />
                      }
                    >
                      Buy Now
                    </Button>
                  </Link>
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
                  <Link to="/store" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "black",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                        marginLeft: "60px",
                        marginTop: "25px",
                      }}
                      startIcon={
                        <ShoppingCartIcon style={{ color: "white" }} />
                      }
                    >
                      Buy Now
                    </Button>
                  </Link>
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
                  <Link to="/store" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "black",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                        marginLeft: "60px",
                      }}
                      startIcon={
                        <ShoppingCartIcon style={{ color: "white" }} />
                      }
                    >
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-solid border-gray-5=1000 shadow-md p-3 mt-4">
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
          <div className="text-center">
            <a href="/shoes">
              <img
                className="img-fluid d-block mx-auto"
                src="/imgs/santic.jpg"
                alt=""
              />
            </a>
            <Link to="/store" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: "30px",
                  backgroundColor: "#31363F",
                }}
                startIcon={<ShoppingCartIcon style={{ color: "white" }} />}
              >
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>


          <footer className="footer">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-4"></div>
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
        </div>
      </Container>
      <Icon />
    </>
  );
}
