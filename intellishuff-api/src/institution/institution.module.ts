import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Institution } from "./institution.entity";
import { InstitutionController } from "./institution.controller";
import { InstitutionService } from "./Institution.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Institution]),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
  exports: [InstitutionService]

})
export class InstitutionModule {}
