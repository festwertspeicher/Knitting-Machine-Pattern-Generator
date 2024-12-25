import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, { Trapezoid, HalfTrapezoid, DropShoulderSweaterBodyPanel } from "../lib/basic_blocks";

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

export default class FittedSkirt extends KnitBlock {
  constructor(props) {
    super(props);

    if (localStorage.getItem("chestCircumference")) {
      this.populateStorage();
    }

    this.state = {
      gaugeSt: localStorage.getItem("gaugeSt"),
      gaugeStLabel: "Stitches per inch",
      gaugeRows: localStorage.getItem("gaugeRows"),
      gaugeRowsLabel: "Rows per inch",
      waistCircumference: localStorage.getItem("waistCircumference"),
      waistCircumferenceLabel: "Waist circumference",
      hipCircumference: localStorage.getItem("hipCircumference"),
      hipCircumferenceLabel: "Hip circumference (at the widest point)",
      hemCircumference: localStorage.getItem("hemCircumference"),
      hemCircumferenceLabel: "Circumference of the bottom hem",
      finishedLength: localStorage.getItem("finishedLength"),
      finishedLengthLabel: "Finished length",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  populateStorage() {
    localStorage.setItem("gaugeSt", 7);
    localStorage.setItem("gaugeRows", 11);
    localStorage.setItem("waistCircumference", 30);
    localStorage.setItem("hipCircumference", 42);
    localStorage.setItem("hemCircumference", 40);
    localStorage.setItem("finishedLength", 15);
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
  
  oneThirdBodyWidth() {
    return (this.state.wingspan - this.state.sleeveLength * 2)/ 3;
  }
  
  twoThirdsBodyLength() {
    return 2 * (this.state.finishedLength / 3);
  }

  render() {
    return (
      <>
        <h1 className="title">Fitted skirt</h1>
        <p>
          This is a high waisted skirt that could be a mini or a pencil skirt depending on how long you make it.
        </p>
        <p>
          You will need a length of 1" elastic for the waist.
        </p>
        <p>
          This is a beginner friendly project with increases, decreases, and folded hems worked bottom up.
        </p>
        <div>
          <h2>Measurements</h2>
          {this.renderInput("gaugeSt")}
          <br />
          {this.renderInput("gaugeRows")}
          <br />
          {this.renderInput("waistCircumference")}
          <br />
          {this.renderInput("hipCircumference")}
          <br />
          {this.renderInput("hemCircumference")}
          <br />
          {this.renderInput("finishedLength")}
          <br />
        </div>
        <div>
          <h2>Skirt pannel, make 2</h2>
          <p>
            Cast on {this.convertToRows(this.state.hemCircumference / 2.0, this.state.gaugeSt)} stitches on waste yarn.
          </p>
          <p>
            Knit {this.convertToRows(2.0, this.state.gaugeRows)} rows.
          </p>
          <p>
            Pick up and rehang the live stitches to create a folded hem.
          </p>
          
          <Trapezoid
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            startWidth={this.state.hemCircumference / 2.0}
            endWidth={this.state.hipCircumference / 2.0}
            length={this.state.finishedLength - 7}
            >
          </Trapezoid>
          <p></p>
          
          <Trapezoid
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            startWidth={this.state.hipCircumference / 2.0}
            endWidth={this.state.waistCircumference / 2.0}
            length={6.0}
            >
          </Trapezoid>
          
          <p>
            Knit {this.convertToRows(2.0, this.state.gaugeRows)} rows.
          </p>
          <p>
            Cast off on waste yarn.
          </p>
          <h2>Finishing</h2>
          <p>
            Fold over the top 1" on each piece and secure it to the inside with a stretchy stitch.
          </p>
          <p>
            Mattress stitch one side seam.
          </p>
          <p>
            Cut a length of 1" elastic slightly about the circumference of your waist. Thread it
            through the tube created for the top hem and secure the edges together either with a 
            sewing machine or by hand.
          </p>
          <p>
            Weave in the ends and wash and block your skirt.
          </p>
        </div>
      </>
    );
  }
}
