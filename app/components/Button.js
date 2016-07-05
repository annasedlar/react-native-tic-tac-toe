import React from 'react';


class Button extends React.Component {
    render() {
        let self = this;
        let buttonClasses = {
            null: "btn-default",
            "X": "btn-primary",
            "O": "btn-success"
        }
        function handleClick(evt){
            self.props.onClick(self.props.rowNum, self.props.colNum)
        }
        return (
            <div className="col-xs-4 game-cell">
                <button className={"btn " + buttonClasses[this.props.buttonValue]} type="submit" onClick={handleClick} disabled={this.props.buttonValue !== null || this.props.gameOver}>
                    {this.props.buttonValue ? this.props.buttonValue : "?"}
                </button>
            </div>
        )
    }
}

export default Button;
