import { FC, useEffect, useState } from "react";
import { SnackbarType } from "../../PokemonList";
import { CloseButton } from "../CloseButton/CloseButton";

import "./Snackbar.scss";

interface ISnackbar {
  /* 
    text - Snackbar info text
    variant - Snackbar option for style and general type
  */
  text: string;
  // "success" | "warning"
  variant: string;
  activeSnackbar: (state: SnackbarType[]) => void;
}

export const Snackbar: FC<ISnackbar> = ({
  text,
  variant,
  activeSnackbar,
}): JSX.Element | null => {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(true);

  // Disappear snackbar after 1,5 milliseconds
  useEffect(() => {
    setTimeout(() => {
      setShowSnackbar(false);
      activeSnackbar([{ text: "", variant: "success", activeState: false }]);
    }, 1500);
  }, []);

  return showSnackbar ? (
    <div className={`snackbar ${variant}`}>
      <p>{text}</p>
      <button
        onClick={() =>
          activeSnackbar([{ text: "", variant: "success", activeState: false }])
        }
        className="btn"
      >
        <CloseButton />
      </button>
    </div>
  ) : null;
};
