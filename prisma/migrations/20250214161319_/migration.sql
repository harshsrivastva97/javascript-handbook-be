/*
  Warnings:

  - A unique constraint covering the columns `[user_id,topic_id]` on the table `Progress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Progress_user_id_topic_id_key" ON "Progress"("user_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
