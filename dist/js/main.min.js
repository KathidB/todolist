let todoInput; // miejsce, gdzie wpiusujemy treść zadania
let errorInfo; // nie wpisałes zadania / musisz wpisac tekst
let addBtn; //przycisk ADD - dodaje nowe elementy do listy
let ulList; // tagi UL odpowiadające za listę zadań
let newTodo; // nowo dodany Li na liscie

let popup; // okno, które wyskakuje po kliknieciu przycisku edit
let popupInfo; // tekst w opopupie / w przypadku dodania pustego textu
let todoToEdit; // edutowany todo
let popupInput; // input w popupie
let popupAddBtn; // przycisk zatwierrz
let popupCloseBtn; //przycisk anuluj

const main = () => {
  prepareDOMElements();
  prepareDomEvents();
};

const prepareDOMElements = () => {
  todoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");
  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

const prepareDomEvents = () => {
  addBtn.addEventListener("click", addNewTodo);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeToDoText);
  todoInput.addEventListener("keyup", enterKeyCheck);
};

const addNewTodo = () => {
  if (todoInput.value !== "") {
    newTodo = document.createElement("li");
    newTodo.textContent = todoInput.value;
    ulList.appendChild(newTodo);
    todoInput.value = "";
    errorInfo.textContent = "";
    createToolsArea();
  } else {
    errorInfo.textContent = "Wpisz treść zadania.";
    errorInfo.style.color = "tomato";
  }
};

// tworzymy guziki i dodajemy je do nowo utworzonego LI na liście
const createToolsArea = () => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("tools");
  const newBtnCom = document.createElement("button");
  const newBtnEdit = document.createElement("button");
  const newBtnDel = document.createElement("button");
  newBtnCom.classList.add("complete");
  newBtnEdit.classList.add("edit");
  newBtnDel.classList.add("delete");
  newBtnCom.innerHTML = `<i class="fas fa-check"></i>`;
  newBtnEdit.textContent = `EDIT`;
  newBtnDel.innerHTML = `<i class="fas fa-times"></i>`;
  newDiv.append(newBtnCom, newBtnEdit, newBtnDel);
  newTodo.appendChild(newDiv);
};

const checkClick = (e) => {
  //if sprawdza czy klikniety guzik ma wybrana klase
  if (e.target.matches(".complete")) {
    //  po kliknieciu odnosimy sie do najblizszego obiektu w tym przypadku LI.
    //potem nadajemy odpowiedni efekt w css dzieki klasie completed - zadanie zakonczone.
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editToDo(e);
  } else if (e.target.matches(".delete")) {
    deleteToDo(e);
  }
};

//funckjja sprawia, ze w edycji widzimy juz wczesniej wpisane zadanie
//inaczej edit były pusty.
const editToDo = (e) => {
  todoToEdit = e.target.closest("li");
  popupInput.value = todoToEdit.firstChild.textContent;
  popup.style.display = "flex";
};

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

const changeToDoText = () => {
  if (popupInput.value !== "") {
    todoToEdit.firstChild.textContent = popupInput.value;
    popupInfo.textContent = "";
    closePopup();
  } else {
    popupInfo.textContent = "Musisz podać jakąś treść.";
  }
};

const deleteToDo = (e) => {
  //funcka bedzie usuwala element z lity za pomoca guzika
  // znajdujemy najblizszy element li dla guzika i potem uzywamy remove
  e.target.closest("li").remove();
  const allToDos = document.querySelectorAll("li");

  allToDos.length === 0
    ? (errorInfo.textContent = "Brak zadań na liście.")
    : false;
};

const enterKeyCheck = (e) => {
  e.key === "Enter" ? addNewTodo() : false;
};

const tenIsEnough = () => {
  allToDos.length;
};

// nasze skrypty uruchomią się gdy cała strona zopstanie wczytana.
//main pobierze wszystkie elementy i nada nasłuchiwanie na każdy pobrany element.
document.addEventListener("DOMContentLoaded", main);
