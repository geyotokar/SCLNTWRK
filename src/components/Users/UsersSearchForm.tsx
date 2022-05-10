import React from "react";
import {Field, Form, Formik} from "formik";
import {FilterType} from "../../REDUX/users-reducer";
import '../../assets/Form.css'

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}
const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        props.onFilterChanged(filter)
        setSubmitting(false);
    }
    return <div>
        <Formik
            initialValues={{term: '', friend: 'null'}}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form className='userSearch'>
                    <Field className='field term' type='text' name='term' />
                    <Field className='field friend' name='friend' as='select'>
                        <option value='null'>Все пользователи</option>
                        <option value='true'>Друзья</option>
                        <option value='false'>Найти друзей</option>
                    </Field>
                    <button className='userButton' type="submit" disabled={isSubmitting}>
                        Найти
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersSearchForm