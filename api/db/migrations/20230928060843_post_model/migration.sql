/*
  Warnings:

  - You are about to drop the `Testimonial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Testimonial";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
