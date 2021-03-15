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
    Date: new Date(2021, 0, 01),
    Title: 'Feliz Ano Novo!',
  },
  {
    Date: new Date(2021, 2, 08),
    Title: 'Dia Internacional das Mulheres',
  },
  {
    Date: new Date(2021, 3, 02),
    Title: 'Paixão de Cristo',
  },
  {
    Date: new Date(2021, 3, 04),
    Title: 'Feliz Páscoa!',
  },
  {
    Date: new Date(2021, 3, 21),
    Title: 'Tiradentes',
  },
  {
    Date: new Date(2021, 4, 01),
    Title: 'Dia do Trabalho',
  },
  {
    Date: new Date(2021, 4, 18),
    Title: 'Aniversário Lucas',
  },
  {
    Date: new Date(2021, 5, 12),
    Title: 'Dia dos Namorados',
  },
  {
    Date: new Date(2021, 7, 18),
    Title: 'Parabéns!!',
  },
  {
    Date: new Date(2021, 8, 7),
    Title: 'Independencia do Brasil',
  },
  {
    Date: new Date(2021, 8, 11),
    Title: 'Aniversário Pai',
  },
  {
    Date: new Date(2021, 8, 15),
    Title: 'Aniversário Mãe',
  },
  {
    Date: new Date(2021, 9, 03),
    Title: 'Aniversário Willian',
  },
  {
    Date: new Date(2021, 9, 12),
    Title: 'Nsa. Sra Aparecida/Dia das Crianças',
  },
  {
    Date: new Date(2021, 10, 02),
    Title: 'Finados',
  },
  {
    Date: new Date(2021, 10, 15),
    Title: 'Proclamação da República',
  },
  {
    Date: new Date(2020, 11, 25),
    Title: 'Feliz Natal!!',
    Link: 'https://www.google.com',
  },
];

var element = document.getElementById('caleandar');
caleandar(element, events, settings);