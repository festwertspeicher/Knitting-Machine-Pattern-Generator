import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, { Trapezoid, DropShoulderSweaterBodyPanel, DropShoulderSweaterSleeve } from "../lib/basic_blocks";

export default class DropShoulderCutAndSewSweater extends KnitBlock {
  constructor(props) {
    super(props);

    if (localStorage.getItem("chestCircumference")) {
      this.populateStorage();
    }

    this.state = {
      gaugeSt: localStorage.getItem("gaugeSt"),
      gaugeStLabel: "Stitches per inch (for the body)",
      gaugeRows: localStorage.getItem("gaugeRows"),
      gaugeRowsLabel: "Rows per inch (for the body)",
      ribbingGaugeSt: localStorage.getItem("ribbingGaugeSt"),
      ribbingGaugeStLabel: "Ribbing stitches per inch",
      ribbingGaugeRows: localStorage.getItem("ribbingGaugeRows"),
      ribbingGaugeRowsLabel: "Ribbing rows per inch",
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
    localStorage.setItem("ribbingGaugeSt", 7);
    localStorage.setItem("ribbingGaugeRows", 11);
    localStorage.setItem("chestCircumference", 38);
    localStorage.setItem("inchesOfEase", 2);
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
    return parseInt(this.state.armpitCircumference) + this.state.inchesOfEase / 2
  }
  
  necklineSt() {
    return this.convertToRows(this.state.gaugeSt, 20);
  }
  
  necklineRows() {
    return this.convertToRows(this.state.ribbingGaugeRows, 3);
  }

  render() {
    return (
      <>
        <h1 className="title">Drop shoulder cut and sew neckline sweater</h1>
        <p>
          This is a drop shoulder sweater with a cut and sew neckline and ribbing on the cuffs. There is no shoulder shaping.
        </p>
        <div>
          <h2>Measurements</h2>
          {this.renderInput("gaugeSt")}
          <br />
          {this.renderInput("gaugeRows")}
          <br />
          {this.renderInput("ribbingGaugeSt")}
          <br />
          {this.renderInput("ribbingGaugeRows")}
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
            ribbingGaugeRows={this.state.ribbingGaugeRows}
            width={
              this.state.chestCircumference / 2 + this.state.inchesOfEase / 2
            }
            length={this.state.finishedLength}
            sleeveWidth={
              parseInt(this.state.armpitCircumference) +
              this.state.inchesOfEase / 2
            }
            hemLength={2}
            cutAndSew={true}
          ></DropShoulderSweaterBodyPanel>
          <h2>Body assembly</h2>
          <p>
            Block the body panels before assembling.
          </p>
          <p>
            Fold the front panel in half, right sides together. Measure 3 inches down from the top on the center fold. Draw a curve from the
            neckline yarn marker to that mark on the center fold. Do the same on the other side taking care to make sure these curves 
            are the same.
          </p>
          <p>
            With a stretchy stitch, in a matching color, sew along this line. Be careful not to stretch out the fabric. 
            If you have a standard sewing machine, use a zigzag and then cut the excess fabric off close to the line of stitching. 
            If you have a serger, you're good to go. 
          </p>
          <p>
            Do the same for the back, measuring down 1 inch instead of 3.
          </p>
          <p>
            Join one shoulder seam together to the yarn markers. 
          </p>
          <p>
            With the wrong side facing you, rehang {this.necklineSt()} from the neck edge, picking up stitches just below the line of machine stitching.
          </p>
          <p>
            Bring all of the needles all the way out to make sure they knit correctly and knit one row of stockinette.
          </p>
          <p>
            Transfer half of the stitches to the bottom bed for 1x1 ribbing. Knit {this.necklineRows()} rows.
            Transfer the stitches back to the main bed and scrap off.
          </p>
          <p>
            Join the other sleeve and the edge of the neckline.
          </p>
          <p>
            Fold the neckline over and secure the live stitches to the sweater just below the sewn edge with a stretchy stitch.
          </p>
          <p>
            Measure from the edge of the shoulder down to the wrist to get your sleeve length measurement.
          </p>
          <h2>Sleeve (worked cuff up) make 2</h2>
          <DropShoulderSweaterSleeve
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            ribbingGaugeRows={this.state.ribbingGaugeRows}
            topCircumference={this.sleeveTopCircumference()}
            bottomCircumference={
              parseInt(this.state.handCircumference) +
              this.state.inchesOfEase / 2
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
            Bind off, catching both stitches.
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
