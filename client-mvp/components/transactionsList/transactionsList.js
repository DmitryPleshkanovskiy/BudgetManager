import React from 'react';
import { connect } from 'react-redux';

import TransactionsListItem from './transactionsListItem';
import { loadTransactions } from '../../actions/transactionsActions'; 

import './transactionsList.scss';


class TransactionsList extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadTransactions();
    }

    render() {
        const { transactions, isLoading } = this.props;
        console.log('tr: ');
        console.log(transactions);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Last transactions <a href="#" onClick={this.props.loadTransactions}><i className="fa fa-refresh" aria-hidden="true"></i></a></div>
                {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>}
                {!isLoading && <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Date:</th>
                        <th>Transaction type:</th>
                        <th>Value:</th>
                        <th>Description:</th>
                    </tr>
                    </thead>
                    <tbody>
                        {transactions.map(function(transaction) {
                            return (
                                <tr key={transaction._id} className={transaction.type === 'income' ? "success" : ""}>
                                    <td>{transaction.date}</td>
                                    <td className={transaction.type === 'income' ? "income" : "expense"}>
                                        {transaction.type === 'income' ? "Income" : "Expense"}</td>
                                    <td>{transaction.value}</td>
                                    <td>{transaction.description}</td>
                                </tr>
                            )
                        }, this)}
                    </tbody>
                </table>}
            </div>
        )
    }
};

TransactionsList.propTypes = {
    loadTransactions: React.PropTypes.func.isRequired
}

TransactionsList.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    console.log('state:');
    console.log(state.transactions.transactions);
    return {
        transactions: state.transactions.transactions,
        options: state.options,
        errors: state.errors,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps, { loadTransactions })(TransactionsList);