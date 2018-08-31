import * as React from "react";
import { forEach } from "lodash";
import { style, extend } from "typestyle";

export class Table extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
      dataPerPage: 7,
      renderData: [],
      pageNumbers: []
    }
  }

  componentDidMount() {
    if (this.props) {
      const indexOfLastData = this.state.currentPage * this.state.dataPerPage;
      const indexOfFirstData = indexOfLastData - this.state.dataPerPage;
      const currentData = this.props.data.slice(indexOfFirstData, indexOfLastData);

      const renderData = currentData.map((data, index) => {
        return { data }
      });
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.props.data.length / this.state.dataPerPage); i++) {
        pageNumbers.push(i);
      }
      this.setState({ renderData, pageNumbers })
    }
  }

  handleClick(number) {
    this.setState({ currentPage: Number(number) }, () => {
      const indexOfLastData = this.state.currentPage * this.state.dataPerPage;
      const indexOfFirstData = indexOfLastData - this.state.dataPerPage;
      const currentData = this.props.data.slice(indexOfFirstData, indexOfLastData);

      const renderData = currentData.map((data, index) => {
        return { data }
      });
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.props.data.length / this.state.dataPerPage); i++) {
        pageNumbers.push(i);
      }
      this.setState({ renderData, pageNumbers })
    });
  }

  header = (columnName: string, index: number, props: Props) => {
    return (<th style={this.thStyle(index, props)} key={columnName}>{columnName}</th>);
  };

  thStyle = (index: number, props: Props) => {
    return {
      minWidth: "auto",
      overflow: "hidden",
      boxSizing: "border-box" as "border-box",
      fontSize: "12px"
    };
  };

  body = (props: Props) => {
    const rows = [];
    forEach(this.state.renderData, (data) => {
      const cell = [];
      forEach(props.columns, (column, index) => {
        cell.push(<td key={`${column + index}`}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 31%' }}>
            {data['data'][column]}
            {props.isLink && <a href='#' onClick={this.onTDClick(props, index, data['data'])}>View Album</a>
            }
          </div>
        </td>);
      });
      rows.push(<tr className={this.TrHover(props)}>{cell}</tr>);
    });
    return rows;
  };

  headerStyle = (props: Props): React.CSSProperties => {
    return {
      background: props.headerBgColor || "#f5f5f5",
      boxShadow: props.headerShadow ? "0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.14)" : "none"
    };
  };

  TrHover = (props: Props) => {
    if (props.hover) {
      return style({
        $nest: {
          "&:hover": {
            background: "#d6d4d4",
            cursor: "pointer",
          }
        }
      });
    }
  };

  onTDClick = (props: Props, index: number, data: object) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    return props.onClick(data, index);
  };




  render() {
    const renderPageNumbers = this.state.pageNumbers.map(number => {
      return (
        <div
          key={number}
          id={number}
          style={{
            display: 'inline-block',
          }}
          onClick={() => { this.handleClick(number) }}
        >
          <a href='#' style={{
            color: 'white',
            float: 'left',
            padding: ' 8px 16px',
            borderRadius: '5px',
            borderColor: 'black',
            textDecoration: 'none',
            marginRight: 5,
            backgroundColor: '#4CAF50',
            marginTop: 5
          }}>{number}</a>
        </div>
      );
    });
    return (
      <div>
        <table>
          <thead style={this.headerStyle(this.props)}>
            <tr>
              {this.props.columns.map((value, index) => { return this.header(value, index, this.props); })}
            </tr>
          </thead>
          <tbody>
            {this.body(this.props)}
          </tbody>
        </table>
        {renderPageNumbers}
      </div>);
  };
}



interface Props {
  columns: string[];
  data: Array<Obj>;
  headerBgColor?: string;
  headerShadow?: boolean;
  hover?: boolean;
  onClick?: (data: object, index: number) => void;
  isLink: boolean;
}

interface State {
  currentPage: number;
  dataPerPage: number;
  renderData: Array<Obj>;
  pageNumbers: any;
}

interface Obj {

}