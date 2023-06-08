/*
  Warnings:

  - A unique constraint covering the columns `[cu_id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_cu_id_key" ON "Project"("cu_id");
