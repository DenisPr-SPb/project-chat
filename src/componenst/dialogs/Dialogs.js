import {DialogItem} from "./DialogItem";
import {Navigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";

export function Dialogs({ props }) {
    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className="dialogs__wrapper">
            <div className="dialog__info">
                <div className="dialogs__items">
                    {props.dialogsPage.companions.map(companion => <DialogItem key={companion.id} name={companion.name} pathId={companion.id}/>)}
                </div>
                <div className="dialog__msg">
                    {props.dialogsPage.messages.map(msg => <div className="msg__item" key={msg.id}>{msg.message}</div>)}
                </div>
            </div>
            <div className="dialog__text__wrapper">
                <AddMessageForm sendMessage={props.sendMessage} updateNewMessageText={props.updateNewMessageText}/>
            </div>
        </div>
    )
}

function AddMessageForm({updateNewMessageText, sendMessage}) {
    const addNewMessage = (values) => {
        updateNewMessageText( values )
    }

    return (
        <Formik
            initialValues={{ newMessageBody: "" }}
            onSubmit={(values, {resetForm}) => {
                addNewMessage( values.newMessageBody )
                sendMessage()
                resetForm( {values: ''} )}}>
            {() => (
                <Form>
                    <div className="dialog__text__area__wrapper">
                        <Field
                            name={'newMessageBody'}
                            as={'textarea'}
                            placeholder={'enter text'}/>
                    </div>

                    <div className="new__dialog__btn__wrapper">
                        <button type={'submit'}>Send</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}