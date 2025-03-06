package br.com.gunthercloud.projectyt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Value("${spring.mail.username}")
	private String from;
	
	@Autowired
	private JavaMailSender javaMailSender;

	public String enviarEmailTexto(String destinatario, String assunto, String mensagem) {
		try {
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setFrom(from);
			mailMessage.setTo(destinatario);
			mailMessage.setSubject(assunto);
			mailMessage.setText(mensagem);
			javaMailSender.send(mailMessage);
			return "Email enviado com sucesso!";
		}
		catch (MailAuthenticationException e) {
			return "Ouve um erro na autenticação!";
		}
		catch (Exception e) {
			return "Ouve um erro ao executar!";
		}
	}
}
