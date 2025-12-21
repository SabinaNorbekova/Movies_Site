//app.module
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from "./modules/categories/categories.module";
import { MoviesModule } from "./modules/movies/movies.module";
import { SubscriptionsModule } from "./modules/subscriptions/subscription.module";
import { MailerModule } from './mailer/mailer.module';
import { UsersModule } from './modules/users/users.module';
import { FavouritesModule } from './modules/favourites/favourites.module'; 
import { profilesModule } from './modules/profile/profile.module'; 
import { ReviewsModule } from './modules/reviews/reviews.module'; 
import { FileUploadModule } from './modules/file-upload/file-upload.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CategoriesModule,
    MoviesModule,
    SubscriptionsModule,
    MailerModule,
    UsersModule,
    FavouritesModule,
    profilesModule,
    ReviewsModule,
    FileUploadModule
  ],
})
export class AppModule {}