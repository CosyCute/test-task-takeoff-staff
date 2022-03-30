import React, { useState, useEffect } from 'react';
import Header from './../../components/Header/Header';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import { API_KEY } from './../../config';
import { ContactItem } from '../../types';
import ModalWindow from './../../components/ModalWindow/ModalWindow';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

const Contacts = () => {

    const emptyContact: ContactItem = {
        id: 0,
        name: '',
        secondName: '',
        phone: ''
    }

    const [action, setAction] = useState('')

    const dispatch = useDispatch()

    const [openModal, setOpenModal] = useState<boolean>(false)

    const contactsData = useSelector((state: RootStateOrAny) => state.contacts.contacts)

    const [filterArr, setFilterArr] = useState<Array<ContactItem>>(contactsData)

    useEffect(() => {
        fetch(`${API_KEY}/contacts`)
            .then((res) => res.json())
            .then((res) => dispatch({ type: "SET_CONTACTS", contacts: res }))
    }, [])

    useEffect(() => {
        setFilterArr(contactsData)
    }, [contactsData])

    const addContact = () => {
        setAction('Add contact')
        setOpenModal(true)
        dispatch({ type: "SET_CURRENT_CONTACT_ITEM", contactItem: emptyContact })
    }
    const editContact = (x: ContactItem) => {
        setAction('Edit contact')
        setOpenModal(true)
        dispatch({ type: "SET_CURRENT_CONTACT_ITEM", contactItem: x })
    }
    const deleteContact = (x: ContactItem) => {
        setAction("Do you really want to delete a contact?")
        setOpenModal(true)
        dispatch({ type: "SET_CURRENT_CONTACT_ITEM", contactItem: x })
    }

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterArr(contactsData.filter((x: ContactItem) => x.name.toLowerCase().includes(e.target.value)))
    }

    return (
        <div>
            <Header />
            <ModalWindow action={action} openModal={openModal as boolean} setOpenModal={setOpenModal} />
            <Box sx={{ mt: 10, width: 2 / 3, display: 'flex', justifyContent: 'space-between', mx: 'auto' }}>
                <TextField onChange={search} label="Search" sx={{ backgroundColor: 'white', borderRadius: '10px' }} />
                <Button onClick={addContact} variant='contained'>
                    Add<Add />
                </Button>
            </Box>
            <TableContainer sx={{ mt: 2, width: 2 / 3, mx: 'auto' }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Second Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell align="right">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterArr.map((x: ContactItem) => {
                            return (
                                <TableRow key={x.id}>
                                    <TableCell>{x.name}</TableCell>
                                    <TableCell>{x.secondName}</TableCell>
                                    <TableCell>{x.phone}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => editContact(x)}><Edit /></Button>
                                        <Button onClick={() => deleteContact(x)}><Delete /></Button>
                                    </TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Contacts;