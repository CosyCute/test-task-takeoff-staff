import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { ContactItem } from '../../types';

interface propsType {
    openModal: boolean,
    setOpenModal: Function,
    action: string
}

const ModalWindow = (props: propsType) => {

    const currentContact = useSelector((state: RootStateOrAny) => state.contacts.contactItem);

    const dispatch = useDispatch()

    const handleClose = () => {
        props.setOpenModal(false)
    }

    const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let target = (e.target as HTMLFormElement);
        const actionContact: ContactItem = {
            name: target.Name.value,
            secondName: target.SecondName.value,
            phone: target.phone.value,
            id: currentContact.id,
        }
        if (props.action === "Add contact")
            dispatch({ type: "ADD_CONTACT", contact: actionContact })
        else dispatch({ type: "EDIT_CONTACT", contact: actionContact })
        handleClose()
    }

    const deleteContact = () => {
        dispatch({type: "DELTE_CONTACT", contact: currentContact})
        handleClose()
    }

    return (
        <Modal
            sx={{ display: 'flex', justifyContent: "center" }}
            open={props.openModal}
            onClose={handleClose}>
            {!props.action.includes("delete") ?
                <Box sx={{ width: 600, height: 400, backgroundColor: 'white', my: 'auto', borderRadius: '10px' }}>
                    <Typography sx={{ margin: '20px 35px' }} variant="h5">{props.action}</Typography>
                    <form
                        onSubmit={sendForm}
                        style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', maxWidth: 400, height: 290, margin: '0 auto' }}>
                        <TextField defaultValue={currentContact.name} id="Name" label="Name" variant="outlined" />
                        <TextField defaultValue={currentContact.secondName} id="SecondName" label="Second name" variant="outlined" />
                        <TextField defaultValue={currentContact.phone} id="phone" label="Phone" variant="outlined" />
                        <Button type="submit" sx={{ width: 150, mx: 'auto', mt: 1 }} variant="contained">Send</Button>
                    </form>
                </Box>
                :
                <Box sx={{ width: 600, height: 200, backgroundColor: 'white', my: 'auto', borderRadius: '10px' }}>
                    <Typography align="center" my={'20px'} variant="h5">{props.action}</Typography>
                    <Box sx={{mt: '50px', mx:'auto', width: 300, display: 'flex', justifyContent: 'space-between'}}>
                        <Button onClick={deleteContact} sx={{width: 100}}>Yes</Button>
                        <Button onClick={handleClose} sx={{width: 100}} variant='contained'>No</Button>
                    </Box>
                </Box>
            }
        </Modal >
    );
};

export default ModalWindow;