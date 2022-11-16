let accessories = [];
let shoes = [];
let tShirts = [];
for (let fill = 0; fill < data.length; fill++) {
	if (data[fill].tag[0].toLowerCase() == 'acessórios') { accessories.push(data[fill]) }
	if (data[fill].tag[0].toLowerCase() == 'sapatos') { shoes.push(data[fill]) }
	if (data[fill].tag[0].toLowerCase() == 'camisetas') { tShirts.push(data[fill]) }
}
// addCart
let forCart = [];
let valueCart = 0;

const productsList = document.querySelector('#products-list');
const cartList = document.querySelector('.cart-list');
const amount = document.querySelector('.amount-cart');
const totalCart = document.querySelector('.total-cart');

const allButton = document.querySelector('.all');
const accessoriesButton = document.querySelector('.accessories');
const shoesButton = document.querySelector('.shoes');
const tShirtsButton = document.querySelector('.t-shirts');

allButton.addEventListener('click', (e) => { productsList.innerHTML = ''; all(data) });
accessoriesButton.addEventListener('click', (e) => { productsList.innerHTML = ''; acc(accessories) });
shoesButton.addEventListener('click', (e) => { productsList.innerHTML = ''; shoe(shoes) });
tShirtsButton.addEventListener('click', (e) => { productsList.innerHTML = ''; tShirt(tShirts) });

function addCartButton() {
	const addCartItem = document.createElement('button');
	addCartItem.addEventListener('click', (e) => {
		const liButton = e.target.parentNode;
		if (forCart.length == 0) {
			document.querySelector('.total').classList.remove('hide');
			document.querySelector('.cart').classList.remove('cart-empty');
			cartList.id = '';
			cartList.innerHTML = '';
		}

		for (let add = 0; add < data.length; add++) {
			const dataItem = data[add];

			if (liButton.dataset.id == dataItem.id) {

				if (!forCart.includes(dataItem.id)) {
					forCart.push(dataItem.id);
					e.target.classList.remove('add-cart');
					e.target.classList.toggle('disabled');
					e.target.innerText = 'No carrinho';
					e.target.setAttribute('disabled', 'disabled');

					const liCart = document.createElement('li');
					liCart.dataset.id = liButton.dataset.id;
					const imgCart = document.createElement('img');
					const divContentCart = document.createElement('div');
					const nameCart = document.createElement('p');
					const priceCart = document.createElement('p');
					const removeCart = removeButton();
					let price = dataItem.value.toFixed(2);
					valueCart += parseFloat(price);
					let priceString = `R$ ${price.toString().substring(0, price.toString().length - 3)},${price.toString().substr(-2)}`;

					priceCart.classList.add('price-cart');
					divContentCart.classList.add('div-cart');
					liCart.classList.add('li-cart');

					imgCart.src = dataItem.img;
					imgCart.alt = dataItem.nameItem;
					nameCart.innerText = dataItem.nameItem;
					priceCart.innerText = priceString;

					liCart.appendChild(imgCart);
					liCart.appendChild(divContentCart);
					divContentCart.appendChild(nameCart);
					divContentCart.appendChild(priceCart);
					divContentCart.appendChild(removeCart);
					cartList.appendChild(liCart);

					amount.innerText = forCart.length;
					totalCart.innerText = `R$ ${valueCart.toFixed(2).toString().substring(0, valueCart.toFixed(2).toString().length - 3)},${valueCart.toFixed(2).toString().substr(-2)}`;
				}

			}
		}

	})
	return addCartItem;
}

function removeButton() {
	const removeCartItem = document.createElement('button');
	removeCartItem.innerText = 'Remover produto';
	removeCartItem.classList.toggle('remove-button');

	removeCartItem.addEventListener('click', (e) => {
		let idRemove = e.target.parentNode.parentNode.dataset.id; // id -li
		e.target.parentNode.parentNode.remove(); // remove li
		forCart.splice(forCart.indexOf(idRemove)); // remove li-list
		empty();

		let buttonCard = document.querySelector('.button-' + idRemove); // button full list
		buttonCard.removeAttribute('disabled', 'disabled'); // disable button
		buttonCard.classList.toggle('disabled'); // class disable button toggle
		buttonCard.classList.add('add-cart'); // return to add-cart button

		for (let remove = 0; remove < data.length; remove++) {
			const toRemove = data[remove]; // info remove-data

			if (idRemove == toRemove.id) { // if id-button = id-data
				buttonCard.innerText = toRemove.addCart;
				let price = toRemove.value; // data-price
				valueCart -= price; // reload price
			}

		}
		amount.innerText = forCart.length; // reload amount
		totalCart.innerText = `R$ ${valueCart.toFixed(2).toString().substring(0, valueCart.toFixed(2).toString().length - 3)},${valueCart.toFixed(2).toString().substr(-2)}`; // total-cart

	})

	return removeCartItem;
}

function empty() {
	if (forCart.length < 1) {
		cartList.id = 'cart-list-empty';
		document.querySelector('.cart').classList.add('cart-empty');

		let empty = document.createElement('li');
		let title = document.createElement('h3');
		let p = document.createElement('p');

		empty.classList.add('empty-li');
		document.querySelector('.total').classList.add('hide');

		title.innerText = 'Carrinho Vazio';
		p.innerText = 'Adicione Itens';
		empty.appendChild(title);
		empty.appendChild(p);
		cartList.appendChild(empty);
	}
}
empty();

function all(products) {
	// Contém as informações de título, foto, descrição, preço, tag de categoria e um botão de adicionar ao carrinho.
	productsList.innerHTML = '';
	for (let item = 0; item < products.length; item++) {
		//tags
		const productItem = document.createElement('li');
		const nameItem = document.createElement('p');
		const photo = document.createElement('img');
		const description = document.createElement('p');
		const price = document.createElement('p');
		const category = document.createElement('span');
		const addCart = addCartButton();

		// products
		const content = products[item];
		const contentPrice = 'R$ ' + content.value.toFixed(2);

		// class
		productItem.classList.add('card');
		productItem.id = 'card-' + content.id;
		productItem.dataset.id = content.id;
		nameItem.classList.add('name-' + item, 'name-item');
		description.classList.add('description-' + item, 'description')
		price.classList.add('price-' + item, 'price');
		category.classList.add('tag');
		addCart.classList.add('button-' + content.id, 'add-cart');

		// img
		photo.src = content.img;
		photo.alt = content.nameItem;

		// text
		category.innerText = content.tag[0];
		nameItem.innerText = content.nameItem;
		description.innerText = content.description;
		price.innerText = contentPrice;
		addCart.innerText = content.addCart;

		// appendChild
		productItem.appendChild(photo);
		productItem.appendChild(category);
		productItem.appendChild(nameItem);
		productItem.appendChild(description);
		productItem.appendChild(price);
		productItem.appendChild(addCart);
		productsList.appendChild(productItem);
	}
	return;
}
all(data);

function acc(products) {
	for (let item = 0; item < products.length; item++) {
		//tags
		const productItem = document.createElement('li');
		const nameItem = document.createElement('p');
		const photo = document.createElement('img');
		const description = document.createElement('p');
		const price = document.createElement('p');
		const category = document.createElement('span');
		const addCart = addCartButton();

		// products
		const content = products[item];
		const contentPrice = 'R$ ' + content.value.toFixed(2);

		// class
		productItem.classList.add('card');
		productItem.id = 'card-' + content.id;
		productItem.dataset.id = content.id;
		nameItem.classList.add('name-' + item, 'name-item');
		description.classList.add('description-' + item, 'description')
		price.classList.add('price-' + item, 'price');
		category.classList.add('tag');
		addCart.classList.add('button-' + content.id, 'add-cart');

		// img
		photo.src = content.img;
		photo.alt = content.nameItem;

		// text
		category.innerText = content.tag[0];
		nameItem.innerText = content.nameItem;
		description.innerText = content.description;
		price.innerText = contentPrice;
		addCart.innerText = content.addCart;

		// appendChild
		productItem.appendChild(photo);
		productItem.appendChild(category);
		productItem.appendChild(nameItem);
		productItem.appendChild(description);
		productItem.appendChild(price);
		productItem.appendChild(addCart);
		productsList.appendChild(productItem);
	}
	return;
}

function shoe(products) {
	for (let item = 0; item < products.length; item++) {
		//tags
		const productItem = document.createElement('li');
		const nameItem = document.createElement('p');
		const photo = document.createElement('img');
		const description = document.createElement('p');
		const price = document.createElement('p');
		const category = document.createElement('span');
		const addCart = addCartButton();

		// products
		const content = products[item];
		const contentPrice = 'R$ ' + content.value.toFixed(2);

		// class
		productItem.classList.add('card');
		productItem.id = 'card-' + content.id;
		productItem.dataset.id = content.id;
		nameItem.classList.add('name-' + item, 'name-item');
		description.classList.add('description-' + item, 'description')
		price.classList.add('price-' + item, 'price');
		category.classList.add('tag');
		addCart.classList.add('button-' + content.id, 'add-cart');

		// img
		photo.src = content.img;
		photo.alt = content.nameItem;

		// text
		category.innerText = content.tag[0];
		nameItem.innerText = content.nameItem;
		description.innerText = content.description;
		price.innerText = contentPrice;
		addCart.innerText = content.addCart;

		// appendChild
		productItem.appendChild(photo);
		productItem.appendChild(category);
		productItem.appendChild(nameItem);
		productItem.appendChild(description);
		productItem.appendChild(price);
		productItem.appendChild(addCart);
		productsList.appendChild(productItem);
	}
	return;
}

function tShirt(products) {
	for (let item = 0; item < products.length; item++) {
		//tags
		const productItem = document.createElement('li');
		const nameItem = document.createElement('p');
		const photo = document.createElement('img');
		const description = document.createElement('p');
		const price = document.createElement('p');
		const category = document.createElement('span');
		const addCart = addCartButton();

		// products
		const content = products[item];
		const contentPrice = 'R$ ' + content.value.toFixed(2);

		// class
		productItem.classList.add('card');
		productItem.id = 'card-' + content.id;
		productItem.dataset.id = content.id;
		nameItem.classList.add('name-' + item, 'name-item');
		description.classList.add('description-' + item, 'description')
		price.classList.add('price-' + item, 'price');
		category.classList.add('tag');
		addCart.classList.add('button-' + content.id, 'add-cart');

		// img
		photo.src = content.img;
		photo.alt = content.nameItem;

		// text
		category.innerText = content.tag[0];
		nameItem.innerText = content.nameItem;
		description.innerText = content.description;
		price.innerText = contentPrice;
		addCart.innerText = content.addCart;

		// appendChild
		productItem.appendChild(photo);
		productItem.appendChild(category);
		productItem.appendChild(nameItem);
		productItem.appendChild(description);
		productItem.appendChild(price);
		productItem.appendChild(addCart);
		productsList.appendChild(productItem);
	}
	return;
}
