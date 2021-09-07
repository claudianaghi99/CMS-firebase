function addRow() {

    // get input values 
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var sex = document.getElementById('sex-list').value;
    var birthday = document.getElementById('birthday').value;
    var formatBirthday = moment(document.getElementById('birthday').value);
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // required to complete the following fields
    if (fname== "") {
        validate('fname','You must fill this out.');
        return false;
    }

    if (lname == "") {
        validate('lname','You must fill this out.');
        return false;
    }

    if (email == "") {
        validate('email','You must fill this out.');
        return false;
    }

    if (sex == "") {
        validate('sex-list','You must choose an option.');
        return false;
    }

    if (birthday == "") {
        validate('birthday','You must choose a date.');
        return false;
    } 

    var birthdate = new Date(document.getElementById('birthday').value)
    if(calculateAge(birthdate) < 16) { 
        validate_age('birthday');
        return false;
    }
       
    if(regex.test(String(email).toLowerCase())) {
    } else {
        validate('email','Invalid e-mail address.');
        return false;
    }
    
    // get the html table 
    var table=document.getElementsByTagName('table')[0];

    // add new empty row to the table
    var newRow = table.insertRow(table.rows.length);

    // add cells to the row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    arrayEmployee = [];
    arrayEmployee[0] = fname;
    arrayEmployee[1] = lname;
    arrayEmployee[2] = email;
    arrayEmployee[3] = sex;
    arrayEmployee[4] = formatBirthday.format("DD MMMM YYYY");
    arrayEmployee[5] = '<input type="button" name="delete" value="Delete" onclick="deleteRow(this);" class="btn btn-danger">';
    localStorage.setItem(`${email}`,arrayEmployee);

    archive = localStorage.getItem(`${email}`);
    arrayEmployee = archive.split(",");

    // add values to the cells
    cell1.innerHTML = arrayEmployee[0];
    cell2.innerHTML = arrayEmployee[1];
    cell3.innerHTML = arrayEmployee[2];
    cell4.innerHTML = arrayEmployee[3];
    cell5.innerHTML = arrayEmployee[4];
    cell6.innerHTML = arrayEmployee[5];
}

function loadData(){
    var j=1;
    var archive=[];
    for (var i = 0; i<localStorage.length; i++) 
      {
          archive[i] = localStorage.getItem(localStorage.key(i));
          var arrayEmployee =  archive[i].split(",");
          var row= table.insertRow(j);
          row.id = arrayEmployee[0]+"row";
          

          var cell1 = row.insertCell(0);
          cell1.innerHTML = arrayEmployee[0];

          var cell2 = row.insertCell(1);
          cell2.innerHTML = arrayEmployee[1];

          var cell3 = row.insertCell(2);
          cell3.innerHTML = arrayEmployee[2];

          var cell4 = row.insertCell(3);
          cell4.innerHTML = arrayEmployee[3];

        //   var cell5 = row.insertCell(4);
        //   cell5.innerHTML = arrayEmployee[4];

          var cell5 = row.insertCell(4);
          var birthdate = moment(arrayEmployee[4]);
          cell5.innerHTML = birthdate.format("DD MMM YYYY");

          var cell6 = row.insertCell(5);
          cell6.innerHTML = arrayEmployee[5];

          j++;
      }
}

function deleteRow(employee) {
    var result = confirm("Are you sure you want to delete this row?");
    if (result) {
        var e=employee.parentNode.parentNode;
        e.parentNode.removeChild(e);
    }
}

function calculateAge(birthday) { 
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
} 

function searchFunction() {
    const searchInput = document.getElementById("search");
    const rows = document.querySelectorAll('tbody tr');
   
    searchInput.addEventListener('keyup',function(event) {
    const q = event.target.value.toLowerCase();
    rows.forEach((row) => {
        row.querySelector('td').textContent.toLowerCase().startsWith(q)
        ? (row.style.display = 'table-row')
        : (row.style.display = 'none');
    });
    });
}

function sortTable_alphabetically() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("table");
    switching = true;

    while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < (rows.length - 1); i++) {
      
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("td")[0];
        y = rows[i + 1].getElementsByTagName("td")[0];
   
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
}

function selectedOption() {
        var option=document.getElementById('sort-list');
        if(option.value == "alphabetically"){
            sortTable_alphabetically();
        }
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
