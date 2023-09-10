/*
  Warnings:

  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - Added the required column `productId` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "categoryId",
ADD COLUMN     "discount" INTEGER,
ADD COLUMN     "sizes" TEXT[];

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
