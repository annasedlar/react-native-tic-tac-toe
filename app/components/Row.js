import React from 'react';
import Button from './Button';

class Row extends React.Component {
    render() {
        return (
            <div className="row">
                <Button rowNum={this.props.rowNum} colNum={0} onClick={this.props.onClick} buttonValue={this.props.boardRow[0]}/>
                <Button rowNum={this.props.rowNum} colNum={1} onClick={this.props.onClick} buttonValue={this.props.boardRow[1]}/>
                <Button rowNum={this.props.rowNum} colNum={2} onClick={this.props.onClick} buttonValue={this.props.boardRow[2]}/>
            </div>
        )
    }
}

export default Row;
