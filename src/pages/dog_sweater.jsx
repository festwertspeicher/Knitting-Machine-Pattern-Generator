import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, {Trapezoid} from "../lib/basic_blocks";

const backLengthPct = 0.9;
const frontLengthPct = 0.6;
const frontNeckPct = 0.33;
const backNeckPct = 0.66;


class DogSweaterSection extends KnitBlock {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <>
        <p>
          Cast on {this.convertToRows(this.props.gaugeSt, this.props.startWidth)} stitches
       
          {this.props.bottomRibbing != 0 && 
            <span> for 1x1 ribbing</span>
          }.
        </p>
        {this.props.bottomRibbing != 0 &&
          <span>
            <p>Knit {this.convertToRows(this.props.gaugeRows, this.props.bottomRibbing)} rows</p>
            <p>Transfer stitches to main bed.</p>
          </span>
        }
        <p>
          <Trapezoid 
            gaugeSt={this.props.gaugeSt}
            gaugeRows={this.props.gaugeRows}
            length={this.props.rectangleLength}
            startWidth={this.props.length}
            >
          </Trapezoid>
        </p>
        <p>
          <Trapezoid
            gaugeSt={this.props.gaugeSt}
            gaugeRows={this.props.gaugeRows}
            length={this.props.trapezoidLength}
            startWidth={this.props.startWidth}
            endWidth={this.props.endWidth}
            >
          </Trapezoid>
        </p>
      </>
    );
  }
}

export default class DogSweater extends KnitBlock {
  constructor(props) {
    super(props);
    
    if (!localStorage.getItem("neckToTail")) {
      this.populateStorage();
    }
    
    this.state = {
      gaugeSt: localStorage.getItem("gaugeSt"),
      gaugeStLabel: "Stitches per inch",
      gaugeRows: localStorage.getItem("gaugeRows"),
      gaugeRowsLabel: "Rows per inch",
      neckToTail: localStorage.getItem("neckToTail"),
      neckToTailLabel: "Neck to tail",
      neckCircumference: localStorage.getItem("neckCircumference"),
      neckCircumferenceLabel: "Neck circumference",
      neckToFrontLegs: localStorage.getItem("neckToFrontLegs"),
      neckToFrontLegsLabel: "Neck to front legs",
      legToLeg: localStorage.getItem("legToLeg"),
      legToLegLabel: "Distance between front legs",
      chestCircumference: localStorage.getItem("chestCircumference"),
      chestCircumferenceLabel: "Chest circumference",
      neckLength: localStorage.getItem("neckLength"),
      neckLengthLabel: "Neck length",
      bottomRibbing: localStorage.getItem("bottomRibbing"),
      bottomRibbingLabel: "Bottom ribbing length",
    };
    
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  populateStorage() {
    localStorage.setItem("gaugeSt", 7);
    localStorage.setItem("gaugeRows", 11);
    localStorage.setItem("neckToTail", 15.5);
    localStorage.setItem("neckCircumference", 14);
    localStorage.setItem("neckToFrontLegs", 4);
    localStorage.setItem("legToLeg", 3);
    localStorage.setItem("chestCircumference", 18.5);
    localStorage.setItem("neckLength", 2);
    localStorage.setItem("bottomRibbing", 2);
  }
  
  handleInputChange(event) {
    const target = event.target
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
  
  render() {
    return (
      <>
        <div>
          <h1 className="title">Dog sweater</h1>
          {this.renderInput("gaugeSt")}<br/>
          {this.renderInput("gaugeRows")}<br/>
          {this.renderInput("neckToTail")}<br/>
          {this.renderInput("neckCircumference")}<br/>
          {this.renderInput("neckToFrontLegs")}<br/>
          {this.renderInput("legToLeg")}<br/>
          {this.renderInput("chestCircumference")}<br/>
          {this.renderInput("neckLength")}<br/>
          {this.renderInput("bottomRibbing")}<br/>
        </div>
        <div>
          <h2>Back (worked bottom up)</h2>
          <DogSweaterSection
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            startWidth={this.state.chestCircumference - this.state.legToLeg}
            endWidth={this.state.neckCircumference * backNeckPct}
            rectangleLength={(this.state.neckToTail * backLengthPct) - this.state.bottomRibbing - this.state.neckToFrontLegs}
            trapezoidLength={this.state.neckToFrontLegs}
            bottomRibbing={this.state.bottomRibbing}
            >
          </DogSweaterSection>
          <p>
            Scrap off.
          </p>
          <h2>Front (worked bottom up)</h2>
          <DogSweaterSection
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            startWidth={this.state.legToLeg}
            endWidth={this.state.neckCircumference * frontNeckPct}
            rectangleLength={(this.state.neckToTail * frontLengthPct) - this.state.bottomRibbing - this.state.neckToFrontLegs}
            trapezoidLength={this.state.neckToFrontLegs}
            bottomRibbing={this.state.bottomRibbing}
            >
          </DogSweaterSection>
          <p>
            Scrap off.
          </p>
          <h2>Neck</h2>
          <p>Join one shoulder to row {this.convertToRows(this.state.gaugeRows, this.state.neckToFrontLegs)}</p>
          <p>Leave a 3 inch or {this.convertToRows(this.state.gaugeRows, 3)} stitch gap, then join the rest of the seam.</p>
          <p>Rehang neck stitches (doubling at seam) for 1x1 ribbing.</p>
          <Trapezoid
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            length={this.state.neckLength}
            startWidth={1}
            >
          </Trapezoid>
          <p>
            Join neckline and other shoulder in the same manner.
          </p>
        </div>
      </>
    );
  }
}
