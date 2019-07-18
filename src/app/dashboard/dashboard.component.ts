import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  public events: any[];
  public options: any;


  constructor() {
      
   }

  ngOnInit() {

    this.events = [
      {
          "title": "Consulta Ester Macena",
          "start": "2019-07-01",
          "textColor": "red",
          "editable": "true",
          "id": "dia",
          "click": "alert('oi')"
      },
      {
          "title": "Pagar cartão",
          "start": "2019-07-07",
          "end": "2019-07-10",
          "backgroundColor": "#aabbcc"
      },
      {
          "title": "Fazer cocô",
          "start": "2019-07-09T16:00:00"
      },
      {
          "title": "Tomar banho",
          "start": "2019-07-16T16:00:00"
      },
      {
          "title": "Banho de novo =(",
          "start": "2019-07-11",
          "end": "2019-07-13"
      },
      {
        "title": "Segundo banho",
        "start": "2019-07-16T16:00:00"
      },
      {
        "title": "terceiro banho",
        "start": "2019-07-16T16:01:00"
      },
      {
        "title": "quarto banho",
        "start": "2019-07-16T12:30:00"
      }

  ];

this.options = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  timeZone: 'BRT',
  header: {
      left: 'prev,next',
      center: 'title',
      right: 'week'
  },
  locale: 'pt-br',
  editable: true,
 /* titleFormat: {
    year: 'numeric', month: 'long', day: 'numeric'
  },*/
  dateClick: (e) =>  {
    console.log(e);
  },
  eventClick: (e) => {
    console.log(e);
  }
};

let calendario = document.getElementById('calendario');
console.log(calendario);
  }

}
