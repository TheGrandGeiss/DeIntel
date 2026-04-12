-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "trustScore" INTEGER NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "executiveSummary" TEXT NOT NULL,
    "catalysts" TEXT[],
    "redFlags" TEXT[],
    "greenFlags" TEXT[],
    "teamIsDoxxed" BOOLEAN NOT NULL,
    "teamDetails" TEXT NOT NULL,
    "isAudited" BOOLEAN NOT NULL,
    "securityDetails" TEXT NOT NULL,
    "totalSupply" TEXT NOT NULL,
    "utility" TEXT[],
    "allocations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE INDEX "Report_ticker_idx" ON "Report"("ticker");

-- CreateIndex
CREATE INDEX "Report_userId_idx" ON "Report"("userId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
