import {Component, Prop, Element, State} from '@stencil/core';
import { getLocaleComponentStrings } from '../../utils/locale';
import { MDCTextField } from '@material/textfield/index';

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
  @State() textField: string = '';

  async componentWillLoad(): Promise<void> {
    this.strings = await getLocaleComponentStrings(this.element);
  }

  handleChange(e) {
    this.tokenNumbers = (e.target as HTMLTextAreaElement).value;
  }

  componentDidLoad() {
    const textField = new MDCTextField(this.element.shadowRoot.querySelector('.mdc-text-field'));
    console.log(textField);
  }

  render() {
    return <div class="token-delimiter-container">
      <div class="token-container">
        <span class="mdc-typography--subtitle1 token-label-space"></span>
        <div>
          <div class="mdc-text-field mdc-text-field--outlined">
            <input type="text" id="tf-outlined" class="mdc-text-field__input"/>
              <div class="mdc-notched-outline">
                <div class="mdc-notched-outline__leading"></div>
                <div class="mdc-notched-outline__notch">
                  <label htmlFor="tf-outlined" class="mdc-floating-label">Your Name</label>
                </div>
                <div class="mdc-notched-outline__trailing"></div>
              </div>
          </div>
          <div class="mdc-text-field">
            <input type="password" id="my-text-field" class="token-input-style mdc-text-field__input" value={this.tokenNumbers} onChange={this.handleChange.bind(this)}/>
            <label class="mdc-floating-label" htmlFor="my-text-field">{this.strings.label}</label>
            <div class="mdc-line-ripple"></div>
          </div>
          <div class="mdc-text-field-helper-line">
            <div class="mdc-text-field-helper-text">{this.strings.label_description}</div>
          </div>
        </div>
        <button class="mdc-button" onClick={() => this.showKeyboard()}>
          <i class="material-icons mdc-button__icon" aria-hidden="true">apps</i>
        </button>
        <div style={{ display: this.showKeyboardState ? 'block' : 'none' }} class="input-container-numbers mdc-card">
          <button class="mdc-button" onClick={() => this.appendToken(1)}>1</button>
          <button class="mdc-button" onClick={() => this.appendToken(2)}>2</button>
          <button class="mdc-button" onClick={() => this.appendToken(3)}>3</button>
          <button class="mdc-button" onClick={() => this.appendToken(4)}>4</button>
          <button class="mdc-button" onClick={() => this.appendToken(5)}>5</button>
          <button class="mdc-button" onClick={() => this.appendToken(6)}>6</button>
          <button class="mdc-button" onClick={() => this.appendToken(7)}>7</button>
          <button class="mdc-button" onClick={() => this.appendToken(8)}>8</button>
          <button class="mdc-button" onClick={() => this.appendToken(9)}>9</button>
          <button class="mdc-button" onClick={() => this.showKeyboard()}>
            <i class="material-icons mdc-button__icon" aria-hidden="true">check</i>
          </button>
          <button class="mdc-button" onClick={() => this.appendToken(0)}>0</button>
          <button class="mdc-button" onClick={() => this.clearInput()}>
            <i class="material-icons mdc-button__icon" aria-hidden="true">close</i>
          </button>
        </div>
        <button class="mdc-button" onClick={() => this.clearInput()}>
          <span class="mdc-button__label">{this.strings.button_label}</span>
        </button>
      </div>
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
