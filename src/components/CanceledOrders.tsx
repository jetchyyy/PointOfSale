import React, { useState, useEffect } from "react";
import { ref, onValue, off, remove } from "firebase/database";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import StartFirebase from "../firebase";
import bikeport from "../../public/imgs/bikeport.jpg"
const CanceledOrders = ({ handleLogout }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All Canceled");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const db = StartFirebase();
    const canceledOrdersRef = ref(db, "Canceled");

    const fetchData = () => {
      onValue(canceledOrdersRef, (snapshot) => {
        const ordersData = [];
        snapshot.forEach((childSnapshot) => {
          ordersData.push({ key: childSnapshot.key, ...childSnapshot.val() });
        });
        setOrders(ordersData);
      });
    };

    fetchData();

    return () => {
      off(canceledOrdersRef);
    };
  }, []);

  const filterOrders = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteOrder = (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order permanently?");
    if (confirmDelete) {
      const db = StartFirebase();
      const orderRef = ref(db, `Canceled/${orderId}`);
      remove(orderRef);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.user.InputDate);
    const orderMonth = orderDate.getMonth() + 1; // January is 0
    return (
      (filter === "All Canceled" || orderMonth === parseInt(filter)) &&
      (order.user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.Email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <>
      <Sidebar handleLogout={handleLogout} />
      <Container fluid>
        <Row>
        <img src={bikeport} alt="Biketopiaport" style={{ width: "175px", height: "auto", position: "fixed", top: 0, left: 100, zIndex: -1000 }} />
          <Col xs={10}>
            <Container className="mt-5">
              <h2>Canceled Orders</h2>
              <div className="mb-3">
                <select
                  className="form-select"
                  aria-label="Filter by month"
                  value={filter}
                  onChange={(e) => filterOrders(e.target.value)}
                >
                  <option value="All Canceled">All Canceled</option>
                  {[...Array(12).keys()].map((month) => (
                    <option key={month} value={month + 1}>
                      {new Date(2000, month).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
              </div>
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search by Name, Address, or Email"
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{ marginBottom: "10px" }}
                />
              </Form.Group>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>User Details</th>
                    <th>Items</th>
                    <th>Action</th> {/* Added Action column */}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <tr key={index}>
                        <td>
                          <p>Canceled Date: {order.user.InputDate} </p>
                          <p>Address: {order.user.Address}</p>
                          <p>Email: {order.user.Email}</p>
                          <p>Name: {order.user.Name}</p>
                          <p>Number: {order.user.Number}</p>
                          <p>PaymentMode: {order.user.PaymentMode}</p>
                        </td>
                        <td>
                          <Table bordered striped>
                            <thead>
                              <tr>
                                <th>Item ID</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items &&
                                Object.entries(order.items).map(
                                  ([itemId, item]) => (
                                    <tr key={itemId}>
                                      <td>{itemId}</td>
                                      <td>{item.itemName}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.totalPrice}</td>
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </Table>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => deleteOrder(order.key)}
                          >
                            Delete Order
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No canceled orders available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CanceledOrders;
