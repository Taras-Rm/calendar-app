/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `labels` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "labels_color_key" ON "labels"("color");
