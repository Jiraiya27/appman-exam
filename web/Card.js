import React from 'react'
import styled from 'styled-components'
import logo from './logo.svg'

export default class Card extends React.Component {

  render() {

    return (
      <div>
        <img src={logo} />
      </div>
    )
  }
}