import {useState, useEffect,} from 'react'
import {Row, Col, Select } from "antd";
import "antd/dist/antd.css";
import * as countryData from './countries.json'
import { useDispatch, useSelector} from 'react-redux'
import {setCases} from '../../redux/firstFourSlice'
import {Line, Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
  } from 'chart.js';

import axios from 'axios'






function Body() {
  const { Option } = Select;
  const [dataDaily,setDataDaily] = useState([])
  const [dataC,setDataC] = useState([])
  const countryCode = useSelector((state)=>state.firstFour.countryName)  
  const [value, setValue] = useState('')
  const dispacth = useDispatch();

  useEffect(()=>{
    async function getData() {
        if (countryCode[0]==="Global") {
            await axios(`https://covid19.mathdro.id/api/daily`).then(res=>setDataDaily(res.data))
        }else{
          const res = countryData['default'].find(({ name }) => name === countryCode[0])
          await axios(`https://covid19.mathdro.id/api/countries/${res.code}`).then(res=>setDataC(res.data))
        }
    }
    getData()
  },[countryCode])





  ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);
    
  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Covid-19 Graph',
    },
  },
  parsing : {
    xAxisKey: 'reportDate',
    yAxisKey: ['confirmed.total','deaths.total'],
  }
  };
    
  const data = {
    datasets: [
      {
        label: 'Total Confirmed',
        data: dataDaily,
        borderColor: '#1532ed',
        backgroundColor: '#5b89de',
      },
      {
        label: 'Deaths',
        data: dataDaily,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };


  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Current State in ${countryCode[0]}`,
      },
    },
    };
      
    const data1 = {
      labels: ["Infected", "Recovered", "Deaths", "Active"],
      datasets: [
        {
          label: 'Total Situation',
          data: dataC.confirmed ? [dataC.confirmed.value,dataC.recovered.value,dataC.deaths.value,(dataC.confirmed.value-dataC.deaths.value)] :["Nodata"],
          borderColor: '#1532ed',
          backgroundColor: ['#5b89de','#dcf5e1','#f2bbbb','#f3e0c8'],
        },
        
      ],
    };

    
    
    const changeHandler = event => {
        setValue(event.name)
        dispacth(setCases(event))
    }



    return (
        <>
        <Row style={{marginTop:30, textAlign:'center'}}>
            <Col offset={8} span={8}>
                <Select
                    showSearch
                    style={{ width: '100%' , marginLeft:'-7%'}}
                    placeholder="Select a country"
                    onChange={changeHandler}
                    defaultValue="Global"
                >
                    {
                        countryData['default'].map((element,i)=>{
                            return  <Option key={i} value={`${element.name}`}>{element.name}</Option>
                        })
                    }
                </Select>
            </Col>
            <Col offset={5} span={14}>
            {
              (dataC.confirmed && countryCode[0] !== "Global") 
              ? < Bar style={{marginLeft:'-3%', marginTop:'2vh', marginBottom:'3vh'}} data={data1} options={options1} />
              : <Line style={{marginLeft:'-3%', marginTop:'2vh', marginBottom:'3vh'}} options={options} data={data} />
            }
                
            </Col>
            
        </Row>
        </>
    )
}

export default Body
