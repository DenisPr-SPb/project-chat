import React from "react";

class ProfileStatus extends React.Component {

    state = {
        editMode: false
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
    }

    render() {
        return (
            <div className="profile__status__wrapper">
                <div className="profile__status">
                    {!this.state.editMode &&
                        <div onDoubleClick={ () =>  { this.activateEditMode() }} className="status__text">{this.props.status}</div>}

                    {this.state.editMode &&
                        <input autoFocus={true} onBlur={this.deactivateEditMode} type="text" className="status__input" placeholder='your status'
                               value={this.props.status}/>}
                </div>
            </div>
        )
    }
}

export default ProfileStatus