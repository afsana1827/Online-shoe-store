/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `user` table. All the data in the column will be lost.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "hashedPassword",
ALTER COLUMN "role" SET DEFAULT 'USER',
ALTER COLUMN "password" SET NOT NULL;
