import React from "react";
import {Formik, Form, Field} from 'formik';
import '../../assets/Form.css'

type PropsType = {
    sendMessage: (body: string) => void
}

const AddMessageForm: React.FC<PropsType> = (props) => {
    return <Formik
                initialValues={{newMessageBody: ''}}
                validate={values => {
                    if (values.newMessageBody.length > 50) {
                        return <div>message too long</div>
                    }
                }}
                onSubmit={(values: {newMessageBody: string}, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
                    props.sendMessage(values.newMessageBody)
                    values.newMessageBody = ''
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='messageForm'>
                        <Field className='field' type='text' name='newMessageBody' placeholder='Сообщение'/>
                        <button type='submit' disabled={isSubmitting}>
                            Отправить
                        </button>
                    </Form>
                )}
            </Formik>
}

export default AddMessageForm
