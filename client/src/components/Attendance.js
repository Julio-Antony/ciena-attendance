import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  &:hover {
    cursor: pointer;
  }
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <div className="btn-search" onClick={onClear}>
      X
    </div>
  </>
);

const Attendance = () => {
  const [participants, setParticipants] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    axios
      .get("/api/participants")
      .then((res) => {
        setParticipants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredItems = participants.filter(
    (item) =>
      item.Nama && item.Nama.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.Nama,
    },
    {
      name: "Kode Pendaftaran",
      selector: (row) => row.Code,
    },
    {
      name: "Perusahaan",
      selector: (row) => row.Perusahaan,
    },
    {
      name: "Alamat Perusahaan",
      selector: (row) => row.Alamat_Perusahaan,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
    },
    {
      name: "Telepon",
      selector: (row) => row.HP,
    },
    {
      name: "Divisi",
      selector: (row) => row.Role,
    },
    // {
    //   name: "Ukuran Baju",
    //   selector: (row) => row.Ukuran_Baju,
    // },
  ];

  return (
    <div className="row p-3">
      <div className="col-md-10 offset-md-1">
        <div className="card mb-3">
          <DataTable
            title="Daftar Partisipan"
            columns={columns}
            data={filteredItems}
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
