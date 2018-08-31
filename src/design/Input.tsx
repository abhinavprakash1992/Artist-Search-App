import * as React from "react";
import * as FontAwesome from "react-fontawesome";

export const Input: React.StatelessComponent<Props> = (props) => {
  return (
    <div className="input-field draggable .resizable">
      <label>
        {props.labelColor || props.labelFontWeight ?
          <span style={{ color: props.labelColor, fontWeight: props.labelFontWeight }}>
            {props.label}
          </span> :
          props.label}
        <span className="required">{props.required ? "*" : ""}</span>
      </label>
      <section style={inputStyle(props)}>
        {icon(props)}
        <input
          onChange={onChangeInput(props)}
          type={props.type}
          value={props.value}
          readOnly={props.readonly}
          name={props.name}
          className={"mousetrap"}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          style={{ color: props.textColor, fontWeight: props.fontWeight }}
          onKeyUp={props.onKeyUp}
          maxLength={props.maxLength}
          ref={(el) => { props.inputRef && props.inputRef(el); }}
        />
      </section>
      <div className="input-error">
        {props.error}
      </div>
    </div>
  );
};


export const mask = (props: Props, value: string) => {
  return props.mask.test(value);
};

export const handleError = (props: Props, value: string) => {
  let error = "";
  if (props.mask) {
    if (!mask(props, value)) {
      error = props.maskError;
    }
  }
  if (props.required && value === "") {
    error = `${props.label} is a Required field`;
  }
  return error;
};

const icon = (props: Props) => {
  if (!props.icon) {
    return;
  }

  return (
    <FontAwesome
      name={props.icon}
    />
  );
};

const onChangeInput = (props: Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
  props.onChange ? props.onChange(e.target.name, e.target.value, handleError(props, e.target.value)) : "";
};

const inputStyle = (props: Props) => {
  if (props.error && props.error.length > 0) {
    return {
      border: "red 1px solid"
    };
  }
};
export interface Props {
  label: string;
  name: string;
  type: string;
  error: string;
  maxLength?: number;
  onChange?: (fieldName: string, value: string, error: string) => void;
  required?: boolean;
  value?: string | number;
  icon?: string;
  mask?: RegExp;
  maskError?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  labelColor?: string;
  inputRef?: (el: HTMLInputElement) => void;
  textColor?: string;
  fontWeight?: 900;
  labelFontWeight?: 900;
}