import React from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? new Date(props.expense.createdAt) : new Date(),
      showCalendar: false,
      error: "",
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDayClick = (createdAt) => {
    this.setState(() => ({
      createdAt,
      showCalendar: false,
    }));
  };

  showCalendar = () => {
    this.setState(() => ({
      showCalendar: true,
    }));
  };

  onSubmit = (e) => {
    e.preventDefault(); //we avoid the refresh of the full page when the form is submitted
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount.",
      }));
    } else {
      this.setState(() => ({
        error: "",
      }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100, // converting from string to a number
        createdAt: this.state.createdAt.getTime(),
        note: this.state.note,
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            autoFocus
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <div>
            <input
              type="text"
              value={
                this.state.createdAt
                  ? format(new Date(this.state.createdAt), "MM/dd/yyyy")
                  : ""
              }
              onFocus={() => this.showCalendar(true)}
              readOnly
            />
            {this.state.showCalendar && (
              <DayPicker
                mode="default"
                selected={this.state.createdAt}
                onDayClick={this.onDayClick}
              />
            )}
          </div>
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
