import { Injectable } from '@angular/core';
import { FormGroup }  from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GenericValidationService {

  constructor() { }

  /**
   * Validate if the FormGroup control has been touched or invalid
   * @param formGroup  - Form Group
   * @param controlName  - Control name
   * @returns
   */
  public validateControl = (formGroup: FormGroup, controlName: string) => {
    return formGroup.controls[controlName].invalid && formGroup.controls[controlName].touched;
  }
  /**
   * Determines if the formgroup control has an error
   * @param formGroup  - Form Group
   * @param controlName  - Control Nname
   * @param errorName - Error name
   * @returns
   */
  public hasError = (formGroup: FormGroup, controlName: string, errorName: string) =>{
   return formGroup.controls[controlName].hasError(errorName);
  }
}
