import React, { useContext, createContext } from "react";
import { useAuth } from "./AuthContext";
import { baseURL } from "../lib";
import axios from 'axios';

const ContactContext = createContext();

const ContactProvider = ({ children }) => {
    const { auth, toast } = useAuth();

    const headers = {
        Authorization: auth.token
    };

    const fetchAllContacts = async (page, limit, sortField, sortOrder) => {
        try {
            const { data } = await axios.get(`${baseURL}/contact`, { params: { page, limit, sortField, sortOrder }, headers: headers });
            if (data.error === false) {
                return data
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Contact', detail: 'An error occurred. Please try again later.', life: 3000 })
        }
    };

    const createContact = async (contactDetail) => {
        try {
            const { data } = await axios.post(`${baseURL}/contact/create`, contactDetail, { headers });
            if (data.error === false) {
                setTimeout(function () {
                    toast.current?.show({ severity: 'success', summary: 'Contact', detail: data.message, life: 3000 })
                }, 1000);
                return data
            } else {
                toast.current?.show({ severity: 'error', summary: 'Contact', detail: data.message, life: 3000 })
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors;
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    toast.current?.show({ severity: 'error', summary: 'Contact', detail: errors[0].msg, life: 3000 })
                }
            } else {
                toast.current?.show({ severity: 'error', summary: 'Contact', detail: 'An error occurred. Please try again later.', life: 3000 })
            }
        }
    }

    return (
        <ContactContext.Provider value={{ fetchAllContacts, createContact }}>
            {children}
        </ContactContext.Provider>
    );
};

const useContact = () => useContext(ContactContext);

export { useContact, ContactProvider };
