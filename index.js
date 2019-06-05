const sqlite3 =require("sqlite3").verbose();

const db=new sqlite3.Database(":memory:");

db.serialize(function()
{

  db.run("CREATE TABLE classroom (Building TEXT,Room_No Number ,Capacity NUMBER)");
    db.run("INSERT INTO classroom VALUES('Packard',101,500)");  
    db.run("INSERT INTO classroom VALUES('Painter',514,10)"); 
    db.run("INSERT INTO classroom VALUES('Taylor',3128,70)"); 
    db.run("INSERT INTO classroom VALUES('Watson',100,30)"); 
    db.run("INSERT INTO classroom VALUES('Watson',120,50)");   
    
    //Print the room number and building name for those rooms whose capacity is greater than 50
    db.each("SELECT Room_No,Building  FROM classroom where Capacity>50",function(err,row)
  {
     if(err)
     console.log(err);
     console.log(row);
  }
  );
     
});
db.serialize(function()
{

  db.run("CREATE TABLE Department ( Dept_Name TEXT, Building Text,Budget NUMBER)");
  db.run("INSERT INTO Department VALUES('Biology', 'Watson',90000)");
  db.run("INSERT INTO Department VALUES('Comp_sci', 'Taylor',100000)");
  db.run("INSERT INTO Department VALUES('Elec.Eng', 'Taylor',85000)");
  db.run("INSERT INTO Department VALUES('Finance', 'Painter',1200000)");
  db.run("INSERT INTO Department VALUES('History', 'Painter',50000)");
  db.run("INSERT INTO Department VALUES('Music', 'Packard',80000)");
  db.run("INSERT INTO Department VALUES('Physics', 'Watson',70000)");

  //Print the names of those departments whose budgets are greater than $85,000
  db.each("SELECT Dept_Name FROM Department where Budget>85000",function(err,row)
  
  {
     if(err)
     console.log(err);
     console.log(row);
  }
  );
  let depts = {}
  db.each("SELECT DISTINCT Dept_name, Capacity FROM Department NATURAL JOIN Classroom" , function(err,row){

      if(depts[row.Dept_Name] === undefined)
          depts[row.Dept_Name]=0;

          depts[row.Dept_Name] += row.Capacity;

  },function(err,count){
      let keys = Object.keys(depts);

      for( let i=0; i != keys.length; ++i){
          console.log(keys[i] + ":"+depts[keys[i]]);
      }
  });
});