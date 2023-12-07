import moment from 'moment';
import React, { useState, useCallback } from 'react';
import { Modal, Spin } from 'antd';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { patientGetCalendar } from '../../api/calendar';
import { readLoginData } from '../../loginData';
import PatientBookTimeDialog from './PatientBookTimeDialog';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const getAppointmentState = (event) => {
  if(event.status < 0){
    if(event.appointmentStatus === 1){
      return 'Approved'
    }else{
      return 'AlreadyBookedByOthers'
    }
  }else if(event.status === 0){
    return 'Free'
  }else if(event.status > 0){
    if(event.appointmentStatus === 0){
      return 'PendingApproval'
    }else{
      return 'BookedByOthers'
    }
  }
};

const getColorFromStatus = (event) => {
  if(event.status < 0){
    if(event.appointmentStatus === 1){
      return { background: 'DodgerBlue', text: 'white' };
    }else{
      return { background: 'grey', text: 'black' };
    }
  }else if(event.status === 0){
    return { background: 'Chartreuse', text: 'black' };
  }else if(event.status > 0){
    if(event.appointmentStatus === 0){
      return { background: 'DarkOrange', text: 'white' };
    }else{
      return { background: 'DarkSeaGreen', text: 'white' };
    }
  }
}

const TimeSegmentsView = (props) => {
  const localizer = momentLocalizer(moment);
  console.log("Data", props.data);
  const eventsList = props.data.map(e => ({
    id: e.id,
    title: e.description,
    start: moment(e.start).toDate(),
    end: moment(e.end).toDate(),
    status: e.status,
    appointmentStatus: e.appointmentStatus,
    rawData: e,
  }));
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log("event", event);
    return {
      style: {
        backgroundColor: getColorFromStatus(event).background,
        borderRadius: '0px',
        opacity: 0.8,
        color: getColorFromStatus(event).text,
        border: '0px',
        display: 'block',
      }
    };
  }

  return (
    <>
      <Calendar
        selectable
        defaultView={Views.WEEK}
        localizer={localizer}
        events={eventsList}
        onRangeChange={props.onRangeChange}
        onSelectEvent={props.onSelectEvent}
        eventPropGetter={eventStyleGetter}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
}

const PatientCalendar = (props) => {
  const loginData = readLoginData();
  let [ needLoad, setNeedLoad ] = useState(true);
  let [ loading, setLoading] = useState(true);
  let [ data, setData ] = useState([]);
  let [ currentStart, setCurrentStart ] = useState(moment().startOf('week'));
  let [ currentEnd, setCurrentEnd ] = useState(moment().endOf('week'));

  let [ dialogOpen, setDialogOpen ] = useState(false);
  let [ dialogContent, setDialogContent ] = useState(null);

  const setCurrentRange = (start, end) => {
    setCurrentStart(start);
    setCurrentEnd(end);
  }

  const fetchData = async () => {
    setLoading(true);
    setData([]);
    const response = await patientGetCalendar(loginData, currentStart.toDate(), currentEnd.toDate());
    setData(response);
    setLoading(false);
  };

  const handleRangeChange = useCallback((range) => {
    if(!range){
      throw new Error('Unknown range type');
    }

    if(!Array.isArray(range)){
      setCurrentRange(range.start, range.end);
      return;
    }

    if(range.length === 1){
      setCurrentRange(moment(range[0]).startOf('day'), moment(range[0]).endOf('day'));
      return;
    }

    setCurrentRange(moment(range[0]).startOf('week'), moment(range[6]).endOf('week'));
    setNeedLoad(true);
  }, [])

  if(needLoad){
    setNeedLoad(false);
    fetchData();
  }

  
  const closeDialog = () => {
    setDialogOpen(false);
    setDialogContent(null);
  }

  const handleOk = () => {
    closeDialog();
    setNeedLoad(true);
  }

  const handleBookTime = (event) => {
    console.log(event);
    setDialogContent({
      id: event.id,
      doctor: event.doctor.name,
      start: event.start,
      end: event.end,
      statement: event.description,
      description: loginData.name,
    });
    setDialogOpen(true);
  }

  const handleSelectEvent = (event) => {
    const data = event.rawData;
    console.log(data);
    if(data.status >= 0 && data.appointmentStatus === null){
      handleBookTime(data);
    }else{
      const startString = moment(data.start).format(dateFormat);
      const endString = moment(data.end).format(dateFormat);
      Modal.info({
        title: `Time segment of ${data.doctor.name}`,
        content: <p>From: {startString}<br/>To:{endString}<br/>Status:{getAppointmentState(data)}<br/>Description:{data.description}</p>,
      });
    }
  }

  return <Spin spinning={loading}>
      <TimeSegmentsView data={data} onRangeChange={handleRangeChange} onSelectEvent={handleSelectEvent} />
      {dialogOpen ? <PatientBookTimeDialog {...dialogContent} onOk={handleOk} onCancel={closeDialog}/> : null}
    </Spin>;
}

export default PatientCalendar;
