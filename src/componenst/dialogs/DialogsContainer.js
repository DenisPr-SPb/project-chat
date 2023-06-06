import React from "react";
import {sendMessageCreator, updateNewMessageTextCreator} from "../../state/dialog-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hocs/withAuthRedirect";
import {compose} from "redux";


class DialogsContainer extends React.Component {
    render() {
        return (
            <Dialogs
                props={this.props}
            />
        )
    }
}

function mapStateToProps (state) {
    return {
        dialogsPage: state.dialogPage,
    }
}

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
)(DialogsContainer)