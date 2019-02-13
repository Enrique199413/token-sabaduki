import {Component, Prop, Element, State} from '@stencil/core';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Element() element: HTMLElement;
  strings: any;
  @State() showKeyboardState: boolean = false;
  /**
   * The lang property
   */
  @Prop() lang: string;
  /**
   * The lang property
   */
  @State() tokenNumbers: string = '';

  async componentWillLoad(): Promise<void> {
    this.strings = await getLocaleComponentStrings(this.element);
  }

  handleChange(e) {
    console.log((e.target as HTMLTextAreaElement).value);
    this.tokenNumbers = (e.target as HTMLTextAreaElement).value;
  }

  render() {
    return <div class="token-delimiter-container">
      <div class="token-container">
        <span>{this.strings.label}</span>
        <input type="password" class="token-input-style" value={this.tokenNumbers} placeholder={this.strings.input_label} onChange={this.handleChange.bind(this)}>{this.strings.input_label}</input>
        <button onClick={() => this.showKeyboard()}>keyboard</button>
        <div style={{ display: this.showKeyboardState ? 'block' : 'none' }} class="input-container-numbers">
          <button onClick={() => this.appendToken(1)}>1</button>
          <button onClick={() => this.appendToken(2)}>2</button>
          <button onClick={() => this.appendToken(3)}>3</button>
          <button onClick={() => this.appendToken(4)}>4</button>
          <button onClick={() => this.appendToken(5)}>5</button>
          <button onClick={() => this.appendToken(6)}>6</button>
          <button onClick={() => this.appendToken(7)}>7</button>
          <button onClick={() => this.appendToken(8)}>8</button>
          <button onClick={() => this.appendToken(9)}>9</button>
          <button onClick={() => this.showKeyboard()}>x</button>
          <button onClick={() => this.appendToken(0)}>0</button>
          <button onClick={() => this.clearInput()}>x</button>
        </div>
        <button onClick={() => this.clearInput()}>{this.strings.button_label}</button>
      </div>
      <span>{this.strings.label_description}</span>
    </div>;
  }

  showKeyboard() {
    this.showKeyboardState = !this.showKeyboardState;
  }

  clearInput() {
    this.tokenNumbers = '';
    this.showKeyboard();
  }

  appendToken(number) {
    this.tokenNumbers = this.tokenNumbers + number;
  }

}
