import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import TableRow from "./TableRowComponent";

describe('Table Render', () => {
    test('renders Table component', () => {
    render(<TableRow row={{name: 'jon.exe', device: 'Jon', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\jon.exe', status: 'scheduled'}}/>);
  });
});

describe('Check Row Events', () => {
    it('disabled checked box should be disabled', () => {
        const { container } = render(<TableRow row={{name: 'jon.exe', device: 'Jon', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\jon.exe', status: 'scheduled'}} />);
        const checkBox = container.querySelector('input');
        expect(checkBox.checked).toEqual(false);
        expect(checkBox.disabled).toEqual(true);
    })

    it('checked box should check', () => {
        const { getByTestId, container } = render(<TableRow row={{name: 'jon.exe', device: 'Jon', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\jon.exe', status: 'available'}} />);
        const checkBox = container.querySelector('input');
        expect(checkBox.checked).toEqual(false);
        expect(getByTestId('active-row')).toHaveAttribute('id');
        fireEvent.click(checkBox);
        expect(checkBox.checked).toEqual(true);
        fireEvent.click(checkBox);
        expect(checkBox.checked).toEqual(false);
    })
});