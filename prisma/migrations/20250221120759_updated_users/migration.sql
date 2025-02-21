/*
  Warnings:

  - You are about to drop the column `lastLoginAt` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_username_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "lastLoginAt";
