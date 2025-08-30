/*
  Warnings:

  - A unique constraint covering the columns `[orgId,memberId]` on the table `OrgMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."OrgMember" DROP CONSTRAINT "OrgMember_memberId_fkey";

-- DropIndex
DROP INDEX "public"."OrgMember_memberId_key";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "orgMemberId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "OrgMember_orgId_memberId_key" ON "public"."OrgMember"("orgId", "memberId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_orgMemberId_fkey" FOREIGN KEY ("orgMemberId") REFERENCES "public"."OrgMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
