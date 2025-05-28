import Invite from '#models/invite/invite'
import User from '#models/user/user'
import mail from '@adonisjs/mail/services/main'

export class MailService {
  sendCreatedUserEmail(user: User, password: string) {
    mail.send((message) => {
      message.to(user.email).subject('Verifique sua conta!').html(`
        <body>
            <h1>Bem vindo, ${user.fullName}!</h1>
            <p>Obrigado por se juntar a nós.</p>

            <p>Abaixo seguem os dados para o seu primeiro login:</p>
            <p>Senha temporária: ${password}</p
            <p>Token: ${user.id}</p>
        </body>
        `)
    })
  }

  sendUserInvitedEmail(user: User, invite: Invite) {
    mail.send((message) => {
      message.to(user.email).subject('Você foi selecionado!').html(`
        <body>
            <h1>olá, ${user.fullName}!</h1>
            <p>Estamos aqui para te notificar que você foi selecionado.</p>

            <p>Convite enviado por: ${invite.admin.fullName}</p>
            <p>Email: ${invite.admin.email}</p>
            <p>Data da seleção: ${invite.selectedDate.setLocale('pt-BR').toLocaleString({
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}</p

            <p>Preste atenção nos canais de comunicação que logo será notificado sobre sua entrevista, as mesmas ocorrem em três dias úteis a partir das 14h.</p>
        </body>
        `)
    })
  }
}
