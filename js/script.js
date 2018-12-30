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

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage() {
  for (let i = 0; i < studentList.length; i++) {
    studentList[i].style.display = "none";
  }
}

/* 
   Function to append pagination links to bottom of main page div.
*/
function appendPageLinks() {
  console.log("appendPageLinks() was called.");
  if (document.querySelector(".pagination") !== null) {
    mainPage.removeChild(document.querySelector(".pagination"));
    console.log("Removed pagination.");
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

    // studentList[i].style.display = "none";
  }

  div.appendChild(ul);
  div.className = "pagination";
  mainPage.appendChild(div);
}
appendPageLinks();
appendPageLinks();
// Remember to delete the comments that came with this file, and replace them with your own code comments.
