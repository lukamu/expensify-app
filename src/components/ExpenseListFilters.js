import React, { useState } from "react";
import { connect } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate,
} from "../actions/filters";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

class ExpenseListFilters extends React.Component {
  state = {
    showCalendar: false,
  };

  showCalendar = () => {
    this.setState((prevState) => ({
      showCalendar: !prevState.showCalendar,
    }));
  };

  onDatesChange = ({ from, to }) => {
    this.props.dispatch(setStartDate(from));
    this.props.dispatch(setEndDate(to));
  };

  onFilterClear = () => {
    this.props.dispatch(setStartDate(undefined));
    this.props.dispatch(setEndDate(undefined));
    this.setState(() => ({
      showCalendar: false,
    }));
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={(e) => {
            props.dispatch(setTextFilter(e.target.value));
          }}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={(e) => {
            if (e.target.value === "date") {
              this.props.dispatch(sortByDate());
            } else if (e.target.value === "amount") {
              this.props.dispatch(sortByAmount());
            }
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <div>
          <input
            type="text"
            value={`${
              this.props.filters.startDate &&
              format(new Date(this.props.filters.startDate), "PP")
            } -> ${
              this.props.filters.endDate &&
              format(new Date(this.props.filters.endDate), "PP")
            }`}
            onClick={() => this.showCalendar()}
            readOnly
          />
          <button onClick={this.onFilterClear}>Clear</button>
          {this.state.showCalendar && (
            <DayPicker
              mode="range"
              defaultMonth={new Date()}
              selected={{
                from: this.props.filters.startDate,
                to: this.props.filters.endDate,
              }}
              onSelect={this.onDatesChange}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);
