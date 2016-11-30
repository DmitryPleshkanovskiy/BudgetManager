import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.date)) {
        errors.date = 'Date is required';
    }

    if (Validator.isEmpty(data.value)) {
        errors.value = 'Value is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}