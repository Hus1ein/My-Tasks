import React, { Component } from 'react';
import "../../Styles/task.css";
import app from "../../base";

class Task extends Component {

    onDragStart = (event, id) => {
        this.props.onDragStart(event, this.props.task.id, this.props.category);
    };
    render() {

        return (
            <div id={"task-" + this.props.task.id} className="task"  draggable onDragStart={(e) => this.onDragStart(e, this.props.task.id)}>
                <span className="task-edit" onClick={this.props.deleteTask}>
                        <i className="fa fa-remove" title="Delete Task"/>
                </span>
                <p className="task-title">{this.props.task.title}</p>
                <p><i className="fa fa-clock-o"/> {this.props.task.date}</p>
            </div>

        );
    }

}

export default Task;