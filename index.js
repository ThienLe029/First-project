var fs = require('fs');
var readlineSync = require('readline-sync');
var users = [];

function loadData() {
	contentUsers = fs.readFileSync('./data.json', {encoding: 'utf8'});
	users = JSON.parse(contentUsers);
}

function showUsers() {
	console.log('List contact');
	loadData();
	for (var i=0;i<users.length;i++) {
		var newValue = JSON.stringify(users[i]);
		var newValueArray = newValue.split('{')[1].split('}')[0];
		console.log('', i+1,'.',newValueArray);
	}

}

function searchContact() {
	var str = readlineSync.question('Enter contact name or phone number: ');
	loadData();
	var arrayNumber = [];
	for (var i=0;i<users.length;i++) {
		var newValue = JSON.stringify(users[i]);
		var newValueArray = newValue.split('{')[1].split('}')[0];
		var x = newValueArray.split('"');
		if (x[3].toLowerCase().search(str) >= 0 || x[7].search(str) >= 0 || x[3].search(str) >= 0 || x[3].toUpperCase().search(str) >= 0) {
			console.log('', i+1,'.',newValueArray);
			arrayNumber.push('',i+1);
		}
	}
	return arrayNumber;
}

function insertContact() {
	name = readlineSync.question('Contact name: ');
	phone = readlineSync.question('Phone number: ');
	user = {
		name: name,
		phone: phone
	};
	users.push(user);
	var newUser = JSON.stringify(users);
	fs.writeFileSync('./data.json', newUser, {encoding: 'utf8'});
}

function editContact() {
	var arrayNumber = searchContact();
	contactEdit = readlineSync.question('Choose contact do you want edit: ');
	loadData();
	for (var n=0;n<=arrayNumber.length;n++) {
		if (contactEdit == n+1) {
			var userChoose = users[n];
			userChoose.name = readlineSync.question('Enter name: ');
			userChoose.phone = readlineSync.question('Enter phone number: ');
			var newUsers = JSON.stringify(users);
			fs.writeFileSync('./data.json', newUsers, {encoding: 'utf8'});
			console.log('Editsuccesfully!');
		}
		else {
			
		}
	}

}


function deleteContact() {
	var arrayNumber = searchContact();
	contactDelete = readlineSync.question('Choose contact do you want delete: ');
	loadData();
	for (var n=0;n<=arrayNumber.length;n++) {
		if (contactDelete == n+1) {
			users.splice(n,1);
			var newUsers = JSON.stringify(users);
			fs.writeFileSync('./data.json', newUsers, {encoding: 'utf8'});
			console.log('Delete succesfully!');
		}
		else {
			
		}
	}
}

function showMenu() {
	console.log('Please choose option')
	console.log('1. List Contact');
	console.log('2. Insert contact');
	console.log('3. Edit contact');
	console.log('4. Delete contact');
	console.log('5. Search contact');
	var option = readlineSync.question('> ');
	switch(option) {
		case '1':
			showUsers();
			showMenu();
			break;
		case '2':
			insertContact();
			showMenu();
			break;
		case '3':
			editContact();
			showMenu();
			break;
		case '4':
			deleteContact();
			showMenu();
			break;
		case '5':
			searchContact();
			showMenu();
			break;
		default:
			console.log('Wrong option');
			showMenu();
			break;
	}
}

function main() {
	showUsers();
	showMenu();
}
main()