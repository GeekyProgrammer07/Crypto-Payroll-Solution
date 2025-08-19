/*
  Warnings:

  - Changed the type of `role` on the `OrgMember` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Create enum type
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- Alter OrgMember.role with cast
ALTER TABLE "OrgMember"
ALTER COLUMN "role" TYPE "Role" USING ("role"::text::"Role");

-- Alter User.role with cast
ALTER TABLE "User"
ALTER COLUMN "role" TYPE "Role" USING ("role"::text::"Role");
