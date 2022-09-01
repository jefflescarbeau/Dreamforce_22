import { LightningElement, api } from 'lwc';

export default class RouteServiceConfig extends LightningElement {
  _inputVariables = [];

  @api
  get inputVariables() {
    return this._inputVariables;
  }

  set inputVariables(variables) {
    this._inputVariables = variables || [];
  }

  get caseId() {
    const param = this.inputVariables.find(({ name }) => name === 'caseId');
    return param && param.value;
  }

  get caseType() {
    const param = this.inputVariables.find(({ name }) => name === 'caseType');
    return param && param.value;
  }

  handleIdInputChange(event) {
    if (event && event.detail) {
      const newValue = event.detail.value;
      this.emitInputEvent('caseId', newValue);
    }
  }

  handleTypeInputChange(event) {
    if (event && event.detail) {
      const newValue = event.detail.value;
      this.emitInputEvent('caseType', newValue);
    }
  }


  emitInputEvent(name, value) {
    const valueChangedEvent = new CustomEvent(
      'configuration_editor_input_value_changed', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        name: name,
        newValue: value,
        newValueDataType: 'reference'
      }
    }
    );
    this.dispatchEvent(valueChangedEvent);
  }

}