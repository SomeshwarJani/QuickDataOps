import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "./table.scss";
import { erroHandler, findChildNameById } from "../../utils/helper";
import { STATICSTRINGS, APIS } from "../../constants";
import { MESSAGES } from "../../messages";

const TabularView: React.FC = () => {
  const [userData, setUserData] = useState<any>([]);
  let navigate = useNavigate();
  let location = useLocation();

  const fetchUserData = async () => {
    const response = await axios.get(APIS.FETCHUSERDATA);
    if (response.status === 200) {
      setUserData(response?.data);
    } else {
      toast.error(MESSAGES.errorMessage, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUserData();
    })();
  }, []);

  const renderHeaders = () => {
    return (
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Sector</th>
        <th>Action</th>
      </tr>
    );
  };

  const onEditClicked = (e: any, id: number, sectorId: any) => {
    navigate(`${STATICSTRINGS.IDSTRING}${id}`);
  };

  const onDeleteClicked = async (e: any, id: number) => {
    await axios
      .delete(`${APIS.DELETEDATA}${id}`)
      .then(() => {
        toast.success(MESSAGES.deleteMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchUserData();
      })
      .catch((error) => {
        erroHandler(error);
      });
  };

  function StripedColumnsExample() {
    return (
      <Table striped="columns" responsive variant="light">
        <thead>{renderHeaders()}</thead>
        <tbody>
          {userData.map((row: any, index: number) => {
            return (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>
                  {findChildNameById(location.state.sectors, row.sector_id)}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={(e: any) =>
                      onEditClicked(e, row.id, row.sector_id)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={(e: any) => onDeleteClicked(e, row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
  window.onload = () => {
    navigate("/");
  };

  return (
    <div className="table-container">
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={(e: any) => navigate("/")}
      >
        HomePage
      </button>
      {userData.length ? (
        StripedColumnsExample()
      ) : (
        <div className="no-data">
          <label>No Data Available</label>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
export default TabularView;
