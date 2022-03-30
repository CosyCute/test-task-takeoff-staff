const defaultState = {
    userAuthorized: localStorage.jwt ? true : false,
}

export const authReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case "USER_AUTHORIZED_FALSE": {
            return { ...state, userAuthorized: false }
        }
        case "USER_AUTHORIZED_TRUE": {
            return { ...state, userAuthorized: true }
        }

        default:
            return state
    }
}

