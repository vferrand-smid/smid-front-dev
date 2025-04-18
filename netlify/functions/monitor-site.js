import fetch from "node-fetch";

export const handler = async () => {
	const siteUrl = "https://dev-smartphone-id.netlify.app/"; // Remplacez par votre URL
	try {
		const response = await fetch(siteUrl);
		if (!response.ok) {
			await sendEmailAlert(`🛑 Site Down!`, generateEmailContent("down", response.status));
		}
		return {
			statusCode: 200,
			body: "Site is up",
		};
	} catch (error) {
		await sendEmailAlert(`🚨 Site Unreachable!`, generateEmailContent("unreachable", error.message));
		return {
			statusCode: 500,
			body: "Site is down",
		};
	}
};

// Fonction pour envoyer des e-mails
async function sendEmailAlert(subject, htmlContent) {
	const apiKey = process.env.SENDGRID_API_KEY; // Stockez votre clé API SendGrid dans Netlify
	const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			personalizations: [
				{ to: [{ email: "vferrand@smartphone-id.com" }], subject }, // Remplacez par l'adresse du client
			],
			from: { email: "vferrand@smartphone-id.com", name: "Site Monitor" },
			content: [{ type: "text/html", value: htmlContent }],
		}),
	});

	if (!response.ok) {
		console.error("Error sending email:", await response.text());
	}
}

// Générer le contenu HTML de l'e-mail
function generateEmailContent(status, details) {
	const colors = {
		up: "#4caf50",
		down: "#f44336",
		unreachable: "#ff9800",
	};

	const messages = {
		up: `✅ Le site est opérationnel.`,
		down: `🛑 Le site a rencontré un problème (Code: ${details}).`,
		unreachable: `🚨 Le site est inaccessible : ${details}.`,
	};

	return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid ${colors[status]};">
            <h2 style="color: ${colors[status]};">Alerte de monitoring</h2>
            <p>${messages[status]}</p>
            <p style="font-size: 14px; color: #555;">
                <strong>Site :</strong> <a href="https://dev-smartphone-id.netlify.app/" style="color: #1e88e5;">https://dev-smartphone-id.netlify.app/</a>
            </p>
        </div>
    `;
}
