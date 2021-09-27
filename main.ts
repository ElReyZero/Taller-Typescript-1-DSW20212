import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js'
import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputMinBox : HTMLInputElement = <HTMLInputElement> document.getElementById("min-box")!;
const inputMaxBox : HTMLInputElement = <HTMLInputElement> document.getElementById("max-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const studentTBody : HTMLElement = document.getElementById("student")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void
{
    courses.forEach(
        c=> {
            let trElement = document.createElement('tr');
            trElement.innerHTML = `<td>${c.name}</td>
                                    <td>${c.professor}</td>
                                    <td>${c.credits}</td>`;
            coursesTbody.appendChild(trElement);
        }
    );
}

function renderStudentInTable(student: Student):void
{
    let name = document.getElementById("stName")!;
    name.innerHTML = student.name;
    let strings = ["Nombre: ", "Código: ", "Identificación: ", "Edad: ", "Dirección: ", "Núm. Teléfono: "]
    let carac = [student.name, student.code, student.cardID, student.age, student.address, student.phone];
    for (var i = 0; i<6; i++)
    {
        let trElement = document.createElement('tr');
        trElement.innerHTML = `<td>`+strings[i] +`${carac[i]}</td>`
        studentTBody.appendChild(trElement);
    }
}

function getTotalCredits(courses: Course[]):number
{
    let totalCredits: number = 0;
    courses.forEach((course)=> totalCredits = totalCredits + course.credits);
    return totalCredits;
}

function applyFilterByName()
{
    let text = inputSearchBox.value;
    text = (text == null) ?  '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits()
{
    let minText = inputMinBox.value;
    let maxText = inputMaxBox.value;
    minText = (minText == null) ?  '0' : minText;
    maxText = (maxText == null) ?  '-1' : maxText;
    let min = Number(minText);
    let max = Number(maxText);
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(minRange:number, maxRange:number, courses:Course[])
{
    if (maxRange == -1)
    {
        return courses.filter(course=> (course.credits>=minRange&& course.credits<=999));
    }
    else 
    {
        return courses.filter(course=> (course.credits>=minRange&& course.credits<=maxRange));
    }
}


function searchCourseByName(nameKey: string, courses:Course[])
{
    return nameKey === '' ? dataCourses : courses.filter ( c=>
        c.name.match(nameKey));
}

function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
      if (coursesTbody.firstChild != null) {
        coursesTbody.removeChild(coursesTbody.firstChild);
       
      }
    }
}