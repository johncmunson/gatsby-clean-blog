import React, { Component, createRef } from 'react'

export default class JustComments extends Component {
  constructor(...args) {
    super(...args)
    this.ref = createRef()
  }
  render() {
    return (
      <div
        ref={this.ref}
        className="just-comments"
        data-pagesize="25"
        data-sort="desc"
        data-disableprofilepictures="true"
        data-disablesharebutton="true"
        data-apikey="9443a24b-ca12-45d4-a88f-9dc96c586c36"
      />
    )
  }
  componentDidMount() {
    const s = document.createElement('script')
    s.src = '//just-comments.com/w.js'
    s.setAttribute('data-timestamp', +new Date())
    this.ref.current.appendChild(s)
  }
}
