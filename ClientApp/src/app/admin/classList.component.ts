import { Component, TemplateRef } from '@angular/core'
import { ClassRepository } from '../models/classRepository.model';
import { Class } from '../models/studentClassArm.model';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateArmModalComponent } from './createArm.component';
import { CourseCategory } from '../models/classSubject.model';
import { ArmRepository } from '../models/armRepository.model';
import { Subscription } from 'rxjs';
import { EditClassArmModalComponent } from './editClassArm.component';

enum ClassAction{
    Create,
    Edit,
    Delete
}

@Component({
    templateUrl: 'classList.component.html',
    styleUrls: ["classList.component.css"] 
})

export class ClassListComponent {
    armModalRef?: BsModalRef;
    classModalRef?: BsModalRef;
    private newArmHandler: Subscription = new Subscription();
    className: string = '';
    selectedClass!: Class;
    classModalBtnText: string = '';
    classModalHeaderText: string = ''
    action = ClassAction.Edit
    modifyArm = false;
    
    constructor(private classRepo: ClassRepository,
                private armRepo: ArmRepository,
                private modalService: BsModalService)
                {
                }

    ngOnInit()
    {
        //load classes with related classArms and CourseCategories
        this.classRepo.loadClasses(true, true);

        //Hook up to the new arm event
        this.newArmHandler = this.armRepo.newArmEvent.subscribe(newArm => {
            this.classes?.find( _class => _class.id == newArm.classId)
            ?.classArms.push(newArm);
        })
    }

    get classes()
    {
        return this.classRepo.classes
    }

    openCreateArmModal(name: string, id: number)
    {   
        const initialState: ModalOptions = {
            initialState: {
                className: name,
                classId: id
            }
        };

        this.armModalRef = this.modalService.show(CreateArmModalComponent, initialState);
    }

    createOrEditClass()
    {
        if(this.action == ClassAction.Create)
        {
           this.createClass() ;
        }
        else if(this.action == ClassAction.Edit){
            this.editClass();
        }
        else{
            this.deleteClass();
        }
    }

    createClass()
    {
        this.className = this.className[0].toUpperCase() + this.className.substring(1);

        let classObj = new Class(0, this.className, []);
        this.classRepo.addClass(classObj);
        this.hideClassModal();
    }

    openCreateClassModal(template: TemplateRef<void>)
    {
        this.className = '';
        this.action = ClassAction.Create;
        this.classModalHeaderText = "Create class";
        this.classModalBtnText = "Create";
        this.classModalRef = this.modalService.show(template)
    }

    openEditClassModal(index: number, template: TemplateRef<void>)
    {
        //this.classRepo
        this.selectedClass = this.classes ? this.classes[index] : new Class(0, '', []);
        /*this.className = this.selectedClass.name;

        this.action = ClassAction.Edit;
        this.classModalHeaderText = "Edit " + this.className;
        this.classModalBtnText = "Edit";

        this.classModalRef = this.modalService.show(template);*/

        let classCopy = JSON.parse(JSON.stringify(this.selectedClass)) as typeof this.selectedClass;

        const initialState: ModalOptions = {
            initialState: {
                selectedClass: classCopy
            }
        }

        this.modalService.show(EditClassArmModalComponent, initialState);
    }
    

    editClass()
    {
        this.selectedClass.name = this.className;
        this.classRepo.updateClass(this.selectedClass);
        this.classModalRef?.hide();
    }

    hideClassModal()
    {
        this.classModalRef?.hide();
    }

    openDeleteClassModal(klass: Class, template: TemplateRef<void>)
    {
        this.action = ClassAction.Delete;
        this.selectedClass = klass;
        this.classModalHeaderText = "Delete " + this.selectedClass.name;
        this.classModalBtnText = "Delete";

        this.classModalRef = this.modalService.show(template);
    }

    deleteClass()
    {
        this.classRepo.deleteClass(this.selectedClass);
        this.classModalRef?.hide();
    }
}
