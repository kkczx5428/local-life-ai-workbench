-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "ProductPlan" ADD COLUMN     "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'DRAFT';
