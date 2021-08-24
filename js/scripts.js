// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, newEmail, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = newEmail;
  this.address = address;
}

// Contact.prototype.addEmail = function(email) {
//   this.emails[email.emailAddress] = email;
// }
// Contact.prototype.fullName = function() {
//   return this.firstName + " " + this.lastName;
// };

// Business Logic for multiAddress ---------
function Email(emailAddress, type) {
  this.emailAddress = emailAddress;
  this.type = type;
}

// let jamesEmail = new Email(emailAddress, type)
// let contact = new Contact("James", "Henager", 503333333, jamesEmail, "1234 w something")

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  const multiAddress = contact.email;
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(multiAddress.emailAddress);
  $(".email-type").html(multiAddress.type);
  $(".physical-address").html(contact.address);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#email").val();
    const inputtedEmailType = $("select#email-type").val();
    const inputtedAddress = $("input#address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#email").val("");
    $("select#email-type").val("");
    $("input#address").val("");
    let newEmail = new Email(inputtedEmail, inputtedEmailType);
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newEmail, inputtedAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});