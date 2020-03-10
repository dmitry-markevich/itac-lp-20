(function ($) {

	$.fn.lpTabs = function (userParams) {

		const defaultParams = {
			duration: 1000
		}

		const params = $.extend(defaultParams, userParams);

		return $(this).each(function () {

			const tabs = $(this);
			let tabsTitlesNames = [];

			tabs.addClass('lp-tabs');

			tabs.children().each(function () {
				tabsTitlesNames.push($(this).attr('title'));
			}).addClass('lp-tab');

			tabs.wrapInner('<div class="lp-tabs-content"></div>');

			tabs.prepend('<div class="lp-tabs-titles"><ul></ul></div>');

			const tabsTitles = tabs.find('.lp-tabs-titles'),
				tabsContent = tabs.find('.lp-tabs-content'),
				tabsContentTabs = tabsContent.find('.lp-tab');

			tabsTitlesNames.forEach(function (value) {
				tabsTitles.find('ul').append(`<li>${value}</li>`);
			});

			const tabsTitlesItems = tabsTitles.find('ul li');

			tabsTitlesItems.eq(0).addClass('active');
			tabsContentTabs.eq(0).addClass('active').show();

			tabsContent.height(tabsContent.find('.active').outerHeight());

			tabsTitlesItems.on('click', function () {
				if (!tabs.hasClass('changing')) {

					tabs.addClass('changing');

					tabsTitlesItems.removeClass('active');
					$(this).addClass('active');

					const curTab = tabsContent.find('.active'),
						nextTab = tabsContentTabs.eq($(this).index());

					const curHeight = curTab.outerHeight();

					nextTab.show();

					const nextHeight = nextTab.outerHeight();

					nextTab.hide();

					if (curHeight < nextHeight) {
						tabsContent.animate({
							height: nextHeight
						}, params.duration / 2);
					}

					curTab.fadeOut(params.duration / 2, function () {

						if (curHeight > nextHeight) {
							tabsContent.animate({
								height: nextHeight
							}, params.duration / 2);
						}

						nextTab.fadeIn(params.duration / 2, function () {

							curTab.removeClass('active');
							nextTab.addClass('active');
							tabs.removeClass('changing');
						});

					});

				} // !!
			}); // !!

			$(window).on('load resize', function () {
				tabsContent.height(tabsContent.find('.active').outerHeight());
			});

		}); // !
	} // ! 
})(jQuery); // !
