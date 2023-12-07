import moment from 'moment';
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { doctorGetCalendar } from '../../api/calendar';
import { readLoginData } from '../../loginData';
import CreateAvailableTimeSegments from './CreateAvailableTimeSegments';
import AddTask from '../DoctorTasks/AddTask';

const getBackgroundColorFromStatus = (type, status) => {
  if(type === 1){ return 'MediumSlateBlue' }
  if(status > 0){
    return 'DarkOrange';
  }else if(status < 0){
    return 'DodgerBlue';
  }else{
    return 'Chartreuse';
  }
}

const getColorFromStatus = (type, status) => {
  if(type === 1){ return 'white' }
  if(status > 0){
    return 'black';
  }else if(status < 0){
    return 'white';
  }else{
    return 'black';
  }
}

const TimeSegmentsView = (props) => {
  const localizer = momentLocalizer(moment);
  console.log("Data", props.data);
  const eventsList = props.data.map(e => ({
    id: e.id,
    type: e.type,
    title: e.description,
    start: moment(e.start).toDate(),
    end: moment(e.end).toDate(),
    status: e.status,
  }));
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log("event", event);
    return {
      style: {
        backgroundColor: getBackgroundColorFromStatus(event.type, event.status),
        borderRadius: '0px',
        opacity: 0.8,
        color: getColorFromStatus(event.type, event.status),
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
        onSelectSlot={props.onSelectSlot}
        onSelectEvent={props.onSelectEvent}
        eventPropGetter={eventStyleGetter}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
}

const CreateDoctorTask = (props) => {
  console.log("CreateDoctorTask", props);
  return (props.type === 1 ? <AddTask {...props}/> : <CreateAvailableTimeSegments {...props}/>);
}

const DoctorCalendar = (props) => {
  const navigate = useNavigate();

  const loginData = readLoginData();
  let [ needLoad, setNeedLoad ] = useState(true);
  let [ loading, setLoading] = useState(true);
  let [ data, setData ] = useState([]);
  let [ currentStart, setCurrentStart ] = useState(moment().startOf('week'));
  let [ currentEnd, setCurrentEnd ] = useState(moment().endOf('week'));

  const setCurrentRange = (start, end) => {
    setCurrentStart(start);
    setCurrentEnd(end);
  }

  const fetchData = async () => {
    setLoading(true);
    setData([]);
    const response = await doctorGetCalendar(loginData, currentStart.toDate(), currentEnd.toDate());
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

  // states for the modal
  const [ type, setType ] = useState(2);
  const [ open, setOpen ] = useState(false);
  const [ start, setStart] = useState(moment().toDate());
  const [ end, setEnd ] = useState(moment().add(1, 'hour').toDate());

  const handleSelectEvent = (event) => {
    console.log(event);
    if(event.type === 1){
      navigate(`/Tasks/${event.id}`)
    }else if(event.type === 2){
      navigate(`/calendar/timesegment/${event.id}`)
    }
  };
  
  const handleSelectSlot = (range) => {
    if(range.action==='select'){
      const start = moment(range.start);
      const end = moment(range.end);
      if(start.clone().add(24, 'hour').isAfter(end)){
        setStart(start.toDate());
        setEnd(end.toDate());
        setOpen(true);
      }
    }
  };

  const handleOk = () => {
    setOpen(false);
    setNeedLoad(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleType = (type) => {
    setType(type);
  }

  return <>
      <Spin spinning={loading}>
        <TimeSegmentsView data={data} onRangeChange={handleRangeChange} onSelectSlot={handleSelectSlot} onSelectEvent={handleSelectEvent}/>
      </Spin>
      { open ? <CreateDoctorTask type={type} onType={handleType} start={start} end={end} onOk={handleOk} onCancel={handleCancel}/> : null }
    </>;
}

export default DoctorCalendar;
