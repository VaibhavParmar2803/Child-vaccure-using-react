import React, { useState } from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import Layout from '../components/Layout'

//sample data
const fetchedData = [
  {
    _id: '1',
    employeeNumber: '123',
    fullName: 'John Doe',
    vaccine: 'COVID-19 Vaccine',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    department: 'HR',
    date: '2024-02-28',
    gender: 'Male',
    time: '10:00 AM',
    age: 30,
    address: '123 Main St, City'
  },
  {
    _id: '2',
    employeeNumber: '456',
    fullName: 'Jane Smith',
    vaccine: 'Flu Shot',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    department: 'IT',
    date: '2024-03-01',
    gender: 'Female',
    time: '02:30 PM',
    age: 25,
    address: '456 Oak St, Town'
  },
  {
    _id: '3',
    employeeNumber: '789',
    fullName: 'Bob Johnson',
    vaccine: 'Pfizer Vaccine',
    email: 'bob.johnson@example.com',
    phone: '555-123-4567',
    department: 'Finance',
    date: '2024-03-02',
    gender: 'Male',
    time: '09:45 AM',
    age: 40,
    address: '789 Pine St, Village'
  },
  {
    _id: '4',
    employeeNumber: '101',
    fullName: 'Alice Williams',
    vaccine: 'Moderna Vaccine',
    email: 'alice.williams@example.com',
    phone: '111-222-3333',
    department: 'Marketing',
    date: '2024-03-03',
    gender: 'Female',
    time: '03:15 PM',
    age: 28,
    address: '101 Cedar St, Hamlet'
  },
  {
    _id: '5',
    employeeNumber: '202',
    fullName: 'Charlie Brown',
    vaccine: 'Johnson & Johnson Vaccine',
    email: 'charlie.brown@example.com',
    phone: '999-888-7777',
    department: 'Engineering',
    date: '2024-03-04',
    gender: 'Male',
    time: '11:30 AM',
    age: 35,
    address: '202 Elm St, Countryside'
  },
  {
    _id: '6',
    employeeNumber: '202',
    fullName: 'Charlie Brown',
    vaccine: 'Johnson & Johnson Vaccine',
    email: 'charlie.brown@example.com',
    phone: '999-888-7777',
    department: 'Engineering',
    date: '2024-03-04',
    gender: 'Male',
    time: '11:30 AM',
    age: 35,
    address: '202 Elm St, Countryside'
  },
  {
    _id: '7',
    employeeNumber: '202',
    fullName: 'Charlie Brown',
    vaccine: 'Johnson & Johnson Vaccine',
    email: 'charlie.brown@example.com',
    phone: '999-888-7777',
    department: 'Engineering',
    date: '2024-03-04',
    gender: 'Male',
    time: '11:30 AM',
    age: 35,
    address: '202 Elm St, Countryside'
  },
  {
    _id: '8',
    employeeNumber: '202',
    fullName: 'Charlie Brown',
    vaccine: 'Johnson & Johnson Vaccine',
    email: 'charlie.brown@example.com',
    phone: '999-888-7777',
    department: 'Engineering',
    date: '2024-03-04',
    gender: 'Male',
    time: '11:30 AM',
    age: 35,
    address: '202 Elm St, Countryside'
  },
  {
    _id: '9',
    employeeNumber: '202',
    fullName: 'Charlie Brown',
    vaccine: 'Johnson & Johnson Vaccine',
    email: 'charlie.brown@example.com',
    phone: '999-888-7777',
    department: 'Engineering',
    date: '2024-03-04',
    gender: 'Male',
    time: '11:30 AM',
    age: 35,
    address: '202 Elm St, Countryside'
  },
  {
    _id: '10',
    employeeNumber: '202',
    fullName: 'Charlie Brown',
    vaccine: 'Johnson & Johnson Vaccine',
    email: 'charlie.brown@example.com',
    phone: '999-888-7777',
    department: 'Engineering',
    date: '2024-03-04',
    gender: 'Male',
    time: '11:30 AM',
    age: 35,
    address: '202 Elm St, Countryside'
  },
  {
    _id: '12',
    employeeNumber: '202',
    fullName: 'Charlie Brown',
    vaccine: 'Johnson & Johnson Vaccine',
    email: 'charlie.brown@example.com',
    phone: '999-888-7777',
    department: 'Engineering',
    date: '2024-03-04',
    gender: 'Male',
    time: '11:30 AM',
    age: 35,
    address: '202 Elm St, Countryside'
  },
];

function VaccinationDetail() {
  const [vaccinatedList, setVaccinatedList] = useState(fetchedData);
  const [totalRecords, setTotalRecords] = useState(vaccinatedList.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(-1);

  const onPageChange = (event) => {
    const newCurrentPage = Math.floor(event.first / event.rows) + 1;
    setCurrentPage(newCurrentPage);
    const newRowsPerPage = event.rows;
    setRowsPerPage(newRowsPerPage);
  };

  const hanldeSorting = async (e) => {
    const field = e.sortField;
    const order = e.sortOrder;
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <Layout>
      <div className='page-title'>
        Vaccination
      </div>
      <DataTable
        totalRecords={totalRecords}
        lazy
        paginator
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={hanldeSorting}
        rows={rowsPerPage}
        value={vaccinatedList}
        first={(currentPage - 1) * rowsPerPage}
        onPage={onPageChange}
        dataKey="_id"
        emptyMessage="No vaccinated found."
        paginatorLeft={
          <Dropdown value={rowsPerPage} options={[10, 25, 50]} onChange={(e) => setRowsPerPage(e.value)} />
        }
      >
        <Column field="_id" header="ID" sortable align="center" />
        <Column field="fullName" header="Full Name" sortable align="center" />
        <Column field="vaccine" sortable header="Vaccine" align="center" />
        <Column field="email" sortable header="Email" align="center" />
        <Column field="phone" header="Phone" align="center" />
        <Column field="date" header="Date" align="center" />
        <Column field="gender" header="Gender" align="center" />
        <Column field="time" header="Time" align="center" />
        <Column field="age" header="Age" align="center" />
        <Column field="address" header="Address" align="center" />
      </DataTable>
    </Layout>
  )
}

export default VaccinationDetail