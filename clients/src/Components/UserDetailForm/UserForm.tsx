import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserForm.scss";
import {
  buildHierarchy,
  findChildNameById,
  useQuery,
  erroHandler,
} from "../../utils/helper";
import { STATICSTRINGS, APIS } from "../../constants";
import { MESSAGES } from "../../messages";
import Sector from "./Sector";
import Loader from "../Spinner/Loader";

interface SelectedRowData {
  id: number;
  name: string;
  sector_id: number;
  term: string;
}

const UserForm: React.FC = () => {
  const [sectors, setSectors] = useState<Object[]>([]);
  const [editModeSelectedRowData, setEditModeSelectedRowData] =
    useState<SelectedRowData | null>(null);
  const [nameField, setNameField] = useState<string>("");
  const [selectedNode, setSelectedNode] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const hasSelectedRowData = Boolean(editModeSelectedRowData);
  const query = useQuery();

  const selectedRowId = query.get(STATICSTRINGS.ID);
  const isEditMode = Boolean(selectedRowId);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchSectors();
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (isEditMode && sectors.length > 0) {
      fetchSelectedData();
    }
  }, [sectors]);

  const fetchSectors = async () => {
    const response = await axios.get(APIS.FETCHSECTORS);

    if (response.status === 200) {
      const formattedResponse = buildHierarchy(response?.data);
      setSectors(formattedResponse);
    } else {
      toast.error(MESSAGES.errorMessage, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };
  const fetchSelectedData = async () => {
    if (hasSelectedRowData) return;
    setIsLoading(true);
    const response = await axios.get(
      `${APIS.FETCH_SELECTED_ROW_DATA}${selectedRowId}`
    );
    if (response.status === 200) {
      const getEditModeData = findChildNameById(
        sectors,
        response.data.sector_id,
        true
      );
      const responseData = response?.data;
      if (getEditModeData?.sectors && responseData) {
        setSectors(getEditModeData.sectors);
        setSelectedNode(getEditModeData?.sector);
        setEditModeSelectedRowData(responseData);
        setNameField(responseData?.name);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false); // before toaster we need to stop loading
      toast.error(MESSAGES.errorMessage, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const fetchSelectedSectors = (currentNode: any, node: any) => {
    const selectedSectors = findChildNameById(
      sectors,
      currentNode.id,
      true,
      currentNode
    );
    if (selectedSectors?.sectors) {
      setSelectedNode(selectedSectors?.sector);
      setSectors(selectedSectors?.sectors);
    }
  };
  const formValidation = (ISTERMCHECKED: any) => {
    let isFormValid: boolean = false;
    if (!nameField?.length) {
      toast.warn(MESSAGES.requiredNameMsg, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (!selectedNode.checked) {
      toast.warn(MESSAGES.requiredSectorMsg, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (!ISTERMCHECKED) {
      toast.warn(MESSAGES.requiredTermMsg, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      isFormValid = true;
    }
    return isFormValid;
  };
  const insertDataToDb = async () => {
    const formData = {
      name: nameField,
      sector_id: selectedNode.id,
      term: 1,
    };
    await axios
      .post(APIS.SUBMITFORM, formData, {
        withCredentials: true,
      })
      .then(() => {
        toast.success(MESSAGES.submitMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        erroHandler(error);
      });
  };
  const updateDataToDb = async () => {
    const updatedData = {
      name: nameField,
      sector_id: selectedNode.id,
      id: selectedRowId,
    };
    await axios
      .post(APIS.UPDATEDATA, updatedData, {
        withCredentials: true,
      })
      .then(() => {
        toast.success(MESSAGES.updateMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        erroHandler(error);
      });
  };
  const setDataToDb = async () => {
    setIsLoading(true);
    if (isEditMode) {
      await updateDataToDb();
    } else {
      await insertDataToDb();
    }
    setIsLoading(false);
  };
  const clearForm = async (termBoxElement: any) => {
    setNameField("");
    await fetchSectors();
    if (termBoxElement !== null) {
      termBoxElement.checked = false;
    }
  };
  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    const termBoxElement: HTMLInputElement | null =
      document.querySelector("#term-box");
    const ISTERMCHECKED: boolean | undefined = termBoxElement?.checked;
    if (formValidation(ISTERMCHECKED)) {
      setDataToDb();
      clearForm(termBoxElement);
      navigate("/");
    }
  };

  const onInputChange = (e: any) => {
    setNameField(e.target.value);
  };
  window.onload = () => {
    navigate("/");
  };
  return (
    <div className="user-form">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={(e: any) => onFormSubmit(e)} id="form-area">
            <label className="heading-label">
              Please enter your name and pick the Sectors you are currently
              involved in.
            </label>
            <br />
            <br />
            <label htmlFor="username">
              Name<span>*</span>:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e: any) => onInputChange(e)}
              value={nameField}
            />
            <br />
            <br />
            <label htmlFor="sectors">
              Sectors<span>*</span>:
            </label>
            <Sector
              data={sectors}
              fetchSelectedSectors={fetchSelectedSectors}
            />
            <br />
            <div className="term-box">
              <input type="checkbox" name="term-box" id="term-box" />
              <label htmlFor="term-box"> Agree to terms</label>
              <br />
              <br />
            </div>
            <input type="submit" value={isEditMode ? "Update" : "Save"}></input>
            <input
              type="button"
              value="Move to User Data"
              onClick={(e: any) => {
                navigate("/user-data", { state: { sectors } });
              }}
            ></input>
          </form>
        </>
      )}

      <ToastContainer />
    </div>
  );
};
export default UserForm;
