import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {
    state = {
        term: '',
    }
    onSearchChange = (e) => {
        const {onSearchChange} = this.props;
        const term = e.target.value;
        this.setState({term})
        onSearchChange(term);
    };

    render() {
        const {term} = this.props;
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   value={term}
                   onChange={this.onSearchChange}
            />
        );
    }
};

