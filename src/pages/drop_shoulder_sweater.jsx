import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, { Trapezoid, DropShoulderSweaterBodyPanel, DropShoulderSweaterSleeve } from "../lib/basic_blocks";

export default class DropShoulderSweater extends KnitBlock {
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
      finishedLength: localStorage.getItem("finishedLength"),
      finishedLengthLabel: "Finished length",
      armpitCircumference: localStorage.getItem("armpitCircumference"),
      armpitCircumferenceLabel: "Armpit circumference",
      handCircumference: localStorage.getItem("handCircumference"),
      handCircumferenceLabel: "Hand circumference",
      sleeveLength: localStorage.getItem("sleeveLength"),
      sleeveLengthLabel: "Sleeve length",
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
    localStorage.setItem("handCircumference", 8);
    localStorage.setItem("sleeveLength", 20);
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
    return parseInt(this.state.armpitCircumference) + parseInt(this.state.inchesOfEase)
  }

  render() {
    return (
      <>
        <h1 className="title">Drop shoulder sweater</h1>
        <p>
          This is the simplest possible sweater to knit. The front and the back
          are big rectangles and the sleeves are trapezoids. There is no neck
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
          {this.renderInput("handCircumference")}
          <br />
          <p>
            Wait until you've assembled the body of the sweater before measuring
            sleeve length.
          </p>
          {this.renderInput("sleeveLength")}
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
              parseInt(this.state.inchesOfEase)
            }
            hemLength={2}
          ></DropShoulderSweaterBodyPanel>
          <h2>Body assembly</h2>
          <p>
            Sew the shoulder seams together to the yarn marker. Try on the peice in it's current form.
          </p>
          <p>
            Measure from the edge of the shoulder down to the wrist to get your sleeve length measurement.
          </p>
          <h2>Sleeve (worked cuff up) make 2</h2>
          <DropShoulderSweaterSleeve
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            topCircumference={this.sleeveTopCircumference()}
            bottomCircumference={
              parseInt(this.state.handCircumference) +
              parseInt(this.state.inchesOfEase)
            }
            length={this.state.sleeveLength}
          ></DropShoulderSweaterSleeve>
          <p>Scrap off.</p>
          <h2>Sleeve assembly</h2>
          <p>
            With the right side facing you, hang the shoulder seam on the needles at the center of the bed.
            Hang the yarn markers on needle {parseInt(this.convertToRows(this.state.gaugeSt, this.sleeveTopCircumference()) / 2)} on the right and left. 
            Pick up stitches evenly from the selveged until all of the needles in between have stitches on them.
          </p>
          <p>
            With the right side facing the knitting machine, rehang the live stitches from the sleeve on the same needles.
            Each needle should have one stitch picked up from the edge of the arm hole and one from the sleeve.
          </p>
          <p>
            Knit one row.
          </p>
          <p>
            Bind off.
          </p>
          <h2>Finishing</h2>
          <p>
            Seam the sleeves and body together with a mattress stitch.
          </p>
          <p>
            Weave in ends.
          </p>
        </div>
      </>
    );
  }
}
