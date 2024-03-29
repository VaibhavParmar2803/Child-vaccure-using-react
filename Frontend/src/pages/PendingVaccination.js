import React, { useEffect, useState } from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { useAppointment } from '../contaxt/AppointmentContaxt';
import Layout from '../components/Layout'

function PendingVaccination() {
    const { fetchPendingAppointment, updateAppointmentStatuts } = useAppointment()

    const [vaccinatedList, setVaccinatedList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(vaccinatedList.length);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortField, setSortField] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(-1);

    useEffect(() => {
        fetchBookings(currentPage, rowsPerPage, sortField, sortOrder);
    }, [currentPage, rowsPerPage, sortField, sortOrder]);

    const fetchBookings = async (currentPage, rowsPerPage, sortField, sortOrder) => {
        let data = await fetchPendingAppointment(currentPage, rowsPerPage, sortField, sortOrder);
        const totalRecordsCount = data.totalAppointments;
        setTotalRecords(totalRecordsCount);
        setVaccinatedList(data.appointments);
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

    const handleStatusOfAppointment = async (id) => {
        try {
            await updateAppointmentStatuts({ status: 'completed' }, id)
            fetchBookings()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className='page-title'>
                Pending Vaccination
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
                emptyMessage="No vaccination detail found."
                paginatorLeft={
                    <Dropdown value={rowsPerPage} options={[10, 25, 50]} onChange={(e) => setRowsPerPage(e.value)} />
                }
            >
                <Column field="fullName" header="Full Name" sortable align="center" />
                <Column field="vaccine" sortable header="Vaccine" align="center" />
                <Column field="email" header="Email" align="center" />
                <Column field="phone" header="Phone" align="center" />
                <Column field="date" header="Date" align="center" />
                <Column field="gender" header="Gender" align="center" />
                <Column field="time" header="Time" align="center" />
                <Column field="age" header="Age" align="center" />
                <Column field="address" header="Address" align="center" />
                <Column
                    header="Action"
                    className='action_td'
                    align="left"
                    body={(rowData) => (
                        <>
                            <button className='complate_vaccination_button' onClick={() => handleStatusOfAppointment(rowData._id)}>Vaccinated</button>
                        </>
                    )}
                />
            </DataTable>
        </Layout>
    )
}

export default PendingVaccination