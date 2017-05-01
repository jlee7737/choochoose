import React, { Component } from 'react';
import './App.css';


class Choice extends Component {
  render() {
    var btnDeleteClass = this.props.len <= 2 ? 'btn btn-block btn-delete disabled' : 'btn btn-block btn-delete';
    return (
      <div className="row" id={this.props.id}>
        <div className="col-xs-12">
          <div className="input-group">
            <input className="form-control" name={"choice" + this.props.id} type="text" />
            <span className="input-group-btn">
              <button className={btnDeleteClass} id={this.props.id} onClick={this.props.deleteClick}>-</button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

class ChoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choiceList : [0, 1],
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
    var choiceLength = this.state.choiceList.length;
    if (choiceLength > 2) {
      var newList = this.state.choiceList;
      var deleteItem = Number(e.target.getAttribute('id'));
      var deleteIndex = newList.indexOf(deleteItem);
      newList.splice(deleteIndex, 1);
      this.setState({
        choiceList : newList
      });
    }
  }

  render() {
    var choiceLength = this.state.choiceList.length;
    var choices = [];
    this.state.choiceList.forEach(function(num) {
      choices.push(<Choice key={num} id={num} deleteClick={this.deleteChoice} len={choiceLength} />);
      }, this
    );
    return (
      <div className="col-xs-12 col-sm-5 col-md-4">
        <div className="choice-list">
          <form>
            { choices }
            <button className="btn btn-block btn-add" onClick={this.addChoice}>+</button>
          </form>
        </div>
      </div>
    );
  }
}

class ChoiceAnswer extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-7 col-md-8">
        <div className="choice-answer">
          asdf
        </div>
      </div>
    );
  }
}

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
