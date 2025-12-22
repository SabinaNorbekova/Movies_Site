//main.ts
import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true
    })
  );  
  const config = new DocumentBuilder()
    .setTitle("Movies Site Project")
    .setDescription("Welcome to the site to watch movies")
    .setVersion("1.0")
    .addBearerAuth()
    .addCookieAuth("access_token")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, documentFactory, {
    swaggerOptions: { persistAuthorization: true }
  });
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads/"
  });

  await app.listen(3000);
}
bootstrap();
