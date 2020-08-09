import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TableComponent from "./TableComponent";

describe('Table Render', () => {
    test('renders Table component', () => {
    render(<TableComponent />);
  });
});

describe('Check Table', () => {
    it('should check select-all box', () => {
        const { getByTestId, container } = render(<TableComponent cols={[{name: 'name', header: 'Name'}, {name: 'device', header: 'Device'}, {name: 'path', header: 'Path'}, {name: 'status', header: 'Status'}]} rows={[
            {name: 'jon.exe', device: 'Jon', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\jon.exe', status: 'scheduled'},
            {name: 'tyrion.exe', device: 'Tyrion', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\tyrion.exe', status: 'scheduled'},
            {name: 'tywin.dll', device: 'Tywin', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\tywin.dll', status: 'scheduled'},
            {name: 'khaleesi.dll', device: 'Khaleesi', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\khaleesi.dll', status: 'scheduled'},
            {name: 'geoffrey.exe', device: 'Geoffrey', path: '\\Device\\HarddiskVolume1\\temp\\geoffrey.exe', status: 'available'}
        ]} />);
        const checkBoxes = container.querySelectorAll('.table-row');
        const selectAllCheckbox = getByTestId('selectAll').querySelector('input');
        checkBoxes.forEach((checkbox) => {
            fireEvent.click(checkbox);
        })
        expect(selectAllCheckbox).toBeChecked();
    })

    it('should uncheck select-all box', () => {
        const { getByTestId, container } = render(<TableComponent cols={[{name: 'name', header: 'Name'}, {name: 'device', header: 'Device'}, {name: 'path', header: 'Path'}, {name: 'status', header: 'Status'}]} rows={[
            {name: 'jon.exe', device: 'Jon', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\jon.exe', status: 'available'},
            {name: 'tyrion.exe', device: 'Tyrion', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\tyrion.exe', status: 'available'}
        ]} />);
        const checkBoxes = container.querySelectorAll('.table-row');
        const selectAllCheckbox = getByTestId('selectAll').querySelector('input');
        checkBoxes.forEach((checkbox) => {
            fireEvent.click(checkbox);
        })
        checkBoxes.forEach((checkbox) => {
            fireEvent.click(checkbox);
        })

        expect(selectAllCheckbox).not.toBeChecked();
    })

    it('should be indeterminate select-all box', () => {
        const { getByTestId, container } = render(<TableComponent cols={[{name: 'name', header: 'Name'}, {name: 'device', header: 'Device'}, {name: 'path', header: 'Path'}, {name: 'status', header: 'Status'}]} rows={[
            {name: 'jon.exe', device: 'Jon', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\jon.exe', status: 'available'},
            {name: 'tyrion.exe', device: 'Tyrion', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\tyrion.exe', status: 'available'}
        ]} />);
        const checkBoxes = container.querySelectorAll('.table-row');
        const selectAllCheckbox = getByTestId('selectAll').querySelector('input');
        fireEvent.click(checkBoxes[0]);

        expect(selectAllCheckbox.indeterminate).toEqual(true);
        expect(selectAllCheckbox).not.toBeChecked();
    })

    it('should disable all checkboxes', () => {
        const { container } = render(<TableComponent cols={[{name: 'name', header: 'Name'}, {name: 'device', header: 'Device'}, {name: 'path', header: 'Path'}, {name: 'status', header: 'Status'}]} rows={[
            {name: 'jon.exe', device: 'Jon', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\jon.exe', status: 'scheduled'},
            {name: 'tyrion.exe', device: 'Tyrion', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\tyrion.exe', status: 'scheduled'}
        ]} />);
        const rows = container.querySelectorAll('.table-row');

        rows.forEach(row => {
            const checkbox = row.querySelector('input');
            expect(checkbox.disabled).toEqual(true);
        })
    })
});