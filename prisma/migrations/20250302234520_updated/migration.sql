-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'PENDING');

-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL,
    "display_name" TEXT,
    "email" TEXT,
    "email_verified" BOOLEAN,
    "photo_url" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "x_link" TEXT,
    "website_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserProgress" (
    "progress_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,
    "status" "ProgressStatus" NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("progress_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "UserProgress_user_id_idx" ON "UserProgress"("user_id");

-- CreateIndex
CREATE INDEX "UserProgress_topic_id_idx" ON "UserProgress"("topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_user_id_topic_id_key" ON "UserProgress"("user_id", "topic_id");

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
