import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, { Trapezoid } from "../lib/basic_blocks";

class DropShoulderRoundYokeSweaterSleeve extends KnitBlock {
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
    return this.convertToRows(this.props.gaugeRows, 2);
  }
  
  totalRows() {
    return this.convertToRows(this.props.gaugeRows, this.props.length);
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
        <p>RC000</p>
        <p>Cast on {this.startSt()} stitches for 1x1 ribbing.</p>
        <p>
          Knit {this.cuffRows()} rows and transfer stitches to main bed.
        </p>
        <p>
          Knit to RC {this.totalRows()}{" "}
          increasing one stitch each side, every {this.increaseFrequency()}{" "}
          rows. You should have {this.endSt()} stitches.
        </p>
      </>
    );
  }
}

class DropShoulderSweaterBodyPanel extends KnitBlock {
  constructor(props) {
    super(props);
  }

  widthSt() {
    return this.convertToRows(this.props.gaugeSt, this.props.width);
  }

  hemRC() {
    return this.convertToRows(this.props.gaugeRows, 4);
  }

  finalRC() {
    return (
      this.convertToRows(this.props.gaugeRows, this.props.length) + (this.hemRC() / 2)
    );
  }

  shoulderSt() {
    // Head hole is 10 inches and we want one shoulder not both.
    var shoulderWidth = (this.props.width - 10.0) / 2;
    return this.convertToRows(this.props.gaugeSt, shoulderWidth);
  }

  neckStartSt() {
    return this.widthSt() / 2 - this.shoulderSt();
  }

  shoulderRows() {
    return this.convertToRows(this.props.gaugeRows, 2);
  }

  shoulderStep() {
    return Math.round((this.shoulderSt() / this.shoulderRows()) * 2);
  }

  render() {
    return (
      <>
        <p>Cast on {this.widthSt()} stitches on waste yarn.</p>
        <p>RC000</p>
        <p>Knit {this.hemRC()} rows and rehang live stitches for hem.</p>
        <p>
          Knit to row{" "}
          {this.finalRC() -
            this.convertToRows(
              this.props.gaugeRows,
              this.props.sleeveWidth / 2
            )}{" "}
          place a yarn marker. This is where the sleeve will start.
        </p>
        <p>
          Knit to row {this.finalRC()}. You can bind off here or you can keep
          going with the shoulder shaping instructions.
        </p>
        <p>
          The shoulders are shaped with short rows. You could do an incremental
          bind off, but I'm too lazy for that.
        </p>
        <p>
          Set carriage to hold position. Bring {this.shoulderStep()} needles to
          hold on the edge of the work opposite from the carriage. Knit one row.
          Wrap the last needle in hold position. Bring {this.shoulderStep()}{" "}
          needles to hold on the other edge and knit one row.
        </p>
        <p>
          Repeat, bringing needles to hold and wrapping until there are{" "}
          {this.shoulderSt()} needles in hold on each side.
        </p>
        <p>
          Take the carriage out of hold postion and knit until all needles are
          back in work. Place markers at stitch {this.neckStartSt()} on the right and left.
          This is where the neckline starts.
        </p>
        <p>
          Bind off.
        </p>
      </>
    );
  }
}

export default class SleeveSweater extends KnitBlock {
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
      handCircumference: localStorage.getItem("handCircumference"),
      handCircumferenceLabel: "Hand circumference",
      sleeveLength: localStorage.getItem("sleeveLength"),
      sleeveLengthLabel: "Sleeve length",
      bodyLength: localStorage.getItem("bodyLength"),
      bodyLengthLabel: "Body length",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  populateStorage() {
    localStorage.setItem("gaugeSt", 7.75);
    localStorage.setItem("gaugeRows", 10.5);
    localStorage.setItem("chestCircumference", 38);
    localStorage.setItem("handCircumference", 8);
    localStorage.setItem("sleeveLength", 22);
    localStorage.setItem("bodyLength", 9);
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
  
  underarm() {
    return this.state.chestCircumference / 8.0;
  }
  
  sleeveTopCircumference() {
    return this.underarm() * 3;
  }
  
  yokeNeedle() {
    var sleeveTop = this.sleeveTopCircumference();
    var top = sleeveTop - this.underarm();
    return this.convertToRows(this.state.gaugeSt, top/2.0);
  }
  
  numReductions() {
    var startingCircumference = this.yokeNeedle() * 2;
    var endingCircumference = 24;
    var circumference = startingCircumference;
    var repeats = 0;
    while(circumference > endingCircumference) {
      repeats += 1;
      circumference *= (2/3);
    }
    return repeats;
  }
  
  yokeRowLength() {
    var inches = 4.0 / this.numReductions();
    return this.convertToRows(this.state.gaugeRows, inches);
  }

  render() {
    return (
      <>
        <h1 className="title">Sleeve sweater</h1>
        <p>
          This is a variation on the traditional round yoke sweater. Make sure to read
          all instructions before embarking on this journey.
        </p>
        <div>
          <h2>Measurements</h2>
          {this.renderInput("gaugeSt")}
          <br />
          {this.renderInput("gaugeRows")}
          <br />
          {this.renderInput("chestCircumference")}
          <br />
          {this.renderInput("handCircumference")}
          <br />
          {this.renderInput("sleeveLength")}
          <br />
          <p>
            Wait until you've assembled the yoke of the sweater before measuring
            body length.
          </p>
          {this.renderInput("bodyLength")}
          <br />
        </div>
        <div>
          <h2>Sleeve (worked cuff up) make 8</h2>
          <DropShoulderRoundYokeSweaterSleeve
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            topCircumference={this.sleeveTopCircumference()}
            bottomCircumference={this.state.handCircumference}
            length={this.state.sleeveLength - 5}
          ></DropShoulderRoundYokeSweaterSleeve>
          <p>
            Place yarn markers at needle {this.yokeNeedle()} on the left and right for 
            sleeve assembly.
          </p>
          <p>Scrap off.</p>
          <h2>Yoke assembly</h2>
          <p>
            From here on out, the math gets a little fuzzy. The work will come on and off of the
            machine several times. You will join increasingly large sections together.
          </p>
          <p>
            Rehang as many of the sleeves, only the stitches between the yarn markers, 
            as you can back on the bed, overlapping one stitch
            where the sleeves meet. Bring one extra needle into work at each side for seaming later.
          </p>
          <p>
            Knit {this.convertToRows(this.state.gaugeRows, 5)} rows. Scrap off. Repeat with the 
            remaining sleeves until all sleeves have this extra knitting.
          </p>
          <p>
            Rehang as many sections as you can, reducing stitches by 1/3rd, overlapping one 
            stitch between sections for seaming. 
          </p>
          <p>
            Knit {this.yokeRowLength()} rows. Scrap off. 
          </p>
          <p>
            Repeat the rehanging reduced by 1/3rd, knit {this.yokeRowLength()}, scrap off, 
            a total of {this.numReductions()} times (including the first time).
          </p>
          <p>
            Finish with {this.convertToRows(this.state.gaugeRows, 1)} rows of ribbing. Bind off.
          </p>
          <p>
            Remove the waste yarn starting with the smallest row and double check that the edge has 
            caught all of the live stitches. Keep going until you've removed all of the waste yarn 
            from the yoke sections (there will still be waste yarn on the top edge of the sleeve). 
            Seam the edges together.
          </p>
          <p>
            Sew all of the sleeve seams.
          </p>
          <h2>Body</h2>
          <p>
            Put some of your arms into the sweater and see how it fits. Measure from the bottom edge
            of the underarm to where you want the body to hit.
          </p>
          <p>
            Rehang half of the remaining underarm live stitches on the bed, add an extra stitch on
            each side for the side seam. 
            Knit {this.convertToRows(this.state.gaugeRows, this.state.bodyLength - 2)} rows.
          </p>
          <p>
            Transfer half of the stitches to the bottom bed for 1x1 ribbing. 
            Knit {this.convertToRows(this.state.gaugeRows, 2)} rows.
          </p>
          <p>
            Repeat with the other half.
          </p>
          <p>
            Seam the sides together.
          </p>
        </div>
      </>
    );
  }
}
