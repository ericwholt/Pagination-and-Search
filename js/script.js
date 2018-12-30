/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const mainPage = document.querySelector(".page");
const studentList = document.getElementsByTagName("li");
const studentName = document.getElementsByTagName("h3");

/*
   Temporary for loop to number students to confirm pagination is
   0-9,10-19,20-29 etc.
*/
for (let i = 0; i < studentName.length; i++) {
  let studentNumber = i + 1;
  let currentStudent = studentName[i].textContent;
  studentName[i].textContent = studentNumber + ") " + currentStudent;
}
/*
   This function accepts the current active page and shows only students in that range
*/
function showPage(activePage) {
  const students = document.getElementsByClassName("student-item");
  let startingIndex = activePage * 10 - 10;
  let endingIndex = activePage * 10 - 1;

  if (activePage === 1) {
    // unhide active list
    for (let i = 0; i < endingIndex; i++) {
      students[i].style.display = "";
    }
    // hide rest of students
    for (let i = endingIndex; i < students.length; i++) {
      students[i].style.display = "none";
    }
  } else {
    startingIndex = activePage * 10 - 11;
    endingIndex = activePage * 10 - 1;
    if (endingIndex > students.length - 1) {
      for (let i = 0; i < startingIndex; i++) {
        students[i].style.display = "none";
      }
      for (let i = startingIndex; i < students.length; i++) {
        students[i].style.display = "";
      }
    } else {
      for (let i = startingIndex; i < endingIndex; i++) {
        students[i].style.display = "";
      }
      for (let i = 0; i < startingIndex; i++) {
        students[i].style.display = "none";
      }
      for (let i = endingIndex; i < students.length; i++) {
        students[i].style.display = "none";
      }
    }
  }
}

/* 
   Function to append pagination links to bottom of main page div.
*/
function appendPageLinks() {
  if (document.querySelector(".pagination") !== null) {
    // confirm we are removing the existing pagination before adding new div
    mainPage.removeChild(document.querySelector(".pagination"));
  }
  const div = document.createElement("div");
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  let count = 0;
  for (let i = 0; i < studentList.length; i += 10) {
    const a = document.createElement("a");
    count++;

    a.href = "#";
    if (count === 1) {
      a.className = "active";
    }
    a.textContent = count;
    li.appendChild(a);
    ul.appendChild(li);
  }

  div.appendChild(ul);
  div.className = "pagination";
  mainPage.appendChild(div);
  showPage(Number(document.querySelector(".active").textContent));
}
appendPageLinks();
// Remember to delete the comments that came with this file, and replace them with your own code comments.
