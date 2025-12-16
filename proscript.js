// Load data from localStorage
document.addEventListener("DOMContentLoaded", loadStudents);

const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");

form.addEventListener("submit", saveStudent);

function loadStudents() {
  tableBody.innerHTML = "";
  let students = JSON.parse(localStorage.getItem("students")) || [];

  students.forEach((student, index) => {
    let row = `<tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>
                  <button class="edit" onclick="editStudent(${index})">Edit</button>
                  <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
              </tr>`;
    tableBody.innerHTML += row;
  });
}

function saveStudent(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let studentId = document.getElementById("studentId").value;

  let students = JSON.parse(localStorage.getItem("students")) || [];

  if (studentId === "") {
    // Create new
    students.push({ name, email, phone });
  } else {
    // Update existing
    students[studentId] = { name, email, phone };
    document.getElementById("studentId").value = "";
  }

  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  loadStudents();
}

function editStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  document.getElementById("name").value = students[index].name;
  document.getElementById("email").value = students[index].email;
  document.getElementById("phone").value = students[index].phone;
  document.getElementById("studentId").value = index;
}

function deleteStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
}
