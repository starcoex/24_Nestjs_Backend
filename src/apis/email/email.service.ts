import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailServiceMailer } from './interfaces/email-service.interface';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMemberJoinVerification(
    emailAddress: string,
    signUpVerifyToken: string,
  ) {
    const baseUrl = 'http://localhost:3100';
    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signUpVerifyToken}`;

    const mailOptions: IEmailServiceMailer = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
      가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
      <form action="${url}" method="POST">
        <button>가입확인</button>
      </form>
    `,
    };
    await this.mailerService.sendMail(mailOptions);
  }

  public async sendMailer(): Promise<void> {
    await this.mailerService.sendMail({
      to: 'test@nestjs.com',
      from: 'noreply@nestjs.com',
      subject: 'Testing Nest Mailermodule with template ✔',
      template: 'welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
      context: {
        // Data to be sent to template engine.
        code: 'cf1a3f828287',
        username: 'john doe',
      },
    });
  }
}
