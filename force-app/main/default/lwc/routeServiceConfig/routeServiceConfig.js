import { LightningElement, api } from 'lwc';

export default class RouteServiceConfig extends LightningElement {
  _inputVariables = [];

  //inputVariables - This is where you will retrieve any values that have been stored
  //for your LWC's inputs in the flow builder
  @api
  get inputVariables() {
    return this._inputVariables;
  }

  set inputVariables(variables) {
    this._inputVariables = variables || [];
  }

  //Use .find to retrieve the specific variable you need
  get caseId() {
    const param = this.inputVariables.find(({ name }) => name === 'caseId');
    return param && param.value;
  }

  get caseType() {
    const param = this.inputVariables.find(({ name }) => name === 'caseType');
    return param && param.value;
  }

  //handler for when the case ID input is changed
  handleIdInputChange(event) {
    if (event && event.detail) {
      const newValue = event.detail.value;
      this.emitInputEvent('caseId', newValue);
    }
  }

  //handler for when the Case Type input is changed
  handleTypeInputChange(event) {
    if (event && event.detail) {
      const newValue = event.detail.value;
      this.emitInputEvent('caseType', newValue);
    }
  }

  //generic emit event function that is used in all the change handlers above
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