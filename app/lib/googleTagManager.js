export const GTM_ID = process.env.GTM_ID;

export const initGTM = (originCountry) => {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		event: 'page_view',
		origin_country: originCountry,
	});
};
