import {Component, Input} from "@angular/core";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'ngbd-datepicker',
  standalone: true,
  imports: [NgbDatepickerModule, ReactiveFormsModule, JsonPipe, FontAwesomeModule, FormsModule],
  template: `
    <div class="input-group mb-3">
      <button class="btn btn-outline-secondary" (click)="d.toggle()" type="button">
        <fa-icon icon="calendar-alt"></fa-icon>
      </button>
      <input
        class="form-control"
        placeholder="yyyy-mm-dd"
        name="dp"
        ngbDatepicker
        #d="ngbDatepicker"
        [(ngModel)]="date"
        (change)="onUpdate()"
      />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DatepickerComponent
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input('date') date: string = "";
  // disabled = false;

  // onChange: Function | undefined;
  onChange = (_: any) => {};


  registerOnChange(onChange: any): void {
    this.onChange(onChange)
  }

  registerOnTouched(onTouched: any): void {
    // this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    // this.disabled = isDisabled;
  }

  writeValue(date: string): void {
    this.date = date;
  }

  onUpdate() {
    this.onChange(this.date);
  }
}
