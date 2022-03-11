import { ADD_CONTACT, DELETE_CONTACT, FETCH_CONTACT, EDIT_CONTACT } from "./actionTypes"
import axios from 'axios';

export const fetchContacts = () => async dispatch => {
    console.log("inside fetch contacts");
    let response = await axios.get(
        'https://himylink-test.herokuapp.com/api/contacts'
    );
    console.log('GET response in actions', response)
    let preparedResponse = await prepareArray(response.data);
    dispatch ({
        type: FETCH_CONTACT,
        payload: preparedResponse
    });
}

async function prepareArray(response) {
    let preparedContactArray = [];
    for(let contact of response) {
        let object = {};
        object.first_name = contact.first_name;
        object.last_name = contact.last_name;
        object.email = contact.email;
        object.phone = contact.phone;
        object.id = contact.id;
        object.key = contact.id;
        preparedContactArray.push(object)
    }

    preparedContactArray.sort(function(a, b) {
        var textA = a.first_name.toUpperCase();
        var textB = b.first_name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    //console.log("preparedContactArray", preparedContactArray)
    return preparedContactArray;
}

export const addContact = (contact) => async dispatch => {
    console.log("contact data in actions", contact)
    let response = await axios.post(
        'https://himylink-test.herokuapp.com/api/contacts', 
        contact
    );
    console.log('POST response in actions', response)
    response = await axios.get(
        'https://himylink-test.herokuapp.com/api/contacts'
    );
    let preparedResponse = await prepareArray(response.data);
    dispatch ({
        type: ADD_CONTACT,
        payload: preparedResponse
    });
}

export const deleteContact = (key) => async dispatch => {
    console.log('key inside delete action', key)
    let response = await axios.delete(
        `https://himylink-test.herokuapp.com/api/contacts/${key}`
    );
    console.log('DELETE response in actions', response)
    response = await axios.get(
        'https://himylink-test.herokuapp.com/api/contacts'
    );
    let preparedResponse = await prepareArray(response.data);
    dispatch ({
        type: DELETE_CONTACT,
        payload: preparedResponse //key
    });
}

export const editContact = (contact) => async dispatch => {
    console.log('inside editContact actions', contact)
    let response = await axios.put(`https://himylink-test.herokuapp.com/api/contacts/${contact.id}`, contact);
    console.log('PUT response in actions', response)
    response = await axios.get(
        'https://himylink-test.herokuapp.com/api/contacts'
    );
    let preparedResponse = await prepareArray(response.data);
    dispatch ({
        type: EDIT_CONTACT,
        payload: preparedResponse
    });
}