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
    name = ''
    category: string = '' 

    constructor(public armRepo: ArmRepository,
                public modalRef: BsModalRef)
    {
    }

    createArm()
    {
        //set class id
        this.classArm.classId = this.classId
        this.classArm._class = undefined;

        //create a new arm with the specified name
        this.classArm.arm = new Arm(0, this.name, undefined)

        //search for the category id 
        let categoryId = this.courseCategories?.find( x => {
            return x.category.toLowerCase == this.category.toLowerCase
        })?.id || 0

        //if not found, create a new category
        if (categoryId == 0) {
            this.classArm.courseCategoryId = categoryId;
            this.classArm.courseCategory = new CourseCategory(categoryId, this.category, '')
        }
        //if found attach to pre-existing category
        else
        {
            this.classArm.courseCategoryId = categoryId;
            this.classArm.courseCategory = undefined;
        }

        console.log(this.classArm);
        
        //commit the classArm obj to the API
        this.armRepo.addArm(this.classArm)
    }

    get courseCategories()
    {
        return this.armRepo.courseCategories
    }
}