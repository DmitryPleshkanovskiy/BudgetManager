import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addNewTransaction, loadTransactions } from '../../actions/transactionsActions';
//import { loadTransactions } from '../../actions/transactionsActions'; 

import validateInput from './validation'; 

class TransactionsForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            date: this.getDate(),
            value: '',
            description: '',
            categorie: '',
            type: 'expense',
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    getDate() {
        let date = new Date();

        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        return date.toLocaleString("en", options);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors: errors });
        }

        return isValid;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.addNewTransaction(this.state)
                .then(
                    (res) => {
                        this.setState({ date: this.getDate(), value: '', description:'', categorie: '', isLoading: false }
                        );
                        this.props.loadTransactions();
                    })
                .catch(
                    (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
                );
            
        }
    }

    render() {
        const { date, value, description, type, errors, isLoading } = this.state;
        return (
            <div className="">
                <div className="panel panel-default">
                <div className="panel-heading">Add new transaction</div>
                <div className="panel-body">        
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        {/*<label htmlFor="date">Date:</label>*/}
                        <div className="input-group">
                            <input 
                                id="date" 
                                className="form-control" 
                                name="date" 
                                type="text" 
                                placeholder="Date"
                                value={date} 
                                onChange={this.onChange}/>
                            <span className="input-group-btn">
                                <button disabled className="btn btn-default" type="button">
                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                    {errors.date && <span className="help-block alert-danger">{ errors.date }</span>}
                    <div className="form-group">
                        {/*<label htmlFor="value">Value:</label>*/}
                        <div className="input-group">
                        
                            <input 
                                id="value" 
                                className="form-control" 
                                name="value" 
                                type="text" 
                                placeholder="Value"
                                value={value} 
                                onChange={this.onChange}/>
                                <span className="input-group-btn">
                                    <button disabled className="btn btn-default" type="button"><i className="fa fa-usd" aria-hidden="true"></i></button>
                                </span>
                        </div>
                    </div>
                    {errors.value && <span className="help-block alert-danger">{ errors.value }</span>}

                    {/*<div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <select 
                            id="description" 
                            className="form-control" 
                            name="description" 
                            type="text" 
                            placeholder="Description"
                            value={this.state.description} 
                            onChange={this.onChange}>
                            <option disabled selected>Categorie</option>

                        </select>
                    </div>*/}
                    <div className="radio">
                        <label>
                            <input onChange={this.onChange} type="radio" name="type"  id="typeRadios2" value="expense" checked={ type === 'expense' }/> Expense
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input onChange={this.onChange} type="radio" name="type"  id="typeRadios1" value="income" checked={ type === 'income' } /> Income
                        </label>
                    </div>
                    <div className="form-group">
                        {/*<label htmlFor="description">Description:</label>*/}
                        <input 
                            id="description" 
                            className="form-control" 
                            name="description" 
                            type="text" 
                            placeholder="Description"
                            value={this.state.description} 
                            onChange={this.onChange}/>
                    </div>
                    {/*errors.value && <span className="help-block alert-danger">{ errors.value }</span>*/}
                    {errors.form && <div className="alert alert-danger">{ errors.form }</div>}
                    <button disabled={isLoading} id="submit" className="btn btn-primary" type="submit">
                        {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>} Submit
                    </button>
                </form>
                </div>
                </div>
            </div>
        )
    }
}

TransactionsForm.propTypes = {
    addNewTransaction: React.PropTypes.func.isRequired,
    loadTransactions: React.PropTypes.func.isRequired
}

TransactionsForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { addNewTransaction, loadTransactions })(TransactionsForm);