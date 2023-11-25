import { Component } from '@angular/core'
import { ClassRepository } from '../models/classRepository.model';
import { Class } from '../models/studentClassArm.model';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateArmModalComponent } from './createArm.component';
import { CourseCategory } from '../models/classSubject.model';
import { ArmRepository } from '../models/armRepository.model';
import { Subscription } from 'rxjs';


@Component({
    templateUrl: 'classList.component.html'
})

export class ClassListComponent {
    bsModalRef?: BsModalRef;
    private newArmHandler: Subscription = new Subscription()
    
    constructor(private classRepo: ClassRepository,
                private armRepo: ArmRepository,
                private modalService: BsModalService)
                {
                }

    ngOnInit()
    {
        this.classRepo.loadClasses(true, true);

        //Hook up to the new arm event
        this.newArmHandler = this.armRepo.newArmEvent.subscribe(newArm => {
            //newArm.courseCategory = this.armRepo.courseCategories?.find(x => x.id == newArm.courseCategoryId)
            //console.log(newArm);
            
             this.classes.forEach( entry => {
                entry.find( _class => _class.id == newArm.classId)
                     ?.classArms.push(newArm);
             })
        })
    }

    private numOfColumns = 3

    get classes(): Class[][]
    {
        return this.classRepo.classesArray(this.numOfColumns);
    }

    openCreateArmModal(name: string, id: number)
    {
        this.armRepo.getCourseCategories();
        
        const initialState: ModalOptions = {
            initialState: {
                className: name,
                classId: id
            }
        };

        this.bsModalRef = this.modalService.show(CreateArmModalComponent, initialState);
    }

}
