import { NgForm } from "@angular/forms";

export class FormValidator {
    constructor() {
    }

    static validateForm(form: NgForm | undefined): string[] | undefined
    {
        if(form && form.invalid)
        {
            return this.getFormValidationMessages(form);
            //this.cd.detectChanges();
        }

        return undefined;
    }

    static getFormValidationMessages(form: NgForm): string[] {
        let messages: string[] = [];
        let elements = Object.keys(form.controls).forEach(k => {
            this.getValidationErrors(form.controls[k], k)
            .forEach(m => messages.push(m));
        });
        return messages;
    }


    static getValidationErrors(state: any, thingName?: string) {
        let thing: string = state.path || thingName;
        let messages: string[] = [];
        if (state.errors) {
            for (let errorName in state.errors) {
                switch (errorName) {
                    case "required":
                        messages.push(`You must enter a ${thing}`);
                        break;
                    case "minlength":
                        messages.push(`A ${thing} must be at least
                        ${state.errors['minlength'].requiredLength}
                        characters`);
                        break;
                    case "pattern":
                        messages.push(`The ${thing} contains
                        illegal characters`);
                        break;
                }
            }
        }
        return messages;
        }

}