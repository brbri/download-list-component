import React, { Component } from "react";
import PropTypes from 'prop-types';
import Checkbox from "../CheckboxComponent/CheckBoxComponent";
import TableRow from "../TableRowComponent/TableRowComponent";

import "./TableComponent.scss";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectedRows: [],
    };
  }

  componentDidMount() {
    const { rows } = this.props;
    this.receiveProps(rows)
  }

  receiveProps = (rows = []) => {
    const newListObj = [...rows].map((item) => {
      return { ...item, selected: false };
    });
    this.setState({ list: newListObj });
  }
  
  handleToggleRow = (event) => {
    const name = event.currentTarget.id;
    const { list } = this.state;
    const newListObj = [...list];
    const currItem = newListObj.find(
      (row) => row.name === name && row.status.toLowerCase() === "available"
    );
    if (currItem) {
      currItem.selected = currItem.selected ? false : true;
      this.setState({
        list: newListObj,
        selectedRows: newListObj.filter((itm) => itm.selected === true),
      });
    }
  };

  handleToggleAll = () => {
    const { list } = this.state;
    const hasSelectedItems = this.checkToggleState(list);
    let newListObj;
    if (hasSelectedItems < 2) {
      newListObj = [...list];
      newListObj
        .filter((row) => row.status.toLowerCase() === "available")
        .forEach((item) => {
          item.selected = true;
        });
    } else
      newListObj = [...list].map((item) => {
        return { ...item, selected: false };
      });
    this.setState({
      list: newListObj,
      selectedRows: newListObj.filter((itm) => itm.selected === true),
    });
  };

  handleDownload = () => {
    const { selectedRows } = this.state;
    const displayFiles = selectedRows.map((item) =>
      JSON.stringify({ device: item.device, path: item.path })
    );
    alert(displayFiles);
  };

  checkToggleState = (list) => {
    const numAvailable = list.filter(
      (itm) => itm.status.toLowerCase() === "available"
    ).length;
    const numSelected = list.filter((itm) => itm.selected === true).length;
    if (numSelected === 0 && numAvailable > 0) return 0;
    else if (numAvailable === numSelected && numAvailable > 0) return 2;
    else if (numSelected < numAvailable) return 1;
    else if(numAvailable === 0 && list.length > 0) return 4;
  };

  showDownloadBtn = (selected) => {
    return (
      <button
        className={selected ? "download-btn visible" : "download-btn"}
        tabIndex="0"
        aria-label="download-selected"
        onClick={this.handleDownload}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-download"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
          <polyline points="7 11 12 16 17 11" />
          <line x1="12" y1="4" x2="12" y2="16" />
        </svg>
        Download Selected
      </button>
    );
  };

  render() {
    const { list, selectedRows } = this.state;
    let { cols } = this.props;
    cols = cols || [];
      return (
        <table className="listing-table">
          <thead>
            <tr>
              <th data-testid="selectAll">
                <Checkbox
                  name="selectAll"
                  onChange={this.handleToggleAll}
                  state={this.checkToggleState(list, selectedRows)}
                />
              </th>
              <th className="w-150">
                {selectedRows.length
                  ? `Selected ${selectedRows.length}`
                  : "None Selected"}
              </th>
              <th>{this.showDownloadBtn(selectedRows.length)}</th>
            </tr>
            <tr className="col-label">
              <th></th>
              {cols.map((col) => (
                <th key={col.name}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((row) => (
              <TableRow
                key={row.name}
                row={row}
                toggleRow={this.handleToggleRow}
              ></TableRow>
            ))}
          </tbody>
        </table>
      );
  }
}

Table.defaultProps = {
  rows: [],
  cols: []
};

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired
};

export default Table;