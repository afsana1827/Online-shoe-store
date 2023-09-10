/*
  Warnings:

  - You are about to drop the column `productId` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_productId_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
