

var dataRequest = new XMLHttpRequest();
dataRequest.addEventListener("load", dataRequestComplete);
dataRequest.addEventListener("error", dataRequestFailed);

function dataRequestFailed() {
	console.log("OH SHAT, THERE WAS AN ERROR TRANSFERRING THE FILE")
}

dataRequest.open("GET", "products.json");

dataRequest.send();

var products = [];
function dataRequestComplete(event) {
	console.log("The data transfer was successful");
	var objectOfProducts = JSON.parse(event.target.responseText);
	products = objectOfProducts.products;
}


// grab data from categories.json and populate categories array, then trigger
//populateCategories function
var dataRequest2 = new XMLHttpRequest();
	dataRequest2.addEventListener("load", dataRequest2Complete);
	dataRequest2.addEventListener("error", dataRequest2Failed);

function dataRequest2Failed() {
	console.log("OH SHAT, THERE WAS AN ERROR TRANSFERRING THE FILE")
}

dataRequest2.open("GET", "categories.json")

dataRequest2.send();

var categories = [];
function dataRequest2Complete(event) {
	console.log("The data transfer was successful");
	objectOfCategories = JSON.parse(event.target.responseText);
	categories = objectOfCategories.categories;
	populateProducts();
}

var productField = document.getElementById("productField");
var seasonSelect = document.getElementById("seasonSelect");
var productsList = document.getElementById("productsList");

function populateProducts() {
	productField.innerHTML = "";
	for (var i=0; i<products.length; i++){
		var price = products[i].price;

		for (var j=0; j<categories.length; j++) {
			if (products[i].category_id === categories[j].id) {
					products[i].departmentName = categories[j].name;
			}
		} 
		if (seasonSelect.value === "winter" && products[i].category_id === 1)
				{price = (products[i].price - (products[i].price * categories[0].discount)).toFixed(2);
		} else if 
				(seasonSelect.value === "autumn" && products[i].category_id === 2)
				{price = (products[i].price - (products[i].price * categories[1].discount)).toFixed(2);
		} else if 
				(seasonSelect.value === "spring" && products[i].category_id === 3)
				{price = (products[i].price - (products[i].price * categories[2].discount)).toFixed(2);
		} else if 
				(seasonSelect.value === "default")
				{price = products[i].price;
		}
		productField.innerHTML +=
			`<ul>
				<li>${products[i].name}</li>
				<li>${products[i].departmentName}</li>
				<li>${price}</li>
			</ul>`;	
	}
}



document.getElementById("seasonSelect").addEventListener("change", populateProducts);















