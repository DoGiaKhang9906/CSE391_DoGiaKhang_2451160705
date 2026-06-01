let students =
    JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

const modal = document.getElementById("modal");

const btnAdd = document.getElementById("btnAdd");

const btnClose = document.getElementById("btnClose");

const form = document.getElementById("studentForm");

const tableBody = document.getElementById("studentTable");

const message = document.getElementById("message");

const formTitle = document.getElementById("formTitle");

const totalStudents =
    document.getElementById("totalStudents");

const avgScore =
    document.getElementById("avgScore");


// INPUT

const studentId =
    document.getElementById("studentId");

const fullName =
    document.getElementById("fullName");

const birthday =
    document.getElementById("birthday");

const className =
    document.getElementById("className");

const score =
    document.getElementById("score");

const email =
    document.getElementById("email");


// LƯU LOCAL STORAGE

function saveStudents() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// RESET FORM

function resetForm() {

    form.reset();

    editIndex = -1;

    formTitle.innerText =
        "Thêm Sinh Viên";
}


// THÔNG BÁO

function showMessage(text) {

    message.innerText = text;

    setTimeout(() => {
        message.innerText = "";
    }, 2000);
}


// THỐNG KÊ

function updateStatistics() {

    totalStudents.innerText =
        students.length;

    if (students.length === 0) {
        avgScore.innerText = 0;
        return;
    }

    let total = 0;

    students.forEach(student => {
        total += Number(student.score);
    });

    avgScore.innerText =
        (total / students.length).toFixed(2);
}


// HIỂN THỊ BẢNG

function renderStudents() {

    tableBody.innerHTML = "";

    if (students.length === 0) {

        tableBody.innerHTML =
        `
        <tr>
            <td colspan="7">
                Chưa có dữ liệu
            </td>
        </tr>
        `;

        updateStatistics();

        return;
    }

    students.forEach((student,index)=>{

        tableBody.innerHTML +=
        `
        <tr>

            <td>${student.studentId}</td>

            <td>${student.fullName}</td>

            <td>${student.birthday}</td>

            <td>${student.className}</td>

            <td>${student.score}</td>

            <td>${student.email}</td>

            <td>

                <button class="editBtn"
                    data-index="${index}">
                    Sửa
                </button>

                <button class="deleteBtn"
                    data-index="${index}">
                    Xóa
                </button>

            </td>

        </tr>
        `;
    });

    updateStatistics();
}


// MỞ FORM

btnAdd.addEventListener("click", () => {

    resetForm();

    modal.style.display = "flex";
});


// ĐÓNG FORM

btnClose.addEventListener("click", () => {

    modal.style.display = "none";
});


// THÊM + SỬA

form.addEventListener("submit", function(e){

    e.preventDefault();

    const student = {

        studentId: studentId.value,

        fullName: fullName.value,

        birthday: birthday.value,

        className: className.value,

        score: score.value,

        email: email.value
    };

    if(editIndex === -1){

        students.push(student);

        showMessage(
            "Thêm sinh viên thành công"
        );

    } else {

        students[editIndex] = student;

        showMessage(
            "Cập nhật thành công"
        );
    }

    saveStudents();

    renderStudents();

    modal.style.display = "none";

    resetForm();
});


// EVENT DELEGATION

tableBody.addEventListener("click", function(e){

    const index =
        e.target.dataset.index;

    // SỬA

    if(e.target.classList.contains("editBtn")){

        const student = students[index];

        studentId.value =
            student.studentId;

        fullName.value =
            student.fullName;

        birthday.value =
            student.birthday;

        className.value =
            student.className;

        score.value =
            student.score;

        email.value =
            student.email;

        editIndex = index;

        formTitle.innerText =
            "Cập Nhật Sinh Viên";

        modal.style.display = "flex";
    }

    // XÓA

    if(e.target.classList.contains("deleteBtn")){

        const confirmDelete =
            confirm(
                "Bạn có chắc muốn xóa?"
            );

        if(confirmDelete){

            students.splice(index,1);

            saveStudents();

            renderStudents();

            showMessage(
                "Xóa thành công"
            );
        }
    }
});


// LOAD

renderStudents();