-- CreateTable
CREATE TABLE "Assign" (
    "a_id" TEXT NOT NULL,
    "a_name" TEXT NOT NULL,
    "a_email" TEXT NOT NULL,
    "p_id" TEXT NOT NULL,

    CONSTRAINT "Assign_pkey" PRIMARY KEY ("a_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assign_a_id_key" ON "Assign"("a_id");

-- AddForeignKey
ALTER TABLE "Assign" ADD CONSTRAINT "Assign_p_id_fkey" FOREIGN KEY ("p_id") REFERENCES "Project"("p_id") ON DELETE RESTRICT ON UPDATE CASCADE;
