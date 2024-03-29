import React, { useEffect, useState } from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { useContact } from '../contaxt/ContactContaxt';
import Layout from '../components/Layout'

function ContactUs() {
  const { fetchAllContacts } = useContact()

  const [contactList, setContactList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(contactList.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(-1);

  useEffect(() => {
    fetchContacts(currentPage, rowsPerPage, sortField, sortOrder);
  }, [currentPage, rowsPerPage, sortField, sortOrder]);

  const fetchContacts = async (currentPage, rowsPerPage, sortField, sortOrder) => {
    let data = await fetchAllContacts(currentPage, rowsPerPage, sortField, sortOrder);
    const totalRecordsCount = data.totalContacts;
    setTotalRecords(totalRecordsCount);
    setContactList(data.contacts);
  };

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
        Contact Us
      </div>
      <DataTable
        totalRecords={totalRecords}
        lazy
        paginator
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={hanldeSorting}
        rows={rowsPerPage}
        value={contactList}
        first={(currentPage - 1) * rowsPerPage}
        onPage={onPageChange}
        dataKey="_id"
        emptyMessage="No contact detail found."
        paginatorLeft={
          <Dropdown value={rowsPerPage} options={[10, 25, 50]} onChange={(e) => setRowsPerPage(e.value)} />
        }
      >
        <Column field="fullName" header="Full Name" sortable align="center" />
        <Column field="email" sortable header="Email" align="center" />
        <Column field="phone" header="Phone" align="center" />
        <Column field="message" header="Message" align="center" />
      </DataTable>
    </Layout>
  )
}

export default ContactUs