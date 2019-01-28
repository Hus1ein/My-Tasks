import React, { Component } from 'react';
import TasksList from "../TasksList/TasksList";
import "../../Styles/dashboard.css";
import axios from "axios";
import app from "../../base";

const firebase = require("firebase");



class Dashboard extends Component {

    currentCategory;
    currentUserId;
    currentUserEmail;

    state = {
        'todo': [],
        'doing': [],
        'done': [],
        'viewTask': {"title": "", "content": "", "date": ""}
    };

    componentWillMount() {
        this.getData(); // Get all tasks from server
        this.getUserInfo();
    }

    componentDidMount() {
        this.changeHeightOfSideBar();
    }

    openDialogToCreateTask = (category) => {
        this.currentCategory = category;
        document.getElementById('my-dialog-create-task').style.display = 'block';
        document.getElementById('tasks-lists-main-view').style.pointerEvents = 'none';
        document.getElementById('tasks-lists-main-view').style.opacity = '0.3';
    };

    closeDialogToCreateTask = (event) => {
        this.currentCategory = null;
        event.preventDefault();
        document.getElementById('new-task-title').value = "";
        document.getElementById('new-task-description').value = "";
        document.getElementById('my-dialog-create-task').style.display = 'none';
        document.getElementById('tasks-lists-main-view').style.pointerEvents = 'auto';
        document.getElementById('tasks-lists-main-view').style.opacity = '1';
    };

    submitCreateNewTask = (event) => {
        event.preventDefault();
        var self = this;
        if (this.currentCategory !== null && this.state.taskTitle !== undefined && this.state.taskTitle !== "" && this.state.taskDescription !== undefined
            && this.state.taskDescription !== "") {
            var db = firebase.firestore();

            db.settings({
                timestampsInSnapshots: true
            });

            var newTask = {
                'title': this.state.taskTitle,
                'content': this.state.taskDescription,
                'date': new Date(),
                'userId': this.currentUserId
            };
            db.collection(this.currentCategory).add(newTask)
                .then(function (response) {
                    // Change format od TaskDate to be String
                    let a = newTask.date;
                    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    let year = a.getFullYear();
                    let month = months[a.getMonth()];
                    let date = a.getDate();
                    let hour = a.getHours();
                    let min = a.getMinutes();
                    let sec = a.getSeconds();
                    let dateAndTime = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
                    newTask.date = dateAndTime;

                    // Add id for task
                    newTask.id = response.id;

                    //Push the new task to tasks array
                    var category = self.currentCategory;
                    var allTasksByCategory = self.state[category];
                    allTasksByCategory = allTasksByCategory.unshift(newTask);
                    self.setState({
                        category: allTasksByCategory
                    });
                    self.closeDialogToCreateTask(event);
                    self.changeHeightOfSideBar();
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

                            self.changeHeightOfSideBar();
                        }
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        }
    };

    getUserInfo = () => {
        let self = this;
        axios({
            method: 'get',
            url: 'https://json.geoiplookup.io',
        })
            .then(function (response) {
                self.setState({
                    'userInfo': {
                        'email': self.currentUserEmail,
                        'ip': response.data.ip,
                        'country': response.data.country_name,
                        'currency': response.data.currency_name,
                        'timezone': response.data.timezone_name,
                        'city': response.data.district,
                        'longitude': response.data.longitude,
                        'latitude': response.data.latitude
                    }
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    timestampToDate = (timestamp) => {
        let dateAndTime;
        let a = new Date(timestamp * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        dateAndTime = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return dateAndTime;
    };

    getData = () => {
        this.currentUserId = firebase.auth().currentUser.uid;
        this.currentUserEmail = firebase.auth().currentUser.email;
        console.log(firebase.auth().currentUser.email);
        var db = firebase.firestore();

        db.settings({
            timestampsInSnapshots: true
        });
        var self = this;
        var todoList = [];
        var doingList = [];
        var doneList = [];
        let dateAndTime = (new Date()).toDateString();

        db.collection("todo").where("userId", "==", this.currentUserId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if(doc.data().date !== undefined) {
                        dateAndTime = self.timestampToDate(doc.data().date.seconds);
                    }
                    todoList.unshift({
                        'id': doc.id,
                        'title': doc.data().title,
                        'content': doc.data().content,
                        'date': dateAndTime
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

        dateAndTime = (new Date()).toDateString();
        db.collection("doing").where("userId", "==", this.currentUserId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    if(doc.data().date !== undefined) {
                        dateAndTime = self.timestampToDate(doc.data().date.seconds);
                    }
                    doingList.unshift({
                        'id': doc.id,
                        'title': doc.data().title,
                        'content': doc.data().content,
                        'date': dateAndTime
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

        dateAndTime = (new Date()).toDateString();
        db.collection("done").where("userId", "==", this.currentUserId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    if(doc.data().date !== undefined) {
                        dateAndTime = self.timestampToDate(doc.data().date.seconds);
                    }
                    doneList.unshift({
                        'id': doc.id,
                        'title': doc.data().title,
                        'content': doc.data().content,
                        'date': dateAndTime
                    });

                });
                self.setState(
                    {
                        'done': doneList,
                    }
                );
                document.getElementsByClassName("lds-roller")[0].hidden = true;
                document.getElementById("tasks-lists-main-view").hidden = false;
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

    };

    onDragStart = (event, id, category) => {
        event.dataTransfer.setData("id", id);
        event.dataTransfer.setData("category", category);
        if (category === 'todo') {
            document.getElementsByClassName("drop-here")[1].hidden  = false;
            document.getElementsByClassName("drop-here")[2].hidden  = false;

        } else if (category === 'doing') {
            document.getElementsByClassName("drop-here")[0].hidden = false;
            document.getElementsByClassName("drop-here")[2].hidden = false;
        } else if (category === 'done') {
            document.getElementsByClassName("drop-here")[0].hidden  = false;
            document.getElementsByClassName("drop-here")[1].hidden  = false;
        }

    };

    onDragOver = (event, category) => {
        event.preventDefault();
        document.getElementById("category-" + category).style.background = "#5bc0de";
    };

    onDragLeave = (event, category) => {
        event.preventDefault();
        document.getElementById("category-" + category).style.background = "rgb(0, 121, 191)";
    };

    onDrop = (event, endCategory) => {
        event.preventDefault();
        document.getElementsByClassName("drop-here")[0].hidden  = true;
        document.getElementsByClassName("drop-here")[1].hidden  = true;
        document.getElementsByClassName("drop-here")[2].hidden  = true;
        let id = event.dataTransfer.getData("id");
        let beginCategory = event.dataTransfer.getData("category");
        document.getElementById("category-" + endCategory).style.background = "rgb(0, 121, 191)";
        let beginCategoryElements = this.state[beginCategory];
        for (let i = 0; i < beginCategoryElements.length; i++) {
            if (beginCategoryElements[i].id === id) {
                let endCategoryElements = this.state[endCategory];
                let movedTask = beginCategoryElements[i];
                endCategoryElements.push(movedTask);
                beginCategoryElements.splice(i, 1);
                this.setState(
                    {
                            beginCategory: beginCategoryElements,
                            endCategory: endCategoryElements
                         }
                );

                let self = this;
                var db = firebase.firestore();

                db.settings({
                    timestampsInSnapshots: true
                });

                var newTask = {
                    'title': movedTask.title,
                    'content': movedTask.content,
                    'date': new Date(movedTask.date),
                    'userId': self.currentUserId
                };
                db.collection(endCategory).add(newTask)
                    .then(function (response) {
                        for (let j = 0; j < self.state[endCategory].length; j++) {
                            if (endCategoryElements[j].id == id)  {
                                endCategoryElements[j].id = response.id;
                                self.setState({endCategory: endCategoryElements});
                            }
                        }
                    });

                db.collection(beginCategory).where("userId", "==", this.currentUserId)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            if (doc.id == id) {
                                doc.ref.delete();
                            }
                        });
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });

                break;
            }
        }
    };

    logOutHandler = async () => {
        await app
            .auth()
            .signOut();
        this.props.history.push("/login");
    };

    changeHeightOfSideBar = () => {
        var body = document.body,
            html = document.documentElement;

        var height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );
        document.getElementById("side-bar").style.height = height + "px";
    };

    onTaskClick = (event, id, category) => {
        for (let i = 0; i < this.state[category].length; i++) {
            if (this.state[category][i].id === id) {
                this.setState({
                    "viewTask": {
                        "title": this.state[category][i].title,
                        "content": this.state[category][i].content,
                        "date": this.state[category][i].date
                    }
                });
                break;
            }
        } 

        document.getElementById('my-dialog-view-task').style.display = 'block';
        document.getElementById('tasks-lists-main-view').style.pointerEvents = 'none';
        document.getElementById('tasks-lists-main-view').style.opacity = '0.3';

    };

    closeDialogToViewTask = (event) => {
        event.preventDefault();
        document.getElementById('my-dialog-view-task').style.display = 'none';
        document.getElementById('tasks-lists-main-view').style.pointerEvents = 'auto';
        document.getElementById('tasks-lists-main-view').style.opacity = '1';

    };

    render() {
        return (
            <div>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div id="tasks-lists-main-view" hidden>
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
                        userInfo={this.state.userInfo}
                        logOutHandler={this.logOutHandler}
                        onTaskClick={this.onTaskClick}
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

                <div id="my-dialog-view-task">
                    <form className="create-new-task-form">
                        <div className="form-group">
                            <p><span className="my-dialog-view-task-title">Task title :</span> {this.state.viewTask.title}</p>
                        </div>
                        <div className="form-group">
                            <p><span className="my-dialog-view-task-title">Task content :</span> {this.state.viewTask.content}</p>
                        </div>
                        <div className="form-group">
                            <p><span className="my-dialog-view-task-title">Created at :</span> {this.state.viewTask.date}</p>
                        </div>
                        <button className="btn btn-default close-view-task" onClick={this.closeDialogToViewTask}>Close</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Dashboard;
