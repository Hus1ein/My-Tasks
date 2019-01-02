import React, { Component } from 'react';
import "../../Styles/Tasks-list.css";
import app from "../../base";
import Task from "../Task/Task";
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class TasksList extends Component {

    state = {
        'todo': [],
        'doing': [],
        'done': []
    };

    currentUserId;

    componentWillMount() {
        this.getData();
    }

    getData = () => {
        this.currentUserId = firebase.auth().currentUser.uid;
        var db = firebase.firestore();

        db.settings({
            timestampsInSnapshots: true
        });
        var self = this;
        var todoList = [];
        var doingList = [];
        var doneList = [];

        db.collection("todo").where("userId", "==", this.currentUserId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    todoList.push({
                        'id': doc.id,
                        'title': doc.data().title,
                        'Content': doc.data().content,
                        'date': (new Date()).toDateString()
                    });

                });
                self.setState(
                    {
                        'todo': todoList,
                    }
                );
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        db.collection("doing").where("userId", "==", this.currentUserId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    doingList.push({
                        'id': doc.id,
                        'title': doc.data().title,
                        'Content': doc.data().content,
                        'date': (new Date()).toDateString()
                    });

                });
                self.setState(
                    {
                        'doing': doingList,
                    }
                );

            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        db.collection("done").where("userId", "==", this.currentUserId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    doneList.push({
                        'id': doc.id,
                        'title': doc.data().title,
                        'Content': doc.data().content,
                        'date': (new Date()).toDateString()
                    });

                });
                self.setState(
                    {
                        'done': doneList,
                    }
                );
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

    };

    createNewTask = (category) => {
        var db = firebase.firestore();

        db.settings({
            timestampsInSnapshots: true
        });
        db.collection(category).add(
            {
                'title': "This is task",
                'Content': "this is task's content",
                //'date': (new Date()).toDateString(),
                'userId': this.currentUserId
            }
        );
    };



    render() {
        return (
            <div>
                <div className="col-sm-3 my-task">
                    <h1 className="task-list-title">To Do</h1>
                    <ul>
                        {
                            this.state.todo.map((member) => {
                                return (
                                    <li key={member.id}><Task task={member}></Task></li>
                                )
                            })
                        }
                    </ul>
                    <button className="btn btn-default new-task-button" onClick={() => this.createNewTask("todo")}>Add another card</button>
                </div>

                <div className="col-sm-3 my-task">
                    <h1 className="task-list-title">Doing</h1>
                    <ul>
                        {
                            this.state.doing.map((member) => {
                                return (
                                    <li key={member.id}><Task task={member}></Task></li>
                                )
                            })
                        }
                    </ul>
                    <button className="btn btn-default new-task-button" onClick={() => this.createNewTask("doing")}>Add another card</button>
                </div>

                <div className="col-sm-3 my-task">
                    <h1 className="task-list-title">Done</h1>
                    <ul>
                        {
                            this.state.done.map((member) => {
                                return (
                                    <li key={member.id}><Task task={member}></Task></li>
                                )
                            })
                        }
                    </ul>
                    <button className="btn btn-default new-task-button" onClick={() => this.createNewTask("done")}>Add another card</button>
                </div>

            </div>


        );
    }
}

export default TasksList;