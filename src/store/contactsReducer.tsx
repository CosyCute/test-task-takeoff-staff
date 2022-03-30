import { API_KEY } from './../config';
import { ContactItem } from '../types';
const defaultState = {
    contactItem: {},
    contacts: []
}

const addContact = (state: any = defaultState, action: any) => {

    let { name, secondName, phone } = action.contact

    fetch(`${API_KEY}/contacts`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, secondName: secondName, phone: phone })
    })
    return ({ ...state, contacts: [...state.contacts, action.contact] })
}

const editContact = (state: any = defaultState, action: any) => {
    let { name, secondName, phone } = action.contact

    fetch(`${API_KEY}/contacts/${action.contact.id}`, {
        method: "put",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, secondName: secondName, phone: phone })
    })
    return ({ ...state, contacts: state.contacts.map((x: ContactItem) => {
        if (x.id === action.contact.id) return action.contact
        else return x
    })})
}

const deleteContact = (state: any = defaultState, action: any) => {
    fetch(`${API_KEY}/contacts/${action.contact.id}`, {
        method: "delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return ({ ...state, contacts: state.contacts.filter((x: ContactItem) => x.id !== action.contact.id) })
}

export const contactsReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case "SET_CONTACTS": {
            return { ...state, contacts: action.contacts }
        }
        case "SET_CURRENT_CONTACT_ITEM": {
            return { ...state, contactItem: action.contactItem }
        }
        case "ADD_CONTACT": {
            return addContact(state, action)
        }
        case "EDIT_CONTACT": {
            return editContact(state, action)
        }
        case "DELTE_CONTACT": {
            return deleteContact(state, action)
        }
        default:
            return state
    }
}

