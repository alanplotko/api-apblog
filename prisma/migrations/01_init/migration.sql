-- CreateTable
CREATE TABLE "Claps" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "claps" INTEGER NOT NULL,

    CONSTRAINT "Claps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Claps_slug_key" ON "Claps"("slug");
