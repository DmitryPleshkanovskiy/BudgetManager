import axios from 'axios';

export function addNewTransaction(transaction) {
    return dispatch => {
        return axios.post('/api/transactions', transaction);
    };
};

export function loadTransactions(options) {
    return dispatch => {
        return axios.get('/api/transactions', options).then(
            (res) => {
                console.log('get:');
                console.log(res.data);
                dispatch(updateTransactionsList(res.data))
            }
        );
    }
}

export function updateTransactionsList(transactions) {
    return {
        type: 'UPDATE_TRANSACTIONS_LIST',
        transactions
    }
}