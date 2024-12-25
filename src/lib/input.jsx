import * as React from "react";

export default class DoubleInput extends React.Component {
  /*
   * Expects:
   * name
   * value
   * default
   * handleInputChange
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <label>
        {this.props.label}:
        <input
          type="number"
          name={this.props.name}
          value={this.props.value}
          onInput={this.props.handleInputChange}
        />
      </label>
    );
  }
}

export function Measurement({ label, name, value, onChange }) {
  function onChangeInternal(e) {
    console.log("onChangeInternal" + e);
    onChange(e.target.value);
  }

  return (
    <>
      <label>
        {label}
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChangeInternal}
        />
      </label>
    </>
  );
}

export function Measurements({ measurements }) {
  return (
    <>
      {measurements.map((measurement, i) => {
        return (
          <>
            <Measurement
              key={measurement.name}
              label={measurement.label}
              name={measurement.name}
              value={measurement.value}
              onChange={measurement.onChange}
            />
            <br/>
          </>
        );
      })}
    </>
  );
}
