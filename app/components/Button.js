import React from 'react';


class Button extends React.Component {
    render() {
        let self = this;
        function handleClick(evt){
            self.props.onClick(self.props.row, self.props.column)
        }
        return (
            <div className="col-xs-4 game-cell">
                <button className="btn btn-default" type="submit" onClick={handleClick} disabled={this.props.button_value}>
                    {this.props.button_value ? this.props.button_value : "?"}
                </button>
            </div>
        )
    }
}

export default Button;
