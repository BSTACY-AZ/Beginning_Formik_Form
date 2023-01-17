
import './App.css';
import { useState } from 'react';
import {useFormik} from 'formik';

function App() {

  const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);

  function showSuccess() {
      console.log(message);
      alert(message);
  }
    
    const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    
    onSubmit: values=>{
      setMessage('Login Successful');
      setSubmitted(true);
      console.log('form: ', values);
      showSuccess();
    },



    validate: values => {
      let errors = {};
      
      if (!values.email) {
        errors.email = 'Field required';
      }
     
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) errors.password = 'Field required';
      return errors;
    }
    ,
    
    handleSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
  }

  });
  return (
        

    <div>
      <div hidden={!submitted} className="alert alert-primary" role="alert">
        {message}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>Email</div>
        <input name="email" id="emailField" type="text" onChange={formik.handleChange}  value={formik.values.email}/>
        {formik.errors.email ? <div id="emailError" style={{color:'red'}}>{formik.errors.email}</div>: null}
        <div>Password</div>
        <input name="password" id="pswField" type="text" onChange={formik.handleChange}  value={formik.values.password}/>
        {formik.errors.password ? <div id="pswError" style={{color:'red'}}>{formik.errors.password}</div>: null}
        <button id="submitBtn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
