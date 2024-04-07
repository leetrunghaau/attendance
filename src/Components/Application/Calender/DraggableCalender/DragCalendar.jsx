import React, { Fragment, useEffect, useState } from 'react';
import { Btn, H4 } from '../../../../AbstractElements';
import { Col } from 'reactstrap';
import { initialState } from './DragData';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const DragCalendar = () => {
  // eslint-disable-next-line
  const [state, setState] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let draggableEl = document.getElementById('external-events');
    new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        let title = eventEl.getAttribute('title');
        let id = eventEl.getAttribute('data');
        let icon = eventEl.getAttribute('icon');
        return {
          title: title,
          id: id,
          icon: icon,
        };
      },
    });
  }, []);
  const eventClick = (eventClick) => {
    Swal.fire({
      title: eventClick.event.title,
      html: `
      <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td><strong>${eventClick.event.title}</strong></td>
                    </tr>
                    <tr>
                        <td>Start Time</td>
                        <td><strong>${eventClick.event.start}</strong></td>
                    </tr>
                </tbody>
            </table>
      </div>            
        `,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Remove Event',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.value) {
        eventClick.event.remove();
        Swal.fire('Deleted!', 'Your Event has been deleted.', 'success');
      }
    });
  };
  return (
    <Fragment>
      <Col xxl='3' className='box-col-12'>
        <div className='md-sidebar'>
          <Btn attrBtn={{ onClick: (e) => setIsOpen(!isOpen), color: 'primary', className: 'md-sidebar-toggle' }}>contact filter</Btn>
          <div className={`md-sidebar-aside job-left-aside custom-scrollbar ${isOpen && 'open'}`}>
            <div className='email-sidebar'>
              <div className={`email-left-aside`}></div>
              <div id='external-events'>
                <H4>{'Draggable Events'}</H4>
                {state.events.map((event) => (
                  <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event' title={event.title} data={event.id} icon={event.icon} key={event.id}>
                    <div className='fc-event-main'>
                      <i className={`fa fa-${event.icon} me-2`}></i>
                      {event.title}
                    </div>
                  </div>
                ))}
                <p>
                  <input className='checkbox_animated' id='drop-remove' type='checkbox' />
                  <label htmlFor='drop-remove' className='m-0'>
                    remove after drop
                  </label>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col xxl='9' className='box-col-12'>
        <div className='demo-app-calendar' id='mycalendartest'>
          <FullCalendar
            defaultView='dayGridMonth'
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            rerenderDelay={10}
            eventDurationEditable={false}
            editable={true}
            droppable={true}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            weekends={state.calendarWeekends}
            events={state.calendarEvents}
            eventClick={eventClick}
          />
        </div>
      </Col>
    </Fragment>
  );
};
export default DragCalendar;
