/*
  Warnings:

  - You are about to drop the column `allocations` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `isAudited` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `securityDetails` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `teamDetails` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `teamIsDoxxed` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `totalSupply` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `utility` on the `Report` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `security` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamAndBackers` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenomics` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- DropIndex
DROP INDEX "Report_ticker_idx";

-- DropIndex
DROP INDEX "Report_userId_idx";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "allocations",
DROP COLUMN "isAudited",
DROP COLUMN "securityDetails",
DROP COLUMN "teamDetails",
DROP COLUMN "teamIsDoxxed",
DROP COLUMN "totalSupply",
DROP COLUMN "userId",
DROP COLUMN "utility",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "security" JSONB NOT NULL,
ADD COLUMN     "signature" TEXT NOT NULL,
ADD COLUMN     "teamAndBackers" JSONB NOT NULL,
ADD COLUMN     "tokenomics" JSONB NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
