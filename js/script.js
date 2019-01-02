/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const mainPage = document.querySelector(".page");
const students = document.querySelectorAll(".student-item"); // This is used to build the array below, hide all students in showPage function, and in search function to build filtered studentList.
let studentList = Array.apply(null, students); //Initially load studentList array this array will be changed as searched field is used

/*
   This function accepts the current active page and shows only students in that range
*/
function showPage(list, activePage) {
  let visableListStop = activePage * 10;
  let visableListStart = visableListStop - 10;

  // Hide all students
  for (let i = 0; i < students.length; i++) {
    students[i].style.display = "none";
  }
  // Show all students in list if 10 or less
  if (list.length < 11) {
    for (let i = 0; i < list.length; i++) {
      list[i].style.display = "";
    }
  } else {
    // Show ten students in list based on active page
    for (let i = 0; i < list.length; i++) {
      if (i >= visableListStart && i < visableListStop) {
        list[i].style.display = "";
      }
    }
  }
}

/* 
   Function to append pagination links to bottom of main page div.
   Parameters require an array of elements and the current active page.
*/
function appendPageLinks(list, activePage) {
  // Check to see if div exist and remove it if does.
  if (document.querySelector(".pagination") !== null) {
    mainPage.removeChild(document.querySelector(".pagination"));
  }
  if (activePage === undefined || activePage === null) {
    activePage = 1;
  }
  //If list is 10 or below then return without adding pagination
  if (list.length < 11) {
    return 1;
  }

  const numberOfPages = Math.ceil(list.length / 10);
  const div = document.createElement("div");
  div.className = "pagination";
  const ul = document.createElement("ul");
  const li = document.createElement("li");

  for (let i = 1; i <= numberOfPages; i++) {
    const a = document.createElement("a");

    a.href = "#";
    if (i === activePage) {
      a.className = "active";
    }
    a.textContent = i;
    li.appendChild(a);
    ul.appendChild(li);
  }

  div.appendChild(ul);
  mainPage.appendChild(div);

  return activePage;
}

showPage(studentList, appendPageLinks(studentList, 1)); // Build our initial page with pagination links.

const paginationDiv = document.querySelector(".pagination"); // Declared after pagination div has been inserted

mainPage.addEventListener("click", e => {
  e.preventDefault();

  if (e.target.tagName === "A") {
    const links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
      links[i].className = "";
    }
    e.target.className = "active";

    showPage(studentList, Number(e.target.textContent));
  }
});

/*
   Functionality for searching students.
   First we add the search field to the page.
   Event listeners listen for search button click and keyup events.
   When triggered we call the search function. It will call the showPage functions and appendLinks function
*/
function appendSearchField() {
  const pageHeader = mainPage.firstElementChild;
  const div = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("button");
  div.className = "student-search";
  input.placeholder = "Search for students...";
  button.textContent = "Search";
  div.appendChild(input);
  div.appendChild(button);
  pageHeader.appendChild(div);
}
appendSearchField(); // Add search field and button to page dynamically

const searchDiv = document.querySelector(".student-search"); // Declared after search div has been inserted

searchDiv.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    search();
  }
});

searchDiv.addEventListener("keyup", e => {
  search();
});

const search = () => {
  const input = document.querySelector("input");
  const search = input.value.toUpperCase();
  studentList.length = 0;

  const h3 = document.querySelectorAll(".student-item h3");

  for (let i = 0; i < students.length; i++) {
    let textContent = h3[i].textContent.toUpperCase();

    if (textContent.includes(search)) {
      studentList.push(students[i]);
    }
  }

  showPage(studentList, appendPageLinks(studentList, 1));
};
