import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, {
  Trapezoid,
  DropShoulderSweaterBodyPanel,
} from "../lib/basic_blocks";

class CyclingSweaterSleeve extends KnitBlock {
  constructor(props) {
    super(props);
  }
  
  upperSleeveRows() {
    var length = 17;
    return this.convertToRows(this.props.looseGaugeRows, length);
  }
  
  fancyRows() {
    var length = 0.5;
    return this.convertToRows(this.props.fancyGaugeRows, length);
  }
  
  elbowSt() {
    return this.convertToRows(this.props.tightGaugeSt, this.props.elbowCircumference);
  }
  
  wristSt() {
    return this.convertToRows(this.props.tightGaugeSt, this.props.wristCircumference);
  }

  seamMarker() {
    var upperRows = this.upperSleeveRows();
    var rows = this.convertToRows(this.props.looseGaugeRows, 8);
    return upperRows - rows;
  }

  render() {
    return (
      <>
        <p>
          Cast on {this.wristSt()} stitches on waste yarn for 1x1 ribbing.
        </p>
        <Trapezoid
          gaugeSt={this.props.tightGaugeSt}
          gaugeRows={this.props.tightGaugeRows}
          startWidth={this.props.wristCircumference}
          length={6}
          ></Trapezoid> for the fold back cuff.
        <br/><br/>
        <Trapezoid
          gaugeSt={this.props.tightGaugeSt}
          gaugeRows={this.props.tightGaugeRows}
          startWidth={this.props.wristCircumference}
          endWidth={this.props.elbowCircumference}
          length={this.props.elbowToWrist}
          ></Trapezoid>
        <p>
          Knit {this.fancyRows()} rows in fancy stitch.
        </p>
        <p>From here, you can take some artistic liberties.</p>
        <p>
          To get the length for the upper sleeve, you'll need to knit {this.upperSleeveRows()} rows in fisherman's rib. If you want the sleeve to be fuller, increase every other row until you get to your desired width or you reach the width of the full bed.
        </p>
        <p>
          Place a yarn marker at row {this.seamMarker()} for the under arm.
        </p>
        <p>
          Bind off. This doesn't have to be too stretchy, the sleeve is much larger than the arm it's fitting in to.
        </p>
        <p>
          Join the sleeves from the cuff to the yan marker.
        </p>
      </>
    );
  }
}

const bodyEase = 0.7;
const bottomFancyIn = 1.6;
const waistFancyIn = 0.4;
const waistIn = 2.0;

class CyclingSweaterBodyPanel extends KnitBlock {

  constructor(props) {
    super(props);
  }

  startSt() {
    var hipIn = (this.props.hipCircumference / 2.0) * bodyEase;
    return this.convertToRows(this.props.looseGaugeSt, hipIn);
  }

  bottomFancyRows() {
    return this.convertToRows(this.props.fancyGaugeRows, bottomFancyIn);
  }

  waistFancyRows() {
    return this.convertToRows(this.props.fancyGaugeRows, waistFancyIn);
  }
  
  bottomRows() {
    var looseIn = 6 - bottomFancyIn - waistFancyIn - (waistIn / 2.0);
    return this.convertToRows(this.props.looseGaugeRows, looseIn);
  }
  
  bottomDecreaseCadence() {
    var decreases = (this.startSt() - this.waistSt()) / 2.0;
    var rows = this.bottomRows();
    return parseInt(rows / decreases);
  }

  waistSt() {
    var waistIn = (this.props.waistCircumference / 2.0) * bodyEase;
    return this.convertToRows(this.props.tightGaugeSt, waistIn);
  }
  
  waistRows() {
    return this.convertToRows(this.props.tightGaugeRows, waistIn);
  }
  
  bodyRows() {
    var bodyLength = this.props.shoulderToWaist - (waistIn / 2 + waistFancyIn);
    return this.convertToRows(this.props.looseGaugeRows, bodyLength);
  }
  
  armholeMarker() {
    var armholeRows = this.convertToRows(this.props.looseGaugeRows, 8);
    var bodyRows = this.bodyRows();
    return bodyRows - armholeRows;
  }
  
  shoulderSt() {
    return parseInt(this.waistSt() / 4.0);
  }
  
  neckRows() {
    var neckLength = 4.25;
    return this.convertToRows(this.props.looseGaugeRows, neckLength);
  }
  
  buttonholeCadence() {
    var rows = this.neckRows();
    var numHoles = 4;
    return parseInt(rows/numHoles);
  }

  render() {
    return (
      <>
        <p>
          Cast on {this.startSt()} stitches on the main bed for 1x1 ribbing on
          waste yarn.
        </p>
        <p>Knit {this.bottomFancyRows()} rows in fancy stitch.</p>
        <p>
          Knit {this.bottomRows()} rows decreasing 1 stitch each side every {this.bottomDecreaseCadence()} rows to {this.waistSt()} stitches.
        </p>
        <p>
          Knit {this.waistFancyRows()} rows in fancy stitch.
        </p>
        <p>
          Knit {this.waistRows()} rows in tight ribbing.
        </p>
        <p>
          Knit {this.waistFancyRows()} rows in fancy stitch.
        </p>
        <p>
          RC000
        </p>
        <p>
          Knit {this.bodyRows()} rows, placing a yarn marker at row {this.armholeMarker()} for the start of the armhole.
        </p>
        <h3>Front</h3>
        <p>
          Knit 4 rows in the fancy stitch.
        </p>
        <p>
          Make 3 buttonholes in the {this.shoulderSt()} stitches on the left, leaving at least 2 for selvedge. Do the same thing on the right.
        </p>
        <p>
          Knit 6 rows of the fancy stitch.
        </p>
        <p>
          Bind off {this.shoulderSt()} stitches on each side for the shoulders.
        </p>
        <p>
          Knit {this.neckRows()} rows on the remaining neck stitches making one buttonhole, two stitches from the edge on each side, every {this.buttonholeCadence()} rows.
        </p>
        <p>
          Knit 4 fancy rows. Make one more buttonhole on each side, 2 stitches from the edge. Knit 4 more rows. Stretchy bind off.
        </p>
        <h3>Back</h3>
        <p>
          Same as for the front but instead of buttonholes, leave yarn markers for future buttons.
        </p>
      </>
    );
  }
}

export default class CyclingSweater extends KnitBlock {
  constructor(props) {
    super(props);

    if (!localStorage.getItem("chestCircumference")) {
      this.populateStorage();
    }

    this.state = {
      tightGaugeSt: localStorage.getItem("tightGaugeSt"),
      tightGaugeStLabel: "Tight ribbing stitches per inch",
      tightGaugeRows: localStorage.getItem("tightGaugeRows"),
      tightGaugeRowsLabel: "Tight ribbing rows per inch",
      looseGaugeSt: localStorage.getItem("looseGaugeSt"),
      looseGaugeStLabel: "Loose ribbing stitches per inch",
      looseGaugeRows: localStorage.getItem("looseGaugeRows"),
      looseGaugeRowsLabel: "Loose ribbing rows per inch",
      fishermanGaugeSt: localStorage.getItem("fishermanGaugeSt"),
      fishermanGaugeStLabel: "Fisherman's rib stitches per inch",
      fishermanGaugeRows: localStorage.getItem("fishermanGaugeRows"),
      fishermanGaugeRowsLabel: "Fisherman's rib rows per inch",
      fancyGaugeSt: localStorage.getItem("fancyGaugeSt"),
      fancyGaugeStLabel: "Fancy stitches per inch",
      fancyGaugeRows: localStorage.getItem("fancyGaugeRows"),
      fancyGaugeRowsLabel: "Fancy rows per inch",
      hipCircumference: localStorage.getItem("hipCircumference"),
      hipCircumferenceLabel: "Hip circumference",
      waistCircumference: localStorage.getItem("waistCircumference"),
      waistCircumferenceLabel: "Waist circumference",
      shoulderToWaist: localStorage.getItem("shoulderToWaist"),
      shoulderToWaistLabel: "Shoulder to waist (measured on your back)",
      elbowCircumference: localStorage.getItem("elbowCircumference"),
      elbowCircumferenceLabel: "Elbow circumference",
      wristCircumference: localStorage.getItem("wristCircumference"),
      wristCircumferenceLabel: "Wrist circumference",
      elbowToWrist: localStorage.getItem("elbowToWrist"),
      elbowToWristLabel: "Elbow to wrist",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  populateStorage() {
    localStorage.setItem("tightGaugeSt", 4);
    localStorage.setItem("tightGaugeRows", 8);
    localStorage.setItem("looseGaugeSt", 3.5);
    localStorage.setItem("looseGaugeRows", 5);
    localStorage.setItem("fishermanGaugeSt", 2);
    localStorage.setItem("fishermanGaugeRows", 11);
    localStorage.setItem("fancyGaugeSt", 3);
    localStorage.setItem("fancyGaugeRows", 10);
    localStorage.setItem("hipCircumference", 42);
    localStorage.setItem("waistCircumference", 31);
    localStorage.setItem("shoulderToWaist", 16);
    localStorage.setItem("elbowCircumference", 10);
    localStorage.setItem("wristCircumference", 6);
    localStorage.setItem("elbowToWrist", 9);
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
    return (
      parseInt(this.state.armpitCircumference) + this.state.inchesOfEase / 2
    );
  }

  render() {
    return (
      <>
        <h1 className="title">Cycling sweater</h1>
        <p>
          This pattern is based on a combination of the cycling sweater pattern published in The
          Delineator issue 49 from 1897 and a surviving example of a similar sweater in the Met
          museum's collection.
        </p>
        <p>
          Because the original pattern is missing gauge information and was
          developed for hand knitting, many liberties have been taken with this
          adaptation.
        </p>
        <p>
          I have done my best to create a faithful reproduction that captures
          the spirit of the original and will fit a modern human with modern
          undergarments.
        </p>
        <h2>A note about stitches</h2>
        <p>
          This sweater contains four kinds of stitches: a tight ribbing, a
          loose ribbing, a fisherman's rib for the sleeves, and a "fancy stitch". You will need a guage swatch for each.
        </p>
        <p>
          The original pattern describes the fancy stitch as a two by two seed
          stitch. The Met museum example has a racking english rib, also known as a rick rack rib.
        </p>
        <p>You can use whatever "fancy stitch" you think appropriate.</p>
        <div>
          <h2>Measurements</h2>
          <p>
            When calculating your ribbing gauge, count only the stitches from
            the main bed. This makes the calculation for the decreases easier.
          </p>
          {this.renderInput("tightGaugeSt")}
          <br />
          {this.renderInput("tightGaugeRows")}
          <br />
          {this.renderInput("looseGaugeSt")}
          <br />
          {this.renderInput("looseGaugeRows")}
          <br />
          {this.renderInput("fishermanGaugeSt")}
          <br />
          {this.renderInput("fishermanGaugeRows")}
          <br />
          {this.renderInput("fancyGaugeSt")}
          <br />
          {this.renderInput("fancyGaugeRows")}
          <br />
          {this.renderInput("hipCircumference")}
          <br />
          {this.renderInput("waistCircumference")}
          <br />
          {this.renderInput("shoulderToWaist")}
          <br />
          {this.renderInput("elbowCircumference")}
          <br />
          {this.renderInput("wristCircumference")}
          <br />
          {this.renderInput("elbowToWrist")}
          <br />
        </div>
        <div>
          <h2>Body panel worked bottom up, make 2</h2>
          <CyclingSweaterBodyPanel
            tightGaugeSt={this.state.tightGaugeSt}
            tightGaugeRows={this.state.tightGaugeRows}
            looseGaugeSt={this.state.looseGaugeSt}
            looseGaugeRows={this.state.looseGaugeRows}
            fancyGaugeSt={this.state.fancyGaugeSt}
            fancyGaugeRows={this.state.fancyGaugeRows}
            hipCircumference={this.state.hipCircumference}
            waistCircumference={this.state.waistCircumference}
            shoulderToWaist={this.state.shoulderToWaist}
          ></CyclingSweaterBodyPanel>
          <h2>Body assembly</h2>
          <p>Sew the body panels together to the yarn marker.</p>
          <h2>Sleeves worked bottom up (make 2)</h2>
          <CyclingSweaterSleeve
            tightGaugeSt={this.state.tightGaugeSt}
            tightGaugeRows={this.state.tightGaugeRows}
            looseGaugeSt={this.state.fishermanGaugeSt}
            looseGaugeRows={this.state.fishermanGaugeRows}
            fancyGaugeSt={this.state.fancyGaugeSt}
            fancyGaugeRows={this.state.fancyGaugeRows}
            elbowCircumference={this.state.elbowCircumference}
            wristCircumference={this.state.wristCircumference}
            elbowToWrist={this.state.elbowToWrist}
            ></CyclingSweaterSleeve>
          <h2>Assembly</h2>
          <p>
            The sleeve should be pleated into the sleeve opening. The center of the sleeve meets the shoulder overlap and the bottom seams should match up. The rest you'll have to eyeball.
          </p>
          <h2>Finishing</h2>
          <p>Weave in ends.</p>
        </div>
      </>
    );
  }
}
