import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { reviewTemplate } from "./templates/welcome";

export async function sendMail({
	too,
	// name,
	subject,
	body,
}: {
	too: string;
	name: string;
	subject: string;
	body: string;
}) {
	const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

	const transport = nodemailer.createTransport({
		service: "gmail",
		secure: true,
		port: 465,
		auth: {
			user: SMTP_EMAIL,
			pass: SMTP_PASSWORD,
		},
	});
	//   try {
	//     const testResult = await transport.verify();
	//     console.log(testResult);
	//   } catch (error) {
	//     console.error({ testResult: error });
	//     return;
	//   }

	try {
		const sendResult = await transport.sendMail({
			from: SMTP_EMAIL,
			to: too,
			subject,
			html: body,
		});
		console.log(sendResult);
	} catch (error) {
		console.log({ sendResult: error });
	}
}

export function compileWelcomeTemplate(
	name: string,
	email: string,
	phone: string,
	subject: string,
	message: string,
) {
	const template = handlebars.compile(reviewTemplate);
	const htmlBody = template({
		name: name,                    // Submitter's name
		email: email,        // Submitter's email
		phone: phone,              // Optional phone number
		subject: subject,          // Optional subject line
		message: message,
		companyName: "Bindi's Cupcakery",        // Your company name
		formattedDate: new Date().toLocaleString(), // Current date/time
		currentYear: new Date().getFullYear() 
	});
	return htmlBody;
}
