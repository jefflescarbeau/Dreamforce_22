import { LightningElement, api } from 'lwc';

const columns = [
  { label: 'Date', fieldName: 'date', type: 'date' },
  { label: 'TimeSlot', fieldName: 'time', type: 'string' }
];

export default class availableTimesToSchedule extends LightningElement {
  @api
  startDate
  @api
  recordCount;
  @api
  selectedDateString
  @api
  availableTimes
  selectedRowsLength = 0;
  records = [];
  columns = columns;
  slots;

  //example of a validate function - remember this will reset the state of the component
  //when called, it's better (in my opinion) to use flownavigation events instead
  //to control the page
  @api
  validate() {
    if (this.selectedRowsLength == 1) {
      return { isValid: true };
    } else {
      return { isValid: false, errorMessage: 'Please select only a single entry' };
    }
  }

  connectedCallback() {
    this.slots = this.availableTimes.split(',');
    const records = this.fakeCallout(this.recordCount);
    this.records = records;
  }

  getSelectedName(event) {
    const selectedRows = event.detail.selectedRows;
    this.selectedRowsLength = selectedRows.length;
    if (selectedRows.length == 1) {
      this.selectedDateString = selectedRows[0].date + selectedRows[0].time;
    }
  }

  fakeCallout(count) {
    //pretend this is a callout to an external system
    let slot1 = ['9-11 AM',
      '1-3 PM',
      '3-5 PM',
      '5-7 PM'
    ]
    let currDate = new Date(this.startDate);

    return [...Array(count)].map((_, index) => {
      let randomslot = Math.floor(Math.random() * this.slots.length);
      return {
        id: index,
        date: new Date(currDate.setDate(currDate.getDate() + 1)),
        time: this.slots[randomslot],
      };
    });
  }
}