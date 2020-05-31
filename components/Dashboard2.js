import React from 'react';
import Dashboard_video from '../media/Dashboard_video.mp4';
import log from '../media/logo.gif';
import * as ReactBoostrap from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import load from "../media/loading.gif"
import FadeIn from 'react-fade-in';

class Dashboard2 extends React.Component {
    
    state = {
        source: '',
        destination: '',
        date : '',
        classs : '',
        redirect: false,
        loading:true,
        redirect1:false,
        data1:'',
        isdatapresent:false,
        results:[]
    }
    handleChange(event , element) {
        var value = event.currentTarget.value
        if(element === "source") {
            this.setState({
                source: value
            })
        }
        else if(element === "destination"){
            this.setState({
                destination: value
            })
        }
        else if(element === "date") {
            this.setState({
                date :value
            })
        }
        else{   
            this.setState({
                classs:value
            })
        }

    }
    handleClick2(){
        console.log(this.state.source)
        console.log(this.state.destination)
        
        this.setState({
            redirect: true
        })
        
        
    }
    handleClick = async() => {
        var data = {
            source: this.state.source,
            destination: this.state.destination,
            date: this.state.date,
            classs:this.state.classs
        }
        const settings={
            method: 'POST',
            body:JSON.stringify(data),
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        };
        try {
            const res = await fetch(`http://localhost:9000/dashboard`, settings);
            if(res.status === 200){
                this.setState({
                    loading:false
                })
            }
            const result = await res.json()
            
            console.log(result.length)
            if(result.length === 0){
                this.setState({
                    redirect1:true

                })
                return result
            }
            else{
                this.setState({
                    isdatapresent:true
                })
            }
            this.setState({
                data1:result
            })
            console.log(this.state.data1)
            this.setState({
                results:result.map(train =>{
                    return(
                        
                        <div><FadeIn><ReactBoostrap.Card style={{ width: '43rem'}}>
  <ReactBoostrap.ListGroup variant="pills">
      
    <ReactBoostrap.ListGroup.Item><b>Train Number:</b><center>{train.trainno}</center></ReactBoostrap.ListGroup.Item>
    <ReactBoostrap.ListGroup.Item><b>Train Name:</b><center>{train.traintype}</center></ReactBoostrap.ListGroup.Item>
    <ReactBoostrap.ListGroup.Item><b>Departure Time:</b><center>{train.deptime}</center></ReactBoostrap.ListGroup.Item>
    <ReactBoostrap.ListGroup.Item><b>Ticket Price({data.classs})</b><center>Rs.{train.acpr} per person</center></ReactBoostrap.ListGroup.Item>
  </ReactBoostrap.ListGroup>
</ReactBoostrap.Card></FadeIn></div>
                    )
                })
            })
            return(this.state.results)
        } catch (e) {
            return e;
        }
    }
    

    render() {
        
        
        
        return(
            <div className='dashimage'>
                {this.state.redirect===true? <Redirect to={{pathname: "/map", state: {src: this.state.source, dest: this.state.destination,redi:this.state.redirect}}}/>:console.log(this.state)}
                {this.state.redirect1=== true? <Redirect to="/error"/>:null}
                <video
                    autoPlay
                    muted
                    loop
                    style={{
                        position:"fixed",
                        width:"100%",
                        left:"50%",
                        top:"50%",
                        bottom:"0",
                        height:"100%",
                        objectFit:"cover",
                        transform: "translate(-50%,-50%)",
                        zIndex:"-1"
                    }}
                    >
                    <source src = {Dashboard_video} type = "video/mp4" />
                </video>
                
                <div className='contain'>
                    <img src = {log} alt = 'writinglogo'/>
                    <ReactBoostrap.Form inline className = "details" >
                        <label>Source</label>
                        <ReactBoostrap.FormControl type="text" placeholder="Source e.x: Bangalore" className="source" id="inputdefault" onChange={(event) => this.handleChange(event, "source")} />
                        <label>Destination</label>
                        <ReactBoostrap.FormControl type="text" placeholder="Destination e.x: Delhi" className="destination" id = "inputdefault" onChange={(event) => this.handleChange(event, "destination")}/>
                        <label>Date of Journey</label>
                        <ReactBoostrap.FormControl type="date" placeholder="DD/MM/YYYY"
                        className="dates" onChange={(event) => this.handleChange(event, "date")}/>
                        <label>Classes</label>
                        <ReactBoostrap.FormControl type="text" placeholder="Normal/AC"
                        className="trainclass" onChange={(event) => this.handleChange(event, "classs")}/>
                        <ReactBoostrap.Button variant = "primary" className="trainbtn" onClick= {this.handleClick.bind(this)}>Find Trains</ReactBoostrap.Button>
                        <ReactBoostrap.Button variant = "success" className="mapbtn" onClick={this.handleClick2.bind(this)}>Show Map</ReactBoostrap.Button>
                    </ReactBoostrap.Form>
                </div>
                <div className="contain1">
                    {this.state.loading === true?<img src = {load} alt ="loading.."/>:
                    
                        this.state.results}
                    
                    
                    
                    
                </div>
                
            </div>
        );
    }
}
export default Dashboard2;