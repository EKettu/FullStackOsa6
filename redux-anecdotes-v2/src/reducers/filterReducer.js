export const filterChange = (input) => {
    return {
        type: 'FILTER',
        filter: input
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
    case 'FILTER':
        return action.filter
    default:
        return state
    }
}


export default filterReducer