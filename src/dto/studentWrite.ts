export class StudentWriteDto {
    name: string;
    major: string;
    department: string;

    constructor(student: any) {
        this.name = student.name;
        this.major = student.major;
        this.department = student.department;
    }
}