import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CatalogModule } from './modules/catalog/catalog.module';
@Module({
  imports: [ProductModule, UserModule, AuthModule, CatalogModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
