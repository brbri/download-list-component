import React from 'react'
import Checkbox from './../CheckboxComponent/CheckBoxComponent';
import PropTypes from "prop-types";

export default function TableRowComponent(props) {
    const {row, toggleRow} = props;
    return (
        <tr key={row.name} id={row.name} data-testid="active-row" onClick={toggleRow} className={row.selected ? "table-row row selected" : "table-row row"}>
            <td className="ww-10"><Checkbox onChange={toggleRow} name={row.name} checked={row.selected} disabled={row.status.toLowerCase() !== "available"}/></td>
            <td className="ww-10">{row.name}</td>
            <td className="ww-10 capitalize">{row.device}</td>
            <td>{row.path}</td>
            <td className="capitalize"><div className="status-container"><span className={row.status.toLowerCase() === 'available' ? 'status success' : 'status'}></span>{row.status}</div></td>
        </tr>
    )
}

TableRowComponent.propTypes = {
    row: PropTypes.shape({
        status: PropTypes.string.isRequired
    }),
    toggleRow: PropTypes.func.isRequired
  };

TableRowComponent.defaultProps = {
    row: {
        name: '',
        selected: false,
        status: '',
        device: ''
    },
    toggleRow: () => {}
};
