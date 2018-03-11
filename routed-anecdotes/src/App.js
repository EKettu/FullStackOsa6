import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { ListGroup, ListGroupItem, FormGroup, FormControl, Grid, Col } from 'react-bootstrap'

const footerStyle = {
  color: 'grey',
  fontSize: 16,
  border: 'solid',
  padding: 10
}

const menuStyle = {
  backgroundColor: 'lightblue',
  padding: 10,
  fontSize: 16

}

const activeStyle = {
  backgroundColor: 'lightgrey',
  fontStyle: 'italic',
  padding: 10
}

const gridStyle = {
  grid: {
    paddingLeft: 0,
    paddingRight: 0
  },
  col: {
    paddingLeft: 0,
    paddingRight: 5,
    paddingBottom: 10
  }
}

const formStyle = {
  paddingLeft: 10,
  paddingRight: 5,
  paddingBottom: 10
}

const anecdoteStyle = {
  paddingLeft: 10,
  paddingRight: 5,
  paddingBottom: 10
}


const Menu = () => (
  <div style={menuStyle}>
    <NavLink activeStyle={activeStyle} exact to='/'>anecdotes</NavLink>&nbsp;
    <NavLink activeStyle={activeStyle} exact to='/create'>create new</NavLink>&nbsp;
    <NavLink activeStyle={activeStyle} exact to='/about'>about</NavLink>&nbsp;
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <ListGroup key={anecdote.id} >
          <ListGroupItem><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>
        </ListGroup>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div style={anecdoteStyle}>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info} </a></div>
    </div>
  )
}

class Notification extends React.Component {

  render() {
    const style = {
      border: 'solid',
      borderRadius: 5,
      color: 'green',
      padding: 10,
      borderWidth: 1
    }

    return (
      <div style={style}>
        {this.props.notification}
      </div>
    )
  }
}

const About = () => (
  <Grid style={gridStyle.grid}>
    <Col md={4} style={gridStyle.col}><div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div></Col>
    <Col md={4} style={gridStyle.col}>
      <img src={'https://upload.wikimedia.org/wikipedia/commons/5/55/Grace_Hopper.jpg'} alt='an image of Grace Hopper' />
    </Col>
  </Grid>
)

const Footer = () => (
  <div style={footerStyle}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      saved: false
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.setState({
      saved: true
    })
  }

  render() {
    return (
      <div>
        {this.state.saved && <Redirect to='/' />}
        <h2>create a new anecdote</h2>
        <FormGroup>
        <form onSubmit={this.handleSubmit}>
          <div style={formStyle} >
            content
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div style={formStyle}>
            author
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div style={formStyle}>
            url for more info
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
        </FormGroup>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: null
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} created!`
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 10000)
  }

  anecdoteById = (id) => {
    return this.state.anecdotes.find(a => a.id === id)
  }

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div>
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <Menu />
            {this.state.notification && <Notification notification={this.state.notification} />}
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/create" render={() => <CreateNew addNew={this.addNew} />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
