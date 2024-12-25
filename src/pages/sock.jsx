import * as React from "react";
import DoubleInput from "../lib/input";
import KnitBlock, {Trapezoid} from "../lib/basic_blocks";

export default class Sock extends KnitBlock {
  constructor(props) {
    super(props);
    
    if (!localStorage.getItem("footCircumference")) {
      this.populateStorage();
    }
    
    this.state = {
      gaugeSt: localStorage.getItem("gaugeSt"),
      gaugeStLabel: "Stitches per inch",
      gaugeRows: localStorage.getItem("gaugeRows"),
      gaugeRowsLabel: "Rows per inch",
      swatchTension: localStorage.getItem("swatchTension"),
      swatchTensionLabel: "Swatch tension",
      footCircumference: localStorage.getItem("footCircumference"),
      footCircumferenceLabel: "Foot circumference",
      footLength: localStorage.getItem("footLength"),
      footLengthLabel: "Foot length",
    };
    
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  populateStorage() {
    localStorage.setItem("gaugeSt", 7);
    localStorage.setItem("gaugeRows", 11);
    localStorage.setItem("swatchTension", 6);
    localStorage.setItem("footCircumference", 9);
    localStorage.setItem("footLength", 9.5);
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
  
  widthSt(footCircumference) {
    return this.convertToSt(this.state.gaugeSt, footCircumference / 2.0, 0.9);
  }
  
  lengthRows(footLength) {
    return this.convertToRows(this.state.gaugeRows, footLength);
  }
  
  shortRow(footCircumference) {
    return parseInt(this.widthSt(footCircumference) / 4);
  }
  
  body(footLength, footCircumference) {
    let totalRows = this.lengthRows(footLength);
    let heelRows = this.shortRow(footCircumference) * 2;
    let toeRows = this.toeDecrease(footCircumference) * 3;
    return totalRows - heelRows - toeRows;
  }
  
  toeDecrease(footCircumference) {
    let width = this.widthSt(footCircumference);
    let toeDecreases = Math.round(width * (2.0 / 3.0));
    return Math.round(toeDecreases / 4);
  }
  
  render() {
    return (
      <>
        <h1 className="title">Sock</h1>
        <p>This is an ankle sock worked from the cuff down with 90% ease.</p>
        <p>
          Because the sock is worked in the round, each row will trigger the row counter twice. 
          To avoid confusion, I'll be listing the rowcounter values as RC000.
        </p>
        <p>
          The cuff and heel are worked at a tighter tension for a better fit.
        </p>
        <div>
          <h2>Measurements</h2>
          <p>Take these measurements without putting any weight on the foot.</p>
          {this.renderInput("gaugeSt")}<br/>
          {this.renderInput("gaugeRows")}<br/>
          {this.renderInput("swatchTension")}<br/>
          {this.renderInput("footLength")}<br/>
          {this.renderInput("footCircumference")}<br/>
        </div>
        <div>
          <h2>Cuff</h2>
          
          <p>
            Cast on {this.widthSt(this.state.footCircumference)} stitches on each bed with waste yarn.
          </p>
          <p>
            Knit at least two inches with waste yarn in the round, you'll need the length later.
          </p>
          <p>RC000</p>
          <p>
            T{this.state.swatchTension} knit to RC2 with main yarn. You'll need these looser live stitches later.
          </p>
          <p>
            T{this.state.swatchTension - 1} knit to RC40
          </p>
          <p>
            Drop the ribber down, pick up the looser row of live stitches from the waste yarn cast on and rehang them to form the cuff. 
            Bring the ribber back up. This may be difficult because of the extra layers. 
            If your ribber has a thicker yarn knitting position, use that.
          </p>
          <p>
            T{this.state.swatchTension - 1} knit to RC60.
          </p>
          <h2>Heel</h2>
          <p>
            Drop the ribber down and switch your sinker plate. The heel is worked on the main bed only.
          </p>
          <p>
            Configure your carriage so it won't knit back from hold.
          </p>
          <p>
            T{this.state.swatchTension - 1} bring one needle into hold on the opposite side from your carriage. Knit one row. Wrap the most recent needle brought to hold.
          </p>
          <p>
            Bring one needle into hold on the opposite side from your carriage and continue knitting and wrapping until there are {this.shortRow(this.state.footCircumference)} needles in hold on each side.
          </p>
          <p>
            Working from the inside out, push the first needle, closest to center, on the opposite side from your carraige into upper working position. 
            Knit one row.
          </p>
          <p>
            Continue in this manner until all of the needles are back in working position. You will need to add claw weights to the heel as you go.
          </p>
          <p>
            Swap out your sinker plate and bring the bottom bed back up.
          </p>
          <h2>Foot</h2>
          <p>RC000</p>
          <p>T{this.state.swatchTension} knit to RC{this.body(this.state.footLength, this.state.footCircumference) * 2}.</p>
          <h2>Toe</h2>
          <p>The following should be worked with a full fashion decrease.</p>
          <p>Decrease one stitch each side on each bed, knit two rows (RC004), {this.toeDecrease(this.state.footCircumference)} times.</p>
          <p>Decrease one stitch each side on each bed, knit one row (RC002), {this.toeDecrease(this.state.footCircumference)} times.</p>
          <p>
            Scrap off.
          </p>
          <h2>Finishing</h2>
          <p>Kitchener stitch the toe closed and weave in ends.</p>
        </div>
      </>
    );
  }
}
