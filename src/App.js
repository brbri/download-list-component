import React, { Component } from "react";
import Table from "./Components/TableComponent/TableComponent";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    //Simulate fetching data in case data is dynamically loaded
    try {
      const data = await this.fetchData();
      const newListObj = [...data].map((item) => {
        return { ...item, selected: false };
      });
      this.setState({ downloads: newListObj, error: null });
    } catch (error) {
      this.setState({ error: error.message, response: [] });
    }
  }

  fetchData = () => {
    const downloads = [
      {
        name: "smss.exe",
        device: "Stark",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
        status: "scheduled"
      },
      {
        name: "netsh.exe",
        device: "Targaryen",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
        status: "available"
      },
      {
        name: "uxtheme.dll",
        device: "Lanniester",
        path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
        status: "available"
      },
      {
        name: "cryptbase.dll",
        device: "Martell",
        path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
        status: "scheduled"
      },
      {
        name: "7za.exe",
        device: "Baratheon",
        path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
        status: "available"
      }
    ];
    return new Promise((resolve, reject) => {
      resolve(downloads);
    });
  };

  renderTable = (downloads) => {
    if (downloads) {
      return (
        <Table
          cols={[
            { name: "name", header: "Name" },
            { name: "device", header: "Device" },
            { name: "path", header: "Path" },
            { name: "status", header: "Status" }
          ]}
          rows={downloads || []}
        />
      );
    }
  };

  render() {
    const { downloads } = this.state;
    return (
      <div className="App">
        {this.renderTable(downloads)}
        <h3>Component is reusable, responsive and accessible!</h3>
        <Table
          cols={[
            { name: "name", header: "Name" },
            { name: "device", header: "Device" },
            { name: "path", header: "Path" },
            { name: "status", header: "Status" }
          ]}
          rows={[
            {
              name: "jon.exe",
              device: "Jon",
              path: "\\Device\\HarddiskVolume2\\Windows\\System32\\jon.exe",
              status: "scheduled"
            },
            {
              name: "tyrion.exe",
              device: "Tyrion",
              path: "\\Device\\HarddiskVolume2\\Windows\\System32\\tyrion.exe",
              status: "scheduled"
            },
            {
              name: "tywin.dll",
              device: "Tywin",
              path: "\\Device\\HarddiskVolume1\\Windows\\System32\\tywin.dll",
              status: "scheduled"
            },
            {
              name: "khaleesi.dll",
              device: "Khaleesi",
              path:
                "\\Device\\HarddiskVolume1\\Windows\\System32\\khaleesi.dll",
              status: "scheduled"
            },
            {
              name: "geoffrey.exe",
              device: "Geoffrey",
              path: "\\Device\\HarddiskVolume1\\temp\\geoffrey.exe",
              status: "available"
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
