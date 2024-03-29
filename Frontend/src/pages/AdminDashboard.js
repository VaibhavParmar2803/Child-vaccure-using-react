import React, { useState, useEffect } from 'react';
import { CRow, CCol, CWidgetStatsF } from '@coreui/react';
import { Chart } from 'primereact/chart';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useAppointment } from '../contaxt/AppointmentContaxt';
import { useContact } from '../contaxt/ContactContaxt';
import Layout from '../components/Layout';

function AdminDashboard() {
    const { bookAppointments, pendingAppointments, completedAppointments } = useAppointment()
    const { totalContacts } = useContact()

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'],
            datasets: [
                {
                    label: 'Records',
                    data: [1065, 2059, 2080, 2081, 1056, 855, 940, 977, 1088, 2099, 2585, 2890],
                    fill: false,
                    borderColor: 'green',
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: 'green'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <Layout>
            <CRow>
                <CCol xs={3}>
                    <Link to='/admin/bookings'>
                        <CWidgetStatsF
                            className="mb-3"
                            icon={<Icon icon="mdi:account-student" style={{ color: 'blueviolet' }} width={50} height={50} />}
                            title="Book Appointment"
                            value={bookAppointments} />
                    </Link>
                </CCol>
                <CCol xs={3}>
                    <Link to='/admin/contact-us'>
                        <CWidgetStatsF
                            className="mb-3"
                            icon={<Icon icon="fa-solid:chalkboard-teacher" style={{ color: 'blueviolet' }} width={50} height={50} />}
                            title="Contacts"
                            value={totalContacts} />
                    </Link>
                </CCol>
                <CCol xs={3}>
                    <Link to='/admin/vaccination/pending'>
                        <CWidgetStatsF
                            className="mb-3"
                            icon={<Icon icon="fa6-solid:users" style={{ color: 'blueviolet' }} width={50} height={50} />}
                            title="Pending Vaccinations"
                            value={pendingAppointments} />
                    </Link>
                </CCol>
                <CCol xs={3}>
                    <Link to='/admin/vaccination/full'>
                        <CWidgetStatsF
                            className="mb-3"
                            icon={<Icon icon="fluent-mdl2:vaccination" style={{ color: 'blueviolet' }} width={50} height={50} />}
                            title="Full Vaccinations"
                            value={completedAppointments} />
                    </Link>
                </CCol>
            </CRow>
            <CRow className='chart'>
                <div className='chart-title'>
                    Earning (Past 12 Months)
                </div>
                <Chart type="line" data={chartData} options={chartOptions} />
            </CRow>
        </Layout>
    )
}

export default AdminDashboard