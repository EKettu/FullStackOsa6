export const notify = (content, time) => {
    return async (dispatch) => {
        dispatch({
            type: 'NOTIFICATION',
            data: content
        })
        setTimeout(() => {
            dispatch(removeNotification())
        }, 1000 * time)
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
        data: ''
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
    case 'NOTIFICATION':
        return action.data
    case 'REMOVE_NOTIFICATION':
        return action.data
    default:
        return state
    }
}


export default notificationReducer