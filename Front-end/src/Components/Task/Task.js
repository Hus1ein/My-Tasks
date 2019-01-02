import React, { Component } from 'react';
import "../../Styles/task.css";
import app from "../../base";

class Task extends Component {

    state = {
        'username': undefined,
        'password': undefined,
        'errors': undefined
    };



    render() {

        return (
            <div className="task">
                <p className="task-title">{this.props.task.title}</p>
                <p><i className="fa fa-clock-o"/> {this.props.task.date}</p>
                    <span className="task-edit">
                        <i className="fa fa-edit my-icon" title="Edit Task"/>
                        <i className="fa fa-remove" title="Delete Task"/>
                    </span>
            </div>
        );
    }
}

export default Task;