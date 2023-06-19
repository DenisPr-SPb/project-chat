import {DialogItem} from "./DialogItem";
import {Navigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import RoundedButton from "../common/buttons/rounded-btn/RoundedButton";
import style from "./Dialogs.module.css"

export function Dialogs({ props }) {
    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.dialogs__wrapper}>
            <div className={style.dialog__info}>
                <div className={style.dialogs__items}>
                    {props.dialogsPage.companions.map(companion => <DialogItem key={companion.id} name={companion.name} pathId={companion.id}/>)}
                </div>
                <div className={style.dialog__msg}>
                    {props.dialogsPage.messages.map(msg => <div className={style.msg__item} key={msg.id}>{msg.message}</div>)}
                </div>
            </div>
            <div className={style.dialog__text__wrapper}>
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
                    <div className={style.dialog__text__area__wrapper}>
                        <div>
                            <Field
                                name={'newMessageBody'}
                                as={'textarea'}
                                placeholder={'enter text'}/>
                        </div>

                        <div className={style.new__dialog__btn__wrapper}>
                            <RoundedButton logo={'Send'} type={'submit'}/>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}