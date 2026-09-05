-- CreateTable
CREATE TABLE "MerchantDiagnosis" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "result" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MerchantDiagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MerchantDiagnosis_merchantId_createdAt_idx" ON "MerchantDiagnosis"("merchantId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantDiagnosis_merchantId_version_key" ON "MerchantDiagnosis"("merchantId", "version");

-- AddForeignKey
ALTER TABLE "MerchantDiagnosis" ADD CONSTRAINT "MerchantDiagnosis_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
