import { Component, EventEmitter } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Arm, ClassArmJunction } from "../models/studentClassArm.model";
import { ArmRepository } from "../models/armRepository.model";
import { CourseCategory } from "../models/classSubject.model";
//import {Subscription} from 'rxjs';

@Component({
    templateUrl: 'createArm.component.html'
})

export class CreateArmModalComponent
{
    className!: string;
    classId!: number;
    classArm = new ClassArmJunction()
    armName = ''
    category: string = '' 

    constructor(public armRepo: ArmRepository,
                public armModalRef: BsModalRef)
    {
    }

    ngOnInit()
    {
        this.armRepo.getCourseCategories();
        this.armRepo.loadArms();
    }

    createArm()
    {
        //set class id
        this.classArm.classId = this.classId
        this.classArm._class = undefined;

        //search for the category id 
        let categoryId = this.courseCategories?.find( x => {
            return x.category.toLowerCase() == this.category.toLowerCase()
        })?.id || 0

        let armId = this.arms?.find( x => {
            return x.name.toLowerCase() == this.armName.toLowerCase()
        })?.id || 0

        //if not found, create a new arm
        //if found attach to pre-existing arm
        this.classArm.armId = armId
        this.classArm.arm = new Arm(armId, this.armName, undefined)

        //if not found, create a new category
        //if found attach to pre-existing category
        this.classArm.courseCategoryId = categoryId;
        this.classArm.courseCategory = new CourseCategory(categoryId, this.category, '');

        //commit the classArm obj to the API
        this.armRepo.addArm(this.classArm)

        //hide the modal window
        this.armModalRef.hide();
    }

    get courseCategories()
    {
        return this.armRepo.courseCategories
    }

    get arms()
    {
        return this.armRepo.arms;
    }

}