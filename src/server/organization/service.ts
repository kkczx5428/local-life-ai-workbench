import { prisma } from "@/server/db";

export type CreateOrganizationInput = {
  name: string;
  ownerEmail: string;
  ownerDisplayName: string;
};

export async function createOrganization(input: CreateOrganizationInput) {
  const name = input.name.trim();
  const email = input.ownerEmail.trim().toLowerCase();
  const displayName = input.ownerDisplayName.trim();

  if (!name || !email || !displayName) {
    throw new Error("组织名称、负责人邮箱和负责人姓名不能为空");
  }

  return prisma.$transaction(async (transaction) => {
    const user = await transaction.user.upsert({
      where: { email },
      update: { displayName },
      create: { email, displayName },
    });

    const organization = await transaction.organization.create({ data: { name } });
    await transaction.membership.create({
      data: { userId: user.id, organizationId: organization.id, role: "OWNER" },
    });

    return { organization, user };
  });
}

export async function addMember(organizationId: string, email: string, displayName: string, role = "MEMBER" as const) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = displayName.trim();
  if (!organizationId || !normalizedEmail || !normalizedName) {
    throw new Error("组织、成员邮箱和成员姓名不能为空");
  }

  const user = await prisma.user.upsert({
    where: { email: normalizedEmail },
    update: { displayName: normalizedName },
    create: { email: normalizedEmail, displayName: normalizedName },
  });

  return prisma.membership.create({
    data: { organizationId, userId: user.id, role },
    include: { user: true, organization: true },
  });
}
