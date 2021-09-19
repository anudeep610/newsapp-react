import React, { Component } from 'react'
import Loading from "./ajax-loader.gif"

export default class Spinner extends Component {
    render() {
        return (
            <div className="text-center">
                <img src={Loading} alt="loading" />
            </div>
        )
    }
}
