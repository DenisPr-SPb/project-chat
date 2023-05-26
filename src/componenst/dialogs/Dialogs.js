import {DialogItem} from "./DialogItem";

export function Dialogs({sendMessage, updateNewMessageText, dialogsPage}) {
    const newMsgText = dialogsPage.newMsgText
    function addNewMsg () {
        sendMessage()
    }

    function onMsgChange (e) {
        const text = e.target.value
        updateNewMessageText(text)
    }

    return (
        <div className="dialogs__wrapper">
            <div className="dialog__info">
                <div className="dialogs__items">
                    {dialogsPage.companions.map(companion => <DialogItem key={companion.id} name={companion.name} pathId={companion.id}/>)}
                </div>
                <div className="dialog__msg">
                    {dialogsPage.messages.map(msg => <div className="msg__item" key={msg.id}>{msg.message}</div>)}
                </div>
            </div>
            <div className="dialog__text__wrapper">
                <div className="dialog__text__area__wrapper">
                    <label>
                        <textarea name="msg" id="" cols="50" rows="1"
                                  onChange={onMsgChange}
                                  value={newMsgText}
                        />
                    </label>
                </div>
                <div className="new__dialog__btn__wrapper">
                    <button className="new__dialog__btn" onClick={ addNewMsg }>Send</button>
                </div>
            </div>
        </div>
    )
}