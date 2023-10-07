'use strict';

const scheme = 'dracula';
const documentTitle = 'URL Listing App';
const listHeader = 'Placeholder List';
const serializedList = 'placeholder-list';

const listPath = `lists/${serializedList}`;
const colorSchemePath = `color-schemes/${scheme}`;

let listUrl;
let colorSchemeUrl;
let container;

function setElementMinWidth(nodeList) {
	let maxElementWidth = 0;

	nodeList.forEach(element => {
		if (maxElementWidth < element.offsetWidth) {
			maxElementWidth = element.offsetWidth;
		}
	});

	nodeList.forEach(element => {
		element.style.setProperty('--width', `${maxElementWidth}px`);
	});
}

function alphabetize(object) {
	return object.sort((a, b) => a.name.localeCompare(b.name));
}

function renderList(serializedList) {
	const list = document.createElement('ul');
	const sortedList = alphabetize(serializedList);

	sortedList.map(listItem => {
		let listItemElement = document.createElement('li');
		listItemElement.innerHTML =
			`<a href="${listItem.url}" target="_blank">${listItem.name}</a>` +
			`<button class="copy-button" data-clipboard-text="${listItem.url}">Copy</button>`;
		list.appendChild(listItemElement);
	});

	container.appendChild(list);

	const anchorElements = document.querySelectorAll('a');
	setElementMinWidth(anchorElements);
}

function renderError(error) {
	const errorMessage = document.createElement('h2');

	errorMessage.innerText = `${error}`;
	container.appendChild(errorMessage);
}

async function fetchJson(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP Status ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		renderError(error);

		return [];
	}
}

function setColorScheme(colorSchemeObject) {
	colorSchemeObject.map(variable => {
		document.documentElement.style.setProperty(`${variable.name}`, `${variable.value}`);
	});
}

function renderHeader() {
	const header = document.createElement('h1');

	header.innerText = listHeader;
	container.appendChild(header);
}

window.addEventListener('load', () => {
	const _ = new ClipboardJS('.copy-button');

	document.title = documentTitle;
	listUrl = window.location.href + listPath;
	colorSchemeUrl = window.location.href + colorSchemePath
	container = document.querySelector('main');

	renderHeader();

	fetchJson(colorSchemeUrl).then(colorScheme => {
		setColorScheme(colorScheme);
	});
	fetchJson(listUrl).then(serializedList => {
		renderList(serializedList);
	});
});
