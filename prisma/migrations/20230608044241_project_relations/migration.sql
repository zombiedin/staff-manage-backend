-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_sol_id_fkey" FOREIGN KEY ("sol_id") REFERENCES "Solution"("sol_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participate" ADD CONSTRAINT "Participate_p_id_fkey" FOREIGN KEY ("p_id") REFERENCES "Project"("p_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participate" ADD CONSTRAINT "Participate_t_id_fkey" FOREIGN KEY ("t_id") REFERENCES "Team"("t_id") ON DELETE RESTRICT ON UPDATE CASCADE;
