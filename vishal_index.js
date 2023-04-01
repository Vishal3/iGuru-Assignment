// There is an error in API response as lstStudentInfo is returned null in the response. Please look into it.
//Logo and signature urls throwing 403 error
const rollno=document.getElementById('rollno')
const classname=document.getElementById('class')
const studentname=document.getElementById('name')
const mothername=document.getElementById('mothername')
const attandence=document.getElementById('attandence')
const dob=document.getElementById('dob')
const fathername=document.getElementById('fathername')
const schoolname=document.getElementById('schoolname')
const address=document.getElementById('address')
const link=document.getElementById('link')
const logo=document.getElementById('logo')
const percentage=document.getElementById('percentage')
const results=document.getElementById('results')
const grade=document.getElementById('grade')
const totalT1T2=document.getElementById('totalT1T2')
const grade1=document.getElementById('grade1')
const term1=document.getElementById('term1')
const term2=document.getElementById('term2')
const term1t=document.getElementById('term1t')
const term2t=document.getElementById('term2t')
const internal12=document.getElementById('internal12')
const internal34=document.getElementById('internal34')

function addRow(subject, marks,marks1,marks2,internal,internal1) {
  let body = document.getElementById('tablebody');
  let newRow = document.createElement('tr');
  
  let subjectCell = document.createElement('td');
  subjectCell.innerText = subject;
  subjectCell.classList.add('subjects_f')
  newRow.appendChild(subjectCell);
  
  
  let marksCell1 = document.createElement('td');
  marksCell1.innerText = internal;
  newRow.appendChild(marksCell1);
  
  let marksCell2 = document.createElement('td');
  marksCell2.innerText = marks;
  newRow.appendChild(marksCell2);

  let marksCell3 = document.createElement('td');
  marksCell3.innerText = marks+internal;
  newRow.appendChild(marksCell3);
  
  
  let marksCell4 = document.createElement('td');
  marksCell4.innerText = internal1;
  newRow.appendChild(marksCell4);
  
  let marksCell5 = document.createElement('td');
  marksCell5.innerText = marks1;
  newRow.appendChild(marksCell5);
  
  
  let marksCell6 = document.createElement('td');
  marksCell6.innerText = marks1+internal1;
  newRow.appendChild(marksCell6);

  let marksCell7 = document.createElement('td');
  marksCell7.innerText = marks+marks1;
  newRow.appendChild(marksCell7);

  let marksCell8 = document.createElement('td');
  marksCell8.innerText = marks2;
  newRow.appendChild(marksCell8);
  
  body.appendChild(newRow);
}


fetch('http://stageapi.iguru.guru:222/api/ExamManagement/GetStudentProgressReports?schoolID=282&sectionID=2682&eXamMasID=8442&students=181521')
  .then(response => response.json())
  .then(data => {
    let studentinfo=data.Response.ProgressList.lstStudentInfo[0]
    console.log(data);
    rollno.textContent=`: ${studentinfo.RollNumber}`
    classname.textContent=`: ${studentinfo.ClassName}`
    studentname.textContent=`: ${studentinfo.Name}`
    mothername.textContent=`: ${studentinfo.MotherName}`
    fathername.textContent=`: ${studentinfo.FatherName}`
    attandence.textContent=`: ${studentinfo.cusAttendance[0].PresenceDays+studentinfo.cusAttendance[1].PresenceDays}`
    dob.textContent=`: ${studentinfo.DOB}`
    schoolname.innerText=studentinfo.SchoolName
    address.innerText=studentinfo.SchoolAddress
    link.innerText=studentinfo.SchoolEmail
    grade.innerText=studentinfo.Grade
    grade1.innerText=studentinfo.Grade
    percentage.innerText=`${studentinfo.Totalper}%`
    if (studentinfo.Totalper>=34){
      results.innerText='PASS'
    }else{
      results.innerText='FAIL'
    }
    logo.src=studentinfo.SchoolLogo
    totalT1T2.innerText=studentinfo.StudentTotal
    term1.innerText=studentinfo.TermGrade[0].ScoredMarkswithInterRound
    term2.innerText=studentinfo.TermGrade[1].ScoredMarkswithInterRound
    let inter=studentinfo.listTotalInternalMarks
    internal12.innerText=inter[0].TotalScoredMarksRound>=inter[1].TotalScoredMarksRound?inter[0].TotalScoredMarksRound:inter[1].TotalScoredMarksRound
    internal34.innerText=inter[2].TotalScoredMarksRound>=inter[3].TotalScoredMarksRound?inter[2].TotalScoredMarksRound:inter[3].TotalScoredMarksRound
    term1t.innerText=parseInt(internal12.innerText)+parseInt(term1.innerText)
    term2t.innerText=parseInt(internal34.innerText)+parseInt(term2.innerText)
    let arra=data.Response.ProgressList.lstStudentInfo[0].lstStudent
    let arra1=data.Response.ProgressList.lstStudentInfo[0].stInternals
   
    
    
    for (var i=0; i<arra.length; i++){
        let tabledata=document.createElement('tr')
        if (i%2===0){
            
          addRow(arra[i].SubjectName, arra[i].Marks,arra[i+1].Marks,arra[i].SubjectGrade,arra1[i].InternalTotal,arra1[i+1].InternalTotal);
            
        }
        
    }
    console.log(arra)
    
  })
  .catch(error => {
    console.error(error);
  });