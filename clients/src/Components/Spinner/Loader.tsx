import React from "react";
import { Spin } from "antd";
import "./Loader.scss";

const Loader: React.FC = () => (
  <div className="loader">
    <Spin />
  </div>
);

export default Loader;
