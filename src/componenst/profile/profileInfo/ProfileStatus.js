import React from "react";

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState( {
            editMode: true
        } )
    }

    deactivateEditMode = () => {
        this.setState( {
            editMode: false
        } )
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div className="profile__status__wrapper">
                <div className="profile__status">
                    {!this.state.editMode &&
                        <div onDoubleClick={this.activateEditMode} className="status__text">
                            {this.props.status || '----'}
                        </div>}

                    {this.state.editMode &&
                        <input
                            onChange={this.onStatusChange}
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            className="status__input"
                            value={this.state.status}/>}
                </div>
            </div>
        )
    }
}

export default ProfileStatus