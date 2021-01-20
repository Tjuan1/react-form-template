import React, { Component } from "react";
import Input from '../../components/UI/Input/Input';
import classes from './Form.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Form extends Component {
    state = {
        sampleForm: {
            //define all the fields and properties we need in our form
            name: { 
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false,
            },

            email: { 
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },

            password: { 
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
           
        },
        formIsValid: false,
        loading: false,
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        //we apply the && isValid so that everything needs to be true to return true
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
       

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //create a copy before modifying the value
        const updatedSampleForm = {
            ...this.state.sampleForm
        };
        
        const updatedSampleElement = {
            ...updatedSampleForm[inputIdentifier]
        };

        updatedSampleElement.value = event.target.value;
        //validate user input
        updatedSampleElement.valid = this.checkValidity(updatedSampleElement.value, updatedSampleElement.validation);
        //set touched to true
        updatedSampleElement.touched = true;
        updatedSampleForm[inputIdentifier] = updatedSampleElement;

        //we check everything is valid to enable button
        let formIsValid = true;
        for(let inputIdentifier in updatedSampleForm) {
            formIsValid = updatedSampleForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({sampleForm : updatedSampleForm, formIsValid: formIsValid});

    }

    submitHandler = (event ) => {
        //to avoid send request automatically which would reload page.
        event.preventDefault();
        this.setState({ loading: true });
        //we create an empty object
        const formData = {};
        //we get the data from state
        //we get each field (name, email...) and the access the value
        for (let formElementIdentifier in this.state.sampleForm) {
            formData[formElementIdentifier] = this.state.sampleForm[formElementIdentifier].value;
        }
        //now we can submit our data using axios or similar, like this: 
        /* axios.post( '/userdata.json', formData )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/' );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } ); */
            console.log(formData);
    }

    

        render() {
            const formElementsArray = [];
            //dinamically create inputs based on our sampleForm in state
            //we pass id and config to each field
            for (let key in this.state.sampleForm) {
                formElementsArray.push({
                    id: key,
                    config: this.state.sampleForm[key]
                });
            }

        let form = (
            <form 
                className={classes.Form__Container}
                onSubmit={this.submitHandler}>
                    <h1>Form Template</h1>
                    <h2>React.js</h2>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/> 
                ))}
                <button class="form-button" disabled={!this.state.formIsValid}>SUBMIT</button>
            </form>
            );
            if ( this.state.loading ) {
                form = (<div>
                    <Spinner />
                    <p>Sending it somewhere</p>
                    <button onClick={this.props.history.goBack()}>Back to Form</button>
                </div>);
            }
            return(
            <div>
                {form}
            </div>
            )
        }
}

export default Form;