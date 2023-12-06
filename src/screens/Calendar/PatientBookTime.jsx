import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Card, Flex, Empty, Modal, Spin } from 'antd';
import { patientSearchForTimeSegments } from '../../api/calendar';
import dayjs from 'dayjs';
import { readLoginData } from '../../loginData';
import PatientBookTimeDialog from './PatientBookTimeDialog';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const AvailableTimeSegment = (props) => {
  const handleClick = () => {
    props.onBookTime(props);
  };
  return <Card size="small" title={props.doctor.name} extra={<Button onClick={handleClick}>Book</Button>} style={{ width: 300 }}>
    <p>Start: {moment(props.start).format(dateFormat)}</p>
    <p>End: {moment(props.end).format(dateFormat)}</p>
    <p>{props.description}</p>
  </Card>
}

const AvailableTimeSegmentList = (props) => {
  return <Flex wrap="wrap" gap="small">
      {
        props.data.length ?
        props.data.map((item) => <AvailableTimeSegment {...item} onBookTime={props.onBookTime}/>) :
        <Empty/>
      }
    </Flex>;
}

const PatientBookTime = (props) => {
  const navigate = useNavigate();

  const loginData = readLoginData();
  let [ needLoad, setNeedLoad ] = useState(true);
  let [ loading, setLoading] = useState(true);
  let [ currentStart, setCurrentStart ] = useState(moment().startOf('week'));
  let [ currentEnd, setCurrentEnd ] = useState(moment().endOf('week'));
  let [ data, setData ] = useState([]);

  let [ dialogOpen, setDialogOpen ] = useState(false);
  let [ dialogContent, setDialogContent ] = useState(null);

  const setCurrentRange = (start, end) => {
    setCurrentStart(start);
    setCurrentEnd(end);
  }

  const fetchData = async () => {
    setLoading(true);
    setData([]);
    const response = await patientSearchForTimeSegments(loginData, currentStart.toDate(), currentEnd.toDate());
    setData(response);
    setLoading(false);
  };

  const handleChange = (date) => {
    const start = moment(date.toDate()).startOf('week');
    const end = moment(date.toDate()).endOf('week');
    setCurrentRange(start, end);
    setNeedLoad(true);
  }

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
    navigate('/calendar');
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

  return <>
      <h1>Book Time</h1>
      Please select the start and end date below.<br/>
      <DatePicker defaultValue={dayjs(currentStart.toDate())} onChange={handleChange} picker="week" />
      <Spin spinning={loading}>
        <AvailableTimeSegmentList data={data} onBookTime={handleBookTime}/>
      </Spin>
      {dialogOpen ? <PatientBookTimeDialog {...dialogContent} onOk={handleOk} onCancel={closeDialog}/> : null}
    </>;
};

export default PatientBookTime;
