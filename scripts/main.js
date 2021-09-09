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
var table = document.getElementById("table");

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

// add an employee
document.getElementById("submitButton").addEventListener("click", function() {
    var fname_cms = document.getElementById("fname").value;
    var lname_cms = document.getElementById("lname").value;
    var email_cms = document.getElementById("email").value;
    var sex_cms = document.getElementById("sex-list").value;
    var birthday_cms = document.getElementById("birthday").value;
    var formatBirthday = moment(document.getElementById('birthday').value);
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (fname_cms== "") {
            validate('fname','You must fill this out.');
            return false;
        }
    
        if (lname_cms == "") {
            validate('lname','You must fill this out.');
            return false;
        }
    
        if (email_cms == "") {
            validate('email','You must fill this out.');
            return false;
        }
    
        if (sex_cms == "") {
            validate('sex-list','You must choose an option.');
            return false;
        }
    
        if (birthday_cms == "") {
            validate('birthday','You must choose a date.');
            return false;
        } 
    
        var birthdate = new Date(document.getElementById('birthday').value)
        if(calculateAge(birthdate) < 16) { 
            validate_age('birthday');
            return false;
        }
           
        if(regex.test(String(email_cms).toLowerCase())) {
        } else {
            validate('email','Invalid e-mail address.');
            return false;
        }

    setDoc(doc(db,"employees",`${fname_cms}`), {
        fname: fname_cms,
        lname: lname_cms,
        email: email_cms,
        sex: sex_cms,
        birthday: formatBirthday.format("DD MMMM YYYY")
    });

    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("sex-list").value = "";
    document.getElementById("birthday").value = "";
    
    removeData(table);
    getAllData();
;
});

function calculateAge(birthday_cms) { 
    var ageDifMs = Date.now() - birthday_cms.getTime();
    var ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
} 
function validate(inputID, string) {
    const input = document.getElementById(inputID);
    const validityState = input.validity;
  
    if (validityState.valueMissing) {
      input.setCustomValidity(string);
    } 
    input.reportValidity();
}

function validate_age(inputID) {
    const input = document.getElementById(inputID);
    input.setCustomValidity("You must be older than 16 years old.");
    input.reportValidity();
}

// name sort
document.getElementById("sort-list").addEventListener("change", async function() {
    var sortValue = document.getElementById("sort-list").value;
    if(sortValue == " "){
        removeData(table);
        getAllData();
    }else
    if(sortValue == "asc-alphabetically") {
      removeData(table);
        const q = query(collection(db, "employees"), orderBy("fname", "asc"));
        const querySnapshot = await getDocs(q);
        putData(querySnapshot);
        console.log("ok");
    } else {
        removeData(table);
       // getAllData();
        if(sortValue=="desc-alphabetically"){
            const q = query(collection(db, "employees"), orderBy("fname", "desc"));
            const querySnapshot = await getDocs(q);
            putData(querySnapshot);
        }
    }
});

//search
document.getElementById("search").addEventListener("change", async function() {
    if(document.getElementById("search").value == "") {
        removeData(table);
        getAllData();
    } else {
    var searchString = document.getElementById("search").value;
    removeData(table);
    const q = query(collection(db, "employees"), where("fname", "==", searchString));
    const querySnapshot = await getDocs(q);
    putData(querySnapshot);
    }
});

