const initialState = {
    transactions: [],
    options: {},
    errors: {},
    isLoading: false
}

export default (state=initialState, action = {}) => {
    switch(action.type) {
        case 'UPDATE_TRANSACTIONS_LIST':
            console.log('reducer transact:');
            console.log(action.transactions);
            return {
                transactions: action.transactions
            }
        default: return state;
    }
}