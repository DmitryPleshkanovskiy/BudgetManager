import React from 'react';

import TransactionsForm from '../transactionsForm/transactionsForm';
import TransactionsList from '../transactionsList/transactionsList';

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <TransactionsForm />
                    </div>
                    <div className="col-md-8">
                        <TransactionsList />
                    </div>
                </div>
            </div>
        )
    }
};

export default DashboardPage;