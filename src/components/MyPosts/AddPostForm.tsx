import React from "react";
import {Formik, Form, Field} from 'formik';
import {useDispatch} from "react-redux";
import {actions} from "../../REDUX/profile-reducer";
import '../../assets/Form.css'

const AddPostForm: React.FC = () => {
    const dispatch = useDispatch()

    const addPostCB = (newPostText: string) => {
        dispatch(actions.addPost(newPostText))
    }
    return <Formik
        initialValues={{newPostText: '' as string}}
        validate={values => {
            if (values.newPostText.length > 50) {
                return <div>post too long</div>
            }
        }}
        onSubmit={(values: { newPostText: string }, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
            addPostCB(values.newPostText)
            values.newPostText = ''
            setSubmitting(false);
        }}
    >
        {({isSubmitting}) => (
            <Form>
                <Field className='field' type='text' name='newPostText'/>
                <button type='submit' disabled={isSubmitting}>
                    Add post
                </button>
            </Form>
        )}
    </Formik>
}

export default AddPostForm