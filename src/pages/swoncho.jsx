import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, { HalfTrapezoid, DropShoulderSweaterBodyPanel } from "../lib/basic_blocks";

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

export default class Swoncho extends KnitBlock {
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
      wingspan: localStorage.getItem("wingspan"),
      wingspanLabel: "Wingspan measured wrist to wrist across the back with arms at your sides",
      sleeveCircumference: localStorage.getItem("sleeveCircumference"),
      sleeveCircumferenceLabel: "Sleeve circumference",
      sleeveLength: localStorage.getItem("sleeveLength"),
      sleeveLengthLabel: "Sleeve length",
      finishedLength: localStorage.getItem("finishedLength"),
      finishedLengthLabel: "Finished length",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  populateStorage() {
    localStorage.setItem("gaugeSt", 7);
    localStorage.setItem("gaugeRows", 11);
    localStorage.setItem("wingspan", 40);
    localStorage.setItem("sleeveCircumference", 8);
    localStorage.setItem("sleeveLength", 6);
    localStorage.setItem("finishedLength", 25);
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
        <h1 className="title">Swoncho</h1>
        <p>
          Not quite a sweater, not quite a poncho. It's kind of a poncho with sleeves.
        </p>
        <p>
          This is a very easy project, knit sideways.
        </p>
        <div>
          <h2>Measurements</h2>
          {this.renderInput("gaugeSt")}
          <br />
          {this.renderInput("gaugeRows")}
          <br />
          {this.renderInput("wingspan")}
          <br />
          {this.renderInput("sleeveCircumference")}
          <br />
          {this.renderInput("sleeveLength")}
          <br />
          {this.renderInput("finishedLength")}
          <br />
        </div>
        <div>
          <h2>Body panel worked sideways make 2</h2>
          <p>
            The body panel will grow to the right so cast on all the way over on the left side of the machine.
          </p>
          <p>
            Cast on {this.convertToRows(this.twoThirdsBodyLength(), this.state.gaugeSt)} stitches on waste yarn.
          </p>
          <HalfTrapezoid
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            startWidth={this.twoThirdsBodyLength()}
            endWidth={this.state.finishedLength}
            length={this.oneThirdBodyWidth()}
            >
          </HalfTrapezoid>
          
          <p>
            Knit {this.convertToRows(this.state.gaugeRows, this.oneThirdBodyWidth())} rows
          </p>
          
          <HalfTrapezoid
            gaugeSt={this.state.gaugeSt}
            gaugeRows={this.state.gaugeRows}
            startWidth={this.state.finishedLength}
            endWidth={this.twoThirdsBodyLength()}
            length={this.oneThirdBodyWidth()}
            >
          </HalfTrapezoid>
          
          <p>
            Cast off on waste yarn.
          </p>
          <h2>Sleeves</h2>
          <p>
            Starting at 0, pick 
            up the {this.convertToRows(this.state.gaugeSt, this.state.sleeveCircumference) / 2} live stitches 
            closest to the top of the side of one body panel. Bring one more needle on the outside edge into             work for a neater seam.
          </p>
          <p>
            Do the same for the other side, overlapping one stitch for the shoulder seam. Make sure that
            both peices are facing in the same direction on the bed.
          </p>
          <p>
            Transfer every other stitch to the ribber for 1x1 ribbing.
          </p>
          <p>
            Knit {this.convertToRows(this.state.gaugeRows, this.state.sleeveLength)} rows. Bind off with something
            stretchy.
          </p>
          
          <h2>Body assembly</h2>
          <p>
            Fold each body peice in half length wise to find the center, measure out 5 inches on either side
            to mark the neckline. Join the front and the back along the longest edge to the neckline marker. 
            Make sure it fits over your head.
          </p>
          
          <h2>Finishing</h2>
          <p>
            Seam the sleeves together along the long edge.
          </p>
          <p>
            Kitchner stitch the remaining live stitches to form the side "seam".
          </p>
          <p>
            Finish off the bottom edge with an iCord edging or leave the natural stockinette curl.
          </p>
          <p>
            Weave in ends and block.
          </p>
        </div>
      </>
    );
  }
}
