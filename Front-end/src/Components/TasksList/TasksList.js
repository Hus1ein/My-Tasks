import React, { Component } from 'react';
import "../../Styles/Tasks-list.css";
import app from "../../base";
import Task from "../Task/Task";
import SideBar from "../SideBar/SideBar";
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class TasksList extends Component {

    render() {
        //TODO Fix the location of the side bar
        return (
            <div id="task-list-main">
                <SideBar
                    userInfo={this.props.userInfo}
                    logOutHandler={this.props.logOutHandler}
                />
                <div className="col-sm-2 my-task" id="category-todo">
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
                                            onTaskClick={this.props.onTaskClick}
                                        />
                                    </li>
                                )
                            })
                        }
                        <li>
                            <div id="drop-here-todo" className="task drop-here" hidden
                                 onDragOver={(e)=>this.props.onDragOver(e, "todo")}
                                 onDragLeave={(e)=>this.props.onDragLeave(e, "todo")}
                                 onDrop={(e)=>{this.props.onDrop(e, "todo")}}
                            >
                                Drop here
                            </div>
                        </li>
                    </ul>
                    <button className="btn btn-default new-task-button" onClick={() => this.props.openDialogToCreateTask("todo")}>Add another card</button>
                </div>

                <div className="col-sm-2 my-task" id="category-doing">
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
                                            onTaskClick={this.props.onTaskClick}
                                        />
                                    </li>
                                )
                            })
                        }
                        <li>
                            <div id="drop-here-doing" className="task drop-here" hidden
                                 onDragOver={(e)=>this.props.onDragOver(e, "doing")}
                                 onDragLeave={(e)=>this.props.onDragLeave(e, "doing")}
                                 onDrop={(e)=>{this.props.onDrop(e, "doing")}}
                            >
                                Drop here
                            </div>
                        </li>
                    </ul>
                    <button className="btn btn-default new-task-button" onClick={() => this.props.openDialogToCreateTask("doing")}>Add another card</button>
                </div>

                <div className="col-sm-2 my-task" id="category-done">
                    <h1 className="task-list-title">Done</h1>
                    <ul>
                        {
                            this.props.doneList.map((member) => {
                                return (
                                    <li key={member.id}>
                                        <Task
                                            task={member}
                                            category={"done"}
                                            deleteTask={() => this.props.deleteTask(member.id, "done")}
                                            onDragStart={this.props.onDragStart}
                                            onTaskClick={this.props.onTaskClick}
                                        />
                                    </li>
                                )
                            })
                        }
                        <li>
                            <div id="drop-here-done" className="task drop-here" hidden
                                 onDragOver={(e)=>this.props.onDragOver(e, "done")}
                                 onDragLeave={(e)=>this.props.onDragLeave(e, "done")}
                                 onDrop={(e)=>{this.props.onDrop(e, "done")}}
                            >
                                Drop here
                            </div>
                        </li>
                    </ul>
                    <button className="btn btn-default new-task-button" onClick={() => this.props.openDialogToCreateTask("done")}>Add another card</button>
                    <div>
                    </div>

                </div>

            </div>


        );
    }
}

export default TasksList;