import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, { Trapezoid, MinHeightTrapezoid, HalfTrapezoid } from "../lib/basic_blocks";
import SetInSleeve, {SetInSleeveCrewBodyPanel} from "../lib/set_in_sleeve";
import RaglanSleeve, {RaglanCrewBodyPanel} from "../lib/raglan_sleeve";

export default class RaglanCrewPullover extends KnitBlock {
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
      chestCircumference: localStorage.getItem("chestCircumference"),
      chestCircumferenceLabel: "Chest circumference",
      inchesOfEase: localStorage.getItem("inchesOfEase"),
      inchesOfEaseLabel: "Inches of ease",
      shoulderWidth: localStorage.getItem("shoulderWidth"),
      shoulderWidthLabel: "Shoulder width",
      finishedLength: localStorage.getItem("finishedLength"),
      finishedLengthLabel: "Finished length",
      bicepCircumference: localStorage.getItem("bicepCircumference"),
      bicepCircumferenceLabel: "Bicep circumference",
      handCircumference: localStorage.getItem("handCircumference"),
      handCircumferenceLabel: "Hand circumference",
      armholeDepth: localStorage.getItem("armholeDepth"),
      armholeDepthLabel: "Armhole depth",
      sleeveLength: localStorage.getItem("sleeveLength"),
      sleeveLengthLabel: "Sleeve length",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  populateStorage() {
    localStorage.setItem("gaugeSt", 7.75);
    localStorage.setItem("gaugeRows", 11);
    localStorage.setItem("chestCircumference", 38);
    localStorage.setItem("inchesOfEase", 2);
    localStorage.setItem("shoulderWidth", 14);
    localStorage.setItem("finishedLength", 24);
    localStorage.setItem("bicepCircumference", 12);
    localStorage.setItem("handCircumference", 8);
    localStorage.setItem("armholeDepth", 6.5);
    localStorage.setItem("sleeveLength", 23);
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

  render() {
    return (
      <>
        <h1 className="title">Raglan sleeve crew neck sweater</h1>
        <p>
          This is a raglan sleeve crew neck sweater. 
          You should be comfortable with increasing, decreasing, and short rows before attempting this sweater.
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
          {this.renderInput("shoulderWidth")}
          <br />
          {this.renderInput("finishedLength")}
          <br />
          {this.renderInput("bicepCircumference")}
          <br />
          {this.renderInput("handCircumference")}
          <br />
          {this.renderInput("armholeDepth")}
          <br />
          {this.renderInput("sleeveLength")}
          <br />
        </div>
        <div>
          <h2>Body panel (worked bottom up)</h2>
          <RaglanCrewBodyPanel
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            width={
              this.state.chestCircumference / 2.0 + this.state.inchesOfEase / 2.0
            }
            length={this.state.finishedLength}
            armholeDepth={parseInt(this.state.armholeDepth) + this.state.inchesOfEase / 2.0}
            shoulderWidth={parseInt(this.state.shoulderWidth) + this.state.inchesOfEase / 2.0}
            hemLength={2}
          ></RaglanCrewBodyPanel>
          <h2>Body assembly</h2>
          <p>
            Seam the front and the back together at one shoulder.
          </p>
          <p>
            Rehang at least {this.convertToRows(this.state.gaugeSt, 22)} stitches from the combined neckline for 1x1 ribbing.
            Knit {this.convertToRows(this.state.gaugeRows, 1)} rows and finish with a stretchy bind off.
          </p>
          <p>
            Seam the other shoulder including the neckline.
          </p>
          <h2>Sleeve (worked cuff up) make 2</h2>
          <RaglanSleeve
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            bicepCircumference={parseInt(this.state.bicepCircumference) + parseInt(this.state.inchesOfEase)}
            armholeDepth={this.state.armholeDepth + parseInt(this.state.inchesOfEase / 2.0)}
            bottomCircumference={
              parseInt(this.state.handCircumference) +
              parseInt(this.state.inchesOfEase)
            }
            length={this.state.sleeveLength}
          ></RaglanSleeve>
          <h2>Finishing</h2>
          <p>
            Attach the sleeves to the body before seaming.
          </p>
          <p>
            Seam the sleeves and the body with a mattress stitch.
          </p>
          <p>
            Weave in ends.
          </p>
        </div>
      </>
    );
  }
}
