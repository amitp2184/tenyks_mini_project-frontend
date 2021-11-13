import { Component } from "react";
import getResource from "../actions/GetResource";
import { Container,Row,Col,Button } from "react-bootstrap";
import Transfer from "../actions/Transfer";
import { getapi,header,imgapi } from "../constant"
import "../app.css";
export default class Resource extends Component{
   
    constructor(props){
     super(props) 
     this.state = {data:null,total:0,checkClick:false,
      transfer:{gr:"",tdata:[],hdata:[],selectedHuman:[],selectedTermi:[]}}
    }
    
    // make selectable
      checkClickfun = (dd)=>{
       if(this.state.checkClick==false){
       
       this.setState({checkClick:true});
       this.setState({gr:dd.group});

       document.getElementById(dd.id).classList.add("applyonselect")
       if(dd.group=="terminator"){
          this.state.transfer.selectedTermi.push(dd)
          this.setState({selectedTermi:this.state.transfer.selectedTermi})
       }
       if(dd.group=="human"){
        this.state.transfer.selectedHuman.push(dd)
        this.setState({selectedHuman:this.state.transfer.selectedHuman})
      }

     }else{
       this.setState({checkClick:false});
      if(dd.group=="terminator"){
        let res = this.state.transfer.selectedTermi.filter( item => item != dd); 
        this.state.transfer.selectedTermi=[];
        this.setState({selectedTermi:this.state.transfer.selectedTermi})
        this.state.transfer.selectedTermi.push(res)
        this.setState({selectedTermi:this.state.transfer.selectedTermi})
       }
      if(dd.group=="human"){
        let res = this.state.transfer.selectedHuman.filter( item => item != dd); 
        this.state.transfer.selectedHuman=[];
        this.setState({selectedHuman:this.state.transfer.selectedHuman})
        this.state.transfer.selectedHuman.push(res)
        this.setState({selectedHuman:this.state.transfer.selectedHuman})
      }   
     }
   }
    async componentDidMount(){
      let result=null;
      let resp=null;
      resp = await fetch(getapi,header)
      .then(response => response.json()).then(function(res){
        result =res
       });
       let imgdata=result.imgData;
       let hcollect=[];let tcollect=[];
       this.setState({total:result.total});
       for(let i=0;i<this.state.total;i++){
         if(imgdata[i].group=="terminator"){
           this.state.transfer.tdata.push(imgdata[i]);
           this.setState({tdata:this.state.transfer.tdata})
         }
         if(imgdata[i].group=="human"){
          this.state.transfer.hdata.push(imgdata[i]);
          this.setState({hdata:this.state.transfer.hdata})
         }
       }
       this.setState({data:collect});
       console.log(collect)
    }

    // setData =  async() => await getResource();

     moveToTerminator = ()=>{
      // console.log(this.state.transfer.selectedHuman);
      let comp=this.state.transfer.selectedHuman!=null && this.state.transfer.selectedHuman.map(item => {
        let res = this.state.transfer.selectedHuman.filter( item1 => item1 != item);
        this.state.transfer.hdata=[];
        this.setState({hdata:this.state.transfer.hdata}); 
        this.state.transfer.hdata=res;
        this.setState({hdata:this.state.transfer.hdata});  
        item.group="terminator";
        return(<Col onClick={()=>this.checkClickfun(this.getObject(item))}  id={item.id}><li><img src={imgapi+item.id} className="img "  /></li> </Col>)
        });
        document.getElementById('appendTerm').appendChild(comp)
     }
     moveToHuman = ()=>{
      let comp=this.state.transfer.selectedTermi!=null && this.state.transfer.selectedTermi.map(item => {
        let res = this.state.transfer.selectedTermi.filter( item1 => item1 != item);
        this.state.transfer.tdata=[];
        this.setState({tdata:this.state.transfer.tdata}); 
        this.state.transfer.tdata=res;
        this.setState({tdata:this.state.transfer.tdata});  
        item.group="human";
        return(<Col onClick={()=>this.checkClickfun(this.getObject(item))}  id={item.id}><li><img src={imgapi+item.id} className="img "  /></li> </Col>) ;
       })
       document.getElementById('appendTerm').appendChild(comp)

     }

     getObject(item) {
      let id=item.id
      let filepath=item.filepath
      let group=item.group;
      let isclicked = item.isclicked
      let title = item.title
      return {filepath,group,id,isclicked,title} 
     }
      render(){
      return(
        <Container>  
        <Button variant="primary" className="primary" onClick={this.moveToHuman}>MOVE TO HUMAN</Button>
        <div  style={{height:"300px",overflowY:"auto"}}>
          <ul style={{listStyle:"none"}}>
          <Row >     
            {
            this.state.transfer.tdata!==null && this.state.transfer.tdata.map((item) => {
              return(item.group=="terminator" ?
              <Col onClick={()=>this.checkClickfun(this.getObject(item))}  id={item.id}><li><img src={imgapi+item.id} className="img "  /></li> </Col>:"" )
            }) 
            }   
           </Row>
           <Row id="appendTerm">
           </Row>
          </ul>
        </div>
        <Button variant="primary" className="primary" onClick={this.moveToTerminator}> MOVE TO TERMINATOR </Button><br />
        <div  style={{height:"300px",overflowY:"auto"}}>
          <ul style={{listStyle:"none"}}>
           <Row >     
            {
            this.state.transfer.hdata!==null && this.state.transfer.hdata.map((item) => {
              return(item.group=="human" ?
              <Col onClick={()=>this.checkClickfun(this.getObject(item))}  id={item.id}><li><img src={imgapi+item.id} className="img "  /></li> </Col>:"" )
              }) 
            }   
           </Row>
           <Row id="appendHuman">
           </Row>

          </ul>
        </div>
        </Container>
      )  
    }
}