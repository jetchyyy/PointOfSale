import React, { Component } from "react";
import { ref, onValue, remove, set, off, push, DatabaseReference } from "firebase/database";
import { Table, Button, Modal } from "react-bootstrap";
import StartFirebase from "../firebase";
import bikeport from "../../public/imgs/bikeport.jpg";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface UserData {
  Address: string;
  Email: string;
  Name: string;
  Number: string;
  PaymentMode: string;
  InputDate: string;
  items: { [itemId: string]: { itemName: string; quantity: number; totalPrice: number } };
}

interface TableData {
  key: string;
  user: UserData;
  month: string;
}

interface State {
  tableData: TableData[];
  showConfirmModal: boolean;
  showCancelModal: boolean;
  itemToRemove: TableData | null;
  completedOrders: TableData[];
}

class RealtimeData extends Component<{}, State> {
  constructor(props: {}) {
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
        let records: TableData[] = [];
        snapshot.forEach((childSnapshot) => {
          let keyName = childSnapshot.key;
          let userData: UserData = childSnapshot.val();
          let userRef = ref(db, `UserData/${keyName}/user`);
          let itemsRef = ref(db, `UserData/${keyName}/items`);
          let inputDateRef = ref(db, `UserData/${keyName}/user/InputDate`);

          onValue(userRef, (userSnapshot) => {
            let userData = userSnapshot.val();
            if (userData) {
              let user: UserData = { ...userData };

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

  handleShowConfirmModal = (row: TableData) => {
    this.setState({ showConfirmModal: true, itemToRemove: row });
  };

  handleCloseConfirmModal = () => {
    this.setState({ showConfirmModal: false, itemToRemove: null });
  };

  handleShowCancelModal = (row: TableData) => {
    this.setState({ showCancelModal: true, itemToRemove: row });
  };

  handleCloseCancelModal = () => {
    this.setState({ showCancelModal: false, itemToRemove: null });
  };

  handleCancelOrder = (row: TableData) => {
    const key = row.key;
    const db = StartFirebase();
    const itemRef = ref(db, `UserData/${key}`);
    const canceledOrdersRef = ref(db, `Canceled`);

    onValue(itemRef, (snapshot) => {
      const orderData = snapshot.val();
      if (!orderData) {
        console.error("No order data found");
        return;
      }
      const newCanceledOrderRef = push(canceledOrdersRef);

      set(newCanceledOrderRef, orderData)
        .then(() => {
          console.log("Order moved to canceled orders successfully");
          remove(itemRef)
            .then(() => {
              console.log("Order removed from original location successfully");
              off(itemRef);
            })
            .catch((error) => {
              console.error("Error removing order from original location:", error);
            });
          this.handleCloseCancelModal();
        })
        .catch((error) => {
          console.error("Error moving order to canceled orders:", error);
        });
    });
  };

  handleCompleteOrder = (row: TableData) => {
    const key = row.key;
    const db = StartFirebase();
    const itemRef = ref(db, `UserData/${key}`);
    const completedOrdersRef = ref(db, `Completed`);

    onValue(itemRef, (snapshot) => {
      const orderData = snapshot.val();
      if (!orderData) {
        console.error("No order data found");
        return;
      }
      const newCompletedOrderRef = push(completedOrdersRef);

      set(newCompletedOrderRef, orderData)
        .then(() => {
          console.log("Order moved to completed orders successfully");
          remove(itemRef)
            .then(() => {
              console.log("Order removed from original location successfully");
              off(itemRef);
            })
            .catch((error) => {
              console.error("Error removing order from original location:", error);
            });
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
                    <td colSpan={12}>
                      <p>User Details</p>
                      <p>Address: {row.user.Address}</p>
                      <p>Email: {row.user.Email}</p>
                      <p>Name: {row.user.Name}</p>
                      <p>Number: {row.user.Number}</p>
                      <p>PaymentMode: {row.user.PaymentMode}</p>
                      <p>Input Date: {row.user.InputDate}</p>
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
