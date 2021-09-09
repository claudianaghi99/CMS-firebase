import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc, query, where, orderBy} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";      
         
const firebaseConfig= {
     apiKey: "AIzaSyByykoIg2boC-LDjRiSmXgWiyL63hOwqqk",
     authDomain: "cmd-firebase.firebaseapp.com",
     projectId: "cmd-firebase",
     storageBucket: "cmd-firebase.appspot.com",
     messagingSenderId: "334353837414",
     appId: "1:334353837414:web:7a4b0fc6737f1ed2892ca7",
     measurementId: "G-1CKRBDFG91",
};

const app= initializeApp(firebaseConfig);
const db = getFirestore(app);

// get all data from firebase
async function getAllData() {
    const querySnapshot = await getDocs(collection(db, "employees"));
    putData(querySnapshot);
    setEventListenerDelete();
}
getAllData();

// put the data in the table
function putData(querySnapshot) {
    var j = 1;
    querySnapshot.forEach((doc) => {

        var row= table.insertRow(j);
        row.id = doc.data()["fname"]+"row";
        
        var cellNume = row.insertCell();
        cellNume.setAttribute("class", "td-paddings");
        //cellNume.innerHTML = doc.data()["fname"];
        cellNume.innerHTML = doc.data()["fname"];
        
        var cellPrenume = row.insertCell();
        cellPrenume.setAttribute("class", "td-paddings");
        cellPrenume.innerHTML = doc.data()["lname"];

        var cellEmail = row.insertCell();
        cellEmail.setAttribute("class", "td-paddings");
        cellEmail.innerHTML = doc.data()["email"];

        var cellSex = row.insertCell();
        cellSex.setAttribute("class", "td-paddings");
        cellSex.innerHTML = doc.data()["sex"];

        var cellBirthday= row.insertCell();
        cellBirthday.setAttribute("class", "td-paddings");
        cellBirthday.innerHTML = doc.data()["birthday"];

        var cellDelete = row.insertCell();
        cellDelete.innerHTML = `<input type="button" value="Delete" id="${doc.data()["fname"]}" class="btn btn-danger">`;
        j++;
    });
}

function removeData(table) {
    for (var i = table.childNodes[1].childElementCount-1; i >0; i--) {
        table.deleteRow(i);
    }
}
// set the delete for every employee
function setEventListenerDelete() {
   var drop = document.getElementsByClassName('btn btn-danger');
    for (var i = 0; i < drop.length; i++) {
        drop[i].addEventListener("click", function() {
            deleteDoc(doc(db, "employees", this.id));
            document.getElementById(`${this.id}row`).remove();
        });
    }
}

// template to add more easily a document

// await setDoc(doc(db, "employees", "Alexandra"), {
//   fname: "Alexandra",
//   lname: "Naghi",
//   email: "maria@yahoo.com",
//   sex: "female",
//   birthday: "11 Septermber 1999",
// });

// ad an employee

document.getElementById("submitButton").addEventListener("click", function() {
    var fname_cms = document.getElementById("fname").value;
    var lname_cms = document.getElementById("lname").value;
    var email_cms = document.getElementById("email").value;
    var sex_cms = document.getElementById("sex-list").value;
    var birthday_cms = document.getElementById("birthday").value;

    if(fname_cms == "") {
        alert("Completati numele");
    } else {
    setDoc(doc(db,"employees",`${fname_cms}`), {
        fname: fname_cms,
        lname: lname_cms,
        email: email_cms,
        sex: sex_cms,
        birthday: birthday_cms
    });

    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("sex-list").value = "";
    document.getElementById("birthday").value = "";
    
    removeData(table);
    getAllData();
}});

// clear data 
document.getElementById("query").addEventListener("change", function() {
    if(document.getElementById("query").value == "") {
        removeData(table);
        getAllData();
    }
});










// function getData() {
//     var str = localStorage.getItem("localData");
//     if(str!=null) {
//         arr = JSON.parse(str);
//     }
// }

// var arr = new Array();
// //const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// function addRow() { //addData

//     getData();
//     // get input values 
//     arr.push({
//         fname : document.getElementById("fname").value,
//         lname : document.getElementById("lname").value,
//         email : document.getElementById("email").value,
//         sex : document.getElementById("sex-list").value,
//         birthday:  document.getElementById("birthday").value
//        // formatBirthday : moment(document.getElementById('birthday').value)
//     });
    
//     // if (arr[0].fname== "") {
//     //     validate('fname','You must fill this out.');
//     //     return false;
//     // }

//     // if (arr[1].lname == "") {
//     //     validate('lname','You must fill this out.');
//     //     return false;
//     // }

//     // if (arr[2].email == "") {
//     //     validate('email','You must fill this out.');
//     //     return false;
//     // }

//     // if (arr[3].sex == "") {
//     //     validate('sex-list','You must choose an option.');
//     //     return false;
//     // }

//     // if (arr[4].birthday == "") {
//     //     validate('birthday','You must choose a date.');
//     //     return false;
//     // } 

//     // var birthdate = new Date(document.getElementById('birthday').value)
//     // if(calculateAge(birthdate) < 16) { 
//     //     validate_age('birthday');
//     //     return false;
//     // }
       
//     // if(regex.test(String(email).toLowerCase())) {
//     // } else {
//     //     validate('email','Invalid e-mail address.');
//     //     return false;
//     // }
//     localStorage.setItem("localData", JSON.stringify(arr));
//     location.reload();
// }

// function loadData(){ //showData

//     getData();

//     var table = document.getElementById('table').getElementsByTagName('tbody')[0];
//     for(i=0;i<arr.length;i++)
//       {

//         var row= table.insertRow();
//         var cell1 = row.insertCell();
//         var cell2 = row.insertCell();
//         var cell3 = row.insertCell();
//         var cell4 = row.insertCell();
//         var cell5 = row.insertCell();
//         var cell6 = row.insertCell();
//         cell1.innerHTML = arr[i].fname;
//         cell2.innerHTML = arr[i].lname;
//         cell3.innerHTML = arr[i].email;
//         cell4.innerHTML = arr[i].sex;
//         cell5.innerHTML = arr[i].birthday;
//         cell6.innerHTML = '<input type="button" value="Delete" onclick="deleteRoww();" class="btn btn-danger">';
//       }
// }
// function deleteRoww() {
//     var index;
//     var table = document.getElementById('table');
//     for ( var i = 1; i < table.rows.length; i++) {
//             table.rows[i].cells[5].onclick = function () {
//             index = this.parentElement.rowIndex;
//             table.deleteRow(index);
//         };
//     } 
// }
// function deleteRoww() {

//     getData();

//     var table = document.getElementById('table');

//     var del = JSON.parse(localStorage.getItem("localData"));

//     for(var i = 0; i < del.length; i++) {
//         if(del.name == table.rows[i].name) {
//             arr.splice[i];
            
//             localStorage.setItem("localData",JSON.stringify(arr));
//             getData();
          
//         }
//     }
    
// } 

// function deleteRow(employee) {
//     var result = confirm("Are you sure you want to delete this row?");
//     if (result) {
//         var e=employee.parentNode.parentNode;
//         e.parentNode.removeChild(e);
//     }
// }

// function calculateAge(birthday) { 
//     var ageDifMs = Date.now() - birthday.getTime();
//     var ageDate = new Date(ageDifMs); 
//     return Math.abs(ageDate.getUTCFullYear() - 1970);
// } 

// function searchFunction() {
//     const searchInput = document.getElementById("search");
//     const rows = document.querySelectorAll('tbody tr');
   
//     searchInput.addEventListener('keyup',function(event) {
//     const q = event.target.value.toLowerCase();
//     rows.forEach((row) => {
//         row.querySelector('td').textContent.toLowerCase().startsWith(q)
//         ? (row.style.display = 'table-row')
//         : (row.style.display = 'none');
//     });
//     });
// }

// function sortTable_alphabetically() {
//     var table, rows, switching, i, x, y, shouldSwitch;
//     table = document.getElementById("table");
//     switching = true;

//     while (switching) {
//       switching = false;
//       rows = table.rows;

//       for (i = 1; i < (rows.length - 1); i++) {
      
//         shouldSwitch = false;

//         x = rows[i].getElementsByTagName("td")[0];
//         y = rows[i + 1].getElementsByTagName("td")[0];
   
//         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//           shouldSwitch = true;
//           break;
//         }
//       }
//       if (shouldSwitch) {
//         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//         switching = true;
//       }
//     }
// }

// function selectedOption() {
//         var option=document.getElementById('sort-list');
//         if(option.value == "alphabetically"){
//             sortTable_alphabetically();
//         }
// }

// function validate(inputID, string) {
//     const input = document.getElementById(inputID);
//     const validityState = input.validity;
  
//     if (validityState.valueMissing) {
//       input.setCustomValidity(string);
//     } 
//     input.reportValidity();
// }

// function validate_age(inputID) {
//     const input = document.getElementById(inputID);
//     input.setCustomValidity("You must be older than 16 years old.");
//     input.reportValidity();
// }