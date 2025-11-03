import { faker } from "@faker-js/faker/locale/pt_BR";
import {
  Gender,
  PaymentMethod,
  PrismaClient,
  ProfessionalDocumentType,
  TypeOfQuery,
} from "../../generated/prisma";
import { hashPassword } from "../../src/core/shared/utils";

export const CreateUserProfessional = async () => {
  const prisma = new PrismaClient();

  const specialties = await prisma.specialty.findMany();
  const typesOfTreatment = await prisma.typesOfTreatment.findMany();

  for (let i = 0; i < 10; i++) {
    const userProfessional = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hashPassword("12345678"),
        birthDate: faker.date.birthdate(),
        role: "PROFESSIONAL",
        documentType: "CPF",
        document: faker.helpers.replaceSymbols("###.###.###-##"),
      },
    });

    await prisma.professional.create({
      data: {
        userId: userProfessional.id,
        typeOfQuery: faker.helpers.arrayElement([
          TypeOfQuery.ONLINE_VIDEO_CALL,
          TypeOfQuery.IN_PERSON,
        ]),
        price: Number(faker.commerce.price({ min: 30, max: 300 })),
        paymentMethod: faker.helpers.arrayElement([
          PaymentMethod.CREDIT_CARD,
          PaymentMethod.PIX,
        ]),
        documentType: faker.helpers.arrayElement([
          ProfessionalDocumentType.CRM,
          ProfessionalDocumentType.CRP,
        ]),
        document: faker.helpers.replaceSymbols("####/##"),
        gender: faker.helpers.arrayElement([
          Gender.MALE,
          Gender.FEMALE,
          Gender.NON_BINARY,
          Gender.TRANSGENDER,
        ]),
        avatar: faker.image.avatar(),
        phone: faker.phone.number(),
        specialtyId: faker.helpers.arrayElement(specialties).id,
        typeOfTreatmentId: faker.helpers.arrayElement(typesOfTreatment).id,
      },
    });
  }

  await prisma.$disconnect();
};
