import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { orderTemplate, reviewTemplate } from "./templates/welcome";
import mongoose from "mongoose";

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

type Products = {
    _id: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    quantity: number;
}[]

export function compileWelcomeTemplate2(
	orderID: number,
	name: string,
	phone: string,
	instructions: string,
	products: Products,
	amount: number,
	paymentType: string,
) {
	let productDetails = products.map(product => `Product ID: ${product.productId}, Quantity: ${product.quantity}`).join("\n");
	const template = handlebars.compile(orderTemplate);
	const templateData = {
		customerName: name,
		orderNumber: orderID,
		items: products.map(product => ({
		  imageUrl: "/path/to/image.jpg", // Replace with actual image URL
		  name: product.productId.name,
		  quantity: product.quantity,
		  price: product.productId.price,
		})),
		subtotal: amount,
		total: amount, // Example total calculation
		customerPhone: phone,
		instructions: instructions || "None",
		paymentType: paymentType,
	  };
	
	const htmlBody = template({
		name: name,
		phone: phone,
		instructions: instructions,
		products: productDetails,
		amount: amount,
		paymentType: paymentType,
		companyName: "Bindi's Cupcakery",
		formattedDate: new Date().toLocaleString(),
		currentYear: new Date().getFullYear() 
	});
	return htmlBody;
}
