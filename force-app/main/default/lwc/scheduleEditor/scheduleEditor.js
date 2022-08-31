import { LightningElement, api } from 'lwc';

export default class ScheduleEditor extends LightningElement {
  _inputVariables = [];

  @api
  get inputVariables() {
    return this._inputVariables;
  }

  @api
  builderContext;

  set inputVariables(variables) {
    this._inputVariables = variables || [];
  }

  get recordCount() {
    const param = this.inputVariables.find(({ name }) => name === 'recordCount');
    return param && param.value;
  }

  get startDate() {
    const param = this.inputVariables.find(({ name }) => name === 'startDate');
    return param && param.value;
  }

  get options() {
    const variables = this.builderContext.variables;
    return variables.filter(result => result.dataType === 'Date').map(({ name, value }) => ({
      label: name,
      value: name,
    }));
  }

  handleRecordCountChange(event) {
    if (event && event.detail) {
      const newValue = event.detail.value;
      this.emitInputEvent('recordCount', newValue, 'Number');
    }
  }

  handleStartDateChange(event) {
    if (event && event.detail) {
      const newValue = event.detail.value;
      this.emitInputEvent('startDate', newValue, 'reference');
    }
  }

  emitInputEvent(name, value, dataType) {
    const valueChangedEvent = new CustomEvent(
      'configuration_editor_input_value_changed', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        name: name,
        newValue: value,
        newValueDataType: dataType
      }
    }
    );
    this.dispatchEvent(valueChangedEvent);
  }

}