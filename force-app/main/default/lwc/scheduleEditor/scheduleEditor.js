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

/*
This is the configuration LWC example for the fake scheduler component
it shows up in the flow builder and it provides the UI (slider, combobox, and checkbox group)
that appear for the user to specify.
*/
export default class ScheduleEditor extends LightningElement {
  _inputVariables = [];
  _apiOutputVariables = [];

  //inputVariables - This is where you will retrieve any values that have been stored
  //for your LWC's inputs in the flow builder
  @api
  get inputVariables() {
    return this._inputVariables;
  }

  set inputVariables(variables) {
    this._inputVariables = variables || [];
  }

  //automaticOutputVariables are the variables that come from the "Get Records"
  //flow builder component. You need to explicity provide this api to be able to
  //reference any of these variables in your configuration
  @api
  get automaticOutputVariables() {
    return this._apiOutputVariables
  }

  set automaticOutputVariables(variables) {
    this._apiOutputVariables = variables || [];
  }

  // buildercontext provieds access to any of the explicitly defined variables as well
  // as a whole host of other attributes about the flow builder this component resides in
  // take a look at the documentation to see what other attributes exist on this object
  @api
  builderContext;

  //Use .find to retrieve the specific variable you need
  get recordCount() {
    const param = this.inputVariables.find(({ name }) => name === 'recordCount');
    return param && param.value;
  }

  get startDate() {
    const param = this.inputVariables.find(({ name }) => name === 'startDate');
    return param && param.value;
  }

  //These picklist options will show any variables with the dataType of date
  get options() {
    const variables = this.builderContext.variables;
    return variables.filter(result => result.dataType === 'Date').map(({ name, value }) => ({
      label: name,
      value: name,
    }));
  }

  //this is the comma seperated list of time slots that is used to generate the random data
  get availableTimes() {
    const param = this.inputVariables.find(({ name }) => name === 'availableTimes');
    return param && param.value && param.value.split(',');
  }
  get slotOptions() {
    return checkboxOptions;
  }

  //handler for when the slider component is changed
  handleRecordCountChange(event) {
    if (event && event.detail) {
      const newValue = event.detail.value;
      this.emitInputEvent('recordCount', newValue, 'Number');
    }
  }

  //handler for when the start date combobox is changed
  //notice the datatype is reference instead of a concrete type
  handleStartDateChange(event) {
    if (event && event.detail) {
      const newValue = event.detail.value;
      this.emitInputEvent('startDate', newValue, 'reference');
    }
  }

  //handler for when the available times checkbox group is changed
  handleSlotChange(event) {
    if (event && event.detail) {
      const newValue = String(event.detail.value);
      this.emitInputEvent('availableTimes', newValue, 'String');
    }
  }

  //generic emit event function that is used in all the change handlers above
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