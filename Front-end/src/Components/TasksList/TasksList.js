import React, { Component } from 'react';
import "../../Styles/Tasks-list.css";
import app from "../../base";
import Task from "../Task/Task";
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class TasksList extends Component {

    render() {
        return (
            <div>
                <div className="col-sm-3 my-task" id="category-todo"
                     onDragOver={(e)=>this.props.onDragOver(e, "todo")}
                     onDragLeave={(e)=>this.props.onDragLeave(e, "todo")}
                     onDrop={(e)=>{this.props.onDrop(e, "todo")}}>
                    <h1 className="task-list-title">To Do</h1>
                    <ul>
                        {
                            this.props.todoList.map((member) => {
                                return (
                                    <li key={member.id}>
                                        <Task
                                            task={member}
                                            category={"todo"}
                                            deleteTask={() => this.props.deleteTask(member.id, "todo")}
                                            onDragStart={this.props.onDragStart}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button className="btn btn-default new-task-button" onClick={() => this.props.openDialogToCreateTask("todo")}>Add another card</button>
                </div>

                <div className="col-sm-3 my-task" id="category-doing"
                     onDragOver={(e)=>this.props.onDragOver(e, "doing")}
                     onDragLeave={(e)=>this.props.onDragLeave(e, "doing")}
                     onDrop={(e)=>{this.props.onDrop(e, "doing")}}>
                    <h1 className="task-list-title">Doing</h1>
                    <ul>
                        {
                            this.props.doingList.map((member) => {
                                return (
                                    <li key={member.id}>
                                        <Task
                                            task={member}
                                            category={"doing"}
                                            deleteTask={() => this.props.deleteTask(member.id, "doing")}
                                            onDragStart={this.props.onDragStart}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button className="btn btn-default new-task-button" onClick={() => this.props.openDialogToCreateTask("doing")}>Add another card</button>
                </div>

                <div className="col-sm-3 my-task" id="category-done"
                     onDragOver={(e)=>this.props.onDragOver(e, "done")}
                     onDragLeave={(e)=>this.props.onDragLeave(e, "done")}
                     onDrop={(e)=>{this.props.onDrop(e, "done")}}>
                    <h1 className="task-list-title">Done</h1>
                    <ul>
                        {
                            this.props.doneList.map((member) => {
                                return (
                                    <li key={member.id}>
                                        <Task
                                            task={member}
                                            category={"doing"}
                                            deleteTask={() => this.props.deleteTask(member.id, "done")}
                                            onDragStart={this.props.onDragStart}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button className="btn btn-default new-task-button" onClick={() => this.props.openDialogToCreateTask("done")}>Add another card</button>
                </div>

            </div>


        );
    }
}

export default TasksList;