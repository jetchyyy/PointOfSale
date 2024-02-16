import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

export function Home() {
  return (
    <Container>
  <div className="container mt-5">
    <h1 className="display-4">Welcome to Biketopia</h1>
    <p className="lead">Where every bike has the best quality yet affordable price</p>

    <div className="row">
      <div className="col-md-4">
        <div className="card" style={{ width: '18rem', height: '25rem' }}>
          <img src="/public/imgs/bike.jpg" className="card-img-top" alt="Placeholder" />
          <div className="card-body">
            <h5 className="card-title">Garuda Tempest</h5>
            <p className="card-text">Buy this whole bike for only Php5,850</p>
            <a href="/store" className="btn btn-primary position-absolute bottom-0 start-50 translate-middle-x">Buy Now</a>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card" style={{ width: '18rem', height: '25rem' }}>
          <img src="/public/imgs/bike4.jpg" className="card-img-top" alt="Placeholder" />
          <div className="card-body">
            <h5 className="card-title">Japanese Bike</h5>
            <p className="card-text">Buy this bike for only $263</p>
            <a href="/store" className="btn btn-primary position-absolute bottom-0 start-50 translate-middle-x">Buy Now</a>
          </div>
        </div>
      </div>
   
    <div className="col-md-4">
        <div className="card" style={{ width: '18rem', height: '25rem' }}>
          <img src="/public/imgs/bike5.jpg" className="card-img-top" alt="Placeholder" />
          <div className="card-body">
            <h5 className="card-title">Bouquet</h5>
            <p className="card-text">Avail our Valentine's Promo and get 50% Off</p>
            <a href="/store" className="btn btn-primary position-absolute bottom-0 start-50 translate-middle-x">Buy Now</a>
          </div>
        </div>
      </div>
      </div>
  </div>
</Container>

  );
}
