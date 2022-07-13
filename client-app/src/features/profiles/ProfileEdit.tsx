import { Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default function ProfileEdit({setEditMode}: Props) {
    const {profileStore : {profile, editProfile}} = useStore();


    const validationSchema = Yup.object({
        displayName: Yup.string().required('Display Name is a required field')
    })

    function handleFormSubmit(profile: Partial<Profile>) {
        editProfile(profile).then(() => setEditMode(false));
    }

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
            onSubmit={values => handleFormSubmit(values)}
        >
            {({ isValid, isSubmitting, dirty}) => (
                <Form
                    className='ui form'
                    autoComplete='off'
                >
                    <MyTextInput name='displayName' placeholder='DisplayName' />
                    <MyTextArea rows={3} placeholder='Bio' name='bio' />
                    <Button
                        floated='right'
                        type='submit'
                        content='Update profile'
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting}
                        color='green'
                        positive
                    />
                </Form>
            )}
        </Formik>

    )
}