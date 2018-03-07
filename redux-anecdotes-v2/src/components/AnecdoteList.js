import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {

    const clickVote = async (anecdote)  => {
        props.voteAnecdote(anecdote)
        props.notify(`you voted '${anecdote.content}'`, 5)
    }
    return (<div>
        <h2>Anecdotes</h2>
        <Filter />
        {props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
          has {anecdote.votes}
                    <button onClick={() => clickVote(anecdote)}>vote </button>
                </div>
            </div>
        )}
    </div>)
}

const anecdotesToShow = (anecdotes, filter) => {
    if (filter !== '') {
        anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
    return anecdotes
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
    }
}
const ConnectedAnecdoteList = connect(mapStateToProps, { notify, voteAnecdote })(AnecdoteList)

export default ConnectedAnecdoteList
