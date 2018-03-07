import anecdoteService from '../services/anecdotes'

export const createNew = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        const anecdoteBeingUpdated = { ...anecdote, votes:anecdote.votes+1 }
        const updatedAnecdote = await anecdoteService.update(anecdote.id, anecdoteBeingUpdated)
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

const reducer = (store = [], action) => {
    switch (action.type) {
    case 'NEW_ANECDOTE':
        return [...store, action.data]
    case 'INIT_ANECDOTES':
        return action.data
    case 'VOTE': {
        const old = store.filter(a => a.id !== action.data.id)
        const voted = action.data
        return [...old, voted]
    }
    default:return store
    }
}

export default reducer