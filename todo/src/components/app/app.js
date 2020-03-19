import React from 'react';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";
import './app.css';

export default class App extends React.Component {
    maxId = 100;

    createTodoItem = (label) => {
        return {
            label: label,
            important: false,
            id: this.maxId++,
            done: false,

        }
    }

    state = {
        todoData: [
            this.createTodoItem('drink Coffee'),
            this.createTodoItem('Make Awesome React App'),
            this.createTodoItem('Have Lunch')
        ],
        term: 'lunch',
        filter: 'active',
    };

    deleteItem = (id) => {
        const {todoData} = this.state;
        const newTodoData = todoData.filter(el => el.id !== id);
        this.setState(() => ({todoData: newTodoData}));
    }
    addItem = (text) => {
        const {todoData} = this.state;
        const newItem = this.createTodoItem(text);
        this.setState(() => ({todoData: [newItem, ...todoData]}))
    }

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        const {todoData} = this.state;
        this.setState(() => ({todoData: this.toggleProperty(todoData, id, 'important')}))
    };
    onToggleDone = (id) => {
        const {todoData} = this.state;

        this.setState(() => ({todoData: this.toggleProperty(todoData, id, 'done')}))

    };
    onSearchChange = (term) => {
        this.setState({term});
    }
    onFilterChange = (filter)=>{
        this.setState({filter});
    }
    search = (items, term) => {
        if (term.length === 0) return items;
        return items.filter((item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }
    filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter(item => !item.done);
            case 'done':
                return items.filter(item => item.done);
            default:
                return items;
        }
    }

    render() {
        const {todoData, term, filter} = this.state;
        const visible = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter(el => el.done === true).length;
        const todoCount = todoData.filter(el => el.done === false).length;
        return (

            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                    filter={filter}
                    onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList todos={visible}
                          onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}/>
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        )

    }

}
