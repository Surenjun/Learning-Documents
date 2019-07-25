import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Header from './components/Header/Header.jsx'
import AsyncMain from './asyncomponents/asyncIndex.jsx'
import './assets/styles/index.css'

class App extends React.Component {
    static defaultProps = {
        user: 'user'
    }
    static propTypes = {
        comment: PropTypes.string
    }
    render () {
        return <div>
            <Header />
            Hello {this.props.user}!
            <AsyncMain />
        </div>
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)