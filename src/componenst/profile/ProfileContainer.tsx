import React from 'react'
import { connect } from 'react-redux'
import { Profile } from './Profile'
import { getStatus, getUserProfile } from '../../state/profile-reducer'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { withAuthRedirect } from '../hocs/withAuthRedirect'
import { compose } from 'redux'
import { ProfileType } from '../../types/types'
import { AppStateType } from '../../state/redux-store'

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    loggedUserId: number | null
}
type MapDispatchPropsType = {
    getUserProfile: ( userId: number ) => void
    getStatus: ( userId: number ) => void
}
type OwnPropsType = {
    router: any
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
type StateType = {}

class ProfileContainer extends React.Component<PropsType, StateType> {

    profileRefresh() {
        let userId = this.props.router.params.userId

        if ( !userId ) {
            userId = this.props.loggedUserId
        }
        this.props.getUserProfile( userId )
        this.props.getStatus( userId )
    }

    componentDidMount() {
        this.profileRefresh()
    }

    //@ts-ignore
    componentDidUpdate( prevProps, prevState, snapshot ) {
        if ( this.props.router.params.userId !== prevProps.router.params.userId ) {
            this.profileRefresh()
        }
    }

    render() {
        return (
            <Profile
                isOwner={ !this.props.router.params.userId }
            />
        )
    }
}

function mapStateToProps( state: AppStateType ): MapStatePropsType {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        loggedUserId: state.auth.userId,
    }
}

function withRouter( Component: any ) {
    function ComponentWithRouterProp( props: any ) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <Component
                { ...props }
                router={ { location, navigate, params } }
            />
        )
    }

    return ComponentWithRouterProp
}

export default compose(
    connect( mapStateToProps, { getUserProfile, getStatus } ),
    withRouter,
    withAuthRedirect
)( ProfileContainer )