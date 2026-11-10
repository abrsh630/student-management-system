const express= require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const host = process.env.DB_HOST || 'localhost';
app.use(express.json());

const students =[
    {id:1,name:"abreham degu",department:"computer science"},
    {id:2,name:"bereket degu",department:"editing"}
]
   

app.get('/',(req,res)=>{
    res.status(200).json({
        "status":'ok',
        "message":'student mangmet system main route'
    })
})

app.get('/health',(req,res)=>{
    res.status(200).json({
        "message":'server is running',
        "status":'ok'

    })
})
app.get('/students',(req,res)=>{
   
   res.status(200).json(students)
})
app.post('/students',(req,res)=>{
    const {name , department} = req.body;
    if(!name || !department){
        res.status(400).json({
            "message":"the resourse is must be required"
        })
   return; }

   const newStudent={
    id: students.length
    ? Math.max(...students.map(s => s.id)) + 1
    : 1,
    name,
    department
   }

   students.push(newStudent);
   res.status(201).json({
    "message":"created successfuly"
   })
})

app.put('/students/:id',(req,res)=>{
    const Id = Number(req.params.id);
    const student = students.find(s => s.id == Id);
    
    if(!student){
        res.status(404).json({
            "message":"the database element is not found"
        })
    return;}

    const {name , department}= req.body;
    if(!name || !department){
        res.status(400).json({
            "message":"the resource must found to update"
        }) 
   return; }

    student.name = name;
    student.department = department;

    res.status(200).json({
        "message":"update successfuly"
    })
})

app.delete('/students/:id',(req,res)=>{
    const Id = Number(req.params.id);
    const studentIndex = students.findIndex(s=>s.id === Id);

    if(studentIndex === -1){
        res.status(404).json({
            "message":"the student not found"
        })
     return;  }

    students.splice(studentIndex,1);
   res.status(200).json({
    "message":"the student sucessfuly deleted"
   })


})
app.listen(port, ()=>{
    console.log(`http://${host}:${port}`)
})