import { combineReducers, createStore } from 'redux'
import { authReducer } from './authReducer';
import { contactsReducer } from './contactsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    contacts: contactsReducer
})

export const store = createStore(rootReducer);