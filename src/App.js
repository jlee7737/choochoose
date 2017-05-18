import React, { Component } from 'react';
import './bootstrap/css/bootstrap.css';
import './App.css';


/********************************************************************************/
class Choice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.readChoice = this.readChoice.bind(this);
  }

  readChoice(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  render() {
    return (
      <div className="row" id={this.props.id}>
        <div className="col-xs-12">
          <div className="input-group">
            <span className="input-group-addon">
              {this.props.choiceNum}
            </span>
            <input 
              value={this.state.inputValue}
              onChange={this.readChoice}
              name={"choice" + this.props.id} 
              className="form-control" 
              type="text" />
            <span className="input-group-btn">
              <button 
                className={this.props.btnDeleteClass} 
                id={this.props.id} 
                onClick={this.props.deleteClick}>
                -
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}


/********************************************************************************/
class ChoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choiceList: [0, 1],
    };
    this.addChoice = this.addChoice.bind(this);
    this.deleteChoice = this.deleteChoice.bind(this);
  }

  addChoice(event) {
    event.preventDefault();
    var newList = this.state.choiceList;
    if (newList.length > 0) {
      var newChoice = newList[newList.length-1] + 1;
      newList.push(newChoice);
    }
    else {
      newList = [0];
    }
    this.setState({
      choiceList: newList
    });
  }

  deleteChoice(event) {
    event.preventDefault();
    var choiceLength = this.state.choiceList.length;
    if (choiceLength > 2) {
      var newList = this.state.choiceList;
      var deleteItem = Number(event.target.getAttribute('id'));
      var deleteIndex = newList.indexOf(deleteItem);
      newList.splice(deleteIndex, 1);
      this.setState({
        choiceList: newList
      });
    }
    else {
      alert('Can\'t delete! You need at least 2 choices.');
    }
  }

  render() {
    var listLength = this.state.choiceList.length;
    var btnDeleteClass = listLength <= 2 ?
      'btn btn-block btn-delete disabled' : 'btn btn-block btn-delete';
    var choices = [];
    var choiceNum = 1;
    this.state.choiceList.forEach(function(num) {
      choices.push(<Choice 
                     choiceNum={choiceNum}
                     key={num} 
                     id={num} 
                     deleteClick={this.deleteChoice} 
                     btnDeleteClass={btnDeleteClass} />);
      choiceNum++;
      }, this
    );
    return (
      <div className="col-xs-12 col-sm-5 col-md-4">
        <div className="choice-list">
          <form>
            { choices }
            <button className="btn btn-block btn-add" onClick={this.addChoice}>
              +
            </button>
          </form>
        </div>
      </div>
    );
  }
}


/********************************************************************************/
class ChoiceAnswer extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-7 col-md-8">
        <div className="choice-answer">
          answer goes here
        </div>
      </div>
    );
  }
}


/********************************************************************************/
class Chooser extends Component {
  render() {
    return (
      <div className="row">
        <ChoiceList />
        <ChoiceAnswer />
      </div>
    );
  }
}

export default Chooser;