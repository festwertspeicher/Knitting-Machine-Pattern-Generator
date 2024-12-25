import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, {
  Trapezoid,
  MinHeightTrapezoid,
  HalfTrapezoid,
} from "../lib/basic_blocks";
import SetInSleeve, { SetInSleeveCrewBodyPanel } from "../lib/set_in_sleeve";

export default class RoundYokeSweater extends KnitBlock {
  constructor(props) {
    super(props);

    if (!localStorage.getItem("chestCircumference")) {
      this.populateStorage();
    }

    this.state = {
      gaugeSt: localStorage.getItem("gaugeSt"),
      gaugeStLabel: "Stitches per inch body",
      gaugeRows: localStorage.getItem("gaugeRows"),
      gaugeRowsLabel: "Rows per inch body",
      gaugeRowsRibbing: localStorage.getItem("gaugeRowsRibbing"),
      gaugeRowsRibbingLabel: "Rows per inch ribbing",
      gaugeStYoke: localStorage.getItem("gaugeStYoke"),
      gaugeStYokeLabel: "Stitches per inch yoke",
      gaugeRowsYoke: localStorage.getItem("gaugeRowsYoke"),
      gaugeRowsYokeLabel: "Rows per inch yoke",
      chestCircumference: localStorage.getItem("chestCircumference"),
      chestCircumferenceLabel: "Chest circumference",
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
    console.log("populate storage");
    localStorage.setItem("gaugeSt", 7.75);
    localStorage.setItem("gaugeRows", 11);
    localStorage.setItem("gaugeRowsRibbing", 11);
    localStorage.setItem("gaugeStYoke", 7.75);
    localStorage.setItem("gaugeRowsYoke", 11);
    localStorage.setItem("chestCircumference", 38);
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
  
  bodyAfterShelfStitches() {
    const afterShelf = Math.round(
      this.state.gaugeSt * (this.state.chestCircumference / 2 - 2)
    );
    
    return Math.round(afterShelf);
  }

  bodyTopStitches() {
    const afterShelf = this.bodyAfterShelfStitches();
    // Decrease one inch each side.
    const decreases = this.state.gaugeSt * 2;
    return Math.round(afterShelf - decreases);
  }

  sleeveTopStitches() {
    const afterShelf = Math.round(
      this.state.gaugeSt * (this.state.bicepCircumference - 2)
    );
    // Decrease one inch each side
    const decreases = this.state.gaugeSt * 2;
    return Math.round(afterShelf - decreases);
  }

  firstSectionRows() {
    const height = this.state.armholeDepth - 2;
    return Math.round(this.state.gaugeRowsYoke * height);
  }

  yokeRows() {
    // We've already knit up to the shoulder at this point for the first chunky row
    // so this is just the shoulder to the neckline
    const shoulderLength = this.state.shoulderWidth - 7.5; // Neck width
    return Math.round(this.state.gaugeRowsYoke * (shoulderLength / 2.0));
  }

  yokeSections() {
    // Subtract 2 for the overlapped stitches
    const startSt = this.sleeveTopStitches() + this.bodyTopStitches() - 2;
    // Half of a 22 inch neck circumference.
    const endSt = Math.round(11 * this.state.gaugeStYoke);
    var count = 1;
    var stitches = startSt;
    while (stitches > endSt) {
      count += 1;
      stitches = stitches * (2.0 / 3.0);
    }
    // Remove that extra increase that took you over the final neck count.
    return count - 1;
  }

  shortRowCadence() {
    const stitches = this.bodyTopStitches() / 3;
    const rows = this.state.gaugeRows * 2;
    return Math.round((stitches / rows) * 2);
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

  renderHem(width) {
    return (
      <>
        <p>Cast on {Math.round(this.state.gaugeSt * width)} for 1x1 ribbing</p>
        <p>
          Knit {Math.round(this.state.gaugeRowsRibbing * 2)} rows and transfer
          all stitches to the main bed.
        </p>
      </>
    );
  }

  render() {
    return (
      <>
        <h1 className="title">Round yoke sweater</h1>
        <p>
          This is a round yoke sweater. This pattern allows for a different
          gauge for the yoke stitches with the assumption that you're going to
          use fair isle or some kind of patterning.
        </p>
        <p>
          This sweater is knit bottom up. The sleeves and body are knit up to
          the underarm and then put back on the machine to knit the yoke. The
          number of segments for the yoke is automatically calculated based on
          your measurements. You can redistribute the number rows between the
          segments if you want but try to keep the number of segments and the
          total row count the same.
        </p>
        <p>You're going to need a lot of waste yarn.</p>
        <div>
          <h2>Measurements</h2>
          {this.renderInput("gaugeSt")}
          <br />
          {this.renderInput("gaugeRows")}
          <br />
          {this.renderInput("gaugeRowsRibbing")}
          <br />
          {this.renderInput("gaugeStYoke")}
          <br />
          {this.renderInput("gaugeRowsYoke")}
          <br />
          {this.renderInput("chestCircumference")}
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
          <h2>Back body panel (worked bottom up)</h2>
          {this.renderHem(this.state.chestCircumference / 2.0)}
          <p>
            {/* Subtract 2 for the bottom hem. */}
            {/* Subtract 1 for the standard shoulder slope.*/}
            Knit{" "}
            {Math.round(
              (this.state.finishedLength - this.state.armholeDepth - 1 - 2) *
                this.state.gaugeRows
            )}{" "}
            rows
          </p>
          <p>
            Bind off {Math.round(this.state.gaugeSt)} stitches on the same side
            as the carriage.
          </p>
          <p>Knit 1 row.</p>
          <p>
            Bind off {Math.round(this.state.gaugeSt)} stitches on the same side
            as the carriage.
          </p>
          <p>This creates the under arm shelf.</p>
          <p>
            Knit {Math.round(this.state.gaugeSt)} rows decreasing one
            stitch on each side each row.
          </p>
          <p>
            Knit {Math.round((this.state.gaugeRows * 2) - this.state.gaugeSt)} more rows.
          </p>
          <p>Take the pannel off on waste yarn.</p>
          <h2>Front body panel</h2>
          <p>
            Knit the same as the front through the underarm bind off. The front
            is going to be shaped with short rows.
          </p>
          <p>
            This gets a little tricky because you will be short rowing while
            also decreasing along the outside edge. You will finish the
            decreases before you finish the short rows.
          </p>
          <p>
            In the end you will have all of your needles in hold, decreased{" "}
            {Math.round(this.state.gaugeSt * 1)} stitches along the outside edge, and knit{" "}
            {Math.round(this.state.gaugeRows * 2)} rows.
          </p>
          <p>
            Put {Math.round(this.bodyAfterShelfStitches() * (2.0 / 3.0))} needles into
            hold on the opposite side of the carriage.
          </p>
          <p>
            Knit one row. Wrap the last needle. Decrease one stitch on the
            opposite side of the carriage.
          </p>
          <p>
            Knit one row. Bring {this.shortRowCadence()} needles into hold on
            the opposite side of the carriage. Decrease one stitch on the same side as the carriage.
          </p>
          <p>
            Knit one row. Wrap the last needle. Decrease one stitch on the
            opposite side of the carriage.
          </p>
          <p>
            Knit one row. Bring {this.shortRowCadence()} needles into hold on
            the opposite side of the carriage. Decrease one stitch on the same side as the carriage.
          </p>
          <p>
            Repeat until you have decreased{" "}
            {Math.round(this.state.gaugeSt * 1)} stitches, then continue short
            rows at the same cadence with no decreases until you have knit {Math.round(this.state.gaugeRows * 2)}{" "}
            rows total (including all short row rows). This completes one side.
          </p>
          <p>Repeat but mirrored for the other side.</p>
          <p>Take the pannel off on waste yarn.</p>
          <h2>Sleeve (worked cuff up) make 2</h2>
          {this.renderHem(this.state.handCircumference)}
          <Trapezoid
            gaugeRows={this.state.gaugeRows}
            gaugeSt={this.state.gaugeSt}
            length={this.state.sleeveLength - this.state.armholeDepth - 2}
            startWidth={this.state.handCircumference}
            endWidth={this.state.bicepCircumference}
          ></Trapezoid>
          <p>
            Bind off {Math.round(this.state.gaugeSt)} stitches on the same side
            as the carriage.
          </p>
          <p>Knit 1 row.</p>
          <p>
            Bind off {Math.round(this.state.gaugeSt)} stitches on the same side
            as the carriage.
          </p>
          <p>This creates the under arm shelf.</p>
          <p>
            Knit {Math.round(this.state.gaugeSt)} rows decreasing one
            stitch on each side each row.
          </p>
          <p>
            Knit {Math.round((this.state.gaugeRows * 2) - this.state.gaugeSt)} more rows.
          </p>
          <p>Place a yarn marker at the center of the sleeve.</p>
          <p>Take the sleeve off on waste yarn.</p>
          <h2>Yoke</h2>
          <p>
            This is where the math starts to get a little fuzzy. Don't panic if
            your stitch counts aren't completely accurate.
          </p>
          <p>
            We're going to shape this in two sections: a front and a back with a
            shoulder seam. If at any point you get a number of stitches that is
            larger than the number of needles you have on the bed, you need to
            split the section in half and knit it in two pieces. Make sure to
            add an extra needle for the seam you'll be adding later.
          </p>
          <p>
            Starting from the center of the sleeve, rehang half of one sleeve,
            one body panel, and half of the other sleeve on the bed, overlapping
            one stitch where sleeve meets body. The purl side should be facing
            you. The underarms will be seamed later so make sure the underarm
            shelves of the sleeves are lined up with the underarm shelves of the
            body.
          </p>
          <p>
            Bring one more needle out into work on either side. This will help
            with the shoulder seam later.
          </p>
          <p>
            You should have about{" "}
            {this.sleeveTopStitches() + this.bodyTopStitches() - 2} stitches on
            the bed.
          </p>
          <p>
            If you're knitting fair isle or some other pattern for the yoke,
            this is where you'll start.
          </p>
          <p>
            Knit {this.firstSectionRows()} rows. Take the piece off on waste
            yarn.
          </p>
          <p>
            Rehang the stitches on the bed reducing by 1/3 (double up every
            other stitch).
          </p>
          <p>
            Knit {Math.round(this.yokeRows() / this.yokeSections())} rows. Take
            the piece off on waste yarn.
          </p>
          <p>
            Continue rehanging sections reduced by 1/3 and knitting {Math.round(this.yokeRows() / this.yokeSections())} rows until you
            have knit {this.yokeSections() + 1} sections total including the
            first section.
          </p>
          <p>
            Seam one shoulder. Rehang the live stitches. Knit{" "}
            {Math.round(this.state.gaugeRowsRibbing * 1)} rows of ribbing.
            Stretchy bind off.
          </p>
          <h2>Assembly</h2>
          <p>Mattress stitch all yoke seams.</p>
          <p>Mattress stitch the underarm seams.</p>
          <p>Matress stitch side and sleeve seams.</p>
        </div>
      </>
    );
  }
}
