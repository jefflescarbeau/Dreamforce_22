import { LightningElement, api } from 'lwc';

const checkboxOptions = [
  { label: "9AM-10AM", value: "9AM-10AM" },
  { label: "10AM-11AM", value: "10AM-11AM" },
  { label: "11AM-12PM", value: "11AM-12PM" },
  { label: "1PM-2PM", value: "1PM-2PM" },
  { label: "2PM-3PM", value: "2PM-3PM" },
  { label: "3PM-4PM", value: "3PM-4PM" },
  { label: "4PM-5PM", value: "4PM-5PM" }
]

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

  get availableTimes() {
    const param = this.inputVariables.find(({ name }) => name === 'availableTimes');
    return param && param.value && param.value.split(',');
  }
  get slotOptions() {
    return checkboxOptions;
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

  handleSlotChange(event) {
    if (event && event.detail) {
      const newValue = String(event.detail.value);
      this.emitInputEvent('availableTimes', newValue, 'String');
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