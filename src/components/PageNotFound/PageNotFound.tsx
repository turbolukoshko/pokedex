import { FC } from "react";
import { Link } from "react-router-dom";
import pageNotFound from "../../assets/page-not-found.jpg";
import "./PageNotFound.scss";

export const PageNotFound: FC = (): JSX.Element => {
  return (
    <section className="page-not-found">
      <div className="page-not-found__wrapper">
        <img
          src={pageNotFound}
          alt="page not found"
          className="page-not-found__wrapper-img"
        />
      </div>
      <h1 className="page-not-found__title">Page Not Found</h1>
      <Link to="/" className="page-not-found__link">
        Go Home
      </Link>
    </section>
  );
};
