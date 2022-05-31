import { StudentWriteDto } from "./studentWrite";

export class Student {
    id: string;
    name: string;
    major: string;
    department: string;

    //constructor(student: any) {
    //    this.id = student.id;                             ****PREVIOUS****
    //    this.name = student.name;                         ***CONSTRUCTOR***
    //    this.major = student.major;
    //    this.department = student.department;
    //}


    //****** NEW CONSTRUCTOR  ******// MUST TAKE IN ALL STUDENT VARIABLES AS PARAMETERS
    constructor(id: string, name: string, major: string, department: string) {
        this.id = id;
        this.name = name;
        this.major = major;
        this.department = department;
    }

    /**
     * Updates the student class with new update values
     * 
      
     */
    // @param {Partial<StudentWriteDto>} args The partial student object

        
    // updateStudent(args: Partial<StudentWriteDto>) {
    //    if (args.name) {
    //        this.name = args.name;
    //    }
    //    if (args.major) {
    //        this.major = args.major;
    //    }
    //    if (args.department) {
    //        this.department = args.department;
    //    }
    //}

    update(args: Student): void{
        if (args.name) {
            this.name = args.name;
        }
        if (args.major) {
            this.major = args.major;
        }
        if (args.department) {
            this.department = args.department;
        }
    }
    
}