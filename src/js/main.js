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
//pobieramy do tej funckji wszystkie elementy
const prepareDOMElements = () => {
  todoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");
  //popup
  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};
// tutaj znajdują się wszystkie nasłuchiwania
const prepareDomEvents = () => {
  addBtn.addEventListener("click", addNewTodo);
  //nasłuchujemy na kliknięcia w ulList
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeToDoText);
  todoInput.addEventListener("keyup", enterKeyCheck);
};

//tworzymy nowy element
//dodajemy nowy element do list
//odpalamy funckje na przycisk add
//pobiera dane tekstowe z inputa i dodać do  swojego LI
// dodatkowo zabezpieczenie w przypadku pustego inputa.

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

const createToolsArea = () => {
  //tworzymy nowy div z klasa tools
  const newDiv = document.createElement("div");
  newDiv.classList.add("tools");
  //tworzymy trzy guziki
  const newBtnCom = document.createElement("button");
  const newBtnEdit = document.createElement("button");
  const newBtnDel = document.createElement("button");
  //najadejym guzikom klase
  newBtnCom.classList.add("complete");
  newBtnEdit.classList.add("edit");
  newBtnDel.classList.add("delete");
  // nadajemy tresc guzikom w tym przypadku ikonki i text
  newBtnCom.innerHTML = `<i class="fas fa-check"></i>`;
  newBtnEdit.textContent = `EDIT`;
  newBtnDel.innerHTML = `<i class="fas fa-times"></i>`;
  //dodajemy guziki do diva
  newDiv.append(newBtnCom, newBtnEdit, newBtnDel);
  // dodajemy całosć do nowego obiektu w liscie
  newTodo.appendChild(newDiv);
};

const checkClick = (e) => {
  //if sprawdza czy klikniety guzik wybrana klase
  if (e.target.matches(".complete")) {
    // bardzo wazne! po kliknieciu odnosimy sie do najblizszego obiektu w tym przypadku LI.
    //potem nadajemy odpowiedni efekt w css dzieki klasie completed - zadanie zakonczone.
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editToDo(e);
  } else if (e.target.matches(".delete")) {
    deleteToDo(e);
  }
};

const editToDo = (e) => {
  //najblizsze li ktore przechowuje text wpisany w zadaniu
  todoToEdit = e.target.closest("li");
  //ta linijka sprawia, ze w edycji widzimy juz wczesniej wpisane zadanie
  //inaczej edit były pusty. Dobre do poprawiania np. literówek.
  popupInput.value = todoToEdit.firstChild.textContent;
  popup.style.display = "flex";
};

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

const changeToDoText = () => {
  if (popupInput.value !== "") {
    //zastepujemy obecny text juz nowym.
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
