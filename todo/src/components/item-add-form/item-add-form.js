import React from "react";
import './item-add-form.css';

export default class ItemAddForm extends React.Component {
    state = {
        label: '',
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const {onItemAdded} = this.props;
        const {label} = this.state;
        onItemAdded(label);
        this.setState(() => ({label: ''}));
    }

    render() {
        const {label} = this.state;
        return (
            <form className="item-add-form d-flex"
                  onSubmit={this.onSubmit}>
                <input className="form-control"
                       onChange={this.onLabelChange}
                       value={label}
                       placeholder="What needs to be done"/>
                <button className="btn btn-outline-secondary">Add Item
                </button>
            </form>
        )


    }
}