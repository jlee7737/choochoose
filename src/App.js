import React, { Component } from 'react';
import './App.css';


class Choice extends Component {
  render() {
    return (
      <div id={this.props.id}>
        <input name={"choice" + this.props.id} type="text" />
        <button id={this.props.id} onClick={this.props.deleteClick}>-</button>
      </div>
    );
  }
}

class ChoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choiceList : [0, 1]
    };
    this.addChoice = this.addChoice.bind(this);
    this.deleteChoice = this.deleteChoice.bind(this);
  }

  addChoice(e) {
    e.preventDefault();
    var newList = this.state.choiceList;
    if (newList.length > 0) {
      var newChoice = newList[newList.length-1] + 1;
      newList.push(newChoice);
    }
    else {
      newList = [0];
    }
    this.setState({
      choiceList : newList
    });
  }

  deleteChoice(e) {
    e.preventDefault();
    var newList = this.state.choiceList;
    var deleteItem = Number(e.target.getAttribute('id'));
    var deleteIndex = newList.indexOf(deleteItem);
    newList.splice(deleteIndex, 1);
    this.setState({
      choiceList : newList
    });
  }

  render() {
    var choices = [];
    this.state.choiceList.forEach(function(num) {
      choices.push(<Choice key={num} id={num} deleteClick={this.deleteChoice} />);
      }, this
    );
    return (
      <form>

        { choices }
        <button onClick={this.addChoice}>+</button>
      { this.props.children }
      </form>
    );
  }
}

class Chooser extends Component {
  render() {
    return (
      <div>
        <ChoiceList />
      </div>
    );
  }
}

export default Chooser;
