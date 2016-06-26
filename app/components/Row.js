import React from 'react';
import Button from './Button';

class Row extends React.Component {
    render() {
        return (
            <div className="row">
                <Button row={this.props.number} column="0" onClick={this.props.onClick} button_value={this.props.row[0]}/>
                <Button row={this.props.number} column="1" onClick={this.props.onClick} button_value={this.props.row[1]}/>
                <Button row={this.props.number} column="2" onClick={this.props.onClick} button_value={this.props.row[2]}/>
            </div>
        )
    }
}

export default Row;
