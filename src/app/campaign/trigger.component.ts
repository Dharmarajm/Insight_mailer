import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Customer, Address } from './trigger.interface';

@Component({
    moduleId: module.id,
    selector: 'trigger',
    templateUrl: 'trigger.component.html',
})
export class TriggerComponent {
 @Input('group')
    public adressForm: FormGroup;

    values: string[] = ["ordered","shipped","delivered","returned"];
}