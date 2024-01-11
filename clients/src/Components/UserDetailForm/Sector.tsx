import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";

interface SectorProps {
  data: any;
  fetchSelectedSectors: (currentNode: any, node: any) => void;
}

const Sector: React.FC<SectorProps> = ({ data, fetchSelectedSectors }) => {
  const onChange = (currentNode: any, selectedNodes: any) => {
    fetchSelectedSectors(currentNode, selectedNodes);
  };
  return (
    <div>
      <DropdownTreeSelect
        data={data || []}
        onChange={onChange}
        mode="radioSelect"
      />
    </div>
  );
};

export default Sector;
