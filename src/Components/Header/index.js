import {useState, useEffect} from 'react'
import logo from '../../assests/logo.png'
import  './styles.css'
import { Card, Row, Col } from "antd";
import "antd/dist/antd.css";
import {useSelector} from 'react-redux'
import axios from 'axios'
import * as countryData from '../Body/countries.json'


function Header() {
    const { Meta } = Card;
    const [cases, setCases] = useState([])
    const [stat, setStat] = useState("first")
    const countryCode = useSelector((state)=>state.firstFour.countryName)

    useEffect(()=>{
        async function getData() {
            if (countryCode[0]==="Global") {
                await axios(`https://covid19.mathdro.id/api`).then(res=>setCases(res.data))
            }else if (!(stat === "first")){
                const res = countryData['default'].find(({ name }) => name === countryCode[0])
                await axios(`https://covid19.mathdro.id/api/countries/${res.code}`).then(res=>setCases(res.data))   
            }
        }
        getData()
    },[countryCode])

    useEffect(()=>{
        async function didMount() {
            if (stat === "first"){
                await axios(`https://covid19.mathdro.id/api`).then(res=>setCases(res.data))  
                setStat("second")
            }
        }
        didMount()
    },[])

    


    

    return (
        <>
            <div className="logoholder">
                <img src={logo} alt="" />
                <p style={{marginTop:0,marginBottom:0, fontWeight:'bold',fontSize:'15px'}}>Global and Country Wise Cases of Corona Virus</p>
                <p style={{marginTop:0,fontStyle:'italic',fontSize:'14px'}}>(For a Particlar select a Country from below)</p>
            </div>
            <Row >
                <Col span={14} offset={5}>
                    <Row gutter={[15,0]}>
                        <Col span={6}>
                            <Card
                                hoverable
                                style={{ width: 240, height:250, backgroundColor:'#afd6fc', borderRadius:'8px', cursor:'default'}}
                            >
                                <Meta 
                                title={<p className="cardTitle">Infected</p>} 
                                description={
                                <>
                                <p className="descNum">{cases.confirmed ? cases.confirmed.value.toLocaleString() : "deger yok"}</p>
                                <p className="lastUpdate">Last Updated at : </p>
                                <p className="date">{cases.lastUpdate ? cases.lastUpdate.slice(0,10) : "deger yok"} 
                                <br /> 
                                {cases.lastUpdate ? cases.lastUpdate.slice(11,19):"deger yok"}</p>
                                <p className="cardFooter">Number of active cases of COVID-19</p>
                                <p className="cardFooter country">{countryCode[0]}</p>
                                </>} 
                                />
                            </Card>
                        </Col>    
                        <Col span={6}>
                            <Card
                                hoverable
                                style={{ width: 240, height:250, backgroundColor:'#dcf5e1', borderRadius:'8px', cursor:'default' }}
                            >
                                <Meta 
                                title={<p className="cardTitle">Recovered</p>} 
                                description={
                                <>
                                <p className="descNum">{cases.recovered ? cases.recovered.value.toLocaleString() : "deger yok"}</p>
                                <p className="lastUpdate">Last Updated at : </p>
                                <p className="date">{cases.lastUpdate ? cases.lastUpdate.slice(0,10) : "deger yok"} 
                                <br /> 
                                {cases.lastUpdate ? cases.lastUpdate.slice(11,19):"deger yok"}</p>
                                <p className="cardFooter">Number of active cases of COVID-19</p>
                                <p className="cardFooter country">{countryCode[0]}</p>
                                </>} 
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                hoverable
                                style={{ width: 240, height:250, backgroundColor:'#f3d5d5', borderRadius:'8px', cursor:'default' }}
                            >
                                <Meta 
                                title={<p className="cardTitle">Deaths</p>} 
                                description={
                                <>
                                <p className="descNum">{cases.deaths ? cases.deaths.value.toLocaleString() : "deger yok"}</p>
                                <p className="lastUpdate">Last Updated at : </p>
                                <p className="date">{cases.lastUpdate ? cases.lastUpdate.slice(0,10) : "deger yok"} 
                                <br /> 
                                {cases.lastUpdate ? cases.lastUpdate.slice(11,19):"deger yok"}</p>
                                <p className="cardFooter">Number of active cases of COVID-19</p>
                                <p className="cardFooter country">{countryCode[0]}</p>
                                </>} 
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                hoverable
                                style={{ width: 240, height:250, backgroundColor:'#f3e0c8', borderRadius:'8px', cursor:'default'}}
                            > 
                                <Meta 
                                title={<p className="cardTitle">Active</p>} 
                                description={
                                <>
                                <p className="descNum">{cases.deaths ? (cases.confirmed.value-cases.deaths.value).toLocaleString() : "deger yok"}</p>
                                <p className="lastUpdate">Last Updated at : </p>
                                <p className="date">{cases.lastUpdate ? cases.lastUpdate.slice(0,10) : "deger yok"} 
                                <br /> 
                                {cases.lastUpdate ? cases.lastUpdate.slice(11,19):"deger yok"}</p>
                                <p className="cardFooter">Number of active cases of COVID-19</p>
                                <p className="cardFooter country">{countryCode[0]}</p>
                                </>} 
                                />
                            </Card>
                        </Col>
                    </Row>
                        
                    
                    
                </Col>
            </Row>
        </>
    )
}

export default Header


