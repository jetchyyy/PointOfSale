import React, { useState, useEffect } from "react";
import { ref, onValue, off, remove, DatabaseReference } from "firebase/database";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import StartFirebase from "../firebase";
import bikeport from "../../public/imgs/bikeport.jpg";

interface Order {
  key: string;
  user: {
    InputDate: string;
    Address: string;
    Email: string;
    Name: string;
    Number: string;
    PaymentMode: string;
  };
  items: { [itemId: string]: { itemName: string; quantity: number; totalPrice: number } };
}

const CompletedOrders: React.FC<{ completedOrders: any; handleLogout: () => void }> = ({
  completedOrders,
  handleLogout,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("All Purchased");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const db = StartFirebase();
    const completedOrdersRef = ref(db, "Completed");

    const fetchData = () => {
      onValue(completedOrdersRef, (snapshot) => {
        const ordersData: Order[] = [];
        snapshot.forEach((childSnapshot) => {
          ordersData.push({ key: childSnapshot.key!, ...childSnapshot.val() });
        });
        setOrders(ordersData);
      });
    };

    fetchData();

    return () => {
      off(completedOrdersRef);
    };
  }, []);

  const filterOrders = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const deleteOrder = (orderId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order permanently?"
    );
    if (confirmDelete) {
      const db = StartFirebase();
      const orderRef: DatabaseReference = ref(db, `Completed/${orderId}`);
      remove(orderRef);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.user.InputDate);
    const orderMonth = orderDate.getMonth() + 1; // January is 0
    return (
      (filter === "All Purchased" || orderMonth === parseInt(filter)) &&
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
          <Col xs={10}>
            <Container className="mt-5">
              <h2>Completed Orders</h2>
              <div className="mb-3">
                <select
                  className="form-select"
                  aria-label="Filter by month"
                  value={filter}
                  onChange={(e) => filterOrders(e.target.value)}
                >
                  <option value="All Purchased">All Purchased</option>
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
                          <p>Purchased Date: {order.user.InputDate} </p>
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
                      <td colSpan={3}>No completed orders available</td>
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

export default CompletedOrders;
