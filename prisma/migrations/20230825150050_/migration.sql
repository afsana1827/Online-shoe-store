/*
  Warnings:

  - You are about to drop the column `quantity` on the `product` table. All the data in the column will be lost.
  - The `sizes` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "quantity",
DROP COLUMN "sizes",
ADD COLUMN     "sizes" JSONB[];
