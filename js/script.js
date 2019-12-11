/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const studentList = document.querySelectorAll('.student-item');
const studentsPerPage = 10;
const studentPage = document.querySelector('.page');



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
   const createElement = type => {
      const element = document.createElement(type);
      return element;
   }

   const numberOfPages = Math.ceil(list.length / studentsPerPage);
   const linkDiv = createElement('div');
   linkDiv.classList.add('pagination');
   const linkUL = createElement('ul');
   studentPage.appendChild(linkDiv);
   linkDiv.appendChild(linkUL);

   for(i = 0; i < numberOfPages; i++) {
      const li = createElement('li');
      const a = createElement('a');

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

showPage(studentList, 1);
appendPageLinks(studentList);


// Event Listener to make "page" links work
const linkDiv = document.querySelector('.pagination');
linkDiv.addEventListener('click', e => {
   let button = e.target;
   if (button.nodeName.toLowerCase() === 'a') {
      let activePage = parseInt(button.textContent);
      showPage(studentList, activePage);
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
});
