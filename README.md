# Form Template 

Form template following the Academind´s approach in their Forms and Form Validation module (React course). 
I have tuned it up a bit to make it reusable and easy to customize. 

## Getting Started

Add or remove the various javascript objects inside sampleForm (in Form.js). You can adjust the input config in there. For instance: 
```
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
```

As seen above , type (inside elemenConfig) defines the input type. We can specify if we require validation and a minimun length as well. Properties "valid" and "touched" are required for styling purposes.

## Element Types

There are currently three element types: "input" , "textarea" and "select". If you need to add something else, Input.js is the file you need to edit. 
```
   switch (props.elementType) {
        case('input'): inputElement = <input ...
        
        case('textarea'): inputElement = <textarea ...
        
        case('select'): inputElement = <select ...
```

### Installing


```
npm install
```



## Built With

* React.js
 

## Authors

* **Bruno Marijuan**

## License

This project is licensed under the MIT License

