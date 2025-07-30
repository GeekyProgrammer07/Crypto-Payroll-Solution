/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `OrgMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memberId` to the `OrgMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrgMember" ADD COLUMN     "memberId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrgMember_memberId_key" ON "OrgMember"("memberId");

-- AddForeignKey
ALTER TABLE "OrgMember" ADD CONSTRAINT "OrgMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
