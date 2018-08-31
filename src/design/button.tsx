import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import "../helper/App.scss";
import { style } from "typestyle";
import { color } from "csx/lib";
import { getContrast50 } from "../helper/helper";

export const Button: React.StatelessComponent<Props> = (props) => {
  return (
    <button
      className={buttonStyle(props)}
      style={{
        fontSize: '19px',
        marginTop: '24px',
      }}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {icons(props)}
      {props.children}
    </button>
  );
};

const buttonStyle = (props: Props) => {
  if (props.disabled) {
    return style({
      $nest: {
        "&:disabled": {
          background: props.disabledBgColor || "#eeeeee",
          color: getContrast50(props.disabledBgColor),
          cursor: "not-allowed",
        }
      }
    });
  }

  if (props.hover) {
    return style({
      background: props.bgColor || "#32CD32",
      color: getContrast50(props.bgColor),
      $nest: {
        "&:hover": {
          background: props.hoverBgColor ? color(props.hoverBgColor).toString() : color(props.bgColor || "#32CD32").darken(.05).toString(),
          color: getContrast50(props.hoverBgColor),
        },
        "&:focus": {
          background: props.hoverBgColor || "#90EE90",
          color: getContrast50(props.hoverBgColor),
        }
      }
    });
  }
};

const icons = (props: Props) => {
  if (props.icon) {
    return (
      <div className="button-icon" style={iconsStyle(props)}>
        <FontAwesome
          name={props.icon}
        />
      </div>
    );
  }
};

const iconsStyle = (props: Props) => {
  return {
    color: props.iconColor
  };
};

interface Props {
  type?: string;
  disabled?: boolean;
  children?: React.ReactChild;
  hover?: boolean;
  hoverBgColor?: string;
  bgColor?: string;
  disabledBgColor?: string;
  onClick?: () => void;
  icon?: string;
  iconColor?: string;
}
