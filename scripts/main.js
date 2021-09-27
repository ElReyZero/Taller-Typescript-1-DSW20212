import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputMinBox = document.getElementById("min-box");
var inputMaxBox = document.getElementById("max-box");
var totalCreditElm = document.getElementById("total-credits");
var studentTBody = document.getElementById("student");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement('tr');
        trElement.innerHTML = "<td>" + c.name + "</td>\n                                    <td>" + c.professor + "</td>\n                                    <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    var name = document.getElementById("stName");
    name.innerHTML = student.name;
    var strings = ["Nombre: ", "Código: ", "Identificación: ", "Edad: ", "Dirección: ", "Núm. Teléfono: "];
    var carac = [student.name, student.code, student.cardID, student.age, student.address, student.phone];
    for (var i = 0; i < 6; i++) {
        var trElement = document.createElement('tr');
        trElement.innerHTML = "<td>" + strings[i] + (carac[i] + "</td>");
        studentTBody.appendChild(trElement);
    }
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var minText = inputMinBox.value;
    var maxText = inputMaxBox.value;
    minText = (minText == null) ? '0' : minText;
    maxText = (maxText == null) ? '-1' : maxText;
    var min = Number(minText);
    var max = Number(maxText);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(minRange, maxRange, courses) {
    if (maxRange == -1) {
        return courses.filter(function (course) { return (course.credits >= minRange && course.credits <= 999); });
    }
    else {
        return courses.filter(function (course) { return (course.credits >= minRange && course.credits <= maxRange); });
    }
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
