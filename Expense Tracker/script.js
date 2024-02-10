// validate form inputs before submitting data 
function validateForm() {

    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var address = document.getElementById('address').value;
    var email = document.getElementById('email').value;

    if (name == "") {
        alert("Name's required");
        return false;
    }
    if (age == "") {
        alert("Age's required");
        return false;
    }
    else if (age < 1) {
        alert("Age must be positive number")
        return false;
    }
    if (address == "") {
        alert("Address's required")
        return false;
    }
    if (email == "") {
        alert("Email's required")
        return false;
    }
    else if (!email.includes("@")) {
        alert("Invalid email address")
        return false;
    }
    return true;

}
/* to show data from local storage */
function showData() {

    var List;
    if (localStorage.getItem("List") == null) {
        List = [];
    }
    else {
        List = JSON.parse(localStorage.getItem("List"));
    }

    var html = "";
    List.forEach(function (element, index) {
        html += "<tr>"
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button style="padding:15px; border-style:none; color:white; font-size:20px; border-radius:50px; cursor:pointer; width:100px;  background-color:red; margin: 20px; hover: transform:scale(1.1); transition:1.2s;" onclick="deleteData(' + index + ')"class="btn btn-danger">Delete</button><button style="padding:15px; border-style:none; color:white; font-size:20px; border-radius:50px; cursor:pointer; width:100px;  background-color:#1d9bf0; margin: 20px;" onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button>';
        html += "</tr>";

    });
    document.querySelector('#crudTable tbody').innerHTML = html;


}
// load all data from local storage when document or page loaded
document.onload = showData();

// to add data to local storage 
function AddData() {

    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var address = document.getElementById('address').value;
    var email = document.getElementById('email').value;

    // if form is validate
    if (validateForm() == true) {

        var List;
        if (localStorage.getItem("List") == null) {
            List = [];
        }
        else {
            List = JSON.parse(localStorage.getItem("List"));
        }

        List.push({
            name: name,
            age: age,
            address: address,
            email: email
        });

        localStorage.setItem("List", JSON.stringify(List));
        showData();
        document.getElementById('name').value = "";
        document.getElementById('age').value = "";
        document.getElementById('address').value = "";
        document.getElementById('email').value = "";
    }
}
// to delete data from local storage 
function deleteData(index) {
    var List;
    if (localStorage.getItem("List") == null) {
        List = [];
    }
    else {
        List = JSON.parse(localStorage.getItem("List"));
    }
    // to remove this element 
    List.splice(index, 1);

    localStorage.setItem("List", JSON.stringify(List));
    showData();

}

// to edit data in local storage
function updateData(index) {

    // to hide or display both (submit or update) buttons
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var List;
    if (localStorage.getItem("List") == null) {
        List = [];
    }
    else {
        List = JSON.parse(localStorage.getItem("List"));
    }

    document.getElementById('name').value = List[index].name;
    document.getElementById('age').value = List[index].age;
    document.getElementById('address').value = List[index].address;
    document.getElementById('email').value = List[index].email;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            List[index].name = document.getElementById("name").value;
            List[index].age = document.getElementById("age").value;
            List[index].address = document.getElementById("address").value;
            List[index].email = document.getElementById("email").value;

            localStorage.setItem("List", JSON.stringify(List));
            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}
