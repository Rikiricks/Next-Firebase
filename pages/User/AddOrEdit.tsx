import React, { useState } from 'react'
import {
    Grid,
    TextField,
    Button,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import Router from 'next/router'


import { IUser } from '../../model/User';
import {IData} from '../../model/User';
import { NavLink } from '../../components/NavLink';
import {firebaseService} from '../../services'
import { useRouter } from 'next/router';




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: '450px',
            display: 'block',
            margin: '0 auto',
        },
        textField: {
            '& > *': {
                width: '100%',
            },
        },
        submitButton: {
            marginTop: '24px',
        },
        title: { textAlign: 'center' },
        successMessage: { color: 'green' },
        errorMessage: { color: 'red' },
    })
)

interface ISignUpForm {
    name: string
    phone: string    
    email: string
}

interface IFormStatus {
    message: string
    type: string
}

interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
    success: {
        message: 'Signed up successfully.',
        type: 'success',
    },
    duplicate: {
        message: 'Email-id already exist. Please use different email-id.',
        type: 'error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}
 
const AddEdit: React.FC<IUser> = (props:any) => {
    console.log(JSON.stringify(props.user));
    console.log(props.id);
    const user = props.user;
  
    const isAddMode = !user;
    const router = useRouter();
    const fbService = new firebaseService('User');

    const classes = useStyles()
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    })

    let initialValues = {
       
            name: user.name || '',
             email: user.email || '',
              phone: user.phone || ''
        };

        

    const createNewUser = async (data: IData, resetForm: Function) => {
        try {
            // API call integration will be here. Handle success / error response accordingly.
            if (data) {               
               
               
                if(!isAddMode){
                    fbService.update(data,props.id);
                }else{
                    fbService.create(data);

                }
                setFormStatus(formStatusProps.success);
                resetForm({});
                Router.push("/User");

            }
        } catch (error) {
            const response = error.response
            if (
                response.data === 'user already exist' &&
                response.status === 400
            ) {
                setFormStatus(formStatusProps.duplicate);
            } else {
                setFormStatus(formStatusProps.error);
            }
        } finally {
            setDisplayFormStatus(true);
        }
    }

    return (
        <>
        <div className={classes.root}>
        <Formik
          enableReinitialize={true}
           initialValues={initialValues}

            onSubmit={(values: IData, actions) => {
                               
                createNewUser(values, actions.resetForm)
               
                setTimeout(() => {
                    actions.setSubmitting(false)
                }, 500)
            }}

            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required('Enter valid email-id'),
                name: Yup.string().required('Please enter full name'),
                phone: Yup.string()                    
                    .required('Please enter phone number'),                
            })}
        
        >
            {(props: FormikProps<IData>) => {
                    const { 
                        values,                       
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                    } = props;
                    console.log(JSON.stringify(values));
                    return (
                        <Form>
                            <h1 className={classes.title}>User</h1>
                            <Grid
                                container
                                justify="space-around"
                                direction="row"
                            >
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
                                    className={classes.textField}
                                >
                                    <TextField
                                        name="name"
                                        id="name"
                                        label="Name"
                                        value={values.name}
                                        type="text"
                                        helperText={
                                            errors.name && touched.name
                                                ? errors.name
                                                : 'Enter your name.'
                                        }
                                        error={
                                            errors.name && touched.name
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
                                    className={classes.textField}
                                >
                                    <TextField
                                        name="phone"
                                        id="phone"
                                        label="Phone"
                                        value={values.phone}
                                        type="text"
                                        helperText={
                                            errors.phone && touched.phone
                                                ? 'Please valid phone'
                                                : 'Please enter phone'
                                        }
                                        error={
                                            errors.phone && touched.phone
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
                                    className={classes.textField}
                                >
                                    <TextField
                                        name="email"
                                        id="email"
                                        label="Email-id"
                                        value={values.email}
                                        type="email"
                                        helperText={
                                            errors.email && touched.email
                                                ? errors.email
                                                : 'Enter email-id'
                                        }
                                        error={
                                            errors.email && touched.email
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
                                    className={classes.submitButton}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                    {displayFormStatus && (
                                        <div className="formStatus">
                                            {formStatus.type === 'error' ? (
                                                <p
                                                    className={
                                                        classes.errorMessage
                                                    }
                                                >
                                                    {formStatus.message}
                                                </p>
                                            ) : formStatus.type ===
                                              'success' ? (
                                                <p
                                                    className={
                                                        classes.successMessage
                                                    }
                                                >
                                                    {formStatus.message}
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}

        </Formik>

        </div>
        </>
        
    );
}

export default AddEdit;