import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Blog RESTful API - Final Project")
    .setDescription(
      "Welcome to the API documentation for our blog application! This API provides endpoints to manage posts, users and admin resources. Utilize the resources and endpoints outlined below to interact with our platform securely and efficiently."
    )
    .setVersion("1.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  await app.listen(parseInt(process.env.PORT) || 3000);
  logger.log(`Application listening on port ${process.env.PORT}`);
}
bootstrap();
