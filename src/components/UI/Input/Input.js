import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
     //set input class based on the content
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    //set input type based on the content
    let inputElement = null;
    switch (props.elementType) {
        case('input'): inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value} onChange={props.changed}/>;
        break;

        case('textarea'): inputElement = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value} onChange={props.changed}/>
        break;

        case('select'): inputElement = <select 
        className={inputClasses.join(' ')} 
        value={props.value}>
            {props.elementConfig.options.map(option => (
                <option 
                key={option.value}
                value={option.value} onChange={props.changed}>
                    {option.displayValue}
                </option>
            ))}
        </select>
        break;

        default: inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value} onChange={props.changed}/>;
        
    }
    return(

        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>  
)};

export default input;