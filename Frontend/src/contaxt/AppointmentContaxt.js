import React, { useContext, createContext } from "react";
import { useAuth } from "./AuthContext";
import { baseURL } from "../lib";
import axios from 'axios';

const AppointmentContext = createContext();

const AppointmentProvider = ({ children }) => {
    const { auth, toast } = useAuth();

    const headers = {
        Authorization: auth.token
    };

    const fetchAllAppointment = async (page, limit, sortField, sortOrder) => {
        try {
            const { data } = await axios.get(`${baseURL}/appointment`, { params: { page, limit, sortField, sortOrder }, headers: headers });
            if (data.error === false) {
                return data
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Appointment', detail: 'An error occurred. Please try again later.', life: 3000 })
        }
    };

    const fetchPendingAppointment = async (page, limit, sortField, sortOrder) => {
        try {
            const { data } = await axios.get(`${baseURL}/appointment/pending`, { params: { page, limit, sortField, sortOrder }, headers: headers });
            if (data.error === false) {
                return data
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Pending Appointment', detail: 'An error occurred. Please try again later.', life: 3000 })
        }
    };

    const fetchCompletedAppointment = async (page, limit, sortField, sortOrder) => {
        try {
            const { data } = await axios.get(`${baseURL}/appointment/completed`, { params: { page, limit, sortField, sortOrder }, headers: headers });
            if (data.error === false) {
                return data
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Completed Appointment', detail: 'An error occurred. Please try again later.', life: 3000 })
        }
    };

    const getSingleAppointment = async (id) => {
        try {
            const { data } = await axios.get(`${baseURL}/appointment/single/${id}`, { headers });
            return data
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Appointment', detail: 'An error occurred. Please try again later.', life: 3000 })
        }
    }

    const bookAppointment = async (appointmentDetail) => {
        try {
            const { data } = await axios.post(`${baseURL}/appointment/book`, appointmentDetail, { headers });
            if (data.error === false) {
                setTimeout(function () {
                    toast.current.show({ severity: 'success', summary: 'Appointment', detail: data.message, life: 3000 })
                }, 1000);
            } else {
                toast.current.show({ severity: 'error', summary: 'Appointment', detail: data.message, life: 3000 })
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors;
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    if (errors.length > 1) {
                        toast.current.show({ severity: 'error', summary: 'Appointment', detail: "Please fill all fields.", life: 3000 })
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Appointment', detail: errors[0].msg, life: 3000 })
                    }
                }
            } else {
                toast.current.show({ severity: 'error', summary: 'Appointment', detail: 'An error occurred. Please try again later.', life: 3000 })
            }
        }
    }

    const updateAppointment = async (appointmentDetail, id) => {
        try {
            const { data } = await axios.put(`${baseURL}/appointment/update/${id}`, appointmentDetail, { headers });
            if (data.error === false) {
                setTimeout(function () {
                    toast.current.show({ severity: 'success', summary: 'Appointment', detail: data.message, life: 3000 })
                }, 1000);
            } else {
                toast.current.show({ severity: 'error', summary: 'Appointment', detail: data.message, life: 3000 })
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors;
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    if (errors.length > 1) {
                        toast.current.show({ severity: 'error', summary: 'Appointment', detail: "Please fill all fields.", life: 3000 })
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Appointment', detail: errors[0].msg, life: 3000 })
                    }
                }
            } else {
                toast.current.show({ severity: 'error', summary: 'Appointment', detail: 'An error occurred. Please try again later.', life: 3000 })
            }
        }
    }

    const updateAppointmentStatuts = async (appointmentDetail, id) => {
        try {
            const { data } = await axios.put(`${baseURL}/appointment/update/status/${id}`, appointmentDetail, { headers });
            if (data.error === false) {
                setTimeout(function () {
                    toast.current.show({ severity: 'success', summary: 'Appointment', detail: data.message, life: 3000 })
                }, 1000);
            } else {
                toast.current.show({ severity: 'error', summary: 'Appointment', detail: data.message, life: 3000 })
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors;
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    if (errors.length > 1) {
                        toast.current.show({ severity: 'error', summary: 'Appointment', detail: "Please fill all fields.", life: 3000 })
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Appointment', detail: errors[0].msg, life: 3000 })
                    }
                }
            } else {
                toast.current.show({ severity: 'error', summary: 'Appointment', detail: 'An error occurred. Please try again later.', life: 3000 })
            }
        }
    }

    const deleteAppointment = async (id) => {
        try {
            const { data } = await axios.delete(`${baseURL}/appointment/delete/${id}`, { headers });
            if (data.error === false) {
                toast.current.show({ severity: 'success', summary: 'Appointment', detail: data.message, life: 3000 })
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Appointment', detail: 'An error occurred. Please try again later.', life: 3000 })
        }
    }

    return (
        <AppointmentContext.Provider value={{ fetchAllAppointment, fetchPendingAppointment, fetchCompletedAppointment, getSingleAppointment, bookAppointment, updateAppointment, deleteAppointment }}>
            {children}
        </AppointmentContext.Provider>
    );
};

const useAppointment = () => useContext(AppointmentContext);

export { useAppointment, AppointmentProvider };
