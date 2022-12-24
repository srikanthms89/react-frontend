import { useEffect, useState } from "react";
import { Modal } from "./modal";
import axios from "../Services/axios.services";
export const ListShopingDetails = () => {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(undefined);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios().get("/shops");
    setData(response.data);
    setEditItem(undefined);
  };
  const onHandleChange = (item) => (e) => {
    const { name, value } = e.target;
    item[name] = value;
  };
  const onHandleDelete = (item) => async () => {
    const canDelete = window.confirm(
      `Are you sure do you ant to delete '${item.shop_Name}'`
    );
    if (canDelete) {
      await axios().delete(`/shops/${item.shop_Id}`);
      getData();
    }
  };

  const onHandleSave = (item) => async () => {
    await axios().put(`/shops/${item.shop_Id}`, item);
    getData();
  };

  const onHandleEdit = (item) => () => {
    setEditItem(item);
  };

  const onHandleCance = () => {
    setEditItem(undefined);
  };

  const onHandleAdd = () => {
    setShowAddModal(true);
  };

  return (
    <div style={{ maxWidth: "700px" }}>
      <button className="btn btn-primary" onClick={onHandleAdd}>
        Add Record
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th> Shop Id </th>
            <th> Shop Category </th>
            <th> Shop Employee ID </th>
            <th> Shop Name </th>
            <th> Customers </th>
            <th> Shop Status </th>
            <th> Shop Owner </th>
            <th> Lease Status </th>
            <th> Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.shop_Id}>
              {editItem && editItem.shop_Id === item.shop_Id ? (
                <>
                  <td>
                    <input type="text" defaultValue={item.shop_Id} disabled />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="shop_Category"
                      defaultValue={item.shop_Category}
                      onChange={onHandleChange(item)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="shop_EmployeeID"
                      onChange={onHandleChange(item)}
                      defaultValue={item.shop_EmployeeID}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="shop_Name"
                      onChange={onHandleChange(item)}
                      defaultValue={item.shop_Name}
                    />{" "}
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="customers"
                      onChange={onHandleChange(item)}
                      defaultValue={item.customers}
                    />{" "}
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="shop_Status"
                      onChange={onHandleChange(item)}
                      defaultValue={item.shop_Status}
                    />{" "}
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="shop_Owner"
                      onChange={onHandleChange(item)}
                      defaultValue={item.shop_Owner}
                    />{" "}
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="lease_Status"
                      onChange={onHandleChange(item)}
                      defaultValue={item.lease_Status}
                    />{" "}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <i
                        className="fa fa-save fa-2"
                        style={{ cursor: "pointer" }}
                        onClick={onHandleSave(item)}
                      ></i>
                      <i
                        className="fa fa-window-close fa-2"
                        style={{ cursor: "pointer" }}
                        onClick={onHandleCance}
                      ></i>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.shop_Id}</td>
                  <td>{item.shop_Category}</td>
                  <td> {item.shop_EmployeeID} </td>
                  <td> {item.shop_Name} </td>
                  <td> {item.customers} </td>
                  <td> {item.shop_Status} </td>
                  <td> {item.shop_Owner} </td>
                  <td> {item.lease_Status} </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <i
                        className="fa fa-pencil-square fa-2"
                        style={{ cursor: "pointer" }}
                        onClick={onHandleEdit(item)}
                      ></i>
                      <i
                        className="fa fa-trash fa-2"
                        style={{ cursor: "pointer" }}
                        onClick={onHandleDelete(item)}
                      ></i>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        visible={showAddModal}
        onOk={async (data) => {
          try {
            data["shop_EmployeeID"] = parseInt(data.shop_EmployeeID, 10);
            data["shop_Status"] = `${data.shop_Status}`.toLowerCase();
            await axios().post("/shops", {
              ...data,
              lease_Status: "active",
              shop_Id: 0,
            });
            setShowAddModal(false);
            getData();
          } catch (e) {}
        }}
        onClose={() => {
          setShowAddModal(false);
        }}
        title="Add New Record"
      >
        <div className="form-group">
          <label for="shop_Category">Shop Category</label>
          <input
            name="shop_Category"
            className="form-control"
            placeholder="Enter Shop Category"
          />
        </div>
        <div className="form-group">
          <label for="shop_EmployeeID">Employee Id</label>
          <input
            name="shop_EmployeeID"
            className="form-control"
            placeholder="Enter Employee Id"
          />
        </div>
        <div className="form-group">
          <label for="shop_Name">Shop Name</label>
          <input
            name="shop_Name"
            className="form-control"
            placeholder="Enter Shop Name"
          />
        </div>
        <div className="form-group">
          <label for="customers">Customer Name</label>
          <input
            name="customers"
            className="form-control"
            placeholder="Enter Customer Name"
          />
        </div>
        <div className="form-group">
          <label for="shop_Status">Shop Status</label>
          <input
            name="shop_Status"
            className="form-control"
            placeholder="Enter Shop Status"
          />
        </div>
        <div className="form-group">
          <label for="shop_Owner">Shop Owner</label>
          <input
            name="shop_Owner"
            className="form-control"
            placeholder="Enter Shop Owner"
          />
        </div>
      </Modal>
    </div>
  );
};
