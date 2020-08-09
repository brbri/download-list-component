import React from "react";

import "./CheckBoxComponent.scss";

export default function CheckBoxComponent(props) {
  const { name, checked, state, disabled, onChange } = props;
  return (
    <div className="form-group">
    <input
      ref={(input) => {
        if (input) {
          if (state === 0) {
            input.checked = false;
            input.indeterminate = false;
          } else if (state === 2) {
            input.checked = true;
            input.indeterminate = false;
          } else if (state === 1) {
            input.indeterminate = true;
          } else if (state === 4) {
            input.disabled = true;
          }
        }
      }}
      className={checked ? "custom-checkbox active" : "custom-checkbox"}
      type="checkbox"
      name={name}
      aria-label={name}
      onChange={onChange}
      checked={checked ? "checked" : ""}
      disabled={disabled}
    ></input>
    <label htmlFor={name} onClick={onChange}></label>
    </div>
  );
}
