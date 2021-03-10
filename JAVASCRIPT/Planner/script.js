let selectTheme = null;
let body = null;
let actionsMenu = null;
const icons = [
  '<i class="fas fa-square"></i>',
  '<i class="fas fa-circle"></i>',
  '<i class="fas fa-calendar"></i>',
  '<i class="fas fa-pen"></i>',
  '<i class="fas fa-film"></i> ',
];
let editing = false;
let type = null;
let description = null;
let where = [];
let submit = null;
let checkboxes = [];
let daysList = document.querySelectorAll('.dia-semana');

let typeEd = document.querySelector('#typeEd');
let whereEd = document.querySelector('#whereEd');
let descEd = document.querySelector('#descEd');
let obsEd = document.querySelector('#obsEd');
let updateItem = document.querySelector('.updateItem');
let idCurrentItem = document.querySelector('#idItem');

let u = [];
let getIdDay = [];

let id = null;
let allItems = Array();
let weeklist = document.querySelectorAll('.listagem');
let itemList = [];
let iconsAction = [];

let totalTarefas = document.querySelector('#totalT');
let tarefas = null;
let emAberto = null;
let iniciadas = null;
let concluidas = null;
let importantes = null;
let canceladas = null;
let total = null;
let porcent = null;
let taskData = [];

let xi = null;
let yi = null;

var settings = {
  Color: '',
  LinkColor: '',
  NavShow: true,
  NavVertical: false,
  NavLocation: '',
  DateTimeShow: true,
  DateTimeFormat: 'mmm, yyyy',
  DatetimeLocation: '',
  EventClick: '',
  EventTargetWholeDay: false,
  DisabledDays: [],
};

var events = [
  {
    Date: new Date(2020, 9, 12),
    Title: 'Dia das Crianças',
  },
  {
    Date: new Date(2020, 9, 03),
    Title: 'Niver Willian',
  },
  {
    Date: new Date(2020, 11, 25),
    Title: 'Feliz Natal',
    Link: 'https://www.google.com',
  },
];

var element = document.getElementById('caleandar');
caleandar(element, events, settings);

window.addEventListener('load', () => {
  itemList = document.querySelectorAll('.item');
  itemList = Array.from(itemList);

  body = document.querySelector('body');
  selectTheme = document.querySelector('.selTheme');
  selectTheme.value = localStorage.getItem('theme');

  if (localStorage.getItem('theme')) {
    body.className = localStorage.getItem('theme');
  } else {
    localStorage.setItem('theme', 'light');
    selectTheme.value = localStorage.getItem('theme');
  }

  selectTheme.addEventListener('change', changeTheme, false);

  submit = document.getElementById('submit');
  submit.addEventListener('click', newItem, false);

  type = document.getElementById('type');
  description = document.getElementById('inputItems');
  checkboxes = document.getElementsByName('where');
  checkboxes = Array.from(checkboxes);

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener(
      'click',
      (event) => {
        where[i] = event.target.value;
        console.log(where);
      },
      false
    );
  }

  let btnReset = document.querySelector('.reset');
  btnReset.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
  });

  let btnTasks = document.querySelector('.btnFixedTasks');
  btnTasks.addEventListener('click', () => {
    itensFixed();
    window.location.reload();
  });

  dates();
  getItems();

  function getValue(itemId) {
    const id = itemId.dataset.id;
    const itemDataBase = localStorage.getItem(id);
    const getItem = JSON.parse(itemDataBase);

    idCurrentItem.value = id;
    typeEd.value = getItem.type;
    whereEd.value = getItem.where;
    descEd.value = getItem.description;
    obsEd.value = getItem.obs;

    updateItem.addEventListener('click', editItem1(itemId));
  }

  function editItem1(itemId) {
    const id = itemId.dataset.id;
    const itemDataBase = localStorage.getItem(id);
    const getItem = JSON.parse(itemDataBase);

    let updateItem = {
      type: typeEd.value,
      where: whereEd.value,
      description: descEd.value,
      obs: obsEd.value,
      started: getItem.started,
      finished: getItem.finished,
      important: getItem.important,
      canceled: getItem.canceled,
    };

    localStorage.setItem(id, JSON.stringify(updateItem));
    console.log(updateItem);
  }

  function UpdateClass(itemId, s, f, i, c) {
    const id = itemId.dataset.id;
    const itemDataBase = localStorage.getItem(id);
    const getItem = JSON.parse(itemDataBase);

    let updateItem = {
      type: getItem.type,
      where: getItem.where,
      description: getItem.description,
      obs: getItem.obs,
      started: s,
      finished: f,
      important: i,
      canceled: c,
    };

    localStorage.setItem(id, JSON.stringify(updateItem));
    console.log(updateItem);
  }

  for (let g = 0; g < weeklist.length; g++) {
    weeklist[g].addEventListener(
      'click',
      function (e) {
        itemId = e.target;
        console.log(itemId);
        actionsItem(itemId);
      },
      false
    );
  }

  function actionsItem(itemList) {
    actionsMenu = document.createElement('div');
    actionsMenu.className = 'acoes';
    actionsMenu.innerHTML =
      '<i class="fas fa-play bt" id="started" title="Iniciada"></i>' +
      '<i class="fas fa-check-square bt" id="finished" title="Completa"></i>' +
      '<i class="fas  fa-exclamation-triangle bt" id="important" title="Importante"></i>' +
      '<i class="fas fa-window-close bt" id="canceled" title="Cancelado(a)"></i>' +
      '<i class="fas fa-edit bt" id="edit" data-toggle="modal" data-target="#modalEdit" title="Editar"></i>' +
      '<i class="fas fa-trash-alt bt" id="delete" title="Deletar"></i>';

    itemList.appendChild(actionsMenu);

    iconsAction = document.querySelectorAll('.bt');

    for (let d = 0; d < iconsAction.length; d++) {
      iconsAction[d].addEventListener(
        'click',
        () => {
          if (iconsAction[d].id === 'started') {
            UpdateClass(itemList, true, false, false, false);
            itemList.classList.add('started');
            actionsMenu.remove();
          } else if (iconsAction[d].id === 'finished') {
            UpdateClass(itemList, false, true, false, false);
            itemList.classList.add('finished');
            actionsMenu.remove();
          } else if (iconsAction[d].id === 'important') {
            UpdateClass(itemList, false, false, true, false);
            itemList.classList.add('important');
            actionsMenu.remove();
          } else if (iconsAction[d].id === 'canceled') {
            UpdateClass(itemList, false, false, false, true);
            itemList.classList.add('canceled');
            actionsMenu.remove();
          } else if (iconsAction[d].id === 'edit') {
            getValue(itemList);
            actionsMenu.remove();
          } else if (iconsAction[d].id === 'delete') {
            actionsMenu.remove();
            bd.remover(itemList.dataset.id);
            console.log('deletar');
            itemList.remove();
          }
        },
        false
      );
    } //aqui
    itemList.removeEventListener('click', actionsItem, false);
  }

  itemList = document.querySelectorAll('.item');
  itemList = Array.from(itemList);

  applyclass(itemList);
});

function getItems() {
  id = localStorage.getItem('id');

  for (let i = 1; i <= id; i++) {
    let registro = JSON.parse(localStorage.getItem(i));

    if (registro === null) {
      continue;
    }

    registro.id = i;
    allItems.push(registro);
  }

  renderItems();
  dataChart();
}

function dataChart() {
  allItems.forEach((items) => {
    if (items.type === 'task') {
      tarefas += 1;
      if (items.started) {
        iniciadas += 1;
      } else if (items.finished) {
        concluidas += 1;
      } else if (items.canceled) {
        canceladas += 1;
      } else if (items.important) {
        importantes += 1;
      } else if (
        !items.important &&
        !items.finished &&
        !items.started &&
        !items.canceled
      ) {
        emAberto += 1;
      }
      total += 1;
    }
  });

  porcent = 100 / total;

  iniciadas *= porcent;
  concluidas *= porcent;
  canceladas *= porcent;
  importantes *= porcent;
  emAberto *= porcent;

  taskData = [
    emAberto.toFixed(2),
    iniciadas.toFixed(2),
    concluidas.toFixed(2),
    canceladas.toFixed(2),
    importantes.toFixed(2),
  ];

  totalTarefas.textContent = tarefas;
  pieChart(taskData);
}

function renderItems() {
  let notes = document.querySelectorAll('.notes');
  let todo = document.querySelector('.todo');

  allItems.forEach((item) => {
    if (item.type === 'task') {
      itemList =
        '<li  class="item task" data-id="' +
        item.id +
        '">' +
        icons[0] +
        item.description +
        '</li>';
    } else if (item.type === 'appointment') {
      itemList =
        '<li  class="item appointment" data-id="' +
        item.id +
        '">' +
        icons[2] +
        item.description +
        '</li>';
    } else if (item.type === 'event') {
      itemList =
        '<li  class="item event " data-id="' +
        item.id +
        '">' +
        icons[1] +
        item.description +
        '</li>';
    } else if (item.type === 'note') {
      itemList =
        '<li  class="item note" data-id="' +
        item.id +
        '">' +
        icons[3] +
        item.description +
        '</li>';
    } else {
      itemList =
        '<li  class="item tv" data-id="' +
        item.id +
        '">' +
        icons[4] +
        item.description +
        '</li>';
    }

    switch (item.where) {
      case 'mon':
        weeklist[0].innerHTML += itemList;
        break;
      case 'tue':
        weeklist[1].innerHTML += itemList;
        break;
      case 'wed':
        weeklist[2].innerHTML += itemList;
        break;
      case 'thu':
        weeklist[3].innerHTML += itemList;
        break;
      case 'fri':
        weeklist[4].innerHTML += itemList;
        break;
      case 'sat':
        weeklist[5].innerHTML += itemList;
        break;
      case 'sun':
        weeklist[6].innerHTML += itemList;
        break;
      case 'notes':
        notes[0].innerHTML += itemList;
        notes[1].innerHTML += itemList;
        break;
      case 'todo':
        todo.innerHTML += itemList;
        break;
    }
  });
}

function applyclass() {
  for (i = 0; i < itemList.length; i++) {
    let id = itemList[i].dataset.id;

    let itemDataBase = localStorage.getItem(id);
    let getItem = JSON.parse(itemDataBase);

    if (getItem.started === true) {
      itemList[i].classList.add('started');
    } else if (getItem.finished === true) {
      itemList[i].classList.add('finished');
    } else if (getItem.canceled === true) {
      itemList[i].classList.add('canceled');
    } else if (getItem.important === true) {
      itemList[i].classList.add('important');
    }
  }
}

function changeTheme(event) {
  body.className = event.target.value;
  localStorage.setItem('theme', body.getAttribute('class'));
}

class Item {
  constructor(type, description, where) {
    (this.type = type),
      (this.description = description),
      (this.where = where),
      (this.obs = ''),
      (this.started = false),
      (this.finished = false),
      (this.important = false),
      (this.canceled = false);
  }

  validarDados() {
    if (where == '') {
      return false;
    }

    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem('id');

    if (id === null) {
      localStorage.setItem('id', 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem('id');
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    let id = this.getProximoId();
    localStorage.setItem(id, JSON.stringify(d));
    localStorage.setItem('id', id);
  }

  remover(id) {
    localStorage.removeItem(id);
  }
}

let bd = new Bd();

function newItem() {
  for (let i = 0; i < where.length; i++) {
    if (where[i]) {
      let newItem = new Item(type.value, description.value, where[i]);

      console.log(newItem);
      if (newItem.validarDados()) {
        bd.gravar(newItem);
      }
    } else {
      console.log('preencher');
    }
  }
}

function itensFixed() {
  const itensFixed1 = ['Checar Email', 'Inglês', 'Beber Água', 'Leitura'];
  const whereItensFixed = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  for (let y = 0; y < itensFixed1.length; y++) {
    for (let i = 0; i < whereItensFixed.length; i++) {
      let newItem = new Item('task', itensFixed1[y], whereItensFixed[i]);
      bd.gravar(newItem);
    }
  }
}

function dates() {
  var todayIs = document.getElementById('today');
  var date = new Date();
  var day = date.getDate();
  var weeklyDay = date.getDay();
  var month = date.getMonth();
  var year = date.getFullYear();

  var weeklyDayName = [
    ' Domingo',
    ' Segunda-feira',
    ' Terça-feira',
    ' Quarta-feira',
    ' Quinta-feira',
    ' Sexta-feira',
    ' Sábado',
  ];

  var monthName = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  for (i = 0; i <= 6; i++) {
    getIdDay = daysList[i].id;
    if (getIdDay.toString() === weeklyDay.toString()) {
      daysList[i].classList.add('today-is');
      let img = document.createElement('img');
      img.src = './midia/pin.png';
      daysList[i].appendChild(img);
    }
  }

  if (today < 10) {
    today = '0' + today;
  }

  var WeeklyName = weeklyDayName[weeklyDay];

  todayIs.textContent =
    WeeklyName + ', ' + day + ' de ' + monthName[month] + ' de ' + year;
}

function pieChart(taskData) {
  var Canvas = document.getElementById('pieChart');

  Chart.defaults.global.defaultFontFamily = 'Abel';
  Chart.defaults.global.defaultFontSize = 18;

  var itemData = {
    labels: [
      '% Em aberto',
      '% Iniciadas',
      '% Concluídas',
      '% Canceladas',
      '% Importantes',
    ],
    datasets: [
      {
        data: taskData,
        backgroundColor: [
          '#FFA500',
          '#33CCCC',
          '#4AB915',
          '#5C5C5E',
          '#DC143C',
        ],
      },
    ],
  };

  var pieChart = new Chart(Canvas, {
    type: 'pie',
    data: itemData,
  });
}
