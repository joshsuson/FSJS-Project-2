/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const studentList = document.querySelectorAll('.student-item');
const studentsPerPage = 10;
const studentPage = document.querySelector('.page');




// Add search bar to page
const makeSearchBar = () => {
   const header = document.querySelector('.page-header');
   const studentSearch = document.createElement('div');
   const searchContent = 
   `
   <input id="searchBar" placeholder="Search for students...">
   <button>Search</button>
   `;

   header.appendChild(studentSearch);
   studentSearch.classList.add('student-search');
   studentSearch.innerHTML = searchContent;
}

makeSearchBar();

// Shows list of 10 students as a "page"
const showPage = (list, page) => {
   let startIndex = (studentsPerPage * page) - studentsPerPage;
   let endIndex = (studentsPerPage * page) - 1;
   for(i = 0; i < list.length; i++) {
      list[i].style.display = 'none';
      if (i >= startIndex && i <= endIndex) {
         list[i].style.display = 'block';
      }
   }
}

// Adds "page" links to bottom of page so you can click through students
const appendPageLinks = list => {
   
   let linkCheck = document.querySelector('.pagination');
   if (linkCheck !== null) {
      linkCheck.remove();
   }
   
   const numberOfPages = Math.ceil(list.length / studentsPerPage);
   const linkDiv = document.createElement('div');
   linkDiv.classList.add('pagination');
   const linkUL = document.createElement('ul');
   studentPage.appendChild(linkDiv);
   linkDiv.appendChild(linkUL);

   for(i = 0; i < numberOfPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');

      if (i === 0) {
         a.classList.add('active');
      }
      a.href = "#";
      const pageNumber = i + 1;
      a.textContent = pageNumber;
      linkUL.appendChild(li);
      li.appendChild(a);
   }
}
// Call functions to added pages and page links
showPage(studentList, 1);
appendPageLinks(studentList);


// Create function to make page links work 
const linkButtons = (event, list) => {
   let button = event.target;
   if (button.nodeName.toLowerCase() === 'a') {
      let activePage = parseInt(button.textContent);
      showPage(list, activePage);
      if (!button.classList.contains('active')) {
         button.classList.add('active');
      }
      let pageLinks = document.querySelectorAll('.pagination a');
      for (i = 0; i < pageLinks.length; i++) {
         if (pageLinks[i] != button) {
         pageLinks[i].classList.remove('active');
         }
      }   
   }
}


// Event Listener to make "page" links work
let linkDiv = document.querySelector('.pagination');
linkDiv.addEventListener('click', e => linkButtons(e, studentList));

// declare variables for search function
const searchBar = document.querySelector('#searchBar');
const searchDiv = document.querySelector('.student-search');
let searchLinks;
let masterList;

// write search function
const searchFunction = () => {
   let searchValue = searchBar.value.toLowerCase();
   let studentUL = document.querySelector('.student-list');
   let studentLI = studentUL.querySelectorAll('li');
   let searchList = [];
   
   // cycle throught student names and see if they match search
   for (i = 0; i < studentLI.length; i++) {
      studentLI[i].style.display = 'none';
      let h3 = studentLI[i].querySelector('h3');
      let name = h3.textContent;
      if (name.toLowerCase().includes(searchValue)) {
         searchList.push(studentLI[i]);
      } 
   }
   // If search yields nothing then display message
   // Then check to see if search yields results check to see if no results message is displayed and remove it
   // then print paginated results
   if (searchList.length === 0) {
      let noResults = document.createElement('div');
      noResults.id = 'noResults';
      noResults.innerHTML = `<p>I'm sorry there were no results for that search. Please search someone else.</p>`
      studentPage.appendChild(noResults);
      if (typeof searchLinks === 'object') {
         searchLinks.remove();
      } else {
         linkDiv.remove();
      } 
   } else {
      let noResults = document.querySelector('#noResults');
      if (noResults !== null) {
         noResults.remove();
      }
      showPage(searchList, 1);
      appendPageLinks(searchList);
      // Define variables so that new page links can work
      let linkClass = document.querySelector('.pagination');
      linkClass.id = 'searchLinks';
      searchLinks = document.querySelector('#searchLinks');
      masterList = searchList;
   }  
}
// call event listener on page links generated by search results
studentPage.addEventListener('click', e => {
   if (typeof searchLinks !== 'undefined') {
      linkButtons(e, masterList);
   }
});


searchDiv.addEventListener('click', e => {
   let searchButton = searchDiv.querySelector('button');
   if (e.target === searchButton) {
      searchFunction();
   }
});