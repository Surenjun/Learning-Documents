import React, { Component } from 'react'
import Loadable from 'react-loadable'
import Loading from '@/components/Loading/Loading'

const AsyncMain = Loadable({
    loader: () => import('../components/Main/Main.jsx'),
    loading: Loading,
    timeout: 10000 // 10 seconds
})

export default class asyncMain extends Component {
    render () {
        return <AsyncMain/>
    }
}
