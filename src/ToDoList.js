import React, { Component } from 'react';
/**
 * StAuth10244: I Nguyen Duc Long, 000837437 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 * @returns 
 */
/**
 * @date March 11, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */
class ToDoList extends Component{
    constructor(props){
        super(props);
        this.state={
            add: true,      //flag to know whether "submit button" is add or edit; =true: add button. Otherwise: edit button
            list: ["Walk the dog", "Pick up laundry", "Do the assignments"],    //to do list
            edit: [false, false, false],        //the state of each element in "To do" list. =false: edit. Otherwise: no edit
            isChecked: [false, false, false],   //the state of each checkbox. =false: non-checked. Otherwise: checked
            inputList: "",  //the input value from text box
            editIndex: -1   //the index of the selected element in the list
        }
    }
    /**
     * addEditToList method set state when user click the submit button (submit button is able to be "add" or "edit")
     */
    addEditToList(){
        /** If submit button is "add" button */
        if(this.state.add){
            let isExist = false;
            this.state.list.forEach(element => {    //if the input value existed in a list, do not add
                if(element.toUpperCase().trim()===this.state.inputList.toUpperCase().trim()) isExist=true;
            });
            if(this.state.inputList!=="" && isExist===false)
                this.setState({...this.state, 
                    list: [...this.state.list, this.state.inputList], 
                    edit: [...this.state.edit, false],
                    isChecked: [...this.state.isChecked, false],
                    inputList: "",
                    add: true,
                    editIndex: -1});
        }
        /** If submit button is "edit" button */
        else{
            let _edit = [];
            let _list = [];
            let _inputList = this.state.inputList==="" ? this.state.list[this.state.editIndex] : this.state.inputList;
            this.state.edit.forEach(element => _edit.push(false));
            this.state.list.forEach((element, count) => (count===this.state.editIndex) ? _list.push(_inputList) : _list.push(element));
            this.setState({list: _list, 
                edit: _edit, 
                inputList: "", 
                add: true, 
                editIndex: -1});
        }
    }
    render(){
        return(
            <div className="container mt-4 pt-4">
                <div className="row">
                    <div className="col-sm-8 input-group-lg pr-3 pl-3">
                        {/**Hands-on for input value from text box (including onChange and onKeyDown by hitting "Enter") */}
                        <input type="text" className="form-control" placeholder="Add your item to do list" name="inputList" onChange={(event)=>{
                            this.setState({inputList: event.target.value});
                            if(!this.state.add){
                                let _list = [];
                                this.state.list.forEach((element, count) => (count===this.state.editIndex) ? _list.push(event.target.value) : _list.push(element));
                                this.setState({list: _list});
                            }
                        }} onKeyDown={(event)=>{ if(event.key === "Enter") this.addEditToList(); }} value={this.state.inputList} autoFocus/>
                    </div>
                    <button className={"col-sm-4 text-center btn btn-lg pr-3 pl-3 btn-"+(this.state.add ? "primary" : "warning")} 
                        /**Hands-on for submit button ("add" button or "edit" button) */
                        onClick={()=>{this.addEditToList()}}>{this.state.add ? "Add" : "Edit"}</button>
                </div>
                <div className="row justify-content-around">
                    <ul className="list-group col-sm-10 mt-4 mb-4 pt-3 pb-3">
                        {
                            this.state.list?.map((item, index)=>{
                                return(
                                    <li key={index} className={`list-group-item-${this.state.edit[index] ? "warning " : 
                                            (this.state.isChecked[index] ? "secondary " :"success ")} 
                                        list-group-item d-flex justify-content-between align-items-center`}>
                                        {/**Hands-on when edit link (from items) clicked*/}
                                        <button className={"btn btn-warning d-"+(this.state.edit[index] ? "none" : "block")} onClick={()=>{
                                            let _edit = [];
                                            this.state.edit.forEach((element,i) => i===index ? _edit.push(true) : _edit.push(false));
                                            this.setState({add: false,  
                                                editIndex: index,
                                                inputList: this.state.list[index],
                                                list: this.state.list,
                                                edit: _edit});
                                        }}>
                                            <i className="fas fa-solid fa-pen" />
                                        </button>
                                        {this.state.isChecked[index] ? <span className="ml-3 mr-2">Done</span> : <span className="ml-2">Process</span>}
                                        {/**Hands-on for checkbox*/}
                                        <input className="form-check-input ml-4" checked={this.state.isChecked[index]} onChange={()=>{
                                            let _isChecked = [];
                                            this.state.isChecked.forEach((element, count) => count===index ? 
                                                _isChecked.push(!this.state.isChecked[count]) : _isChecked.push(this.state.isChecked[count]));
                                            this.setState({isChecked: _isChecked});
                                        }} type="checkbox" />
                                        <div className="container-fluid">
                                            <div className="row text-center ml-md-4 pl-md-3 ml-2 ml-sm-3">
                                                {this.state.list[index]}
                                            </div>
                                        </div>
                                        <button className="btn btn-danger" onClick={()=>{
                                            /**Hands-on for delete item*/
                                            if (!window.confirm('Are you sure you wish to delete ['+this.state.list[index]+']?')) return;
                                            this.setState({list: this.state.list.filter((element, count) => index!==count), 
                                                edit: this.state.edit.filter((element, count) => index!==count), 
                                                isChecked: this.state.isChecked.filter((element, count) => index!==count),
                                                inputList: "", 
                                                add: true, 
                                                editIndex: -1});
                                        }}>
                                            <i className="fas fa-trash" />
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="row justify-content-around">
                    <button className="col-sm-3 btn-lg pl-3 pr-3 mt-4 pt-2 btn btn-danger" onClick={()=>{
                        /**Hands-on for delete all the items from the list*/
                        if (!window.confirm('Are you sure to delete all items in the list?')) return;
                        this.setState({list: [], edit: [], inputList: "", add: true, editIndex: -1});
                    }}>Delete All</button>
                </div>
            </div>
        );
    }
};  /*end class*/
export default ToDoList