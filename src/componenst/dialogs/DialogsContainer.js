import {sendMessageCreator, updateNewMessageTextCreator} from "../../state/dialog-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hocs/withAuthRedirect";
import {compose} from "redux";

/**
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps (state) {
    return {
        dialogsPage: state.dialogPage,
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)