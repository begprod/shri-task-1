window.onload = () => {
	const themeSwitcherWrapper = document.querySelector('.onoffswitch');
	const themeDefaultBlocks = document.querySelectorAll('.theme_color_project-default');
	console.log(themeDefaultBlocks);

	document.body.addEventListener('click', (event) => {
		if (event.target.matches('.onoffswitch__button')) {
			if (themeSwitcherWrapper.classList.contains('onoffswitch_checked')) {
				themeDefaultBlocks.forEach((item) => {
					item.classList.remove('theme_color_project-default');
					item.classList.add('theme_color_project-inverse');
				});
			} else {
				themeDefaultBlocks.forEach((item) => {
					item.classList.remove('theme_color_project-inverse');
					item.classList.add('theme_color_project-default');
				});
			}

			themeSwitcherWrapper.classList.toggle('onoffswitch_checked');
		}

		if (event.target.closest('.history__transaction')) {
			const currentItem = event.target.closest('.history__transaction');

			currentItem.querySelector('.e-accordion__more').classList.toggle('history__hide');
		}
	}, false);
};