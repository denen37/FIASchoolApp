import { Component } from "@angular/core";
import { ClassRepository } from "../models/classRepository.model";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Arm, Class, ClassArmJunction, ClientEntityState } from "../models/studentClassArm.model";
import { CourseCategory } from "../models/classSubject.model";
import { ArmRepository } from "../models/armRepository.model";

@Component({
    templateUrl: "editClassArm.component.html",
    styleUrls: ["editClassArm.component.css"]
})

export class EditClassArmModalComponent
{
    selectedClass!: Class;
    editArm = false;
    private editableClassArmIndex = -1;
    editBtnClickedEventTarget?: EventTarget;
    createBtnClickedEventTarget?: EventTarget;
    previousClassArm?: ClassArmJunction
    createArm = false;

    
    constructor(private classRepo: ClassRepository,
                public modalRef: BsModalRef,
                private armRepo: ArmRepository)
    {

    }
    
    ngOnInit()
    {
        this.armRepo.loadArms();
        this.armRepo.getCourseCategories();
    }

    editClass()
    {

        this.classRepo.updateClass(this.selectedClass);
    }

    editClassArm(index: number, event: MouseEvent)
    {
        this.editBtnClickedEventTarget = event.target || undefined
        this.editArm = true;
        this.editableClassArmIndex = index;
        this.previousClassArm = JSON.parse(JSON.stringify(this.selectedClass.classArms[index])) as typeof this.previousClassArm;
    }

    isEditClassArmText(index: number)
    {
        return (this.createArm || this.editArm) && (this.editableClassArmIndex == index) ;
    }

    clickOutEventHandler(index: number, event: MouseEvent)
    {
        if (event.target == this.createBtnClickedEventTarget) {
            index = index - 1;

            if (index < 0) index = 0;
        }

        //armId > 0, existing entity, check if modified
        let selectedClassArm = this.selectedClass.classArms[index];

        if ((selectedClassArm.id > 0) && 
            (event.target != this.createBtnClickedEventTarget || this.editBtnClickedEventTarget != undefined)) {
            if (selectedClassArm.arm?.name != this.previousClassArm?.arm?.name) {
                let armId = this.arms?.find(value => value.name == selectedClassArm.arm?.name)?.id;
                selectedClassArm.armId = armId || 0;
                if(selectedClassArm.arm) selectedClassArm.arm.id = armId || 0;
                selectedClassArm.entityState = ClientEntityState.Modified;
            }
            if (selectedClassArm.courseCategory?.category != this.previousClassArm?.courseCategory?.category) {
                let categoryId = this.categories?.find(value => value.category == selectedClassArm.courseCategory?.category)?.id;
                selectedClassArm.courseCategoryId = categoryId || 0;
                if(selectedClassArm.courseCategory) selectedClassArm.courseCategory.id = categoryId || 0;
                selectedClassArm.entityState = ClientEntityState.Modified;
            }
        }

        //armId == 0, new entity added
        if (selectedClassArm.id == 0) {
            if (selectedClassArm.arm?.name != '') {
                let armId = this.arms?.find(value => value.name == selectedClassArm.arm?.name)?.id;
                selectedClassArm.armId = armId || 0;
                if(selectedClassArm.arm) selectedClassArm.arm.id = armId || 0;
            }

            if (selectedClassArm.courseCategory?.category != '') {
                let categoryId = this.categories?.find(value => value.category == selectedClassArm.courseCategory?.category)?.id;
                selectedClassArm.courseCategoryId = categoryId || 0;
                if(selectedClassArm.courseCategory) selectedClassArm.courseCategory.id = categoryId || 0;

            }
            selectedClassArm.entityState = ClientEntityState.Added;
        }

        if ((event.target != this.editBtnClickedEventTarget) && 
            (event.target != this.createBtnClickedEventTarget)) {
            this.editArm = false;
            this.createArm = false;
            this.editBtnClickedEventTarget = undefined;
            this.createBtnClickedEventTarget = undefined;
        }
    }

    deleteClassArm(index: number)
    { 
        this.selectedClass.classArms[index].armId = -1;
        this.selectedClass.classArms[index].courseCategoryId = -1;
        this.selectedClass.classArms[index].entityState = ClientEntityState.Deleted
    }

    createClassArm(event: MouseEvent)
    {
        this.createBtnClickedEventTarget = event.target || undefined;
        let newClassArm = new ClassArmJunction(0, 0, undefined, 0, new Arm(0, ''), 0, new CourseCategory(0, '', ''));
        let length = this.selectedClass.classArms.push(newClassArm);
        this.createArm = true;
        this.editableClassArmIndex = length - 1;
    }

    get arms()
    {
        return this.armRepo.arms;
    }

    get categories()
    {
        return this.armRepo.courseCategories;
    }

}