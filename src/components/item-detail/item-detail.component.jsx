import React, { Component } from 'react'

export default class ItemDetail extends Component {
  deleteDetail = () => {
    console.log(this.props.detail);
    const {Size} = this.props.detail;
    this.props.deleteDetail(Size);
  }

  render() {
    const {detail} = this.props;

    return (
      <tr>
        <td>{detail.Size}</td>
        <td>{detail.Quantity}</td>
        <td className="item-detail-delete-btn">
          <span className="fix-size"><i className="fas fa-trash-alt btn-delete" onClick={this.deleteDetail}></i></span>
        </td>
      </tr>
    )
  }
}
