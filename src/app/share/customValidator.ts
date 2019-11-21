import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static checkNumber(control: AbstractControl): ValidationErrors | null {
        const regex = /^[0-9]{10}$/g;
        if (!regex.test(control.value) && control.value) {
            return {
                checkNumber: true
            }
        }
        return null;
    }
}