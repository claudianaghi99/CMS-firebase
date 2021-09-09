
function WriteMember(){

    var i=0;
    querySnapshot.forEach(element =>{
        console.log(element.data()['fname']);
        console.log(element.data()['lname']);
        console.log(element.data()['email']);
        console.log(element.data()['sex']);
        console.log(element.data()['birthday']);

    });
}


 
