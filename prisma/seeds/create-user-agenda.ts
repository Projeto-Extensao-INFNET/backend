import { faker } from '@faker-js/faker/locale/pt_BR';
import type { PrismaClient } from 'generated/prisma';

export const CreateUserAgenda = async (prisma: PrismaClient) => {
  // busca os usuários do tipo paciente
  const patients = await prisma.user.findMany({
    where: {
      role: 'PATIENT',
    },
  });

  // busca as agendas disponíveis dos profissionais
  const schedules = await prisma.schedule.findMany({
    where: {
      isAvailable: true,
    },
  });

  // se não houver horários disponíveis, emite um erro e para o seed
  if (schedules.length === 0) {
    console.warn('Sem horários livres para criar agendamentos!');
    await prisma.$disconnect();
    return;
  }

  for (const patient of patients) {
    // busca um schedule (horário de um profissional) disponível no banco
    const schedule = await prisma.schedule.findFirst({
      where: { isAvailable: true },
      orderBy: { createdAt: 'asc' },
    });

    // se não houver mais horários disponíveis, interrompe a criação de agendamentos
    if (!schedule) {
      console.warn('Sem horários disponíveis restantes!');
      // usa break para garantir que o prisma seja desconectado ao final
      break;
    }

    const statusTypes = ['SCHEDULED', 'CANCELED', 'COMPLETED'] as const;
    const status = faker.helpers.arrayElement(statusTypes);

    const extraData: Record<string, unknown> = {};
    if (status === 'CANCELED') {
      // se for cancelada, preenche canceledAt com uma data recente
      extraData.canceledAt = faker.date.recent();
      // usuário não completou a consulta
      extraData.isCompleted = false;
    } else if (status === 'COMPLETED') {
      // se for finalizada, marca isCompleted como true no user_agenda
      extraData.isCompleted = true;
    } else {
      // se nao for nem CANCELED ou COMPLETED deixa como SCHEDULED (agendado)
      extraData.isCompleted = false;
    }

    /**
     * realiza criação do UserAgenda e marca o schedule como indisponível em transação.
     * se o status for COMPLETED, também marca o schedule como confirmado
     *  */
    await prisma.$transaction([
      prisma.userAgenda.create({
        data: {
          userId: patient.id,
          scheduleId: schedule.id,
          status: status,
          ...extraData,
        },
      }),
      prisma.schedule.update({
        where: { id: schedule.id },
        data: {
          // sempre marcar o horário como indisponível após criar um UserAgenda
          // (não criamos múltiplos UserAgenda apontando para o mesmo schedule)
          isAvailable: false,
          ...(status === 'COMPLETED' ? { isConfirmed: true } : {}),
        },
      }),
    ]);
  }

  await prisma.$disconnect();
};
