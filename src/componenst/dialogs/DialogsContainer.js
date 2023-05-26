import {sendMessageCreator, updateNewMessageTextCreator} from "../../state/dialog-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";

/**
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps (state) {
    return {
        dialogsPage: state.dialogPage
    }
}


/**
 * @param {Function} dispatch
 * @returns {Object}
 */
function mapDispatchToProps (dispatch) {
    return {
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextCreator(text))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
}

const DialogContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs)

export default DialogContainer