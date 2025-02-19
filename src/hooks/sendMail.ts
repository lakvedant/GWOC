"use server";
import { compileWelcomeTemplate, sendMail } from "@/lib/mail";

type Props = {
	name: string,
	email: string,
	message: string,
	phone: string,
	subject: string,
};

const send = async ({ name, email, phone, subject, message }: Props) => {
	await sendMail({
		too: email,
		name: name,
		subject: `${subject}`,
		body: compileWelcomeTemplate(name, email, phone, subject, message),
	});
};

export default send;
