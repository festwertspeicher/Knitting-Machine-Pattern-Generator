import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, { Trapezoid, DropShoulderSweaterBodyPanel } from "../lib/basic_blocks";

class DropShoulderSweaterSleeve extends KnitBlock {
  constructor(props) {
    super(props);
  }

  startSt() {
    return this.convertToRows(
      this.props.gaugeSt,
      this.props.bottomCircumference
    );
  }

  endSt() {
    return this.convertToRows(this.props.gaugeSt, this.props.topCircumference);
  }

  cuffRows() {
    return this.convertToRows(this.props.gaugeRows, 4);
  }
  
  totalRows() {
    var totalRows = this.convertToRows(this.props.gaugeRows, this.props.length);
    return totalRows + (this.cuffRows() / 2);
  }
  
  increaseFrequency() {
    var totalRows = this.convertToRows(this.props.gaugeRows, this.props.length);
    totalRows = totalRows - this.cuffRows();
    var diff = (this.endSt() - this.startSt()) / 2;
    return parseInt(totalRows / diff);
  }

  render() {
    return (
      <>
        <p>Cast on {this.startSt()} stitches on waste yarn.</p>
        <p>RC000</p>
        <p>
          Knit {this.cuffRows()} rows and rehang
          live stitches for cuff.
        </p>
        <p>
          Knit to RC
          {this.totalRows()}{" "}
          increasing one stitch each side, every {this.increaseFrequency()}{" "}
          rows. You should have {this.endSt()} stitches.
        </p>
      </>
    );
  }
}

export default class BoxySleevelessTop extends KnitBlock {
  constructor(props) {
    super(props);

    if (!localStorage.getItem("chestCircumference")) {
      this.populateStorage();
    }

    this.state = {
      gaugeSt: localStorage.getItem("gaugeSt"),
      gaugeStLabel: "Stitches per inch",
      gaugeRows: localStorage.getItem("gaugeRows"),
      gaugeRowsLabel: "Rows per inch",
      chestCircumference: localStorage.getItem("chestCircumference"),
      chestCircumferenceLabel: "Chest circumference",
      inchesOfEase: localStorage.getItem("inchesOfEase"),
      inchesOfEaseLabel: "Inches of ease",
      finishedLength: localStorage.getItem("finishedLength"),
      finishedLengthLabel: "Finished length",
      armpitCircumference: localStorage.getItem("armpitCircumference"),
      armpitCircumferenceLabel: "Armpit circumference",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  populateStorage() {
    localStorage.setItem("gaugeSt", 7);
    localStorage.setItem("gaugeRows", 11);
    localStorage.setItem("chestCircumference", 38);
    localStorage.setItem("inchesOfEase", 6);
    localStorage.setItem("finishedLength", 25);
    localStorage.setItem("armpitCircumference", 18);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    var value = target.value;

    if (value) {
      value = parseFloat(value);
    }

    this.setState({
      [name]: value,
    });

    localStorage.setItem(name, value);
  }

  renderInput(name) {
    return (
      <DoubleInput
        name={name}
        value={this.state[name]}
        label={this.state[name + "Label"]}
        handleInputChange={(event) => this.handleInputChange(event)}
      />
    );
  }
  
  sleeveTopCircumference() {
    return parseInt(this.state.armpitCircumference) + this.state.inchesOfEase / 2
  }

  render() {
    return (
      <>
        <h1 className="title">Boxy sleeveless top</h1>
        <p>
          This is a simple boxy sleeveless top. The front and the back
          are big rectangles with some short row shoulder shaping. There is no neck
          shaping to worry about, just a bound off edge.
        </p>
        <div>
          <h2>Measurements</h2>
          {this.renderInput("gaugeSt")}
          <br />
          {this.renderInput("gaugeRows")}
          <br />
          {this.renderInput("chestCircumference")}
          <br />
          {this.renderInput("inchesOfEase")}
          <br />
          {this.renderInput("finishedLength")}
          <br />
          {this.renderInput("armpitCircumference")}
          <br />
        </div>
        <div>
          <h2>Body panel (worked bottom up) make 2</h2>
          <DropShoulderSweaterBodyPanel
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            width={
              this.state.chestCircumference / 2 + this.state.inchesOfEase / 2
            }
            length={this.state.finishedLength}
            sleeveWidth={
              parseInt(this.state.armpitCircumference) +
              this.state.inchesOfEase / 2
            }
            hemLength={1}
          ></DropShoulderSweaterBodyPanel>
          <h2>Body assembly</h2>
          <p>
            Sew the shoulder seams together to the yarn marker.
          </p>
          <p>
            You can pick up stitches here and add ribbing to the arm holes or you can just let the 
            stockinette curl.
          </p>
          <p>
            Seam the sides together from the hem to the yarn marker.
          </p>
          <h2>Finishing</h2>
          <p>
            Weave in ends.
          </p>
        </div>
      </>
    );
  }
}
