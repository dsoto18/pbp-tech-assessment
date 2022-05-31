import { Injectable } from '@nestjs/common';
import { MockStudent, MockStudent2, MockStudent3, MockStudent4 } from '../mocks/student';
import { Student } from '../dto/student';

@Injectable()
export class Database {
  // Array of students stored in the database
  students = [];
  
  constructor() {
    this.students.push(MockStudent);
    this.students.push(MockStudent2);
    this.students.push(MockStudent3);
    this.students.push(MockStudent4);
  }



  /**
  * Gets all students in the database
  * 
  * @returns {Student[]} An array of students
  */
  getStudents(): Student[] {
    return this.students;
  }



  /**
  * Gets a student with a specific id
  * 
  * @param {string} id 
  * @returns {Student} A student with the specified id
  */
  getStudent(id: string): Student {
    return this.students.find(student => student.id === id);
  }

  


  /**
  * Adds a hero to the database
  * 
  * @param {Student} student The student to add to the database
  */
  createStudent(student): Student {
    student.id = this.students.length.toString();
    this.students.push(student);
    return student;
  }



  
  updateStudent(id: string, studentUpdates: Student): void {
    
    const temp = new Student(this.getStudent(id).id, this.getStudent(id).name, this.getStudent(id).major, this.getStudent(id).department);
    //temp.update(studentUpdates);

          
    //this.createStudent(temp);         CREATE IS INCORRECT - could make this update method delete and create, but it would push a new student with a new id #
    
    
    //this.getStudent(id).update(studentUpdates);                                 //1
    this.students[id].update(studentUpdates);                                     //2
    //this.students.find(student => student.id === id).update(studentUpdates)     //3

    // Unsure why update() from students.ts does not work. Error states update() is not a function though it exists. 
    // Same error for all 3 approaches above
    // Returns Status Code: 500, Internal server error
  }




  /**
  * Deletes a student by id in the database
  * 
  * @param {string} id The id of the student to delete
  */
  deleteStudent(id): string {
    const index = this.students.findIndex(student => student.id === id);
    if (index >= 0) {
        this.students.splice(index, 1);
    }
    return "Student was deleted."
  }
}
