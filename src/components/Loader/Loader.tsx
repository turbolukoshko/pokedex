import { FC } from "react";
import loader from "../../assets/pokeball-loader.png";
import "./Loader.scss";

export const Loader: FC = (): JSX.Element => (
  <div className="loader">
    <img src={loader} alt="loader" />
  </div>
);
