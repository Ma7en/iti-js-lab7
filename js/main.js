let students = [
    { name: "John", grade: 10, department: "SD" },
    { name: "Mazen", grade: 70, department: "OS" },
    { name: "Saad", grade: 63, department: "SD" },
    { name: "Ali", grade: 83, department: "OS" },
    { name: "Mohammed", grade: 20, department: "El" },
    { name: "Ahmed", grade: 90, department: "El" },
];

// console.log(`1->`, students[0].name);

// department
let studentDepartment = document.querySelectorAll(
    "#studentForm .rad input[type='radio']"
);
let departmentErr = document.querySelector(".department-err");
let departmentVaild = false;
let departmentValue = "";
// console.log(`00--`, studentDepartment);
for (var i = 0; i < studentDepartment.length; i++) {
    // console.log(`2->>`, studentDepartment[i]);
    studentDepartment[i].addEventListener("blur", function (e) {
        // console.log(`2->>>`, studentDepartment);
        // console.log(`1->>`, this.value);

        if (!this.value) {
            departmentErr.innerHTML = "Department name cannot be empty.";
            departmentErr.style.display = "block";
            departmentErr.classList.add("department-msg");
            this.focus();
            this.select();
        } else {
            departmentErr.style.display = "none";
            departmentErr.classList.remove("department-msg");
            departmentValue = this.value;
            departmentVaild = true;
        }
    });
}

// validate name
let studentName = document.getElementById("studentName");
let nameErr = document.querySelector(".name-err");
let nameVaild = false;
let capitalizedStudentName = "";
studentName.addEventListener("blur", function (e) {
    capitalizedStudentName =
        studentName.value.charAt(0).toUpperCase() + studentName.value.slice(1);
    nameErr.innerHTML = "";

    // console.log(`3->`, capitalizedStudentName);
    if (students.some((student) => student.name === capitalizedStudentName)) {
        // console.log(`9->`);
        nameErr.innerHTML = "Student name already exists.";
        nameErr.style.display = "block";
        nameErr.classList.add("name-msg");
        this.focus();
        this.select();
    } else if (!studentName.value) {
        nameErr.innerHTML = "Student name cannot be empty.";
        nameErr.style.display = "block";
        nameErr.classList.add("name-msg");
        this.focus();
        this.select();
    } else {
        nameErr.style.display = "none";
        nameErr.classList.remove("name-msg");
        nameVaild = true;
    }
});

// validate grade
let studentGrade = document.getElementById("studentGrade");
let gradeErr = document.querySelector(".grade-err");
let gradeVaild = false;
let gradeValue = 0;

studentGrade.addEventListener("blur", function (e) {
    gradeValue = parseInt(+studentGrade.value.trim());
    gradeErr.innerHTML = "";
    // console.log(`88>>`, gradeValue);

    if (gradeValue < 0 || gradeValue > 100 || gradeValue == "") {
        gradeErr.innerHTML = "The student's score must be between 0 and 100.";
        gradeErr.style.display = "block";
        gradeErr.classList.add("grade-msg");
        this.focus();
        this.select();
    } else {
        gradeErr.style.display = "none";
        gradeErr.classList.remove("grade-msg");
        gradeVaild = true;
        gradeValue = +this.value;
        // console.log(`877>`, +this.value);
    }
});

let addStudentE = document.querySelector("#addStudent");

addStudentE.addEventListener("click", function (e) {
    if (
        nameVaild === false ||
        gradeVaild === false ||
        departmentVaild === false
    ) {
        e.preventDefault();
    } else {
        // إضافة الطالب إلى القائمة
        students.push({
            name: capitalizedStudentName,
            grade: gradeValue,
            department: departmentValue,
        });

        // إعادة تعيين الحقول
        studentName.value = "";
        studentGrade.value = "";
        studentDepartment.forEach((radio) => (radio.checked = false));
        nameVaild = false;
        gradeVaild = false;
        departmentVaild = false;

        displayStudents();
    }
});

let tbody = document.querySelector("#studentsTable tbody");
function displayStudents() {
    let filterBy = document.getElementById("filter").value;
    let filteredStudents = filterStudents(filterBy);
    let sortBy = document.querySelector(".controls #sort").value;
    let sortedStudents = sortStudents(filteredStudents, sortBy);

    tbody.innerHTML = "";
    sortedStudents.forEach((student, index) => {
        let tr = document.createElement("tr");
        tr.classList.add(student.department.toLowerCase());

        let tdName = document.createElement("td");
        tdName.textContent = student.name;
        tr.appendChild(tdName);

        let tdGrade = document.createElement("td");
        tdGrade.textContent = student.grade;
        tr.appendChild(tdGrade);

        let tdDelete = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = () => {
            students.splice(index, 1);
            displayStudents();
        };
        tdDelete.appendChild(deleteButton);
        tr.appendChild(tdDelete);

        tbody.appendChild(tr);
    });
}

function sortStudents(students, sortBy) {
    if (sortBy === "name") {
        return students.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "grade") {
        return students.sort((a, b) => a.grade - b.grade);
    }
    return students;
}

function filterStudents(filterBy) {
    if (filterBy === "failed") {
        return students.filter((student) => student.grade < 60);
    } else if (filterBy === "success") {
        return students.filter((student) => student.grade >= 60);
    }
    return students;
}

window.addEventListener("load", displayStudents);

// sort and filter students

let sortE = document.querySelector(".controls #sort");
let filterE = document.querySelector(".controls #filter");
sortE.addEventListener("change", displayStudents);
filterE.addEventListener("change", displayStudents);
