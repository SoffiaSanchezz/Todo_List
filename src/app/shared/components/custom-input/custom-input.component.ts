import { Component, Input, Optional, Self, forwardRef, Injector, OnInit } from "@angular/core"
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

@Component({
  selector: "app-custom-input",
  templateUrl: "./custom-input.component.html",
  styleUrls: ["./custom-input.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor, OnInit {
  @Input() label = ""
  @Input() type = "text"
  @Input() placeholder = ""
  @Input() errorMessages: { [key: string]: string } = {}
  @Input() showPasswordToggle = false

  value: any = ""
  isDisabled = false
  passwordVisible = false

  onChange: any = () => { }
  onTouched: any = () => { }

  ngControl: NgControl | null = null; // Declare ngControl property

  constructor(private injector: Injector) { } // Inject Injector

  ngOnInit() {
    // Get NgControl after the component has been initialized and registered as CVA
    this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
    if (this.ngControl) {
      // Manual assignment of valueAccessor is not needed, NG_VALUE_ACCESSOR provider handles it.
    }
  }

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.value = value
    this.onChange(value)
    this.onTouched()
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible
  }

  hasError(errorKey: string): boolean | undefined {
    // Safely access control as ngControl might be null if not used with formControlName/ngModel
    return this.ngControl?.control?.touched && this.ngControl?.control?.hasError(errorKey)
  }

  getErrorKeys(): string[] {
    return Object.keys(this.errorMessages)
  }
}
