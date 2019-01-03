import React, { Component } from 'react';
import TasksList from "../TasksList/TasksList";
import "../../Styles/go.css";
const firebase = require("firebase");



class Go extends Component {

    currentCategory;
    currentUserId;
    state = {
        'todo': [],
        'doing': [],
        'done': []
    };

    componentWillMount() {
        this.getData();
    }

    openDialogToCreateTask = (category) => {
        this.currentCategory = category;
        document.getElementById('my-dialog-create-task').style.display = 'block';
        document.getElementById('tasks-lists-main-view').style.opacity = '0.3';
    };

    closeDialogToCreateTask = (event) => {
        this.currentCategory = null;
        event.preventDefault();
        document.getElementById('new-task-title').value = "";
        document.getElementById('new-task-description').value = "";
        document.getElementById('my-dialog-create-task').style.display = 'none';
        document.getElementById('tasks-lists-main-view').style.opacity = '1';
    };

    submitCreateNewTask = (event) => {
        event.preventDefault();
        var self = this;
        if (this.currentCategory !== null) {
            var db = firebase.firestore();

            db.settings({
                timestampsInSnapshots: true
            });

            var newTask = {
                'title': this.state.taskTitle,
                'Content': this.state.taskDescription,
                //'date': (new Date()).toDateString(),
                'userId': this.currentUserId
            };
            db.collection(this.currentCategory).add(newTask)
                .then(function (response) {
                    newTask.id = response.id;
                    var category = self.currentCategory;
                    var allTasksByCategory = self.state[category];
                    allTasksByCategory = allTasksByCategory.push(newTask);
                    self.setState({
                        category: allTasksByCategory
                    });
                    self.closeDialogToCreateTask(event);
            });
        }
    };

    onTaskTitleChangeHandler = (event) => {
        let taskTitle = event.target.value;
        this.setState ({
            'taskTitle': taskTitle.trim()
        });
    };

    onTaskDescriptionChangeHandler = (event) => {
        let taskDescription = event.target.value;
        this.setState ({
            'taskDescription': taskDescription.trim()
        });
    };

    deleteTask = (id, category) => {
        var r = window.confirm("Delete this Task!");
        let self = this;
        if (r == true) {
            var db = firebase.firestore();

            db.settings({
                timestampsInSnapshots: true
            });
            db.collection(category).where("userId", "==", this.currentUserId)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        if (doc.id == id) {
                            doc.ref.delete();
                            for (let i = 0; i < self.state[category].length; i++) {
                                if (self.state[category][i].id === id){
                                    let array = self.state[category];
                                    array.splice (i, 1);
                                    self.setState({
                                        category: array
                                    });
                                }
                            } 
                        }
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        }
    };

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

    onDragStart = (event, id, category) => {
        event.dataTransfer.setData("id", id);
        event.dataTransfer.setData("category", category);
    };

    onDragOver = (event, category) => {
        event.preventDefault();
        document.getElementById("category-" + category).style.background = "#5cb85c";
    };

    onDragLeave = (event, category) => {
        event.preventDefault();
        document.getElementById("category-" + category).style.background = "rgb(0, 121, 191)";
    };

    onDrop = (event, endCategory) => {
        event.preventDefault();
        let id = event.dataTransfer.getData("id");
        let beginCategory = event.dataTransfer.getData("category");
        document.getElementById("category-" + endCategory).style.background = "rgb(0, 121, 191)";
        let beginCategoryElements = this.state[beginCategory];
        for (let i = 0; i < beginCategoryElements.length; i++) {
            if (beginCategoryElements[i].id === id) {
                let endCategoryElements = this.state[endCategory];
                endCategoryElements.push(beginCategoryElements[i]);
                beginCategoryElements.splice(i, 1);
                //TODO change data on firebase
                this.setState(
                    {
                            beginCategory: beginCategoryElements,
                            endCategory: endCategoryElements
                         }
                );
                break;
            }
        }
    };

    render() {
        return (
            <div>
                <div id="tasks-lists-main-view">
                    <TasksList
                        openDialogToCreateTask={this.openDialogToCreateTask}
                        deleteTask={this.deleteTask}
                        todoList={this.state.todo}
                        doingList={this.state.doing}
                        doneList={this.state.done}
                        onDragOver={this.onDragOver}
                        onDragLeave={this.onDragLeave}
                        onDrop={this.onDrop}
                        onDragStart={this.onDragStart}
                    />
                </div>
                <div id="my-dialog-create-task">
                    <form className="create-new-task-form">
                        <div className="form-group">
                            <label htmlFor="new-task-title">Task Title</label>
                            <input type="text" className="form-control" id="new-task-title"
                                   placeholder="Task Title" onChange={this.onTaskTitleChangeHandler} maxLength={50}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="new-task-description">Task Description</label>
                            <textarea id="new-task-description" className="form-control" rows="6" onChange={this.onTaskDescriptionChangeHandler}/>
                        </div>
                        <button className="btn btn-default submit-create-new-task" onClick={this.submitCreateNewTask}>Create New Task</button>
                        <button className="btn btn-default cancel-create-new-task" onClick={this.closeDialogToCreateTask}>Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Go;