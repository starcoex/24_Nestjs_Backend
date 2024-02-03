export interface IEmailServiceMailer {
  to: string | string[];
  subject: string;
  template?: string;
  html?: string;
}
