/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const mainPage = document.querySelector(".page");
const students = document.querySelectorAll(".student-item"); // This is used to build the array below, hide all students in showPage function, and in search function to build filtered studentList.
let studentList = Array.from(students); //Initially load studentList array this array will be changed as searched field is used

/*
  Description for showPage()
  Parameter 'list' takes an array
  Parameter 'activePage' takes a number. 
  Function hides all student elements on page and then shows a max of 10 elements
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
  Description for appendPageLinks()
  Parameter 'list' takes an array
  Parameter 'activePage' takes a number. 
  Function divides the number of elements by 10 and rounds up to get the
  number of pages. Creates div, ul, and li. It then add links for each page
  to the li's and sets active class to activePage link. It adds the li to 
  the ul. We then add the ul to divs and adds div to mainPage. Finally it
  returns the current active page as a number.
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
  if (list.length < 11 && list.length > 0) {
    return 1;
  } else if (list.length === 0) {
    // if no results found then display no results message
    const div = document.createElement("div");
    div.className = "pagination";
    const h1 = document.createElement("h1");
    h1.textContent = "No results have been found";
    div.appendChild(h1);
    mainPage.appendChild(div);
    return 1;
  }
  const div = document.createElement("div");
  div.className = "pagination";
  const numberOfPages = Math.ceil(list.length / 10);
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

const paginationDiv = document.querySelector(".pagination"); // Instantiate after pagination div has been inserted

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
   Description for appendSearchField()
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

const searchDiv = document.querySelector(".student-search"); // instantiate after search div has been inserted

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
