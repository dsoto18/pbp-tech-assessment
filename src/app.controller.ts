import { Body, Controller, Get, Param, Post, Patch, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { request } from 'http';
import { identity } from 'rxjs';
import { Database } from './database/database.service';
import { Student } from './dto/student';
import { StudentWriteDto } from './dto/studentWrite';

@Controller()
export class AppController {
  constructor(private readonly database: Database) {}

  @Get()
  getHello(): string {
   // return this.database.getHello();
   return "Hello"  // local host url with no extension prints "hello"
   
  }

  @HttpCode(200)
  @Get('students')
  getStudents(): Student[] {
    
    return this.database.getStudents();
  }

  @HttpCode(200)
  @Get('students/:id')
  getStudent(@Param('id') id: string): Student {
    //const foundStudent = new Student(this.database.getStudent(id).id, this.database.getStudent(id).name, this.database.getStudent(id).major, this.database.getStudent(id).department)
    //if(!foundStudent){
    if(!this.database.getStudent(id)){  
      throw new NotFoundException('Student was not found.')
    }
    return this.database.getStudent(id);
  }




//************************** ORIGINAL STARTING POST REQUEST CODE **************************/
  //@Post('students')
  //createStudent(@Body('student') student: StudentWriteDto): Student {
  //  return this.database.createStudent(student);
  //}
//****************************************************/ kept in case of needing to start again, ended up not using





  //@Post('students/:id/:name/:major/:department')
  //createStudent(
  //  @Param('id') id: string,                                    ****************************
  //  @Param('name') name: string,                                FIRST ATTEMPT AT CREATE STUDENT,
  //  @Param('major') major: string,                              FULLY WORKING BUT WITH ARGUMENTS PASSED
  //  @Param('department') department: string                     AS PARAMETERS IN URL
  //  ): Student {                                                ****************************

  //  const temp = new Student(id, name, major, department);
  //  return this.database.createStudent({"id": id, "name": name, "major": major, "department": department});
    
  //}





  // WORKING POST REQUEST:

  @HttpCode(201)
  @Post('students')
  createStudent(
    @Body('id') id: string, // WILL BE ASSIGNED REGARDLESS OF ENTRY VALUE, NOT NEEDED WHEN SENDING REQUEST, CAN BE LEFT EMPTY
    @Body('name') name: string,
    @Body('major') major: string,
    @Body('department') department: string
    ): Student {

    const requestBody = {
      "id": id, "name": name, "major": major, "department": department
    }  


    /////////////////////////////////////////////////////////////////   -- DOES NOT USE CORRECT MODULE
    //var request = require('request');   
    //var reqUrl = 'http://localhost:3001/students';
    //var parameters = 
    //{
    //  method: 'POST',
    //  url: reqUrl,
    //  data: requestBody
    //}

    //request(parameters, function(err, response, body){
    //  console.log(body);
    //})
    ////////////////////////////////////////////////////////////////


    try{

      const http = require('http');
      const postData = JSON.stringify(requestBody);

      const options = {
        hostname: 'http://localhost:3001',
        port: 80,
        path: '/students',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData)}
      };

      const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          console.log('No data left');
        });
      });

      req.on('error', (exception) => {
      console.error(`Error: ${exception.message}`);
      });

      // Write data to request body
      req.write(postData);
      req.end();

    } catch(e: unknown){
      console.log(e.toString)
    } // Try Catch Block code does not function, returns: ERROR getaddrinfo ENOTFOUND http://localhost:3001


    return this.database.createStudent(requestBody);

    //Post request still works and creates new student successfully
    
  }




  //@Patch('students/:id')
  //updateStudent(@Body('student') student: Partial<StudentWriteDto>, @Param('id') id: string): void {
  //  return;
  //}

  @HttpCode(204) 
  @Patch('students/:id')
  updateStudent(
    //@Body('student') student: Student,
    @Body('name') name: string,
    @Body('major') major: string,
    @Body('department') department: string,
     @Param('id') id: string
     ): void {
    if(!this.database.getStudent(id)){
      throw new NotFoundException('The student to update was not found.')
    } else {
    const tempStudent = new Student(id, name, major, department);
    //const tempStudent = {"id": id, "name": name, "major": major, "department": department}
    this.database.updateStudent(id, tempStudent);
    //this.database.deleteStudent(tempStudent);
    }
    return;

    //*****Update currently not working. Error described in database.service.ts*****

  }






  @HttpCode(204) // Success code overwritten
  @Delete('students/delete/:id')
  deleteStudent(@Param('id') id: string): void {
    if(!this.database.getStudent(id)){
      throw new NotFoundException('The student to delete was not found.')
    }
    this.database.deleteStudent(id);
    return //this.database.getStudents();
  }
}
