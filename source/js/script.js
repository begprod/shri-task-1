const selectors = {
	themeSwitcherWrapper: '.onoffswitch',
	themeSwitcherButton: '.onoffswitch__button',
	historyItem: '.history__transaction',
	accordionItem: '.e-accordion__more',
	page: '.page'
};
const pageWrapper = document.querySelector(selectors.page);
const themeSwitcherWrapper = document.querySelector(selectors.themeSwitcherWrapper);

document.addEventListener('click', (event) => {
	if (event.target.matches(selectors.themeSwitcherButton)) {
		themeSwitcherWrapper.classList.toggle('onoffswitch_checked');
		pageWrapper.classList.toggle('theme_color_project-default');
		pageWrapper.classList.toggle('theme_color_project-inverse');
	}

	if (event.target.closest(selectors.historyItem)) {
		const currentItem = event.target.closest(selectors.historyItem);

		currentItem.querySelector(selectors.accordionItem).classList.toggle('history__hide');
	}
}, false);