import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { MESSAGES } from "../messages";

export const buildHierarchy = (data) => {
  const idMap = new Map();
  const root = [];
  data.forEach((item) => {
    idMap.set(item.id, { ...item, children: [] });
  });
  data.forEach((item) => {
    const parent = idMap.get(item.parentId);
    if (parent) {
      parent.children.push(idMap.get(item.id));
    } else {
      root.push(idMap.get(item.id));
    }
  });

  return root;
};

export const findChildNameById = (
  sectors,
  providedId,
  isEditMode,
  currentNode
) => {
  function findChildRecursive(sector) {
    delete sector.checked;
    if (currentNode && sector?.id === currentNode?.id) {
      sector.checked = currentNode?.checked;
      return {
        sectors,
        sector,
      };
    }
    if (sector.id === providedId) {
      if (isEditMode) {
        sector.checked = true;
        return {
          sectors,
          sector,
        };
      }
      return sector.label;
    }
    for (const child of sector.children) {
      const result = findChildRecursive(child);
      if (result !== null) {
        return result;
      }
    }

    return null;
  }

  for (const sector of sectors) {
    const result = findChildRecursive(sector);
    if (result !== null) {
      return result;
    }
  }

  return null;
};

export const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const erroHandler = (error) => {
  if (error.response) {
    toast.error(error.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.error("Request error:", error.request);
  } else if (error.request) {
    toast.error(MESSAGES.errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.error(MESSAGES.noResponseMsg, error.request);
  } else {
    console.error(MESSAGES.errorSettingMsg, error.message);
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
