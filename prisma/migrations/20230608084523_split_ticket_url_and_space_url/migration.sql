/*
  Warnings:

  - You are about to drop the column `space` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Project` table. All the data in the column will be lost.
  - Added the required column `space_url` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_url` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "space",
DROP COLUMN "url",
ADD COLUMN     "space_url" TEXT NOT NULL,
ADD COLUMN     "ticket_url" TEXT NOT NULL;
