//module/mailer.module
import { MailerModule as NestMailerModule } from "@nestjs-modules/mailer";
import { MailerService } from "./mailer.service";
import { Global, Module } from "@nestjs/common";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";

@Global()
@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      },
      defaults: {
        from: process.env.MAIL_FROM
      },
      template: {
        dir: join(process.cwd(), "src", "template"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}
