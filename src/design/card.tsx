import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import { getContrast50 } from "../helper/helper";

export const Card: React.StatelessComponent<Props> = (props) => {

  const cardStyle = (props: Props) => {
    return {
      boxShadow: props.shadow ? "0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.14)" : "none",
      cursor: props.clickable ? "pointer" : "auto",
      width: props.width,
    };
  };

  return (
    <div>
      <div style={cardStyle(props)} className="card">
        {cardHeader(props)}
        <div className="card-container">
          <div className="content" style={{ height: props.height }}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

const cardHeader = (props: Props) => {

  const headerStyle = {
    backgroundColor: props.headerBgColor || "#252525",
    color: getContrast50(props.headerBgColor || "#252525"),
    display: 'grid',
    gridTemplateColumns: '89% 5%'
  };


  return (
    <div className="card-header" style={headerStyle}>
      {props.header}
      {
        props.isIcon &&
        <div
          onClick={props.onDelete}
          style={{ marginTop: '-9px' }}
        >
          <FontAwesome
            name="close"
            style={{ color: 'white' }}
          />
        </div>
      }
    </div>
  );
};



interface Props {
  children: any;
  header: string;
  shadow?: boolean;
  width?: string;
  clickable?: boolean;
  headerBgColor?: string;
  onDelete?: () => void;
  height?: string;
  isIcon: boolean
}