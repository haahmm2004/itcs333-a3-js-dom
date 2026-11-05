// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
// ITCS333 A3 solution — Vanilla JS To-Do App
// ITCS333 A3 solution — Vanilla JS To-Do App (Verified for all cases)
(function () {
  function initApp() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const errorMsg = document.getElementById('error-msg');
    const todoList = document.getElementById('todo-list');
    const counter = document.getElementById('counter');
    
    const filterAllBtn = document.getElementById('filter-all');
    const filterActiveBtn = document.getElementById('filter-active');
    const filterDoneBtn = document.getElementById('filter-done');

    if (!todoForm || !todoList) return;

    let currentFilter = 'all'; 

    //Update counter text
    function updateCounter() {
      const items = todoList.querySelectorAll('li');
      let activeCount = 0;
      items.forEach(li => {
        if (!li.classList.contains('completed')) {
          activeCount++;
        }
      });
      if (counter) {
        counter.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
      }
    }

    //Apply current filter visibility
    function applyFilter() {
      const items = todoList.querySelectorAll('li');
      items.forEach(li => {
        const isCompleted = li.classList.contains('completed');
        if (currentFilter === 'all') {
          li.style.display = '';
          li.classList.remove('hidden');
        } else if (currentFilter === 'active') {
          if (isCompleted) {
            li.style.display = 'none';
            li.classList.add('hidden');
          } else {
            li.style.display = '';
            li.classList.remove('hidden');
          }
        } else if (currentFilter === 'done') {
          if (!isCompleted) {
            li.style.display = 'none';
            li.classList.add('hidden');
          } else {
            li.style.display = '';
            li.classList.remove('hidden');
          }
        }
      });
    }

    // 1 & 2. Add Item / Empty Submission
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = todoInput.value.trim();

      if (text === '') {
        if (errorMsg) {
          errorMsg.classList.remove('hidden');
          errorMsg.style.display = '';
        }
        return;
      }

      // Hide error message on valid submission
      if (errorMsg) {
        errorMsg.classList.add('hidden');
        errorMsg.style.display = 'none';
      }

      // Create new element
      const li = document.createElement('li');
      
      const span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';

      li.appendChild(span);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);

      // Clear input
      todoInput.value = '';

      // Update UI state
      applyFilter();
      updateCounter();
    });

    // 3, 4 & 7. Event Delegation on #todo-list (Toggle complete & Delete)
    todoList.addEventListener('click', (e) => {
      const target = e.target;
      const li = target.closest('li');
      if (!li) return;

      // Check if delete button was clicked
      if (target.classList.contains('delete-btn') || target.tagName === 'BUTTON') {
        li.remove();
      } else {
        // Toggle complete status when clicking item text/li
        li.classList.toggle('completed');
      }

      applyFilter();
      updateCounter();
    });

    // 5. Filters Event Listeners
    if (filterAllBtn) {
      filterAllBtn.addEventListener('click', () => {
        currentFilter = 'all';
        applyFilter();
      });
    }

    if (filterActiveBtn) {
      filterActiveBtn.addEventListener('click', () => {
        currentFilter = 'active';
        applyFilter();
      });
    }

    if (filterDoneBtn) {
      filterDoneBtn.addEventListener('click', () => {
        currentFilter = 'done';
        applyFilter();
      });
    }

    // Initial counter setup
    updateCounter();
  }

  // Handle both direct execution and DOMContentLoaded scenarios robustly
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();