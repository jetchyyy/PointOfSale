import React, { Component } from "react";
import { ref, onValue, remove, set, off, push } from "firebase/database";
import { Table, Button, Modal } from "react-bootstrap";
import StartFirebase from "../firebase";
import CompletedOrders from "./CompletedOrders";
import bikeport from "../../public/imgs/bikeport.jpg";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
export class RealtimeData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      showConfirmModal: false,
      showCancelModal: false,
      itemToRemove: null,
      completedOrders: [],
    };
  }

  fetchData = () => {
    const db = StartFirebase();
    const dbRef = ref(db, "UserData");
    onValue(
      dbRef,
      (snapshot) => {
        let records = [];
        snapshot.forEach((childSnapshot) => {
          let keyName = childSnapshot.key;
          let userData = childSnapshot.val();
          let userRef = ref(db, `UserData/${keyName}/user`);
          let itemsRef = ref(db, `UserData/${keyName}/items`);
          let inputDateRef = ref(db, `UserData/${keyName}/user/InputDate`);

          onValue(userRef, (userSnapshot) => {
            let userData = userSnapshot.val();
            if (userData) {
              let user = { ...userData };

              onValue(itemsRef, (itemsSnapshot) => {
                let itemsData = itemsSnapshot.val();
                if (itemsData) {
                  user.items = { ...itemsData, orderId: keyName };
                }
              });

              onValue(inputDateRef, (dateSnapshot) => {
                let inputDate = dateSnapshot.val();
                if (inputDate) {
                  user.InputDate = inputDate;
                  // Parse the input date to extract the month
                  const purchaseDate = new Date(inputDate);
                  const month = purchaseDate.toLocaleString("default", {
                    month: "long",
                  });
                  records.push({ key: keyName, user: user, month: month });
                }
              });
            }
          });
        });
        // Sort the records by month
        records.sort((a, b) => (a.month > b.month ? 1 : -1));
        this.setState({ tableData: records });
        if (records.length === 0) {
          console.log("No data available");
        } else {
          console.log("Data fetched successfully:", records);
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  };

  componentDidMount() {
    this.fetchData();
  }

  handleShowConfirmModal = (key) => {
    this.setState({ showConfirmModal: true, itemToRemove: key });
  };

  handleCloseConfirmModal = () => {
    this.setState({ showConfirmModal: false, itemToRemove: null });
  };

  handleShowCancelModal = (key) => {
    this.setState({ showCancelModal: true, itemToRemove: key });
  };

  handleCloseCancelModal = () => {
    this.setState({ showCancelModal: false, itemToRemove: null });
  };
  handleCancelOrder = () => {
    const row = this.state.itemToRemove;
    if (!row) {
      console.error("No row selected");
      return;
    }
    const key = row.key;
    const db = StartFirebase();
    const itemRef = ref(db, `UserData/${key}`);
    const canceledOrdersRef = ref(db, `Canceled`);

    onValue(itemRef, (snapshot) => {
      const orderData = snapshot.val();
      // Generate a new key for the canceled order
      const newCanceledOrderRef = push(canceledOrdersRef);

      set(newCanceledOrderRef, orderData)
        .then(() => {
          console.log("Order moved to canceled orders successfully");
          // Remove the order from the original location after moving it
          remove(itemRef)
            .then(() => {
              console.log("Order removed from original location successfully");
              // Remove the listener to prevent further updates
              off(itemRef); // Remove the listener
              // Update UI or state if necessary
            })
            .catch((error) => {
              console.error(
                "Error removing order from original location:",
                error
              );
            });
          // Close the cancel modal after the order is canceled
          this.handleCloseCancelModal();
        })
        .catch((error) => {
          console.error("Error moving order to canceled orders:", error);
        });
    });
  };

  handleCompleteOrder = () => {
    const row = this.state.itemToRemove;
    if (!row) {
      console.error("No row selected");
      return;
    }
    const key = row.key;
    const db = StartFirebase();
    const itemRef = ref(db, `UserData/${key}`);
    const completedOrdersRef = ref(db, `Completed`);

    onValue(itemRef, (snapshot) => {
      const orderData = snapshot.val();
      // Generate a new key for the completed order
      const newCompletedOrderRef = push(completedOrdersRef);

      set(newCompletedOrderRef, orderData)
        .then(() => {
          console.log("Order moved to completed orders successfully");
          // Remove the order from the original location after moving it
          remove(itemRef)
            .then(() => {
              console.log("Order removed from original location successfully");
              // Remove the listener to prevent further updates
              off(itemRef); // Remove the listener
              // Update UI or state if necessary
            })
            .catch((error) => {
              console.error(
                "Error removing order from original location:",
                error
              );
            });
          // Close the confirmation modal after the order is completed
          this.handleCloseConfirmModal();
        })
        .catch((error) => {
          console.error("Error moving order to completed orders:", error);
        });
    });
  };

  render() {
    return (
      <>
        <Table>
        
          <tbody>
            {this.state.tableData.map((row, index) => {
              return (
                <React.Fragment key={row.key}>
                  <tr>
                    <td colSpan="12">
                      {/* Span all columns */}
                      <p>User Details</p>
                      <p>Address: {row.user.Address}</p>
                      <p>Email: {row.user.Email}</p>
                      <p>Name: {row.user.Name}</p>
                      <p>Number: {row.user.Number}</p>
                      <p>PaymentMode: {row.user.PaymentMode}</p>
                      <p>Input Date: {row.user.InputDate}</p>{" "}
                      {/* New row for Input Date */}
                      <Table bordered striped>
                        {/* Nested table for items */}
                        <thead>
                          <tr>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.user.items &&
                            Object.entries(row.user.items).map(
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
                      <p>Action</p>
                      <Button
                        style={{ marginRight: "5px" }}
                        variant="success"
                        onClick={() => this.handleShowConfirmModal(row)}
                       
                      >
                        Completed
                      </Button>

                      <Button
                        style={{ marginLeft: "5px" }}
                        variant="danger"
                        onClick={() => this.handleShowCancelModal(row)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                  <Modal
                    show={this.state.showConfirmModal}
                    onHide={this.handleCloseConfirmModal}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm Action</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to confirm?</Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={this.handleCloseConfirmModal}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => this.handleCompleteOrder(row)}
                      >
                        Confirm
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal
                    show={this.state.showCancelModal}
                    onHide={this.handleCloseCancelModal}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Cancel Action</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to cancel?</Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={this.handleCloseCancelModal}
                      >
                        No
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => this.handleCancelOrder(row)}
                      >
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default RealtimeData;
